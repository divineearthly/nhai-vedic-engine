import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, NativeModules, TouchableOpacity } from 'react-native';
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';

const { VedicEngine } = NativeModules;

export default function App() {
  const device = useCameraDevice('front');
  const camera = useRef(null);
  const { hasPermission, requestPermission } = useCameraPermission();
  const [status, setStatus] = useState('Initializing Sovereign AI...');

  useEffect(() => {
    if (!hasPermission) requestPermission();
  }, [hasPermission, requestPermission]);

  const handleAuthentication = async () => {
    if (camera.current == null) return;
    
    setStatus("Snapping Instant Frame...");
    try {
      // 1. Capture the frame straight into RAM (HybridObject)
      const photo = await camera.current.takeSnapshot({ quality: 85 });
      
      setStatus("Extracting Memory Object to Physical Cache...");
      
      // 2. Ask Java where the safe cache folder is located
      const cacheDir = await VedicEngine.getCachePath();
      const savePath = cacheDir + "/snapshot.jpg";
      
      // 3. Command the NitroImage HybridObject to physically save itself to the drive
      if (typeof photo.saveToFileAsync === 'function') {
          await photo.saveToFileAsync(savePath, 'jpg', 85);
      } else if (typeof photo.saveToFile === 'function') {
          await photo.saveToFile(savePath, 'jpg', 85);
      } else {
          throw new Error("Unable to save NitroImage. Object missing save command.");
      }

      setStatus("Running OpenCV Haar Cascade...");
      const cleanPath = savePath.startsWith('file://') ? savePath.replace('file://', '') : savePath;

      // 4. Pass the physical file path down to the C++ Engine
      const result = await VedicEngine.authenticateFace(cleanPath, "none");
      const parsed = JSON.parse(result);
      
      if (parsed.status === "success") {
         setStatus(`FACE DETECTED!\nBounding Box: [X:${parsed.face_x}, Y:${parsed.face_y}]\nPassing to Vedic Kernel...`);
      } else {
         setStatus(`OPENCV FAILED:\n${parsed.error}`);
      }
    } catch (e: any) {
      setStatus(`Crash Report:\n${e.message || JSON.stringify(e)}`);
    }
  };

  if (!hasPermission) return <View style={styles.container}><Text style={styles.statusText}>Requesting Camera Hardware Access...</Text></View>;
  if (device == null) return <View style={styles.container}><Text style={styles.statusText}>Loading Lens...</Text></View>;

  return (
    <View style={styles.container}>
      <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} ref={camera} photo={true} />
      <View style={styles.overlay}>
        <Text style={styles.statusText}>{status}</Text>
        <TouchableOpacity style={styles.button} onPress={handleAuthentication}>
          <Text style={styles.buttonText}>AUTHENTICATE OFFLINE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' },
  overlay: { position: 'absolute', bottom: 50, width: '100%', alignItems: 'center' },
  statusText: { backgroundColor: 'rgba(0,0,0,0.8)', color: '#00FF00', padding: 10, marginBottom: 20, fontFamily: 'monospace', textAlign: 'center' },
  button: { backgroundColor: '#007AFF', padding: 15, borderRadius: 10 },
  buttonText: { color: 'white', fontWeight: 'bold' }
});
