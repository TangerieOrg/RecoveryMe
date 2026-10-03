// Extends app.json. CI passes the tag version and its run number so each APK installs over the previous one.
module.exports = ({ config }) => ({
    ...config,
    version: process.env.APP_VERSION ?? config.version,
    android: {
        ...config.android,
        versionCode: Number(process.env.ANDROID_VERSION_CODE ?? 1)
    }
});
