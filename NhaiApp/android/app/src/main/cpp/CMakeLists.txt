cmake_minimum_required(VERSION 3.13)
project(appmodules)

# SAFELY APPEND OPTIMIZATIONS (Let Android manage the build type variant dynamically)
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -O3 -Os -fvisibility=hidden -Wno-deprecated-anon-enum-enum-conversion -Wno-error=deprecated-anon-enum-enum-conversion")
set(CMAKE_SHARED_LINKER_FLAGS "${CMAKE_SHARED_LINKER_FLAGS} -Wl,--strip-all")

# Activate official OpenCV static component tracking
set(OpenCV_STATIC ON)
set(OpenCV_DIR "${CMAKE_CURRENT_SOURCE_DIR}/opencv/sdk/native/jni")

# Link only specific static layers
find_package(OpenCV REQUIRED core imgproc objdetect imgcodecs)

include(${REACT_ANDROID_DIR}/cmake-utils/ReactNative-application.cmake)

# Map your native Sovereign Vedic engines directly into appmodules
target_sources(${CMAKE_PROJECT_NAME} PRIVATE
    ${CMAKE_CURRENT_SOURCE_DIR}/src/jni_bridge.cpp
    ${CMAKE_CURRENT_SOURCE_DIR}/src/face_vision.cpp
    ${CMAKE_CURRENT_SOURCE_DIR}/src/liveness_check.cpp
    ${CMAKE_CURRENT_SOURCE_DIR}/src/anurupyena_quant.cpp
    ${CMAKE_CURRENT_SOURCE_DIR}/src/nikhilam_distance.cpp
    ${CMAKE_CURRENT_SOURCE_DIR}/src/urdhva_multiplication.cpp
)

# Set include lookup targets
target_include_directories(${CMAKE_PROJECT_NAME} PRIVATE 
    ${OpenCV_INCLUDE_DIRS} 
    ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Link OpenCV static components and system logs directly into appmodules
target_link_libraries(${CMAKE_PROJECT_NAME}
    ${OpenCV_LIBS}
    log
)
