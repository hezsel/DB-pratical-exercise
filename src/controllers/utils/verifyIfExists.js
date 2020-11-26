const verifyIfExists = (res, item, name) => {
  if (!item) {
    res.json({
      erro: `${name}_invalido`
    })  
  }
}

module.exports = verifyIfExists