const axios = require('axios');
const regexExp = require('./generate-regex');
const _ = require('underscore');

/**
 * 
 * @param {*} url 
 * @param {*} pattern | conatins a single object with the key and value pairs
 * For example: { email: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g }
 * @returns [{}]
 */
async function extractPatternFromURL(url, pattern = {}) {
  try {
    const response = await axios.get(url);
    const htmlContent = response.data;

    // Define the pattern you want to extract using a regular expression
    // const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g; // Change this pattern based on your requirements

    // Search for the pattern within the HTML content
    let matches = [];
    let header;
    for (let key in pattern) {
      header = key;
      matches = htmlContent.match(pattern[key]);
    }
    matches = _.uniq(matches);
    let data = [];
    _.each(matches, (match) => {
      data.push({
        header,
        value: match,
        url
      });
    });
    if (data && data.length > 0) {
      // console.log('Pattern found:', matches);
      return data;
    } else {
      console.log('Pattern not found.');
      return [];
    }
  } catch (error) {
    console.error('Error fetching or extracting pattern:', error);
    return null;
  }
}

async function extractPatternFromURLV1(url, pattern = {}, maxRetries = 3) {
  let retries = 0;

  while (retries < maxRetries) {
    try {
      const response = await axios.get(url);
      const htmlContent = response.data;

      let matches = [];
      let header;

      for (let key in pattern) {
        header = key;
        matches = htmlContent.match(pattern[key]);
      }

      matches = _.uniq(matches);
      

      let data = [];
      _.each(matches, (match) => {
        data.push({
          header,
          value: match,
          url
        });
      });

      if (data && data.length > 0) {
        return data;
      } else {
        console.log('Pattern not found.', url);
        return [];
      }
    } catch (error) {
      if (error.response && error.response.status === 503) {
        console.log(`Retry attempt ${retries + 1} after 503 error`);
        retries++;
      } else {
        console.error('Error fetching or extracting pattern:', error);
        return null;
      }
    }
  }

  console.error(`Max retries (${maxRetries}) reached. Unable to fetch data from ${url}`);
  return null;
}

// Replace 'https://www.ers.pt/pt/prestadores/servicos/pesquisa-de-prestadores/' with your URL
// extractPatternFromURL('https://www.ers.pt/pt/prestadores/servicos/pesquisa-de-prestadores/');

// extractPatternFromURL('https://valuefy.com/contact/#book-a-demo', {
//   email: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
// })
// .then(matches => {
//   console.log(matches);
// })
// .catch(err => {
//   console.error(err);
// });
module.exports = { extractPatternFromURL, extractPatternFromURLV1 };




