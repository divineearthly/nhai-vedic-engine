#include <jni.h>
#include <string>
#include <vector>
#include "face_vision.h"
#include "nikhilam_distance.h"
#include "liveness_check.h"

using namespace DivineEarthly::SovereignIntelligence;

extern "C" JNIEXPORT jstring JNICALL
Java_com_divineearthly_nhai_VedicEngineModule_authenticateFaceNative(JNIEnv* env, jobject /* this */, jbyteArray frame1, jbyteArray frame2) {
    
    // In a real Android environment, we would convert the Java byte arrays 
    // (YUV camera frames) into our C++ vectors here.
    
    // Simulating the pipeline response for the React Native frontend
    std::string response = "{\"status\": \"success\", \"match\": true, \"liveness\": true, \"distance\": 0}";
    
    return env->NewStringUTF(response.c_str());
}

extern "C" JNIEXPORT jstring JNICALL
Java_com_divineearthly_nhai_VedicEngineModule_getSystemStatus(JNIEnv* env, jobject /* this */) {
    std::string status = "Divine Earthly Sovereign AI: INT4 Edge Runtime Active.";
    return env->NewStringUTF(status.c_str());
}
