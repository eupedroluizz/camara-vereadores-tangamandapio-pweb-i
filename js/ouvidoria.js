const formulario = document.querySelector("#formulario-ouvidoria");
const campoNome = document.querySelector("#nome");
const campoEmail = document.querySelector("#email");
const campoAssunto = document.querySelector("#assunto");
const campoMensagem = document.querySelector("#mensagem");
const contadorCaracteres = document.querySelector("#contador-caracteres");
const mensagemFormulario = document.querySelector("#mensagem-formulario");
const dica = document.querySelector("#dica");
const listaManifestacoes = document.querySelector("#lista-manifestacoes");
const semManifestacoes = document.querySelector("#sem-manifestacoes");

let manifestacoes = [];

const dicas = {
    nome: "Informe seu nome completo.",
    email: "Usaremos o e-mail para responder sua manifestação.",
    assunto: "Escolha o tipo da manifestação.",
    mensagem: "Descreva sua manifestação com até 500 caracteres."
};

const campos = [campoNome, campoEmail, campoAssunto, campoMensagem];

for (const campo of campos) {
    campo.addEventListener("focus", (event) => {
        dica.textContent = dicas[event.target.id];
    });

    campo.addEventListener("blur", () => {
        dica.textContent = "";
    });
}

campoMensagem.addEventListener("input", () => {
    contadorCaracteres.textContent = `${campoMensagem.value.length}/500 caracteres`;
});

function mostrarManifestacoes() {
    listaManifestacoes.textContent = "";

    manifestacoes.forEach((manifestacao, indice) => {
        const item = document.createElement("li");
        item.id = "manifestacao-" + indice;

        const texto = document.createElement("span");
        texto.textContent = `${manifestacao.data} - ${manifestacao.assunto}: ${manifestacao.mensagem}`;

        const botaoRemover = document.createElement("button");
        botaoRemover.classList.add("botao-remover");
        botaoRemover.setAttribute("type", "button");
        botaoRemover.textContent = "Remover";

        item.appendChild(texto);
        item.appendChild(botaoRemover);
        listaManifestacoes.appendChild(item);
    });

    if (manifestacoes.length === 0) {
        semManifestacoes.textContent = "Você ainda não enviou nenhuma manifestação.";
    } else {
        semManifestacoes.textContent = `Total de manifestações: ${manifestacoes.length}`;
    }
}

function limparErros() {
    for (const campo of campos) {
        campo.classList.remove("campo-erro");
    }
}

formulario.addEventListener("submit", (event) => {
    event.preventDefault();

    limparErros();
    mensagemFormulario.classList.remove("erro");
    mensagemFormulario.classList.remove("sucesso");

    const erros = [];

    if (campoNome.value.trim() === "") {
        erros.push("nome");
        campoNome.classList.add("campo-erro");
    }

    if (campoEmail.value.indexOf("@") === -1) {
        erros.push("e-mail");
        campoEmail.classList.add("campo-erro");
    }

    if (campoAssunto.value === "") {
        erros.push("assunto");
        campoAssunto.classList.add("campo-erro");
    }

    if (campoMensagem.value.trim() === "") {
        erros.push("mensagem");
        campoMensagem.classList.add("campo-erro");
    }

    if (erros.length > 0) {
        mensagemFormulario.textContent = "Verifique os campos: " + erros.join(", ") + ".";
        mensagemFormulario.classList.add("erro");
        return;
    }

    const hoje = new Date();

    const manifestacao = {
        nome: campoNome.value.trim(),
        email: campoEmail.value.trim(),
        assunto: campoAssunto.value,
        mensagem: campoMensagem.value.trim(),
        data: hoje.getDate() + "/" + (hoje.getMonth() + 1) + "/" + hoje.getFullYear()
    };

    manifestacoes.push(manifestacao);
    mostrarManifestacoes();

    mensagemFormulario.textContent = `Obrigado, ${manifestacao.nome}! Sua manifestação foi enviada.`;
    mensagemFormulario.classList.add("sucesso");

    campoAssunto.value = "";
    campoMensagem.value = "";
    contadorCaracteres.textContent = "0/500 caracteres";
});

formulario.addEventListener("reset", () => {
    limparErros();
    mensagemFormulario.textContent = "";
    contadorCaracteres.textContent = "0/500 caracteres";
});

listaManifestacoes.addEventListener("click", (event) => {
    const botao = event.target.closest(".botao-remover");

    if (!botao) {
        return;
    }

    const item = botao.closest("li");
    const indice = Number(item.id.replace("manifestacao-", ""));

    manifestacoes.splice(indice, 1);
    mostrarManifestacoes();
});

mostrarManifestacoes();
