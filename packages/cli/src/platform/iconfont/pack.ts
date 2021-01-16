import svgtofont from 'svgtofont';

import ora from 'ora';

export default async function pack(from: string, to: string) {
  const spinner = ora('Start building iconfont').start();
  await svgtofont({
    src: from,
    dist: to,
    fontName: 'iconfont',
    css: {
      fontSize: '30px',
    },
    website: {
      title: 'iconfont',
      logo: '',
      version: '1.0.0',
      links: [],
    },
  });

  console.log();
  spinner.succeed('Build iconfont succeed！');
}
