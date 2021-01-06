
import path from 'path'
import fs from 'fs'


const VueTemplate = `export default {
  props: {
    size: {
      type: String,
      default: '42',
    },
  },
  name: '$name$',
  render() {
    return ($render$)
  },
};

`

export function GenerateVueComponent(filepath: string, svgData: string, svgName:string) {
  let resolvedSvgData = VueTemplate.replace(/\$name\$/gi, svgName.replace(/\.svg$/, ''))
  resolvedSvgData = resolvedSvgData.replace(/\$render\$/, svgData)

  fs.writeFileSync(filepath.replace(/\.svg$/, '.js'), resolvedSvgData)
}