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
    try {
      setStatus("Diag 1: Checking Camera Ref...");
      if (!camera.current) throw new Error("Camera hardware reference is null.");
      if (typeof camera.current.takePhoto !== 'function') {
         throw new Error("takePhoto is missing. Available commands: " + Object.keys(camera.current).join(', '));
      }

      setStatus("Diag 2: Snapping Photo...");
      const photo = await camera.current.takePhoto();

      setStatus("Diag 3: Checking C++ Bridge...");
      if (!VedicEngine) throw new Error("VedicEngine module is completely missing from NativeModules.");
      if (typeof VedicEngine.authenticateFace !== 'function') {
         throw new Error("authenticateFace is missing. Available commands: " + Object.keys(VedicEngine).join(', '));
      }

      setStatus("Diag 4: Passing Frame to OpenCV...");
      const result = await VedicEngine.authenticateFace(photo.path, "none");

      setStatus("Diag 5: Parsing Kernel Response...");
      const parsed = JSON.parse(result);

      if (parsed.status === "success") {
         setStatus(`FACE DETECTED!\nBounding Box: [X:${parsed.face_x}, Y:${parsed.face_y}]\nPassing to Vedic Kernel...`);
      } else {
         setStatus(`OPENCV FAILED:\n${parsed.error}`);
      }
    } catch (e: any) {
      // This will catch the exact failure and print it to your screen
      setStatus(`Crash Report:\n${e.message}`);
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
