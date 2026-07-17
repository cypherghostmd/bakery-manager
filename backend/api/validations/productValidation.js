const Produtos = require('../model/produto');

async function checkProductExists(id) {
    if(!id) return null;
    const found = await Produtos.findById(id);
    return found;
}

module.exports = { checkProductExists };