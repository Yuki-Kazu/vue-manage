const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
});

module.exports = {
  devServer: {
    https: false,
    hot: "only",
    proxy: {
      "/api": {
        target: "https://e3256f43-56cf-452c-a339-733182c9254c.mock.pstmn.io",
        changeorigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
};
