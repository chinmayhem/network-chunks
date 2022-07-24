const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      console.log(webpackConfig);
      const htmlWebpackPluginInstance = webpackConfig.plugins.find(
        webpackPlugin => webpackPlugin instanceof HtmlWebpackPlugin
      );
      if (htmlWebpackPluginInstance) {
        htmlWebpackPluginInstance.options.excludeChunks = ['content', 'background'];
      }
      
      return {
        ...webpackConfig,
        entry: {
          main: [
            env === 'development' &&
              require.resolve('react-dev-utils/webpackHotDevClient'),
            paths.appIndexJs,
          ].filter(Boolean),
          content: './src/chrome/content.ts',
          background: './src/chrome/background.ts',
        },
        output: {
          ...webpackConfig.output,
          filename: 'static/js/[name].js',
        },
        optimization: {
          ...webpackConfig.optimization,
          minimize: false,
          runtimeChunk: false,
        }
      };
    },
  },
};
