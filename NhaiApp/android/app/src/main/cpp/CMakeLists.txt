cmake_minimum_required(VERSION 3.10.2)
project(vedic_jni_bridge)

# Stable Dynamic OpenCV Linking
find_package(OpenCV REQUIRED)

# Automatically grab all C++ files in the src directory to prevent missing file errors
file(GLOB SRC_FILES "src/*.cpp")

add_library(vedic_jni_bridge SHARED ${SRC_FILES})

target_include_directories(vedic_jni_bridge PRIVATE ${OpenCV_INCLUDE_DIRS})
target_link_libraries(vedic_jni_bridge ${OpenCV_LIBS} log)

# Extreme size optimization (-Os) without the flags that break Clang
set(CMAKE_CXX_FLAGS_RELEASE "-O3 -Os")
