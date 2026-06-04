#ifndef FACE_VISION_H
#define FACE_VISION_H

#include <opencv2/opencv.hpp>
#include <vector>
#include <cstdint>

namespace DivineEarthly {
    namespace SovereignIntelligence {
        // Module to extract face pixels and convert them for Vedic processing
        bool extract_face_buffer(const cv::Mat& input_frame, std::vector<uint8_t>& output_buffer);
    }
}
#endif
