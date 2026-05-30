cmake_minimum_required(VERSION 3.22.1)

# RESTORE REACT NATIVE CORE: 
# Setting the project to 'appmodules' and including the script below 
# forces CMake to compile React Native's native TurboModules (like PlatformConstants)
project(appmodules)
include(${REACT_ANDROID_DIR}/cmake-utils/ReactNative-application.cmake)

# --- VEDIC SOVEREIGN ENGINE ---
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED True)
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -O3 -ffast-math")

# Map the local header directories
include_directories(include)

# Map the cloud-downloaded OpenCV framework
set(OpenCV_DIR "${CMAKE_CURRENT_SOURCE_DIR}/opencv/sdk/native/jni")
find_package(OpenCV REQUIRED)
include_directories(${OpenCV_INCLUDE_DIRS})

# Compile your custom JNI bridge as a separate shared library
add_library(vedic_jni_bridge SHARED
    src/anurupyena_quant.cpp
    src/urdhva_multiplication.cpp
    src/nikhilam_distance.cpp
    src/face_vision.cpp
    src/liveness_check.cpp
    src/jni_bridge.cpp
)

# Link OpenCV and the system logging tools
find_library(log-lib log)
target_link_libraries(vedic_jni_bridge ${OpenCV_LIBS} ${log-lib})
