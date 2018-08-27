/* eslint no-console: ["error", { allow: ["log"] }] */

const rp = require("request-promise");

const JSONFileLoader = {};

JSONFileLoader.loadFile = url => {
  const options = {
    uri: url,
    transform(body) {
      return JSON.parse(body);
    }
  };

  return rp(options).catch(err => {
    console.log(err);
  });
};

module.exports = JSONFileLoader;
