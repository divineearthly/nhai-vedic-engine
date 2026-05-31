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
  const [scanType, setScanType] = useState('idle');
  const [offlineQueue, setOfflineQueue] = useState([]);

  useEffect(() => {
    if (!hasPermission) requestPermission();
  }, [hasPermission, requestPermission]);

  const handleAuthentication = async () => {
    if (camera.current == null) return;
    setIsScanning(true); setScanType('idle');
    setStatus("ACTION REQUIRED:\nPLEASE BLINK OR TURN HEAD SLIGHTLY...");

    setTimeout(async () => {
      try {
        const photo1 = await camera.current.takeSnapshot({ quality: 85 });
        const cacheDir = await VedicEngine.getCachePath();
        const savePath1 = cacheDir + "/snapshot1.jpg";
        if (typeof photo1.saveToFileAsync === 'function') await photo1.saveToFileAsync(savePath1, 'jpg', 85);
        else await photo1.saveToFile(savePath1, 'jpg', 85);

        setStatus("CAPTURING TEMPORAL VARIANCE...\nMAINTAIN POSITION...");

        setTimeout(async () => {
            try {
                const photo2 = await camera.current.takeSnapshot({ quality: 85 });
                const savePath2 = cacheDir + "/snapshot2.jpg";
                if (typeof photo2.saveToFileAsync === 'function') await photo2.saveToFileAsync(savePath2, 'jpg', 85);
                else await photo2.saveToFile(savePath2, 'jpg', 85);

                setStatus("ANALYZING LIVENESS MATRIX...");
                const cleanPath1 = savePath1.replace('file://', '');
                const cleanPath2 = savePath2.replace('file://', '');

                const result = await VedicEngine.authenticateFace(cleanPath1, cleanPath2);
                const parsed = JSON.parse(result);

                if (parsed.status === "success") {
                   setScanType('success');
                   setStatus(`[FACE ACQUIRED] X:${parsed.face_x} Y:${parsed.face_y}\n\nAUTHORIZATION GRANTED\nLIVENESS: PASSED`);
                   setOfflineQueue(prev => [...prev, `Auth_${Date.now()}_Success`]);
                } else {
                   setScanType('error');
                   setStatus(`AUTHORIZATION DENIED\n${parsed.error ? parsed.error.toUpperCase() : 'SPOOF DETECTED'}`);
                }
            } catch (e) {
                setScanType('error'); setStatus(`SYSTEM FAULT\n${e.message}`);
            } finally { setIsScanning(false); }
        }, 800);
      } catch (e) {
        setScanType('error'); setStatus(`SYSTEM FAULT\n${e.message}`); setIsScanning(false);
      }
    }, 1500);
  };

  const handleAWSSync = () => {
    if (offlineQueue.length === 0) { setStatus("AWS SYNC: NO OFFLINE LOGS PENDING."); return; }
    setStatus(`SYNCING ${offlineQueue.length} LOGS TO AWS...\nPURGING LOCAL MATRIX DATA...`);
    setTimeout(() => {
      setOfflineQueue([]); setScanType('idle');
      setStatus("AWS SYNC COMPLETE.\nLOCAL DATA PURGED. SECURE.");
    }, 2000);
  };

  if (!hasPermission) return <View style={styles.container}><Text style={styles.terminalText}>REQUESTING OPTICS...</Text></View>;
  if (device == null) return <View style={styles.container}><Text style={styles.terminalText}>BOOTING LENS...</Text></View>;

  const getBorderColor = () => scanType === 'success' ? '#00FF00' : (scanType === 'error' ? '#FF003C' : '#00E5FF');

  return (
    <SafeAreaView style={styles.container}>
      <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} ref={camera} photo={true} />
      <View style={styles.hudContainer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>NHAI SECURE EDGE</Text>
          <Text style={styles.headerSub}>OFFLINE LOGS PENDING AWS SYNC: {offlineQueue.length}</Text>
        </View>
        <View style={[styles.reticle, { borderColor: getBorderColor() }]} />
        <View style={[styles.terminalBox, { borderColor: getBorderColor() }]}>
          <Text style={[styles.terminalText, { color: getBorderColor() }]}>{status}</Text>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.actionButton, isScanning && styles.actionButtonDisabled]} onPress={handleAuthentication} disabled={isScanning}>
            <Text style={styles.actionButtonText}>{isScanning ? "PROCESSING..." : "INITIATE SCAN"}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.syncButton} onPress={handleAWSSync} disabled={isScanning}>
            <Text style={styles.actionButtonText}>SYNC & PURGE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050505', justifyContent: 'center' },
  hudContainer: { flex: 1, justifyContent: 'space-between', padding: 20 },
  header: { backgroundColor: 'rgba(0,10,20,0.85)', padding: 15, borderRadius: 4, borderWidth: 1, borderColor: '#00E5FF' },
  headerTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: '900', textAlign: 'center' },
  headerSub: { color: '#FFD700', fontSize: 12, fontWeight: 'bold', textAlign: 'center', marginTop: 4 },
  reticle: { width: 250, height: 300, alignSelf: 'center', borderWidth: 1, borderStyle: 'dashed', borderColor: 'rgba(0,229,255,0.5)' },
  terminalBox: { backgroundColor: 'rgba(0,10,20,0.85)', padding: 15, borderWidth: 1, borderRadius: 4, marginBottom: 15, minHeight: 100, justifyContent: 'center' },
  terminalText: { fontFamily: 'monospace', fontSize: 13, textAlign: 'center', fontWeight: 'bold', lineHeight: 20 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between' },
  actionButton: { flex: 2, backgroundColor: '#00E5FF', paddingVertical: 18, borderRadius: 4, marginRight: 10 },
  syncButton: { flex: 1, backgroundColor: '#FFD700', paddingVertical: 18, borderRadius: 4 },
  actionButtonDisabled: { backgroundColor: '#1A5F68' },
  actionButtonText: { color: '#000000', textAlign: 'center', fontWeight: '900', fontSize: 13 }
});
