const bunyan = require('bunyan');
const fs = require('fs');
const { JSDOM } = require('jsdom');

const targetElementId = "sendMessageButton";

const logger = bunyan.createLogger({ name: "myapp" });

try {
  const sampleFile = fs.readFileSync('./samples/startbootstrap-freelancer-gh-pages-cut.html');
  const dom = new JSDOM(sampleFile);

  const button = dom.window.document.getElementById(targetElementId)
  logger.info(`Successfully found element. Element Text: ${button.textContent}`);
} catch (err) {
  logger.error('Error trying to find element by css selector', err);
}
