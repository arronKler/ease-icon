import xml2js from 'xml2js';
import { readFilePromise } from './helper';

const xmlParser = new xml2js.Parser();
const xmlBuilder = new xml2js.Builder({
  headless: true,
});

exports.injectPackageJSON = function () {};

const Placeholder = {
  Size: '{this.size}',
  Color1: '{this.colors[0]}',
  Color2: '{this.colors[1]}',
};

let colorMap: string[] = [];
let counter = -1;

export const resolveSvgFile = function (filePath: string) {
  return readFilePromise(filePath)
    .then((filedata: any) => {
      return xmlParser.parseStringPromise(filedata);
    })
    .then((xmlObj: any): any => {
      if (xmlObj.svg) {
        const { $, rect, path: svgPath, polyline, polygon } = xmlObj.svg;
        $.width = Placeholder.Size;
        $.height = Placeholder.Size;

        // initialize
        colorMap = [];
        counter = -1;

        // TODO: add more feature here
        // recursively resolve svg data
        resolveSvgObj(xmlObj.svg);
      }

      let outputXML = xmlBuilder.buildObject(xmlObj);
      outputXML = removeOuterQuote(outputXML);

      return [outputXML, colorMap];
    })
    .catch((err) => {
      console.error(err);
    });
};

function resolveSvgObj(svg: any) {
  if (!svg) return;

  const keys = Object.keys(svg);

  keys.forEach((key) => {
    switch (key) {
      case '$':
        break;
      case 'path':
      case 'rect':
      case 'circle':
        resolveColors(svg[key]);
        break;
      case 'mask':
        resolveSvgObj(svg[key]); // recursive
        break;
    }
  });
}

// extract colors as default colors
function resolveColors(list: any[]) {
  list.forEach((item: any) => {
    if (item['$']) {
      const { stroke, fill } = item['$'];

      if (stroke) {
        if (colorMap.includes(stroke)) {
          item['$'].stroke = '{colors[' + colorMap.indexOf(stroke) + ']}';
        } else {
          counter++;
          item['$'].stroke = `{colors[${counter}]}`;
          colorMap.push(stroke);
        }
      }

      if (fill) {
        if (colorMap.includes(fill)) {
          item['$'].fill = '{colors[' + colorMap.indexOf(fill) + ']}';
        } else {
          counter++;
          item['$'].fill = `{colors[${counter}]}`;
          colorMap.push(fill);
        }
      }
    }
  });
}

function removeOuterQuote(source: string) {
  return source.replace(/\"\{([\[\].\d\w]+)\}\"/gi, '{$1}');
}
