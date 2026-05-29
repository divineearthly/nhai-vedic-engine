import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, NativeModules, TouchableOpacity } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';

const { VedicEngine } = NativeModules;

export default function App() {
  const devices = useCameraDevices();
  const device = devices.find((d) => d.position === 'front');
  const camera = useRef(null);
  
  const [status, setStatus] = useState('Initializing Sovereign AI...');

  useEffect(() => {
    (async () => {
      await Camera.requestCameraPermission();
      try {
        const engineStatus = await VedicEngine.checkStatus();
        setStatus(engineStatus);
      } catch (e) {
        setStatus("Engine Offline");
      }
    })();
  }, []);

  const handleAuthentication = async () => {
    setStatus("Scanning Face & Checking Liveness...");
    setTimeout(async () => {
      try {
        const result = await VedicEngine.authenticateFace("frame1", "frame2");
        const parsed = JSON.parse(result);
        if (parsed.match && parsed.liveness) {
           setStatus("ACCESS GRANTED: Verified by Vedic Kernel.");
        } else {
           setStatus("ACCESS DENIED: Spoof Detected.");
        }
      } catch (e) {
        setStatus("Error: Authentication Failed");
      }
    }, 500); // Simulated delay for camera flash
  };

  if (device == null) return <View style={styles.container}><Text style={styles.statusText}>Loading Camera...</Text></View>;

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
