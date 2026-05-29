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
    private native String authenticateFaceNative(byte[] frame1, byte[] frame2);

    @ReactMethod
    public void checkStatus(Promise promise) {
        try { promise.resolve(getSystemStatus()); } 
        catch (Exception e) { promise.reject("ERR_STATUS", e); }
    }

    @ReactMethod
    public void authenticateFace(String frame1, String frame2, Promise promise) {
        try {
            // Passing mock data for now. In production, decode base64 frames here.
            byte[] dummy = new byte[100];
            promise.resolve(authenticateFaceNative(dummy, dummy));
        } catch (Exception e) { promise.reject("ERR_AUTH", e); }
    }
}
