import * as xml2js from 'xml2js'
import { SVGModel, SVGPathModel, SVGPathElementAttribute } from '../interface/SvgCompilerInterface'

const xmlParser = new xml2js.Parser()
const xmlBuilder = new xml2js.Builder({
  headless: true
})


enum Placeholder {
  Size = "{this.size}",
  Color1 = "{this.colors[0]}"
}

export function SvgCompiler(source: string) {
  return xmlParser.parseStringPromise(source).then((xmlObj:SVGModel) => {
    if (xmlObj.svg) {
      const {$, rect, path} =  xmlObj.svg
      $.width = Placeholder.Size
      $.height = Placeholder.Size
      
      path.forEach((pathItem: SVGPathModel) => {
        pathItem.$.stroke = Placeholder.Color1
      })
    }

    let outputXML = xmlBuilder.buildObject(xmlObj)
    outputXML = removeOuterQuote(outputXML)

    return outputXML
  }).catch((err: Error) => {
    console.error(err)
  })
}

function removeOuterQuote(source: string): string {
  return source.replace(/\"\{([\[\].\d\w]+)\}\"/gi, '{$1}')
}