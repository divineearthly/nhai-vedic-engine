#ifndef URDHVA_MULTIPLICATION_H
#define URDHVA_MULTIPLICATION_H

#include <cstdint>
#include <vector>

namespace DivineEarthly {
    namespace SovereignIntelligence {
        uint16_t urdhva_multiply_8bit(uint8_t a, uint8_t b);
        void fast_convolution_1d(const std::vector<uint8_t>& input, const std::vector<uint8_t>& weights, std::vector<uint16_t>& output);
    }
}
#endif
