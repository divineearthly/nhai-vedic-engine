# 🌐 NHAI Datalake 3.0 Module Integration Guide

This guide details the steps to drop the offline biometric verification engine into existing React Native enterprise applications.

## 1. Native Java Native Interface Configuration
Copy the core engine bridge architecture classes into your project directory structure:
```text
android/app/src/main/java/com/nhaiapp/
├── VedicEngineModule.java
└── VedicEnginePackage.java

```
Register the verification module package inside your application initialization pipeline (android/app/src/main/java/com/your-app/MainApplication.java):
```java
@Override
protected List<ReactPackage> getPackages() {
    List<ReactPackage> packages = new PackageList(this).getPackages();
    // Add the edge engine package layer manually
    packages.add(new com.nhaiapp.VedicEnginePackage());
    return packages;
}

```
## 2. Shared C++ Build Integration
Merge the performance math engines into your build architecture (CMakeLists.txt):
```cmake
target_sources(appmodules PRIVATE
    ${CMAKE_CURRENT_SOURCE_DIR}/src/jni_bridge.cpp
    ${CMAKE_CURRENT_SOURCE_DIR}/src/face_vision.cpp
    ${CMAKE_CURRENT_SOURCE_DIR}/src/liveness_check.cpp
    ${CMAKE_CURRENT_SOURCE_DIR}/src/anurupyena_quant.cpp
)

```
## 3. JavaScript Interface Call Structure
Execute verification routines straight from your React Native code layer using standard native module abstractions:
```javascript
import { NativeModules } from 'react-native';
const { VedicEngine } = NativeModules;

async function executeIdentityVerification(temporaryPath1, temporaryPath2) {
  try {
    // Pass both optical frames captured 800ms apart to trigger the temporal check
    const responseString = await VedicEngine.authenticateFace(temporaryPath1, temporaryPath2);
    const parsedResponse = JSON.parse(responseString);
    
    if (parsedResponse.status === "success") {
      console.log(`Authorization Granted. Liveness Checked: Passed.`);
      return true;
    } else {
      console.error(`Verification Refused: ${parsedResponse.error}`);
      return false;
    }
  } catch (error) {
    console.error(`Hardware Execution Bridge Exception: ${error.message}`);
    return false;
  }
}

```
