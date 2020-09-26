import { Config } from './type';

// require なら tsconfig.json の rootDir より上のものを参照できる（？）
// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('../config.json');

export default config as Config;
