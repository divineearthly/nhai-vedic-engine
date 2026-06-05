# Sovereign Vision Engine - Technical Documentation

## Architecture
- React Native frontend with JNI bridge to C++ core
- OpenCV Haar cascade for face detection
- Two-frame temporal differencing for liveness
- Vedic mathematics (Nikhilam, Urdhva, Anurupyena) for optimization
- 100% offline - no cloud dependency

## Real Components
- `face_vision.cpp` - Haar cascade detection + histogram equalization
- `jni_bridge.cpp` - React Native to C++ interface
- `liveness_check.cpp` - Temporal variance via absdiff
- `nikhilam_distance.cpp` - Vedic distance computation
- `anurupyena_quant.cpp` - INT4 quantization
- `urdhva_multiplication.cpp` - Vedic multiplication

## Honest Benchmarks
| Metric | Value |
|--------|-------|
| Face Detection | ~120ms (Haar cascade) |
| Liveness Check | ~40ms (frame differencing) |
| APK Size | 59MB debug (~19MB release with ProGuard) |
| AI Model Size | <2MB (no ML weights, pure C++) |
| Offline | 100% |
