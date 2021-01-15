import path from 'path';
// import fs from 'fs';
// import fontCarrier from 'font-carrier';
import svgtofont from 'svgtofont';

import { done } from '../../logger';

export async function generator(
  from: string,
  to: string,
  categories: Array<string>,
) {
  for (let category of categories) {
    const currentResolvingDir = path.resolve(from, category);

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
