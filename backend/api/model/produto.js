const mongoose = require('../config/connection');

const produtos = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: ["paes", "salgados-a", "salgados-f", "tortas", "bolos", "sobremesas", "frios", "bebidas"],
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    expiration: {
        type: String,
        required: true,
    }
});

const Produtos = mongoose.model('Produtos', produtos);

module.exports = Produtos;
