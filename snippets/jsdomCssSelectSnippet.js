const bunyan = require('bunyan');
const fs = require('fs');
const { JSDOM } = require('jsdom');

const cssQuery = 'div[id="success"] button[class*="btn-primary"]';

const logger = bunyan.createLogger({ name: "myapp" });

try {
  const sampleFile = fs.readFileSync('./samples/startbootstrap-freelancer-gh-pages-cut.html');
  const dom = new JSDOM(sampleFile);
  
  const button = dom.window.document.querySelector(cssQuery);
  logger.info(`Successfully found element. Element Text: ${button.textContent}`);
  const array = Array.prototype.slice.apply(button.attributes);
  logger.info(array.map(attr => `${attr.name} = ${attr.value}`).join(', '));
} catch (err) {
  logger.error('Error trying to find element by css selector', err);
}
