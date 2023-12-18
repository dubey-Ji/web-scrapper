const regexExp = {
  multiplePhoneNumber: /(([2-9]\d{2}-\d{3}-\d{4})|(\([2-9]\d{2}\)-\d{3}-\d{4})|([2-9]\d{2}\.\d{3}\.\d{4}))([xX]\d{1,4})?/g,
  email: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
  emailV1: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
  multiplePhoneNumberV1: /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/gm,
  multiplePhoneNumberV2: /09(0[1 - 2] | 1[\d]| 3[\d]| 2[0 - 1])[\d]{ 3}[\d]{ 4}/g,
  multiplePhoneNumberV3: /(?:^\([0]?[1-9]{2}\)|^[0]?[1-9]{2}[\.-\s]?)[9]?[1-9]\d{3}[\.-\s]?\d{4}$/,
  multiplePhoneNumberV4: /^((\+61\s?)?(\((0|02|03|04|07|08)\))?)?\s?\d{1,4}\s?\d{1,4}\s?\d{0,4}$/gm,
  multiplePhoneNumberV5: /(?:\d{1}\s)?\(?(\d{3})\)?-?\s?(\d{3})-?\s?(\d{4})/g,
  multiplePhoneNumberV6: /([+(\d]{1})(([\d+() -.]){5,16})([+(\d]{1})/gm,
};

module.exports = regexExp;
