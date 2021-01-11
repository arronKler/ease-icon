import fs from 'fs';
import path from 'path';
import prettier from 'prettier';

import { IconRecord } from './interface';

const VUE_ENTRY_FILENAME = 'index.js';

export default function (
  outputPackagePath: string,
  records: Map<string, IconRecord>,
) {
  let importStatement = '';
  let exportAllStatement = 'export {\n';

  let registerComponentStatement = '';

  for (let name of records.keys()) {
    importStatement += `import ${name} from "./icons/${name}";\n`;

    exportAllStatement += `${name},\n`;

    registerComponentStatement += `Vue.component(prefix + ${name}.name, ${name})\n`;
  }

  exportAllStatement += '}\n';

  const exportDefaultStatement = `\n
  export default {
    install(Vue, options = {}) {
      const prefix = options.prefix ||'I'

      ${registerComponentStatement}
    }
  }
  `;

  const fileData =
    '/* Auto-generated code by ease-icon */\n\n' +
    importStatement +
    exportAllStatement +
    exportDefaultStatement;

  fs.writeFileSync(
    path.join(outputPackagePath, VUE_ENTRY_FILENAME),
    prettier.format(fileData, {
      semi: false,
      parser: 'babel',
    }),
  );
}
