const express = require('express');
const regexPattern = require('../utils/generate-regex');
const { extractPatternFromURL, extractPatternFromURLV1 } = require('../utils/extract-pattern');
const {getUrls} = require('../utils/url-extractor');
const _ = require('underscore');
const lodash = require('lodash');

const router = express.Router();


router.get('/extractDataFromURL', async (req, res) => {
  // It should take parmeter from FE like which pattern it needs to search in the URL
  try {
    const dataMatchedWithPattern = await extractPatternFromURLV1(req.body.url, {email: regexPattern.emailV1});
    if (dataMatchedWithPattern && dataMatchedWithPattern.length == 0) {
      res.status(200);
      return res.json({data: dataMatchedWithPattern, message: 'Not found'});
    }
    res.status(200);
    return res.json({data: dataMatchedWithPattern, message: 'success'});
  } catch (error) {
    console.error(error);
    res.status(400);
    res.json({data: [], message: 'failed'});
  }
});

router.get('/extractDataFromDomain', async (req, res) => {
  // It should take parameter from FE like which pattern it need to search in the Domain.
  // With the help of domain remove all the URL related to that domain.
  const domain = req.body.domain;
  try {
    const urls = await getUrls(domain);
    if (urls && urls.length == 0) {
      res.status(200);
      return res.json({data: [], message: 'No URLs found for domain'});
    }
    let dataMatchedWithPattern = []
    let p1 = []
    urls.forEach(async (url) => {
      p1.push(extractPatternFromURL(url, {email: regexPattern.emailV1}));
    });
    dataMatchedWithPattern = await Promise.all(p1);
    dataMatchedWithPattern = lodash.uniqBy(_.flatten(dataMatchedWithPattern), 'value');
    // console.log('dataMatchedWithPattern', dataMatchedWithPattern);
    // return res.json({data: [], message: 'success'});
    if (dataMatchedWithPattern && dataMatchedWithPattern.length == 0) {
      res.status(200);
      return res.json({ data: dataMatchedWithPattern, message: 'Not found' });
    }
    res.status(200);
    return res.json({ data: dataMatchedWithPattern, message: 'success' });
  } catch (error) {
    console.error(error);
    return res.json({data: [], message: 'failed'});
  }
});

module.exports = router;
