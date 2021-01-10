import xml2js from 'xml2js';
import { readFilePromise } from './helper';
import fs from 'fs';

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

export const resolveSvgFile = function (filePath: string) {
  return readFilePromise(filePath)
    .then((filedata: any) => {
      return xmlParser.parseStringPromise(filedata);
    })
    .then((xmlObj: any): string => {
      if (xmlObj.svg) {
        const { $, rect, path: svgPath, polyline, polygon } = xmlObj.svg;
        $.width = Placeholder.Size;
        $.height = Placeholder.Size;

        if (svgPath) {
          svgPath.forEach((svgPathItem: any) => {
            svgPathItem.$.stroke = Placeholder.Color1;
            if (svgPathItem.$.fill) svgPathItem.$.fill = Placeholder.Color2;
          });
        }

        if (polyline) {
          polyline.forEach((polylineItem: any) => {
            polylineItem.$.stroke = Placeholder.Color1;
          });
        }

        if (polygon) {
          polygon.forEach((polygonItem: any) => {
            polygonItem.$.stroke = Placeholder.Color1;
            polygonItem.$.fill = Placeholder.Color1;
          });
        }
      }

      let outputXML = xmlBuilder.buildObject(xmlObj);
      outputXML = removeOuterQuote(outputXML);

      return outputXML;
    })
    .catch((err) => {
      console.error(err);
    });
};

function removeOuterQuote(source: string) {
  return source.replace(/\"\{([\[\].\d\w]+)\}\"/gi, '{$1}');
}
