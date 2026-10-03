const { getDefaultConfig } = require("expo/metro-config");
const { withUniwindConfig } = require("uniwind/metro"); // make sure this import exists

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// expo-sqlite on web needs wasm assets and SharedArrayBuffer (COEP + COOP headers)
config.resolver.assetExts.push("wasm");
config.server.enhanceMiddleware = (middleware) => (req, res, next) => {
  res.setHeader("Cross-Origin-Embedder-Policy", "credentialless");
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  middleware(req, res, next);
};

// Apply uniwind modifications before exporting
const uniwindConfig = withUniwindConfig(config, {
  // relative path to your global.css file
  cssEntryFile: "./src/global.css",
  // optional: path to typings
  dtsFile: "./src/uniwind-types.d.ts",
});

// uniwind swaps react-native-web's InputAccessoryView for a web build it doesn't ship, so keep RNW's own
const uniwindResolveRequest = uniwindConfig.resolver.resolveRequest;
uniwindConfig.resolver.resolveRequest = (context, moduleName, platform) => {
  if (platform === "web" && moduleName === "./exports/InputAccessoryView") {
    return context.resolveRequest(context, moduleName, platform);
  }
  return uniwindResolveRequest(context, moduleName, platform);
};

module.exports = uniwindConfig;
