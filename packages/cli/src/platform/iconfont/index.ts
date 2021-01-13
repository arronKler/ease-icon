import path from 'path';
import fs from 'fs';
import fontCarrier from 'font-carrier';
import svgtofont from 'svgtofont';
import svgo from 'svgo';

import { done } from '../../logger';

const svgTool = new svgo({
  plugins: [
    {
      cleanupAttrs: true,
    },
    {
      removeDoctype: true,
    },
    {
      removeXMLProcInst: true,
    },
    {
      removeComments: true,
    },
    {
      removeMetadata: true,
    },
    {
      removeTitle: true,
    },
    {
      removeDesc: true,
    },
    {
      removeUselessDefs: true,
    },
    {
      removeEditorsNSData: true,
    },
    {
      removeEmptyAttrs: true,
    },
    {
      removeHiddenElems: true,
    },
    {
      removeEmptyText: true,
    },
    {
      removeEmptyContainers: true,
    },
    {
      removeViewBox: false,
    },
    {
      cleanupEnableBackground: true,
    },
    {
      convertStyleToAttrs: true,
    },
    {
      convertColors: true,
    },
    {
      convertPathData: true,
    },
    {
      convertTransform: true,
    },
    {
      removeUnknownsAndDefaults: true,
    },
    {
      removeNonInheritableGroupAttrs: true,
    },
    {
      removeUselessStrokeAndFill: true,
    },
    {
      removeUnusedNS: true,
    },
    {
      cleanupIDs: true,
    },
    {
      cleanupNumericValues: true,
    },
    {
      moveElemsAttrsToGroup: true,
    },
    {
      moveGroupAttrsToElems: true,
    },
    {
      collapseGroups: true,
    },
    {
      removeRasterImages: false,
    },
    {
      mergePaths: true,
    },
    {
      convertShapeToPath: true,
    },
    {
      sortAttrs: true,
    },
    {
      removeDimensions: true,
    },
    {
      removeAttrs: {
        attrs: '(stroke|fill)',
      },
    },
  ],
});

export async function generator(
  from: string,
  to: string,
  categories: Array<string>,
) {
  for (let category of categories) {
    const currentResolvingDir = path.resolve(from, category);
    // font carrier
    /* 
    const filenames = fs
      .readdirSync(currentResolvingDir, {
        encoding: 'utf-8',
      })
      .filter((filename) => filename.endsWith('.svg'));

    const font = fontCarrier.create();
    let counter = 1;
    for (let filename of filenames) {
      const svgData = fs.readFileSync(
        path.resolve(currentResolvingDir, filename),
        {
          encoding: 'utf-8',
        },
      );

      try {
        const name = filename.slice(0, -4);

        font.setSvg(`&#xe60${counter};`, svgData);
        counter++;
      } catch (e) {
        console.error('something wrong ==>', e);
      }
    } 
    
    createFolder(path.resolve(to, category), 'fonts');
    font.output({ path: path.resolve(to, category, 'fonts/iconfont') });
    */

    await svgtofont({
      src: currentResolvingDir,
      dist: path.resolve(to, category),
      fontName: 'iconfont',
      css: {
        fontSize: '30px',
      },
      website: {
        title: category,
        logo: '',
        version: '1.0.0',
        links: [],
      },
    });

    console.log();
    done('Build iconfont "' + category + '" succeed！');
  }
}
