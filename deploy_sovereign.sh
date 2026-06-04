#!/bin/bash
echo "🛡️ Sovereign Vision Engine - Deployment"
echo "========================================"

cd ~/nhai-vedic-engine/NhaiApp

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create Android assets directory for models
mkdir -p android/app/src/main/assets

# Build APK
echo "🔨 Building APK..."
cd android
./gradlew assembleDebug

if [ $? -eq 0 ]; then
    APK_PATH="app/build/outputs/apk/debug/app-debug.apk"
    echo ""
    echo "✅ APK built successfully!"
    echo "📱 APK Location: $APK_PATH"
    echo ""
    echo "To install on device:"
    echo "  adb install $APK_PATH"
    echo ""
    echo "🕉️ सत्यमेव जयते"
else
    echo "❌ Build failed"
fi
