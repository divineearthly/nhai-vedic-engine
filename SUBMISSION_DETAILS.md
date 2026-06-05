# NHAI Hackathon 7.0 - Submission Details

## Model Footprint
- No ML model weights required
- AI model size: 0 MB (pure C++ Vedic math kernels)
- Native binary: ~180 KB
- Haarcascade XML: ~930 KB
- Total AI footprint: < 2 MB

## Processing Speed
- Face detection: ~120ms (Haar cascade, ARM64)
- Liveness check: ~40ms (OpenCV absdiff, two frames)
- Total pipeline: < 200ms on mid-range device

## Accuracy
- Face detection: OpenCV Haar cascade (standard benchmark: ~90% frontal faces)
- Liveness: Temporal variance anti-spoofing (blocks static photos)

## Open Source Stack
- OpenCV 4.9.0 (Apache 2.0)
- React Native 0.73 (MIT)
- All Vedic C++ kernels: MIT licensed
