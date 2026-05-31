#include <vector>
#include <cstdint>

// Quantizes 8-bit to 4-bit nibbles (The "Vedic" INT4 Compression)
std::vector<uint8_t> pack_to_int4(const std::vector<uint8_t>& data) {
    std::vector<uint8_t> packed;
    for (size_t i = 0; i < data.size(); i += 2) {
        uint8_t nibble1 = (data[i] >> 4) & 0x0F;
        uint8_t nibble2 = (data[i+1] >> 4) & 0x0F;
        packed.push_back((nibble1 << 4) | nibble2);
    }
    return packed;
}
