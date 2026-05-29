package com.divineearthly.nhai;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

public class VedicEngineModule extends ReactContextBaseJavaModule {
    
    // Load the C++ Engine built by CMake
    static {
        System.loadLibrary("vedic_jni_bridge"); 
    }

    VedicEngineModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "VedicEngine";
    }

    // Bindings to the C++ functions we wrote earlier
    private native String getSystemStatus();
    private native String authenticateFaceNative(byte[] frame1, byte[] frame2);

    @ReactMethod
    public void checkStatus(Promise promise) {
        try {
            String status = getSystemStatus();
            promise.resolve(status);
        } catch (Exception e) {
            promise.reject("ERR_NATIVE_STATUS", e);
        }
    }

    @ReactMethod
    public void authenticateFace(String base64Frame1, String base64Frame2, Promise promise) {
        try {
            // In production, we'd decode base64 to byte[] here before passing to C++
            byte[] dummyFrame1 = new byte[100];
            byte[] dummyFrame2 = new byte[100];
            
            String resultJson = authenticateFaceNative(dummyFrame1, dummyFrame2);
            promise.resolve(resultJson);
        } catch (Exception e) {
            promise.reject("ERR_NATIVE_AUTH", e);
        }
    }
}
