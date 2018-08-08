[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

# Osseus Module Wrapper

Wrapper for [osseus](https://github.com/colucom/osseus) modules to be used without the [osseus](https://github.com/colucom/osseus) infrastructure

## Install
```bash
$ npm install osseus-module-wrapper
```

## Usage

#### Configuration

For each module you want to use see relevant **Usage** section

* [osseus-config](https://github.com/colucom/osseus-config#usage)
* [osseus-logger](https://github.com/colucom/osseus-logger#usage)
* [osseus-mongo](https://github.com/colucom/osseus-mongo#usage)
* [osseus-mq](https://github.com/colucom/osseus-mq#usage)
* [osseus-queue](https://github.com/colucom/osseus-queue#usage)
* [osseus-router](https://github.com/colucom/osseus-router#usage)
* [osseus-server](https://github.com/colucom/osseus-server#usage)
* [osseus-wallet](https://github.com/colucom/osseus-wallet#usage)

***In order to use any one of those modules you should install it on your app***

#### Example

Let's say we want to use `osseus-logger` and `osseus-server` in our small project.

First, create `index.js`:

```javascript
const wrapper = require('osseus-module-wrapper')

const main = () => {
  wrapper.init(['logger', 'server'], (err, modules) => {
    if (err) {
      console.error(err)
      return process.exit(1)
    }
    console.log('modules', Object.keys(modules))
    // this is how to use the "server" module
    modules.server.app.use('/hello', (req, res, next) => {
      return res.send('world')
    })
    // this is how to use the "logger" module 
    modules.logger.info('done')
  })
}

main()
```

##### `init` function receives two parameters:
* modules
	* array - the names of `osseus` modules without the `osseus-` prefix, which you wish to use
* callback
	* function - called with error and modules object containing the initiated `modules`

Running:

```bash
$ node index.js --OSSEUS_SERVER_PORT 8888 --OSSEUS_SERVER_DEPENDENCIES ["'logger'"] --OSSEUS_LOGGER_LOG_LEVEL debug
```

Will result in:

```sh
2018-07-09T13:33:17.362Z - info: (Liors-MacBook-Pro.local) (32802) - server is listening on port: 8888
2018-07-09T13:33:17.363Z - debug: (Liors-MacBook-Pro.local) (32802) - modules
	["config","logger","server"]
2018-07-09T13:33:17.363Z - info: (Liors-MacBook-Pro.local) (32802) - done
```

And, sending GET request `localhost:8888/hello` will result in the response: `world`

## License
Code released under the [MIT License](https://github.com/colucom/osseus-module-wrapper/blob/master/LICENSE).
