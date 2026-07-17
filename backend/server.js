const Produtos = require('./api/model/produto');
const checkBodyEmpty = require('./api/middleware/checkBodyEmpty');
const { checkProductExists } = require('./api/validations/productValidation');

const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, '../frontend/public')));

app.get("/", (req, res) => {
    res.redirect('/cadastro');
})

app.get("/cadastro", (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/public/pages/cadastro.html'));
});

app.get("/estoque", (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/public/pages/estoque.html'));
});

app.post("/api/product", checkBodyEmpty, async (req, res)  => {
    let name = req.body.name;
    let category = req.body.category;
    let description = req.body.description;
    let expiration = req.body.expiration;
    let quantity = req.body.quantity;
    let price = req.body.price;

    let product = new Produtos({
        name: name,
        description: description,
        category: category,
        expiration: expiration,
        quantity: quantity,
        price: price
    });

    await product.save();

    res.status(201).json({product});
});

app.get("/api/product/:id", async (req, res) => {
    let id = req.params.id;

    let product = await Produtos.findById(id);
        console.log(product);

    res.status(200).json(product);
    console.log(product);
})

app.get("/api/products", async (req, res) => {
    let products = await Produtos.find({}, "name quantity price category description expiration");
    res.status(200).json(products);
});

app.delete("/del-product/:id", async (req, res) => {
    let id = req.params.id;

    const foundProduct = await checkProductExists(id);
    if(!foundProduct) {
        res.status(404).json({'response': "id não encontrado"});
        return;
    }

    let deleted = await Produtos.findByIdAndDelete(id);

    res.status(200).json({deleted});
});

app.put("/api/up-product/:id", async (req, res) => {
    let id = req.params.id;
    const { name, description, category, quantity, price, expiration } = req.body;

    const foundProduct = await checkProductExists(id);
    if(!foundProduct) {
        res.status(404).json({'response': "id não encontrado"});
        return;
    }

    let updated = await Produtos.findByIdAndUpdate(id, { name, description, category, quantity, price, expiration});

    res.status(200).json({updated});
});

app.listen(3000, () => {
    console.log("Listening 3000");
})
