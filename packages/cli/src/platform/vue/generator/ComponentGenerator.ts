import fs from 'fs';
import path from 'path';
import prettier from 'prettier';

const VueTemplate = `
/* Auto-generated code by ease-icon */

export default {
  props: {
    size: {
      type: String,
      default: '42',
    },
    colors: {
      type: Array,
      default: () => [$colors$],
    },
    mode: {
      type: String,
      defualt: 'single',
    },
  },
  name: '$name$',
  data () {
    return {
      innerColors: []
    }
  },
  render(h) {
    const colors = this.colors
    return ($render$)
  },
};

`;

export default function (
  outputPath: string,
  filename: string,
  svgData: string,
  colors: string[],
) {
  const outputFilePath = path.join(outputPath, filename + '.js');

  let resolvedData = VueTemplate.replace(/\$name\$/gi, filename);
  resolvedData = resolvedData.replace(/\$render\$/, svgData);
  resolvedData = resolvedData.replace(
    /\$colors\$/,
    colors.map((color) => `'${color}'`).join(','),
  );

  resolvedData = prettier.format(resolvedData, {
    semi: false,
    parser: 'babel',
  });

  fs.writeFileSync(outputFilePath, resolvedData);
}
