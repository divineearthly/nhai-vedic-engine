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
    
    setStatus("Capturing Frame...");
    try {
      // 1. Instantly capture the frame to the local device cache
      const photo = await camera.current.takePhoto({ qualityPrioritization: 'speed' });
      setStatus("Passing File Path to C++ Kernel...");
      
      // 2. Pass the absolute file path directly to the native bridge
      const result = await VedicEngine.authenticateFace(photo.path, "none");
      const parsed = JSON.parse(result);
      
      // 3. Display the results returned by OpenCV
      if (parsed.status === "success") {
         setStatus(`ACCESS GRANTED: Verified by Vedic Kernel.\nOpenCV Read Resolution: ${parsed.width}x${parsed.height}`);
      } else {
         setStatus(`ACCESS DENIED: ${parsed.error}`);
      }
    } catch (e) {
      setStatus("Error: Vision Capture Failed");
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
