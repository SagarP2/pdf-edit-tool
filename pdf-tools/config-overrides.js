const path = require('path');
const webpack = require('webpack');

module.exports = function override(config, env) {
  // Add resolve fallbacks for node modules
  config.resolve.fallback = {
    ...config.resolve.fallback,
    "path": require.resolve("path-browserify"),
    "stream": require.resolve("stream-browserify"),
    "zlib": require.resolve("browserify-zlib"),
    "util": require.resolve("util/"),
    "http": require.resolve("stream-http"),
    "https": require.resolve("https-browserify"),
    "url": require.resolve("url/"),
    "buffer": require.resolve("buffer/"),
  };

  // Add buffer polyfill
  config.plugins.push(
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
  );

  // Add process polyfill
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  );
  
  // Add environment variables
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    })
  );

  // Critical fix: Use webpack aliases to replace problematic imports
  config.resolve.alias = {
    ...config.resolve.alias,
    // Replace the PDF.js worker with our custom mock implementation
    'pdfjs-dist/build/pdf.worker.entry': path.resolve(__dirname, 'src/pdfJSWorker.js'),
  };

  // Define empty modules for WASM files
  config.plugins.push(
    new webpack.NormalModuleReplacementPlugin(
      /[/\\]node_modules[/\\]pdfjs-dist[/\\].*\.wasm$/,
      path.resolve(__dirname, 'src/emptyModule.js')
    )
  );

  return config;
}; 