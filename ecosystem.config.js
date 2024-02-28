module.exports = {
  apps: [
    {
      name: 'StickerWu-Binance-API',
      script: 'dist/main.js', // 项目入口文件路径
      watch: false, // 是否监听文件变化，生产环境建议设置为 false
      env: {
        NODE_ENV: 'development', // 指定环境变量为开发环境
      },
      env_production: {
        NODE_ENV: 'production', // 指定环境变量为生产环境
      },
    },
  ],
};
