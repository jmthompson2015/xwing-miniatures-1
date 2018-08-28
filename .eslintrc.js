module.exports = {
  env: {
    browser: true
  },
  extends: ["airbnb", "prettier"],
  globals: {
    XMA: true,
    // AM: true,
    XMS: true,
    // AV: true,
    Immutable: true,
    // PropTypes: true,
    QUnit: true,
    R: true,
    // React: true,
    // ReactDOM: true,
    // ReactDOMFactories: true,
    Redux: true
  },
  rules: {
    "import/extensions": ["error", { js: "always" }],
    "max-len": ["error", { code: 100, ignoreUrls: true }]
  }
};
