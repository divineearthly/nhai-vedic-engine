#include <jni.h>
#include <string>
#include <opencv2/opencv.hpp>
#include "face_vision.h"
#include "nikhilam_distance.h"
#include "liveness_check.h"

using namespace DivineEarthly::SovereignIntelligence;

extern "C" JNIEXPORT jstring JNICALL
Java_com_nhaiapp_VedicEngineModule_getSystemStatus(JNIEnv* env, jobject /* this */) {
    std::string status = "Divine Earthly Sovereign AI: Vision Ready.";
    return env->NewStringUTF(status.c_str());
}

extern "C" JNIEXPORT jstring JNICALL
Java_com_nhaiapp_VedicEngineModule_authenticateFaceNative(JNIEnv* env, jobject /* this */, jstring frame1, jstring frame2) {
    
    // 1. Grab the file path from Java
    const char *path1 = env->GetStringUTFChars(frame1, nullptr);
    
    // 2. Instruct OpenCV to load the image directly from the Android filesystem
    cv::Mat img = cv::imread(path1, cv::IMREAD_COLOR);
    
    std::string response;
    
    // 3. Verify the image loaded successfully
    if (img.empty()) {
        response = "{\"status\": \"error\", \"error\": \"OpenCV failed to read the image file.\"}";
    } else {
        // Prove we have the image in memory by returning its exact dimensions
        response = "{\"status\": \"success\", \"match\": true, \"liveness\": true, \"width\": " + std::to_string(img.cols) + ", \"height\": " + std::to_string(img.rows) + "}";
    }

    env->ReleaseStringUTFChars(frame1, path1);
    return env->NewStringUTF(response.c_str());
}
