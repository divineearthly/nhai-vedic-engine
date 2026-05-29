cmake_minimum_required(VERSION 3.10)
project(DivineEarthly_NHAI_Engine)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED True)
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -O3 -ffast-math -march=native")

find_package(OpenCV REQUIRED)
find_package(OpenBLAS REQUIRED)
include_directories(include ${OpenCV_INCLUDE_DIRS} ${OpenBLAS_INCLUDE_DIRS})

# The Core Library (Used by both Linux testing and Android)
add_library(vedic_core SHARED 
    src/anurupyena_quant.cpp
    src/urdhva_multiplication.cpp
    src/nikhilam_distance.cpp
    src/face_vision.cpp
    src/liveness_check.cpp
)
target_link_libraries(vedic_core ${OpenCV_LIBS} ${OpenBLAS_LIBRARIES})

# The JNI Bridge (This is what Android / React Native will load)
# Note: We simulate JNI headers here for the cloud Linux build environment
find_package(JNI)
if (JNI_FOUND)
    include_directories(${JNI_INCLUDE_DIRS})
    add_library(vedic_jni_bridge SHARED src/jni_bridge.cpp)
    target_link_libraries(vedic_jni_bridge vedic_core)
else()
    message(WARNING "JNI not found. Skipping Android Bridge build for Linux environment.")
endif()

add_executable(run_engine src/main.cpp)
target_link_libraries(run_engine vedic_core)
