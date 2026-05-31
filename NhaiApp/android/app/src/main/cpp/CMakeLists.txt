cmake_minimum_required(VERSION 3.10.2)
project(vedic_jni_bridge)

set(OpenCV_STATIC OFF)
set(BUILD_SHARED_LIBS ON)
set(OpenCV_STATIC OFF)
find_package(OpenCV REQUIRED COMPONENTS core imgproc objdetect)

add_library(vedic_jni_bridge SHARED src/jni_bridge.cpp src/face_vision.cpp src/liveness_check.cpp)

target_include_directories(vedic_jni_bridge PRIVATE ${OpenCV_INCLUDE_DIRS})
target_link_libraries(vedic_jni_bridge ${OpenCV_LIBS} log)

# Compiler optimization
set(CMAKE_CXX_FLAGS_RELEASE "-O3 -Os -s")
