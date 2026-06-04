cmake_minimum_required(VERSION 3.13)
project(appmodules)

set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -O3 -Os -fvisibility=hidden")
set(CMAKE_SHARED_LINKER_FLAGS "${CMAKE_SHARED_LINKER_FLAGS} -Wl,--strip-all")

set(OPENCV_DIR "${CMAKE_CURRENT_SOURCE_DIR}/opencv/sdk/native")

include_directories(${OPENCV_DIR}/jni/include)

file(GLOB OPENCV_STATIC_LIBS
    "${OPENCV_DIR}/staticlibs/arm64-v8a/libopencv_core.a"
    "${OPENCV_DIR}/staticlibs/arm64-v8a/libopencv_imgproc.a"
    "${OPENCV_DIR}/staticlibs/arm64-v8a/libopencv_objdetect.a"
    "${OPENCV_DIR}/staticlibs/arm64-v8a/libopencv_imgcodecs.a"
    "${OPENCV_DIR}/3rdparty/libs/arm64-v8a/*.a"
)

include(${REACT_ANDROID_DIR}/cmake-utils/ReactNative-application.cmake)

target_sources(${CMAKE_PROJECT_NAME} PRIVATE
    ${CMAKE_CURRENT_SOURCE_DIR}/src/jni_bridge.cpp
    ${CMAKE_CURRENT_SOURCE_DIR}/src/face_vision.cpp
    ${CMAKE_CURRENT_SOURCE_DIR}/src/liveness_check.cpp
    ${CMAKE_CURRENT_SOURCE_DIR}/src/anurupyena_quant.cpp
    ${CMAKE_CURRENT_SOURCE_DIR}/src/nikhilam_distance.cpp
    ${CMAKE_CURRENT_SOURCE_DIR}/src/urdhva_multiplication.cpp
)

target_include_directories(${CMAKE_PROJECT_NAME} PRIVATE
    ${OPENCV_DIR}/jni/include
    ${CMAKE_CURRENT_SOURCE_DIR}/include
)

target_link_libraries(${CMAKE_PROJECT_NAME}
    ${OPENCV_STATIC_LIBS}
    log
    z
    dl
    m
)
