const AZLyrics = require('../lib/index.js');

(async () => {
  // (await AZLyrics.search('Hearts On Fire Gavin Games')).forEach(console.log);
  console.log(await AZLyrics.search('songs', 'test'));
})();