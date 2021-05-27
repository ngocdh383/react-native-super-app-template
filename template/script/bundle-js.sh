# Default config
BUNDLE_ZIP_NAME=NoName_Module.zip

# Read build.config file
source "./build.config"

# Print Logo
echo ""
echo ""
echo "██████╗ ██╗   ██╗███╗   ██╗██████╗ ██╗     ███████╗         ██╗███████╗"
echo "██╔══██╗██║   ██║████╗  ██║██╔══██╗██║     ██╔════╝         ██║██╔════╝"
echo "██████╔╝██║   ██║██╔██╗ ██║██║  ██║██║     █████╗           ██║███████╗"
echo "██╔══██╗██║   ██║██║╚██╗██║██║  ██║██║     ██╔══╝      ██   ██║╚════██║"
echo "██████╔╝╚██████╔╝██║ ╚████║██████╔╝███████╗███████╗    ╚█████╔╝███████║"
echo "╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚═════╝ ╚══════╝╚══════╝     ╚════╝ ╚══════╝"
echo ""
echo ""

# Remove old build folder
rm -rf build
# Create new build folder
mkdir ./build
mkdir ./build/android
mkdir ./build/ios
mkdir ./build/zip
mkdir ./build/zip/android
mkdir ./build/zip/android/CodePush
mkdir ./build/zip/ios/
mkdir ./build/zip/ios/CodePush

# Bundle JS code for Android
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output build/android/main.jsbundle --assets-dest build/android

# Bundle JS code for IOS
npx react-native bundle --platform ios --dev false --entry-file index.js --bundle-output build/ios/main.jsbundle --assets-dest build/ios

# Copy JS bundle to CodePush folder
cp -R ./build/android/ ./build/zip/android/CodePush
cp -R ./build/ios/ ./build/zip/ios/CodePush

# zip Android bundle
cd ./build/zip/android
zip -qr $BUNDLE_ZIP_NAME ./CodePush

# Remove Android CodePush folder
rm -rf CodePush

# zip IOS bundle
cd ../ios
zip -qr $BUNDLE_ZIP_NAME ./CodePush

# Remove Android CodePush folder
rm -rf CodePush

echo ""
echo "        ********************************************"
echo "        *     🍻🍻🍻 Build JS bundle DONE 🍻🍻🍻   *"
echo "        ********************************************"
echo ""

if [[ "$OSTYPE" != "darwin"* ]]; then
  echo "Press any key to exit!"
  read
fi
