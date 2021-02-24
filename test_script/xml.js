const fs = require('fs');
const xml2js = require('../packages/cli/node_modules/xml2js');

const xmlParser = new xml2js.Parser();
const xmlBuilder = new xml2js.Builder({
  headless: true,
});

const content = fs.readFileSync('./test_script/MailOpen.svg', {
  encoding: 'utf-8',
});

const colorMap = [];
let counter = -1;

xmlParser.parseStringPromise(content).then((xmlobj) => {
  const svg = xmlobj.svg;
  console.log(svg);
  resolveSvg(svg);
  console.log(svg.g[0]);
  console.log('[' + colorMap.map((color) => `'${color}'`).join(',') + ']');
});

function resolveSvg(svg) {
  const keys = Object.keys(svg);

  keys.forEach((key) => {
    switch (key) {
      case '$':
        break;
      case 'path':
      case 'rect':
      case 'polyline':
        resolveColors(svg[key]);
        break;
      case 'mask':
        resolveSvg(svg[key]); // recursive
        break;
      case 'g':
        svg[key].forEach((item) => {
          resolveSvg(item);
        });
        break;
    }
  });
}

function resolveColors(list) {
  list.forEach((item) => {
    if (item['$']) {
      const { stroke, fill } = item['$'];

      if (stroke) {
        if (colorMap.includes(stroke)) {
          item['$'].stroke = '{this.colors[' + colorMap.indexOf(stroke) + ']}';
        } else {
          counter++;
          item['$'].stroke = `{this.colors[${counter}]}`;
          colorMap.push(stroke);
        }
      }

      if (fill) {
        if (colorMap.includes(fill)) {
          item['$'].fill = '{this.colors[' + colorMap.indexOf(fill) + ']}';
        } else {
          counter++;
          item['$'].fill = `{this.colors[${counter}]}`;
          colorMap.push(fill);
        }
      }
    }
  });
}
