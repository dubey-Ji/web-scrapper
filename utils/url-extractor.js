const axios = require('axios');
const cheerio = require('cheerio');

async function getUrls(domain) {
  try {
    const response = await axios.get(`https://${domain}`);
    const $ = cheerio.load(response.data);

    const urls = [];

    // Extract URLs from anchor tags
    $('a').each((index, element) => {
      const href = $(element).attr('href');
      if (href && href.startsWith('http')) {
        urls.push(href);
      }
    });

    // Extract URLs from other tags as needed (e.g., script tags, img tags, etc.)

    return urls;
  } catch (error) {
    console.error('Error fetching URLs:', error);
    return [];
  }
}

module.exports = {getUrls};
// Replace 'example.com' with your domain
// getUrls('valuefy.com')
// // getUrls('https://valuefy.com/contact/#book-a-demo')
// .then(urls => {
//   console.log(urls);
// })
// .catch(err => {
//   console.error(err);
// });
