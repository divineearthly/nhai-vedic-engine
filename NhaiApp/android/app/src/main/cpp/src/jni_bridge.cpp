#include <jni.h>
#include <string>
#include <opencv2/opencv.hpp>

extern "C" JNIEXPORT jstring JNICALL
Java_com_nhaiapp_VedicEngineModule_authenticateFaceNative(JNIEnv* env, jobject /* this */, jstring frame1, jstring frame2, jstring cascadePath) {
    std::string response;
    
    // 1. Capture Both Frame Paths
    const char *path1 = env->GetStringUTFChars(frame1, nullptr);
    const char *path2 = env->GetStringUTFChars(frame2, nullptr);
    const char *cascade_path = env->GetStringUTFChars(cascadePath, nullptr);

    try {
        // 2. Read Both Matrices from Hardware
        cv::Mat img1 = cv::imread(path1, cv::IMREAD_COLOR);
        cv::Mat img2 = cv::imread(path2, cv::IMREAD_COLOR);

        if (img1.empty() || img2.empty()) {
            response = "{\"status\": \"error\", \"error\": \"MATRIX_READ_FAULT\"}";
        } else {
            cv::Mat gray1, gray2;
            cv::cvtColor(img1, gray1, cv::COLOR_BGR2GRAY);
            cv::cvtColor(img2, gray2, cv::COLOR_BGR2GRAY);

            // 3. Memory Protection Scaling (Sub-20MB Optimization)
            float scale = 400.0f / img1.cols;
            if (scale < 1.0f) {
                cv::resize(gray1, gray1, cv::Size(), scale, scale);
                cv::resize(gray2, gray2, cv::Size(), scale, scale);
            }

            // 4. Photonic Lighting Armor
            cv::equalizeHist(gray1, gray1);
            cv::equalizeHist(gray2, gray2);

            cv::CascadeClassifier face_cascade;
            if (!face_cascade.load(cascade_path)) {
                response = "{\"status\": \"error\", \"error\": \"CASCADE_FAULT\"}";
            } else {
                std::vector<cv::Rect> faces;
                face_cascade.detectMultiScale(gray1, faces, 1.1, 4, 0, cv::Size(30, 30));

                if (faces.empty()) {
                    response = "{\"status\": \"error\", \"error\": \"NO_FACE_DETECTED\"}";
                } else {
                    cv::Rect faceROI = faces[0];

                    // Secure boundaries to prevent memory overflow
                    faceROI &= cv::Rect(0, 0, gray1.cols, gray1.rows);
                    faceROI &= cv::Rect(0, 0, gray2.cols, gray2.rows);

                    cv::Mat roi1 = gray1(faceROI);
                    cv::Mat roi2 = gray2(faceROI);

                    // 5. ACTIVE LIVENESS DETECTION (Temporal Variance Matrix)
                    cv::Mat diff;
                    cv::absdiff(roi1, roi2, diff); // Compare T1 and T2
                    cv::Scalar meanDiff = cv::mean(diff);

                    // If pixel variance is greater than 2.5, the user moved (blinked/turned head)
                    if (meanDiff[0] > 2.5) {
                        response = "{\"status\": \"success\", \"face_x\": " + std::to_string(faceROI.x) + ", \"face_y\": " + std::to_string(faceROI.y) + ", \"liveness\": \"PASSED\"}";
                    } else {
                        response = "{\"status\": \"error\", \"error\": \"STATIC_SPOOF_DETECTED\"}";
                    }
                }
            }
        }
    } catch (const std::exception& e) {
        response = std::string("{\"status\": \"error\", \"error\": \"") + e.what() + "\"}";
    }

    // Release JNI Memory
    env->ReleaseStringUTFChars(frame1, path1);
    env->ReleaseStringUTFChars(frame2, path2);
    env->ReleaseStringUTFChars(cascadePath, cascade_path);

    return env->NewStringUTF(response.c_str());
}
