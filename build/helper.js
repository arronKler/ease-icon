const path = require('path');
const fs = require('fs');
const prettier = require('prettier');

exports.copyFile = function (src, dest, checkDest) {
  if (checkDest && fs.existsSync(dest)) {
    // console.log('File Already Exist');
    return;
  }

  fs.copyFile(src, dest, (err) => {
    if (err) throw err;

    console.log('Copy Done!');
  });
};

exports.copyWithInject = function (src, dest, injectors, checkDest) {
  if (checkDest && fs.existsSync(dest)) {
    // console.log('File Already Exist');
    return;
  }

  let content = fs.readFileSync(src, {
    encoding: 'utf-8',
  });

  injectors.forEach((injector) => {
    const [variable, value] = injector;
    content = content.replace(new RegExp(`\{${variable}\}`, 'gi'), value);
  });
  fs.writeFileSync(dest, content);
};
