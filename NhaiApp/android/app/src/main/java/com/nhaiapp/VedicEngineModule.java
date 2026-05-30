package com.nhaiapp;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import java.io.File;
import java.io.InputStream;
import java.io.FileOutputStream;

public class VedicEngineModule extends ReactContextBaseJavaModule {
    static { System.loadLibrary("vedic_jni_bridge"); }
    VedicEngineModule(ReactApplicationContext context) { super(context); }

    @Override
    public String getName() { return "VedicEngine"; }

    private native String getSystemStatus();
    private native String authenticateFaceNative(String frame1, String frame2, String cascadePath);

    // Extracts the XML model from the APK and saves it to the local phone cache for C++ to read
    private String getCascadePath() {
        File cascadeFile = new File(getReactApplicationContext().getCacheDir(), "haarcascade_frontalface_default.xml");
        if (!cascadeFile.exists()) {
            try (InputStream in = getReactApplicationContext().getAssets().open("haarcascade_frontalface_default.xml");
                 FileOutputStream out = new FileOutputStream(cascadeFile)) {
                byte[] buffer = new byte[1024];
                int read;
                while ((read = in.read(buffer)) != -1) { out.write(buffer, 0, read); }
            } catch (Exception e) { return ""; }
        }
        return cascadeFile.getAbsolutePath();
    }

    @ReactMethod
    public void checkStatus(Promise promise) {
        try { promise.resolve(getSystemStatus()); }
        catch (Exception e) { promise.reject("ERR_STATUS", e); }
    }

    @ReactMethod
    public void authenticateFace(String frame1, String frame2, Promise promise) {
        try {
            String cascadePath = getCascadePath();
            promise.resolve(authenticateFaceNative(frame1, frame2, cascadePath));
        } catch (Exception e) { promise.reject("ERR_AUTH", e); }
    }
}
