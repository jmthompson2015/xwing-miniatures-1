const rp = require('request-promise');

const JSONFileLoader = {};

JSONFileLoader.loadFile = function(url)
{
   const options = {
      uri: url,
      transform: function(body)
      {
         return JSON.parse(body);
      }
   };

   return rp(options).catch(err =>
   {
      console.log(err);
   });
};

module.exports = JSONFileLoader;