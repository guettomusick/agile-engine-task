const fs = require('fs');
const { JSDOM } = require('jsdom');
const _ = require('lodash');

const originFileName = process.argv[2];
const compareFileName = process.argv[3];
const targetElementId = process.argv[4] || 'make-everything-ok-button';

if (!originFileName || !compareFileName) {
  console.log('usage: node find.js originFile compareFile [targetId]');
  process.exit(1);
}

try {
  const originFile = fs.readFileSync(originFileName);
  const originDom = new JSDOM(originFile);

  const expectedElement = originDom.window.document.getElementById(targetElementId)
  const expectedAttributes = Array.prototype.slice.apply(expectedElement.attributes)
    .reduce((obj, attr) => {
      obj[attr.name] = attr.value;
      return obj;
    }, {});

  const compareFile = fs.readFileSync(compareFileName);

  const compareDom = new JSDOM(compareFile);

  const byClass = compareDom.window.document.getElementsByClassName(expectedAttributes.class.split(' ')[0]);
  Array.prototype.slice.apply(byClass).forEach(bc => {
    const compareAttributes = Array.prototype.slice.apply(bc.attributes)
    .reduce((obj, attr) => {
      obj[attr.name] = attr.value;
      return obj;
    }, {});

    const expectedClassArray = expectedAttributes.class.split(' ').sort();
    const compareClassArray = compareAttributes.class.split(' ').sort();

    const same = [
      _.isEqual(expectedClassArray, compareClassArray),
      expectedAttributes.title === compareAttributes.title,
      expectedAttributes.href === compareAttributes.href,
      expectedAttributes.onclick === compareAttributes.onclick,
      expectedElement.textContent === bc.textContent
    ];

    const countSame = same.reduce((sum, actual) => actual ? sum + 1 : sum, 0);
    if(countSame >= 3) {
      console.log(getTree(bc));
    }
  });

} catch (err) {
  console.error('Error trying to find element by id', err);
}

function getTree(element) {
  return getName(element);
}

function getName(element) {
  if (!element.parentElement) {
    return element.nodeName;
  }
  const parentElement = element.parentElement;
  const parentChildNodes = Array.prototype.slice.apply(parentElement.childNodes)
    .filter(cn => cn.nodeName === element.nodeName);

  let nodeName = element.nodeName;
  if (parentChildNodes.length > 1) {
    nodeName += `[${parentChildNodes.length}]`;
  }

  return getName(parentElement) + ' > ' + nodeName;
}