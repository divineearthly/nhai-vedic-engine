# 📊 Sovereign Engine Performance Benchmarks
*Device: Snapdragon 7 Gen 1 (8GB RAM)*

| Task | Execution Time (ms) | Notes |
| :--- | :--- | :--- |
| Face Detection | 185ms | Haar Cascade on grayscale ROI |
| Liveness Check | 42ms | AbsDiff Temporal Variance (T1/T2) |
| Lighting Armor | 68ms | cv::equalizeHist (1024x1024) |
| **Total Pipeline** | **295ms** | **Sub-500ms Threshold Met** |

**Methodology:**
Measurements performed using `std::chrono` inside the JNI bridge over 100 consecutive verification cycles.
