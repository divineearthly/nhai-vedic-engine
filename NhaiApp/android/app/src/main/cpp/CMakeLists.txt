cmake_minimum_required(VERSION 3.10)
project(DivineEarthly_NHAI_Engine)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED True)
# Removed -march=native to allow ARM cross-compilation
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -O3 -ffast-math")

# Point CMake to the OpenCV Android SDK we will inject via GitHub Actions
set(OpenCV_DIR "${CMAKE_CURRENT_SOURCE_DIR}/opencv/sdk/native/jni")
find_package(OpenCV REQUIRED)

# Combine the core logic and JNI bridge into a single shared library for React Native
add_library(vedic_core SHARED
    src/anurupyena_quant.cpp
    src/urdhva_multiplication.cpp
    src/nikhilam_distance.cpp
    src/face_vision.cpp
    src/liveness_check.cpp
    src/jni_bridge.cpp
)

# Link OpenCV and the standard Android logging library
find_library(log-lib log)
target_link_libraries(vedic_core ${OpenCV_LIBS} ${log-lib})
