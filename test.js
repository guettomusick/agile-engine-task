const { exec } = require('child_process');

const child1 = exec('node find.js samples/sample-0-origin.html samples/sample-1-evil-gemini.html');

child1.stdout.on('data', (data) => {
  console.log(`samples/sample-1-evil-gemini.html: ${data}`);
});

const child2 = exec('node find.js samples/sample-0-origin.html samples/sample-2-container-and-clone.html');

child2.stdout.on('data', (data) => {
  console.log(`sample-2-container-and-clone: ${data}`);
});

const child3 = exec('node find.js samples/sample-0-origin.html samples/sample-3-the-escape.html');

child3.stdout.on('data', (data) => {
  console.log(`sample-3-the-escape: ${data}`);
});

const child4 = exec('node find.js samples/sample-0-origin.html samples/sample-4-the-mash.html');

child4.stdout.on('data', (data) => {
  console.log(`sample-4-the-mash: ${data}`);
});