// Used for Jest only.
module.exports = {
  plugins: ["@babel/plugin-transform-react-jsx"],
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    ["@babel/preset-typescript"],
  ],
};
