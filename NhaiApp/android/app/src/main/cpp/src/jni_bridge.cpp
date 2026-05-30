#include <jni.h>
#include <string>
#include <vector>
#include <opencv2/opencv.hpp>

// Linking your Sovereign AI mathematical headers
#include "face_vision.h"
#include "nikhilam_distance.h"
#include "liveness_check.h"

using namespace DivineEarthly::SovereignIntelligence;

extern "C" JNIEXPORT jstring JNICALL
Java_com_nhaiapp_VedicEngineModule_getSystemStatus(JNIEnv* env, jobject /* this */) {
    std::string status = "Divine Earthly Sovereign AI: Haar Vision Active.";
    return env->NewStringUTF(status.c_str());
}

extern "C" JNIEXPORT jstring JNICALL
Java_com_nhaiapp_VedicEngineModule_authenticateFaceNative(JNIEnv* env, jobject /* this */, jstring frame1, jstring frame2, jstring cascadePath) {
    
    const char *path1 = env->GetStringUTFChars(frame1, nullptr);
    const char *cascade_path = env->GetStringUTFChars(cascadePath, nullptr);
    
    cv::Mat img = cv::imread(path1, cv::IMREAD_COLOR);
    std::string response;
    
    if (img.empty()) {
        response = "{\"status\": \"error\", \"error\": \"OpenCV failed to read the image file.\"}";
    } else {
        // Convert the image to Grayscale (Required for Haar Cascade)
        cv::Mat gray;
        cv::cvtColor(img, gray, cv::COLOR_BGR2GRAY);
        
        // Load the AI Model
        cv::CascadeClassifier face_cascade;
        if (!face_cascade.load(cascade_path)) {
            response = "{\"status\": \"error\", \"error\": \"Failed to load Haar Cascade XML.\"}";
        } else {
            std::vector<cv::Rect> faces;
            // Scan the image for human faces
            face_cascade.detectMultiScale(gray, faces, 1.1, 4);
            
            if (faces.empty()) {
                response = "{\"status\": \"error\", \"error\": \"No face detected in the frame.\"}";
            } else {
                // Face found! Grab the coordinates
                cv::Rect face_box = faces[0];
                response = "{\"status\": \"success\", \"face_x\": " + std::to_string(face_box.x) + ", \"face_y\": " + std::to_string(face_box.y) + "}";
            }
        }
    }

    env->ReleaseStringUTFChars(frame1, path1);
    env->ReleaseStringUTFChars(cascadePath, cascade_path);
    return env->NewStringUTF(response.c_str());
}
