#ifndef NIKHILAM_DISTANCE_H
#define NIKHILAM_DISTANCE_H

#include <cstdint>
#include <vector>

namespace DivineEarthly {
    namespace SovereignIntelligence {
        uint32_t nikhilam_hamming_distance(const std::vector<uint8_t>& embedding_a, const std::vector<uint8_t>& embedding_b);
    }
}
#endif
