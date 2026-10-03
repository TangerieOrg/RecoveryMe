const { withAppBuildGradle } = require("expo/config-plugins");

// Signs release builds with the keystore passed in as Gradle properties (see .github/workflows/android.yml).
// Without them release falls back to the debug key, so local release builds still work.
const RELEASE_SIGNING = `
        release {
            if (findProperty("nappStoreFile")) {
                storeFile file(findProperty("nappStoreFile"))
                storePassword findProperty("nappStorePassword")
                keyAlias findProperty("nappKeyAlias")
                keyPassword findProperty("nappKeyPassword")
            }
        }`;

const RELEASE_BUILD_TYPE = /(release \{[^}]*?)signingConfig signingConfigs\.debug/;

module.exports = config => withAppBuildGradle(config, cfg => {
    const gradle = cfg.modResults.contents;
    if(gradle.includes("nappStoreFile")) return cfg;

    const buildTypes = gradle.indexOf("buildTypes {");
    if(buildTypes === -1 || !gradle.includes("signingConfigs {")) throw new Error("Unexpected build.gradle");
    if(!RELEASE_BUILD_TYPE.test(gradle.slice(buildTypes))) throw new Error("Unexpected build.gradle");

    cfg.modResults.contents = (gradle.slice(0, buildTypes) + gradle.slice(buildTypes).replace(
        RELEASE_BUILD_TYPE,
        "$1signingConfig findProperty(\"nappStoreFile\") ? signingConfigs.release : signingConfigs.debug"
    )).replace("signingConfigs {", `signingConfigs {${RELEASE_SIGNING}`);
    return cfg;
});
