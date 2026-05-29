#include "liveness_check.h"
#include <iostream>
#include <cmath>

namespace DivineEarthly {
    namespace SovereignIntelligence {
        bool dharana_liveness_check(const std::vector<uint8_t>& frame_t1, const std::vector<uint8_t>& frame_t2, uint32_t threshold) {
            std::cout << "[Vedic Kernel] Executing Dharana Liveness Check (Temporal Variance)..." << std::endl;
            
            if (frame_t1.size() != frame_t2.size() || frame_t1.empty()) {
                std::cerr << "[Security Alert] Frame mismatch. Liveness check failed." << std::endl;
                return false;
            }

            uint64_t total_variance = 0;
            // Calculate absolute structural differences between the two frames
            for (size_t i = 0; i < frame_t1.size(); ++i) {
                total_variance += std::abs(frame_t1[i] - frame_t2[i]);
            }

            std::cout << "[Security Logic] Micro-movement variance detected: " << total_variance << std::endl;

            // If variance is too low (static photo) or too high (completely different person/scene), fail it.
            if (total_variance > threshold && total_variance < (threshold * 100)) {
                std::cout << "[Result] Liveness CONFIRMED. Active human detected." << std::endl;
                return true;
            } else {
                std::cout << "[Result] SPOOF DETECTED. Static image or anomaly." << std::endl;
                return false;
            }
        }
    }
}
