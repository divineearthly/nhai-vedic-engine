import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const TacticalHUD = ({ isActive, framePath }) => {
  const [hudData, setHudData] = useState({
    facesDetected: 0,
    latency: '0ms',
    guna: 'Sattva',
    coordinates: [],
    matrixFeedback: '🕉️ Ready'
  });
  
  const [scanLine] = useState(new Animated.Value(0));
  
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanLine, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true
        }),
        Animated.timing(scanLine, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true
        })
      ])
    ).start();
  }, []);
  
  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.scanLine,
          { transform: [{ translateY: scanLine.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 300]
          })}] }
        ]} 
      />
      
      <View style={styles.metricsPanel}>
        <Text style={styles.metricText}>🕉️ {hudData.guna}</Text>
        <Text style={styles.metricText}>⚡ {hudData.latency}</Text>
        <Text style={styles.metricText}>👤 {hudData.facesDetected} faces</Text>
        <Text style={styles.matrixFeedback}>{hudData.matrixFeedback}</Text>
      </View>
      
      <View style={styles.sovereigntyBadge}>
        <Text style={styles.sovereigntyText}>🛡️ SOVEREIGN</Text>
        <Text style={styles.sovereigntyText}>100% UPTIME</Text>
        <Text style={styles.sovereigntyText}>OFFLINE READY</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  scanLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#00ff00',
    opacity: 0.5,
  },
  metricsPanel: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(0,20,0,0.8)',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#00ff00',
  },
  metricText: {
    color: '#00ff00',
    fontSize: 14,
    fontFamily: 'monospace',
    marginVertical: 2,
  },
  matrixFeedback: {
    color: '#00cc00',
    fontSize: 12,
    fontFamily: 'monospace',
    marginTop: 5,
    fontStyle: 'italic',
  },
  sovereigntyBadge: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: 'rgba(0,20,0,0.8)',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#00ff00',
  },
  sovereigntyText: {
    color: '#00ff00',
    fontSize: 11,
    fontFamily: 'monospace',
    marginVertical: 1,
    fontWeight: 'bold',
  },
});

export default TacticalHUD;
