# ⚙️ System Functions & API Architecture

This document provides a comprehensive, function-by-function explanation of the Divine Earthly Sovereign Vision Engine. The architecture is cleanly decoupled into two layers: The **C++ Native Processing Core** and the **React Native Interface Thread**.

---

## 1. Native C++ Core Functions (`jni_bridge.cpp`)

The native core handles all heavy mathematical lifting. It operates independently of the JavaScript thread to prevent UI freezing.

### `Java_com_nhaiapp_VedicEngineModule_authenticateFaceNative`
* **Purpose:** The master bridging function that connects the Android Java layer to the OpenCV C++ environment.
* **Explanation:** It receives the local file path of the captured image and the path to the Haar Cascade XML. It reads the raw image matrix directly from hardware memory (`cv::imread`), bypassing the need to serialize massive Base64 text strings across the application bridge.

### `cv::resize` (Memory Shield Protocol)
* **Purpose:** Prevents OS-level Out-Of-Memory (OOM) `SIGABRT` crashes.
* **Explanation:** High-end mobile lenses capture massive 4K+ matrices. Before applying structural analysis, this function dynamically scales the matrix down to a maximum boundary width of `400px`. This reduces the computational surface area by over 90% while retaining critical geometric gradients.

### `cv::equalizeHist` (Photonic Lighting Armor)
* **Purpose:** Neutralizes harsh highway backlighting and extreme shadows.
* **Explanation:** It calculates the histogram of the grayscale image and mathematically redistributes the brightness values. It forces the darkest pixels to absolute black and the lightest to absolute white, artificially restoring contrast to faces hidden in deep shadows.

### `face_cascade.detectMultiScale`
* **Purpose:** Extracts the geometric bounding box of the user's face.
* **Explanation:** Scans the equalized 400px matrix using the loaded OpenCV Haar Cascade. It returns a `cv::Rect` object containing the precise X and Y hardware coordinates of the authenticated target.

### `Vedic Dharana Liveness Matrix Check`
* **Purpose:** Prevents photographic spoofing attacks without cloud AI.
* **Explanation:** Analyzes the isolated face Region of Interest (ROI). By checking spatial pixel frequencies and dimensional rows natively, it verifies the physical depth and presence of the target, rejecting flat digital screens.

---

## 2. React Native UI Functions (`App.tsx`)

The frontend layout orchestrates the camera hardware and translates the C++ JSON payload into a fluid tactical Heads-Up Display (HUD).

### `handleAuthentication()`
* **Purpose:** The primary trigger loop for biometric capture.
* **Explanation:** 1. Halts the UI thread to display `INITIALIZING OPTICAL MATRIX...`
  2. Captures a hardware snapshot via `react-native-vision-camera`.
  3. Writes the raw `HybridObject` to the device's local `/tmp` cache.
  4. Dispatches the file path to the `VedicEngine` native module.
  5. Parses the returning JSON payload to extract the `X/Y` coordinates, `confidence`, and `liveness` metrics.

### `getBorderColor()`
* **Purpose:** Dynamic visual state management.
* **Explanation:** Reads the React state variable `scanType`. 
  * Returns **Cyber Cyan (`#00E5FF`)** when the engine is idle or processing.
  * Snaps to **Matrix Green (`#00FF00`)** upon a successful `[FACE ACQUIRED]` event.
  * Flashes **Alert Red (`#FF003C`)** if the C++ kernel throws a system fault or detects a spoof attack.

### `useEffect()` (Hardware Interception)
* **Purpose:** Asynchronous hardware permission validation.
* **Explanation:** Automatically checks if the application has been granted optical lens access by the Android OS upon boot. If denied, it suspends engine initialization and natively requests hardware access from the user.
