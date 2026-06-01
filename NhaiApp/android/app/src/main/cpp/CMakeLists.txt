cmake_minimum_required(VERSION 3.13)
project(appmodules)

# Shield the compiler from OpenCV legacy enum conversion warnings
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -Wno-deprecated-anon-enum-enum-conversion -Wno-error=deprecated-anon-enum-enum-conversion")

# Target pre-built static libraries directly to prevent full SDK bloat
set(OPENCV_STATIC_DIR "${CMAKE_CURRENT_SOURCE_DIR}/opencv/sdk/native/staticlibs/arm64-v8a")
set(OPENCV_INCLUDE_DIR "${CMAKE_CURRENT_SOURCE_DIR}/opencv/sdk/native/jni/include")

include(${REACT_ANDROID_DIR}/cmake-utils/ReactNative-application.cmake)

# Declare required explicit static targets
add_library(opencv_objdetect STATIC IMPORTED)
set_target_properties(opencv_objdetect PROPERTIES IMPORTED_LOCATION "${OPENCV_STATIC_DIR}/libopencv_objdetect.a")

add_library(opencv_imgproc STATIC IMPORTED)
set_target_properties(opencv_imgproc PROPERTIES IMPORTED_LOCATION "${OPENCV_STATIC_DIR}/libopencv_imgproc.a")

add_library(opencv_core STATIC IMPORTED)
set_target_properties(opencv_core PROPERTIES IMPORTED_LOCATION "${OPENCV_STATIC_DIR}/libopencv_core.a")

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
    ${OPENCV_INCLUDE_DIR}
    ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Link only specific static layers alongside core logging pipelines
target_link_libraries(${CMAKE_PROJECT_NAME}
    opencv_objdetect
    opencv_imgproc
    opencv_core
    log
)

# Inject size-optimization compilation parameters
set(CMAKE_CXX_FLAGS_RELEASE "-O3 -Os -s")
