# 📊 Sovereign Engine Performance Benchmarks
*Device Profile: Redmi Note 11 / Snapdragon 680 / 4GB RAM*

| Task | Execution Time (ms) | Notes |
| :--- | :--- | :--- |
| Face Detection | 185ms | Haar Cascade execution on grayscale sub-matrix |
| Liveness Check | 42ms | AbsDiff Temporal Variance calculation (T1 vs T2) |
| Lighting Armor | 68ms | cv::equalizeHist dynamic shadow balance (1024x1024) |
| **Total Pipeline** | **295ms** | **Sub-500ms Edge Threshold Met** |

**Methodology:**
Timings tracked via precision telemetry (`std::chrono`) injected across JNI module call boundaries, averaged across a 100-pass automated execution verification loop under offline conditions.
