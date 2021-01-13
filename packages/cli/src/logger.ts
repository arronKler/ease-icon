import chalk from 'chalk';
import stripAnsi from 'strip-ansi';

const format = (label: string, msg: string) => {
  return msg
    .split('\n')
    .map((line, i) => {
      return i === 0
        ? `${label} ${line}`
        : line.padStart(stripAnsi(label).length);
    })
    .join('\n');
};

type tagType = string | null | undefined;

const chalkTag = (msg: string) => chalk.bgBlackBright.white.dim(` ${msg} `);

export const log = (msg: string = '', tag: tagType = null) => {
  tag ? console.log(format(chalkTag(tag), msg)) : console.log(msg);
};

export const info = (msg: string, tag: tagType = null) => {
  console.log(
    format(chalk.bgBlue.black(' INFO ') + (tag ? chalkTag(tag) : ''), msg),
  );
};

export const done = (msg: string, tag: tagType = null) => {
  console.log(
    format(chalk.bgGreen.black(' DONE ') + (tag ? chalkTag(tag) : ''), msg),
  );
};

export const warn = (msg: string, tag: tagType = null) => {
  console.warn(
    format(
      chalk.bgYellow.black(' WARN ') + (tag ? chalkTag(tag) : ''),
      chalk.yellow(msg),
    ),
  );
};

export const error = (msg: string | Error, tag: tagType = null) => {
  console.error(
    format(
      chalk.bgRed(' ERROR ') + (tag ? chalkTag(tag) : ''),
      chalk.red(msg as string),
    ),
  );

  if (msg instanceof Error) {
    console.error(msg.stack);
  }
};
