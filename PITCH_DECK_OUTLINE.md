# Sovereign Vision Engine - Pitch Deck Outline

**Slide 1: Title Slide**
* Title: Sovereign Vision Engine
* Subtitle: Edge-Native Offline Biometrics for NHAI Datalake 3.0
* Presenter: Joydeep Das

**Slide 2: The Infrastructure Problem (Why Edge AI?)**
* Challenge: Remote highway toll plazas experience frequent cellular dropouts. Cloud AI halts operations when the network fails.
* Heavy Models: Standard AI vision models bloat mobile apps beyond 100MB, slowing down mid-range hardware.
* Security: Streaming raw biometric data to the cloud exposes field personnel to interception.

**Slide 3: The Sovereign Innovation (30 Marks: Innovation)**
* Sub-20MB Model Footprint: Replaced heavy Neural Networks with an optimized OpenCV Haar Cascade and a Custom C++ Matrix kernel. Total integration adds less than 15MB to the app.
* Active & Passive Liveness: Implemented spatial depth detection alongside active user prompts (blink/turn head) to prevent photographic spoofing completely offline.

**Slide 4: Real-World Resilience (30 Marks: Feasibility)**
* Sub-Second Execution: Bypassed the slow React Native Base64 bridge. Hardware matrices are passed via file paths directly to the JNI C++ layer, executing in <1 second on 3GB RAM devices.
* Photonic Lighting Armor: Utilizes `cv::equalizeHist` to mathematically balance blinding headlights and harsh shadows before facial geometry is extracted.

**Slide 5: Scalability: The Sync & Purge Architecture (20 Marks: Scalability)**
* Zero-Trust Storage: Raw images are processed in RAM and purged instantly. 
* AWS Sync Protocol: Authentication success metrics (timestamps/IDs) are queued in a lightweight local encrypted state.
* Connection Restoration: When the device detects network restoration, the queue safely syncs the logs to AWS and triggers a permanent local purge.

**Slide 6: Conclusion & Datalake 3.0 Integration**
* Cross-Platform Ready: Fully unified codebase compiling to both Android (Gradle) and iOS (Xcode).
* Zero Recurring API Costs: Because all intelligence lives on the mobile edge, NHAI pays zero cloud processing fees, regardless of how many millions of verifications occur daily.
