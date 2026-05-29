cmake_minimum_required(VERSION 3.10)
project(DivineEarthly_NHAI_Engine)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED True)
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -O3 -ffast-math")

# This maps your local folders so the compiler can read all your Vedic & Vision headers
include_directories(include)

# Map the cloud-downloaded OpenCV framework
set(OpenCV_DIR "${CMAKE_CURRENT_SOURCE_DIR}/opencv/sdk/native/jni")
find_package(OpenCV REQUIRED)
include_directories(${OpenCV_INCLUDE_DIRS})

# Compile your complete custom stack and JNI bridge into a single shared payload
add_library(vedic_core SHARED
    src/anurupyena_quant.cpp
    src/urdhva_multiplication.cpp
    src/nikhilam_distance.cpp
    src/face_vision.cpp
    src/liveness_check.cpp
    src/jni_bridge.cpp
)

# Bind the system libraries and vision tools
find_library(log-lib log)
target_link_libraries(vedic_core ${OpenCV_LIBS} ${log-lib})
