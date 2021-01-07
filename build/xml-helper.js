const path = require('path');
const fs = require('fs');
const xml2js = require('xml2js');

const xmlParser = new xml2js.Parser();
const xmlBuilder = new xml2js.Builder({
  headless: true,
});

exports.injectPackageJSON = function () {};

const Placeholder = {
  Size: '{this.size}',
  Color1: '{this.colors[0]}',
};

exports.resolveSvgData = function (source) {
  return xmlParser
    .parseStringPromise(source)
    .then((xmlObj) => {
      if (xmlObj.svg) {
        const { $, rect, path: svgPath } = xmlObj.svg;
        $.width = Placeholder.Size;
        $.height = Placeholder.Size;

        if (svgPath) {
          svgPath.forEach((svgPathItem) => {
            svgPathItem.$.stroke = Placeholder.Color1;
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

function removeOuterQuote(source) {
  return source.replace(/\"\{([\[\].\d\w]+)\}\"/gi, '{$1}');
}
