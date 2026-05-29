#include "urdhva_multiplication.h"
#include <iostream>

namespace DivineEarthly {
    namespace SovereignIntelligence {
        uint16_t urdhva_multiply_8bit(uint8_t a, uint8_t b) {
            uint8_t a_high = a >> 4; uint8_t a_low = a & 0x0F;
            uint8_t b_high = b >> 4; uint8_t b_low = b & 0x0F;
            uint16_t vertical_low = a_low * b_low;
            uint16_t crosswise = (a_high * b_low) + (a_low * b_high);
            uint16_t vertical_high = a_high * b_high;
            return vertical_low + (crosswise << 4) + (vertical_high << 8);
        }

        void fast_convolution_1d(const std::vector<uint8_t>& input, const std::vector<uint8_t>& weights, std::vector<uint16_t>& output) {
            std::cout << "[Vedic Kernel] Executing Urdhva Tiryakbhyam Fast Convolution..." << std::endl;
            output.clear();
            for (size_t i = 0; i < input.size() && i < weights.size(); ++i) {
                output.push_back(urdhva_multiply_8bit(input[i], weights[i]));
            }
        }
    }
}
