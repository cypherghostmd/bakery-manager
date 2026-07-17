const container = document.querySelector(".container");
const editar_container = document.querySelector(".editar-container");
const editar = document.querySelector("form");
const btn_salvar = document.querySelector(".btn-salvar");

const renderProducts = async () => {
    try {
        const response = await fetch("/api/products");
        const produtos_list = await response.json();

        container.innerHTML = '';

        produtos_list.forEach((product) => {
            const id = product._id;
            const name = product.name;
            const type = product.category;
            const price = product.price;
            const quantity = product.quantity;
            const description = product.description;
            const expirationDate = product.expirationDate;

            const newProduct = `        
                <div class="container-product" id="product-${id}">
                    <div class="container-img">
                        <img src="../css/assets/${type}.png" alt="${type}" />
                    </div>
                    <div class="container-details">
                        <h2>${name}</h2>
                        <p>Preço: $<span class="price">${price}</span></p>
                        <p>Quantidade: <span class="qtd">${quantity}</span></p>
                        <div class="buttons">
                            <button class="btn-editar" onclick="editarProduto('${id}')">
                                <img src="../css/assets/icons8-editar-24.png" alt="editar" />
                            </button>
                            <button class="btn-excluir" onclick="excluirProduto('${id}')">
                                <img src="../css/assets/lixeira-de-reciclagem.png" alt="lixeira" />
                            </button>
                        </div>
                    </div>
                </div>
            `;

            container.insertAdjacentHTML('beforeend', newProduct);
        });
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
        alert('Erro ao carregar produtos');
    }
};

renderProducts();

async function editarProduto(id) {

    const nome = document.getElementById("nome");
    const descricao = document.getElementById("descricao");
    const categoria = document.getElementById("categoria");
    const preco = document.getElementById("preco");
    const expirar = document.getElementById("date");
    const qtd = document.getElementById("qtd");

    const response = await fetch(`/api/product/${id}`);
    const product = await response.json();

    nome.value = product.name;
    preco.value = product.price;
    qtd.value = product.quantity;
    descricao.value = product.description;
    categoria.value = product.category;
    expirar.value = product.expiration;

    editar_container.classList.add("active");

    btn_salvar.onclick = async (event) => {
        event.preventDefault();

        const data = {
            name: nome.value,
            description: descricao.value,
            category: categoria.value,
            price: preco.value,
            expiration: expirar.value,
            quantity: qtd.value
        }

        try {
            const response = await fetch(`/api/up-product/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            console.log('Atualizado:', result);

            if (response.ok) {
                editar_container.classList.remove("active");
                editar.reset();
                renderProducts();
            }
        } catch (err) {
            console.error('Erro ao atualizar: ', err);
            return;
        }


    };
}

async function excluirProduto(id) {
    try {
        const response = await fetch(`/api/del-product/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const result = await response.json();
        console.log('Deletar:', result);

        if (response.ok) {
            renderProducts();
        }
    } catch (err) {
        console.error('Erro ao deletar: ', err);
        return;
    }
}

editar_container.addEventListener("click", (event) => {
    if(event.target === editar_container){
        editar_container.classList.remove("active");
    }
});
