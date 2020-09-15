const path = require('path');

const htmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

const buildPath = path.resolve(__dirname, 'dist');

module.exports = {
  outputDir: path.resolve(buildPath, 'ui'),
  chainWebpack: (config) => {
    config
      .entry('app')
      .clear()
      .add('./src/ui/main.js')
      .end();
    config.resolve.alias
      .set('@', path.join(__dirname, './src/ui'));

    const fontsRule = config.module.rule('fonts');
    const imageRule = config.module.rule('images');
    fontsRule.uses.clear();
    imageRule.uses.clear();

    config.module
      .rule('fonts')
      .test(/\.(ttf|eot|svg|woff(2)?)$/)
      .use('base64-inline-loader')
      .loader('base64-inline-loader')
      .tap((options) => options)
      .end();

    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif)$/i)
      .use('base64-inline-loader')
      .loader('base64-inline-loader')
      .tap((options) => options)
      .end();

    config.plugin('preload').tap((args) => {
      args[0].fileBlacklist.push(/\.css/, /\.js/);
      return args;
    });

    config
      .plugin('inline-source')
      .use(htmlWebpackInlineSourcePlugin);

    config.plugin('html').tap((args) => {
      const arg = args;
      arg[0].inlineSource = '.(js|css)$';
      return arg;
    });
  },
};
