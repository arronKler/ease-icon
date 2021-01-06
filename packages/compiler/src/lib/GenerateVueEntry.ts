import * as fs from 'fs'
import * as path from 'path'

const ENTRY_FILENAME = 'index.js'

export function GenerateVueEntry(outputPath: string, iconMap: Map<string, string>) {
  let importStatement = ''
  let exportAllStatement = 'export {\n'

  let registerComponentStatement = ''

  for (let [filename, filepath] of iconMap.entries()) {
    console.log('filenam', filename, filepath)
    importStatement += `import ${filename} from "./icons/${filepath}";\n`

    exportAllStatement += `${filename},\n`

    registerComponentStatement += `Vue.component('I' + ${filename}.name, Vue.extend(${filename}))\n`
  }

  exportAllStatement += '}\n'

  
  
  /* const dirs = fs.readdirSync(path.resolve(outputPath, 'icons'))
  for (let dirname of dirs) {
    const iconFolderPath = path.resolve()
  } */

  const exportDefaultStatement = `\n
  export default {
    install(Vue) {
      ${registerComponentStatement}
    }
  }
  `

  fs.writeFileSync(path.resolve(outputPath, ENTRY_FILENAME), importStatement + exportAllStatement + exportDefaultStatement)
}