#ifndef ANURUPYENA_QUANT_H
#define ANURUPYENA_QUANT_H

#include <vector>
#include <cstdint>

namespace DivineEarthly {
    namespace SovereignIntelligence {
        // Sutra 21: Anurupyena (Proportionately) - 4-bit Edge Quantization
        void quantize_weights_int4(const std::vector<float>& input_weights, std::vector<uint8_t>& output_quantized);
    }
}

#endif
