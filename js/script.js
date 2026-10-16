const botaoAumentar = document.querySelector("#aumentar-fonte");
const botaoDiminuir = document.querySelector("#diminuir-fonte");

let tamanhoFonte = 16;

function aplicarTamanhoFonte() {
    document.querySelector("html").style.fontSize = tamanhoFonte + "px";
}

botaoAumentar.addEventListener("click", () => {
    if (tamanhoFonte < 22) {
        tamanhoFonte = tamanhoFonte + 2;
        aplicarTamanhoFonte();
    }
});

botaoDiminuir.addEventListener("click", () => {
    if (tamanhoFonte > 12) {
        tamanhoFonte = tamanhoFonte - 2;
        aplicarTamanhoFonte();
    }
});

const botaoMenu = document.querySelector("#botao-menu");
const listaNavegacao = document.querySelector("#lista-navegacao");

botaoMenu.addEventListener("click", () => {
    listaNavegacao.classList.toggle("aberto");

    if (listaNavegacao.classList.contains("aberto")) {
        botaoMenu.setAttribute("aria-expanded", "true");
    } else {
        botaoMenu.setAttribute("aria-expanded", "false");
    }
});

const voltarTopo = document.querySelector("#voltar-topo");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        voltarTopo.classList.add("visivel");
    } else {
        voltarTopo.classList.remove("visivel");
    }
});

const formularioBusca = document.querySelector(".formulario-busca");
const campoBusca = document.querySelector("#campo-busca");
const mensagemBusca = document.querySelector("#mensagem-busca");

function limparBusca() {
    const cartoes = document.querySelectorAll("main article");

    for (const cartao of cartoes) {
        cartao.classList.remove("resultado-busca");
    }

    mensagemBusca.textContent = "";
}

formularioBusca.addEventListener("submit", (event) => {
    event.preventDefault();

    limparBusca();

    const termo = campoBusca.value.trim().toLowerCase();

    if (termo === "") {
        mensagemBusca.textContent = "Digite algo para buscar.";
        return;
    }

    const cartoes = document.querySelectorAll("main article");
    let encontrados = 0;

    for (const cartao of cartoes) {
        const tituloElemento = cartao.querySelector("h3");
        if (!tituloElemento) {
            continue;
        }
        const titulo = tituloElemento.textContent.toLowerCase();

        if (titulo.indexOf(termo) !== -1) {
            cartao.classList.add("resultado-busca");
            encontrados++;
        }
    }

    if (encontrados === 0) {
        mensagemBusca.textContent = `Nenhum resultado para "${campoBusca.value.trim()}" nesta página.`;
    } else {
        mensagemBusca.textContent = `${encontrados} resultado(s) para "${campoBusca.value.trim()}" nesta página.`;
    }
});

campoBusca.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        campoBusca.value = "";
        limparBusca();
    }
});