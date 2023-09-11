const { defineConfig } = require('@vue/cli-service')
const path = require("path");

module.exports = defineConfig({
    transpileDependencies: true,
    publicPath: process.env.GH_PAGES ? "/bingo-generator/" : "/",
    outputDir: process.env.GH_PAGES ? path.resolve(__dirname, "./docs") : undefined
})
