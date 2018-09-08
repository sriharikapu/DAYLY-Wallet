# change build # for sentry
echo "Setting BUILD_ID for android $APPCENTER_BUILD_ID"
sed -i -e "s/versionCode 1/versionCode $APPCENTER_BUILD_ID/g" android/app/build.gradle 
