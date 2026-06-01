#!/data/data/com.termux/files/usr/bin/bash

echo "[1/7] Cleaning React Native cache..."
rm -rf node_modules/.cache
rm -rf android/app/build
rm -rf android/build

echo "[2/7] Enable Proguard..."
cat > android/app/proguard-rules.pro << 'PRO'
-keep class com.facebook.react.** { *; }
-keep class com.facebook.hermes.** { *; }
-dontwarn com.facebook.react.**
PRO

echo "[3/7] Enable R8 shrinking..."
sed -i 's/minifyEnabled false/minifyEnabled true/g' android/app/build.gradle
sed -i 's/shrinkResources false/shrinkResources true/g' android/app/build.gradle

echo "[4/7] Strip native binaries..."
find android/app/src/main/jniLibs -name "*.so" -exec strip {} \;

echo "[5/7] Remove unused ABIs..."
echo "ndk { abiFilters 'arm64-v8a' }"

echo "[6/7] Build release..."
cd android
./gradlew assembleRelease

echo "[7/7] Done."
