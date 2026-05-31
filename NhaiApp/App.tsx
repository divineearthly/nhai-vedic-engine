import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, NativeModules, TouchableOpacity, SafeAreaView } from 'react-native';
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';

const { VedicEngine } = NativeModules;

export default function App() {
  const device = useCameraDevice('front');
  const camera = useRef(null);
  const { hasPermission, requestPermission } = useCameraPermission();
  const [status, setStatus] = useState('SYSTEM IDLE\nWAITING FOR SECURE CAPTURE');
  const [isScanning, setIsScanning] = useState(false);
  const [scanType, setScanType] = useState('idle'); // idle, success, error

  useEffect(() => {
    if (!hasPermission) requestPermission();
  }, [hasPermission, requestPermission]);

  const handleAuthentication = async () => {
    if (camera.current == null) return;
    
    setIsScanning(true);
    setScanType('idle');
    setStatus("INITIALIZING OPTICAL MATRIX...");
    
    try {
      const photo = await camera.current.takeSnapshot({ quality: 85 });
      setStatus("EXECUTING HAAR CASCADE\nAPPLYING HISTOGRAM EQUALIZATION...");
      
      const cacheDir = await VedicEngine.getCachePath();
      const savePath = cacheDir + "/snapshot.jpg";
      
      if (typeof photo.saveToFileAsync === 'function') {
          await photo.saveToFileAsync(savePath, 'jpg', 85);
      } else if (typeof photo.saveToFile === 'function') {
          await photo.saveToFile(savePath, 'jpg', 85);
      }

      const cleanPath = savePath.startsWith('file://') ? savePath.replace('file://', '') : savePath;
      const result = await VedicEngine.authenticateFace(cleanPath, "none");
      const parsed = JSON.parse(result);
      
      if (parsed.status === "success") {
         setScanType('success');
         setStatus(`[FACE ACQUIRED] X:${parsed.face_x} Y:${parsed.face_y}\n\nAUTHORIZATION GRANTED\nKERNEL MATCH: ${parsed.confidence}%\nLIVENESS: ${parsed.liveness}`);
      } else if (parsed.status === "spoof") {
         setScanType('error');
         setStatus(`AUTHORIZATION DENIED\n${parsed.error.toUpperCase()}`);
      } else {
         setScanType('error');
         setStatus(`SCAN FAILED\n${parsed.error.toUpperCase()}`);
      }
    } catch (e) {
      setScanType('error');
      setStatus(`SYSTEM FAULT\n${e.message || JSON.stringify(e)}`);
    } finally {
      setIsScanning(false);
    }
  };

  if (!hasPermission) return <View style={styles.container}><Text style={styles.terminalText}>REQUESTING OPTICS ACCESS...</Text></View>;
  if (device == null) return <View style={styles.container}><Text style={styles.terminalText}>BOOTING LENS SUBSYSTEM...</Text></View>;

  const getBorderColor = () => {
    if (scanType === 'success') return '#00FF00'; // Matrix Green
    if (scanType === 'error') return '#FF003C'; // Alert Red
    return '#00E5FF'; // Cyber Cyan
  };

  return (
    <SafeAreaView style={styles.container}>
      <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} ref={camera} photo={true} />
      
      {/* HUD Overlay */}
      <View style={styles.hudContainer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>NHAI SECURE EDGE</Text>
          <Text style={styles.headerSub}>DIVINE EARTHLY SOVEREIGN CORE</Text>
        </View>

        {/* Reticle */}
        <View style={[styles.reticle, { borderColor: getBorderColor() }]}>
           <View style={[styles.corner, styles.topLeft, { borderColor: getBorderColor() }]} />
           <View style={[styles.corner, styles.topRight, { borderColor: getBorderColor() }]} />
           <View style={[styles.corner, styles.bottomLeft, { borderColor: getBorderColor() }]} />
           <View style={[styles.corner, styles.bottomRight, { borderColor: getBorderColor() }]} />
        </View>
        
        {/* Terminal Output */}
        <View style={[styles.terminalBox, { borderColor: getBorderColor() }]}>
          <Text style={[styles.terminalText, { color: getBorderColor() }]}>{status}</Text>
        </View>

        <TouchableOpacity 
          style={[styles.actionButton, isScanning && styles.actionButtonDisabled]} 
          onPress={handleAuthentication}
          disabled={isScanning}
        >
          <Text style={styles.actionButtonText}>
            {isScanning ? "PROCESSING MATRIX..." : "INITIATE SOVEREIGN SCAN"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050505', justifyContent: 'center' },
  hudContainer: { flex: 1, justifyContent: 'space-between', padding: 20 },
  header: { backgroundColor: 'rgba(0,10,20,0.85)', padding: 15, borderRadius: 4, borderWidth: 1, borderColor: '#00E5FF' },
  headerTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: '900', letterSpacing: 2, textAlign: 'center' },
  headerSub: { color: '#00E5FF', fontSize: 10, fontWeight: 'bold', letterSpacing: 3, textAlign: 'center', marginTop: 4 },
  reticle: { width: 250, height: 300, alignSelf: 'center', borderWidth: 1, borderStyle: 'dashed', position: 'relative', backgroundColor: 'rgba(0,229,255,0.05)' },
  corner: { position: 'absolute', width: 20, height: 20, borderWidth: 3 },
  topLeft: { top: -2, left: -2, borderBottomWidth: 0, borderRightWidth: 0 },
  topRight: { top: -2, right: -2, borderBottomWidth: 0, borderLeftWidth: 0 },
  bottomLeft: { bottom: -2, left: -2, borderTopWidth: 0, borderRightWidth: 0 },
  bottomRight: { bottom: -2, right: -2, borderTopWidth: 0, borderLeftWidth: 0 },
  terminalBox: { backgroundColor: 'rgba(0,10,20,0.85)', padding: 15, borderWidth: 1, borderRadius: 4, marginBottom: 15, minHeight: 100, justifyContent: 'center' },
  terminalText: { fontFamily: 'monospace', fontSize: 13, textAlign: 'center', fontWeight: 'bold', lineHeight: 20 },
  actionButton: { backgroundColor: '#00E5FF', paddingVertical: 18, borderRadius: 4, elevation: 5 },
  actionButtonDisabled: { backgroundColor: '#1A5F68' },
  actionButtonText: { color: '#000000', textAlign: 'center', fontWeight: '900', fontSize: 14, letterSpacing: 1.5 }
});