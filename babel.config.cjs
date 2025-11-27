// babel.config.cjs
module.exports = {
  presets: [
    ["@babel/preset-env", { targets: "defaults" }],
    ["@babel/preset-react", { runtime: "automatic" }],
  ],
  plugins: [
    // add plugins if needed
  ],
};
