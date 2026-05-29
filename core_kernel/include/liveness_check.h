#ifndef LIVENESS_CHECK_H
#define LIVENESS_CHECK_H

#include <vector>
#include <cstdint>

namespace DivineEarthly {
    namespace SovereignIntelligence {
        // Sutra 10: Dharana (Focused Attention) 
        // Compares temporal frames to detect micro-movements (blinks/head shifts)
        bool dharana_liveness_check(const std::vector<uint8_t>& frame_t1, const std::vector<uint8_t>& frame_t2, uint32_t threshold);
    }
}
#endif
