<h1 align="center" style="border-bottom: none;">Simple Color Logger</h1>
<h3 align="center">Custom Nodejs Logger using winston</h3>
<p align="center">
  <a href="https://github.com/zulfikar4568/color-logger/actions/workflows/publish.yml?query=branch%3Amaster">
    <img alt="Build states" src="https://github.com/zulfikar4568/color-logger/actions/workflows/publish.yml/badge.svg">
  </a>
  <a href="#badge">
    <img alt="semantic-release: angular" src="https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release">
  </a>
  <a href="https://www.npmjs.com/package/@zulfikar4568/color-logger">
    <img alt="npm latest version" src="https://img.shields.io/npm/v/@zulfikar4568/color-logger/latest.svg">
  </a>
</p>


![Logger Example](./images/loggerExample.png)

[NPM Package](https://www.npmjs.com/package/@zulfikar4568/color-logger)

## Install
```bash
# Using yarn
yarn add @zulfikar4568/color-logger

# Using npm
npm install @zulfikar4568/color-logger
```

### Example
Logging
```ts
import { awesomeLogger } from "@zulfikar4568/color-logger";

const logger = awesomeLogger('My Application :','silly', true, 'logs/','my-app-log', 'error', true, true, true, true)

logger.error('Hellow Error')
logger.warn('Hellow Warning')
logger.info('Hellow Info')
logger.http('Hellow HTTP')
logger.verbose('Hellow Verbose')
logger.debug('Hellow Debug')
logger.silly('Hellow Silly')

for(let i = 0; i < 100000; i++) {
  logger.info('Hellow Info')
}
```

Handle Rejections
```ts
import { awesomeLogger } from "./utils/logger";

const logger = awesomeLogger('My Application :','silly', true, 'logs/','my-app-log', 'error', true, true, true, true)

Promise.reject('Rejected! ')
```

Handle Exceptions
```ts
import { awesomeLogger } from "./utils/logger";

const logger = awesomeLogger('My Application :','silly', true, 'logs/','my-app-log', 'error', true, true, true, true)

throw new Error('Error sue')
```

Author: [M Zulfikar Isnaen](https://github.com/zulfikar4568/)