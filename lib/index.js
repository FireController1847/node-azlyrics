const snekfetch = require('snekfetch');
const cheerio = require('cheerio');

class AZLyrics {
  /**
   * Returns a list of website locations.
   * @returns {Object}
   */
  static get locations() {
    return {
      base: 'https://www.azlyrics.com/',
      search: 'https://search.azlyrics.com/'
    };
  }
  /**
   * Searches for lyrics.
   * @param {string} Query
   */
  static search(type, query) {
    if (!['arists', 'albums', 'songs'].includes(type)) throw new TypeError('Invalid Search Type. Must be songs, albums, or artists.');
    return new Promise(async (resolve, reject) => {
      const url = `${this.locations.search}search.php?q=${encodeURIComponent(query)}&w=${type}`;
      const res = await snekfetch.get(url);
      const $ = cheerio.load(res.text);
      const songsPre = $('.panel').children('table').children('tbody').children();
      songsPre.each((i, e) => {
        if (![0, songsPre.length - 1].includes(i)) {
          const song = {};
          const element = $(e);
          song.link = element.find('a').attr('href');
          song.title = element.find('a').text();
          song.author = element.find('b').text();
          console.log(element.text());
        }
      });
      return resolve('Complete');
    });
  }
}

module.exports = AZLyrics;