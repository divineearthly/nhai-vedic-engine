#include "nikhilam_distance.h"
#include <iostream>

namespace DivineEarthly {
    namespace SovereignIntelligence {
        uint32_t nikhilam_hamming_distance(const std::vector<uint8_t>& embedding_a, const std::vector<uint8_t>& embedding_b) {
            std::cout << "[Vedic Kernel] Executing Nikhilam Navatashcaramam Dashatah Distance Calculation..." << std::endl;
            uint32_t distance = 0;
            size_t min_size = std::min(embedding_a.size(), embedding_b.size());
            for (size_t i = 0; i < min_size; ++i) {
                uint8_t diff = embedding_a[i] ^ embedding_b[i];
                distance += __builtin_popcount(diff); 
            }
            return distance;
        }
    }
}
