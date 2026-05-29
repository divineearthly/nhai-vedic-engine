#include <iostream>
#include <vector>
#include <opencv2/opencv.hpp>
#include "face_vision.h"
#include "liveness_check.h"
#include "urdhva_multiplication.h"
#include "nikhilam_distance.h"

using namespace DivineEarthly::SovereignIntelligence;

int main() {
    std::cout << "\n=============================================" << std::endl;
    std::cout << "  NHAI Offline Face Engine - Security Test" << std::endl;
    std::cout << "  Powered by Divine Earthly Sovereign AI" << std::endl;
    std::cout << "=============================================\n" << std::endl;

    // Simulate scanning two consecutive camera frames (Time 1 and Time 2)
    cv::Mat camera_frame_1 = cv::Mat::zeros(480, 640, CV_8UC3);
    cv::Mat camera_frame_2 = cv::Mat::zeros(480, 640, CV_8UC3);
    
    // Inject random pixels to simulate a face
    cv::randu(camera_frame_1, cv::Scalar(0, 0, 0), cv::Scalar(200, 200, 200));
    
    // Copy Frame 1 to Frame 2, but add a slight modification to simulate a blink/movement
    camera_frame_1.copyTo(camera_frame_2);
    cv::rectangle(camera_frame_2, cv::Point(300, 200), cv::Point(340, 220), cv::Scalar(0, 0, 0), cv::FILLED); 

    std::vector<uint8_t> buffer_t1, buffer_t2;
    extract_face_buffer(camera_frame_1, buffer_t1);
    extract_face_buffer(camera_frame_2, buffer_t2);

    // Run Liveness Check
    std::cout << "\n--- Initiating Anti-Spoofing Protocols ---" << std::endl;
    bool is_alive = dharana_liveness_check(buffer_t1, buffer_t2, 500);

    if (!is_alive) {
        std::cerr << "ACCESS DENIED: Liveness verification failed." << std::endl;
        return -1;
    }

    std::cout << "\n[System Status] Authentication Pipeline Complete." << std::endl;
    std::cout << "=============================================\n" << std::endl;
    return 0;
}
