const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '..');
const monorepoNodeModules = path.resolve(monorepoRoot, 'node_modules');

const config = getDefaultConfig(projectRoot);

// Watch only the parent package src — not its node_modules
config.watchFolders = [monorepoRoot];

// Block the root node_modules so Metro only resolves from the example's node_modules
const escapedPath = monorepoNodeModules.replace(/[/\\]/g, '[/\\\\]');
config.resolver.blockList = new RegExp(`^${escapedPath}\\/.*$`);

config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
];

// Resolve the widget's "react-native" field (src/) instead of "main" (lib/)
config.resolver.resolverMainFields = ['react-native', 'browser', 'main'];

module.exports = config;
