package com.nhaiapp;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

public class VedicEngineModule extends ReactContextBaseJavaModule {
    static { System.loadLibrary("vedic_jni_bridge"); }
    VedicEngineModule(ReactApplicationContext context) { super(context); }

    @Override
    public String getName() { return "VedicEngine"; }

    private native String getSystemStatus();
    // CHANGED: Now expects native Strings instead of byte arrays
    private native String authenticateFaceNative(String frame1, String frame2);

    @ReactMethod
    public void checkStatus(Promise promise) {
        try { promise.resolve(getSystemStatus()); }
        catch (Exception e) { promise.reject("ERR_STATUS", e); }
    }

    @ReactMethod
    public void authenticateFace(String frame1, String frame2, Promise promise) {
        try {
            // Passing the raw camera frame strings directly to the C++ hardware layer
            promise.resolve(authenticateFaceNative(frame1, frame2));
        } catch (Exception e) { promise.reject("ERR_AUTH", e); }
    }
}
