cmake_minimum_required(VERSION 3.10.2)
project(vedic_jni_bridge)

# Stable Dynamic OpenCV Linking
find_package(OpenCV REQUIRED)

# Explicit, Absolute Paths for Ninja
add_library(vedic_jni_bridge SHARED
    ${CMAKE_CURRENT_SOURCE_DIR}/src/jni_bridge.cpp
    ${CMAKE_CURRENT_SOURCE_DIR}/src/face_vision.cpp
    ${CMAKE_CURRENT_SOURCE_DIR}/src/liveness_check.cpp
    ${CMAKE_CURRENT_SOURCE_DIR}/src/anurupyena_quant.cpp
    ${CMAKE_CURRENT_SOURCE_DIR}/src/nikhilam_distance.cpp
    ${CMAKE_CURRENT_SOURCE_DIR}/src/urdhva_multiplication.cpp
)

# Explicitly link OpenCV and Android Logging
target_include_directories(vedic_jni_bridge PRIVATE ${OpenCV_INCLUDE_DIRS} ${CMAKE_CURRENT_SOURCE_DIR}/include)
target_link_libraries(vedic_jni_bridge ${OpenCV_LIBS} log)

# Extreme size optimization (-Os)
set(CMAKE_CXX_FLAGS_RELEASE "-O3 -Os")
