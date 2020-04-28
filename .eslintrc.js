const fastConfig = require('./fast.config.js');
const providePluginGlobals = {}
for (let key of Object.keys(fastConfig.providePlugin)) {
  providePluginGlobals[key] = true
}
module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: [
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    "plugin:vue/strongly-recommended",
    "standard"
  ],
  plugins: ["html", "vue"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    // allow async-await
    "generator-star-spacing": "off",
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
  },
  globals: {
    "alert": true,
		"values": true,
    "entries": true,
    ...providePluginGlobals
  }
};
