const Osseus = require('osseus')

const init = async (modules, callback) => {
  try {
    const osseus = await Osseus.init()
    const errors = []
    if (!modules || modules.length === 0) {
      callback(new Error(`no modules specified for wrapper`))
    }
    modules.forEach(module => {
      if (!osseus[module]) {
        errors.push(`"${module}" was not initialized, check configurations - https://github.com/colucom/osseus-${module}/blob/master/README.md`)
      }
    })
    errors.length > 0 ? callback(errors) : callback(null, osseus)
  } catch (err) {
    callback(err)
  }
}

module.exports = {
  init: init
}
