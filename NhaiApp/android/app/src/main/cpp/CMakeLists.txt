cmake_minimum_required(VERSION 3.13)
project(appmodules)

# Instruct the build where our bundled OpenCV config rests
set(OpenCV_DIR "${CMAKE_CURRENT_SOURCE_DIR}/opencv/sdk/native/jni")
find_package(OpenCV REQUIRED)

include(${REACT_ANDROID_DIR}/cmake-utils/ReactNative-application.cmake)

# Inject your custom C++ Vedic kernels directly into the core appmodules target
target_sources(${CMAKE_PROJECT_NAME} PRIVATE
    ${CMAKE_CURRENT_SOURCE_DIR}/src/jni_bridge.cpp
    ${CMAKE_CURRENT_SOURCE_DIR}/src/face_vision.cpp
    ${CMAKE_CURRENT_SOURCE_DIR}/src/liveness_check.cpp
    ${CMAKE_CURRENT_SOURCE_DIR}/src/anurupyena_quant.cpp
    ${CMAKE_CURRENT_SOURCE_DIR}/src/nikhilam_distance.cpp
    ${CMAKE_CURRENT_SOURCE_DIR}/src/urdhva_multiplication.cpp
)

# Tell appmodules where your header includes are located
target_include_directories(${CMAKE_PROJECT_NAME} PRIVATE 
    ${OpenCV_INCLUDE_DIRS} 
    ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Link OpenCV and logging directly into appmodules
target_link_libraries(${CMAKE_PROJECT_NAME} ${OpenCV_LIBS} log)
