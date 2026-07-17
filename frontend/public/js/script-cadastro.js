const html = document.querySelector("html");
const btn_cadastrar = document.querySelector(".btn_cadastrar");
const btn_voltar = document.querySelector(".btn_voltar");
const hidden_success = document.querySelector(".hidden_success");
const hidden_success_p = document.querySelector(".hidden_success_p");
const form = document.querySelector("form");
const fields = form.querySelectorAll('input, textarea, select');

btn_voltar.addEventListener("click", () => closeSuccess());

function isFormFulfilled() {
    let allFilled = true;

    fields.forEach(field => {
        if (!field.value.trim()) {
            allFilled = false;
        }
    })

    return allFilled;
}
form.addEventListener("submit", async function (event) {
    event.preventDefault();

    if (isFormFulfilled()) {
        const data = {
            name: document.getElementById('nome').value.trim(),
            quantity: parseInt(document.getElementById('qtd').value),
            price: parseInt(document.getElementById('preco').value),
            category: document.getElementById('categoria').value.trim(),
            description: document.getElementById('descricao').value.trim(),
            expiration: document.getElementById('date').value,
        };

        try {
            const response = await fetch('/api/product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            console.log('Salvo no banco:', result);
        } catch (err) {
            console.error('Erro ao enviar: ', err);
            return;
        }

        hidden_success_p.innerHTML = `<p>Produto: ${data.name} cadastrado com sucesso!`

        hidden_success.classList.add("active");
        form.reset();
    }
});

const closeSuccess = () => {
    hidden_success.classList.remove("active");
}