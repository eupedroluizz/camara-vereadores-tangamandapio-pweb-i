function setCookie(nome, valor, dias) {
    const d = new Date();
    d.setTime(d.getTime() + (dias * 24 * 60 * 60 * 1000));
    document.cookie = `${nome}=${valor};expires=${d.toUTCString()};path=/`;
}

function getCookie(nome) {
    const nomeEQ = nome + "=";
    const cookies = document.cookie.split(";");

    for (let c of cookies) {
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if (c.indexOf(nomeEQ) == 0) {
            return c.substring(nomeEQ.length, c.length);
        }
    }
    return null;
}

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

    const cartoes = document.querySelectorAll("main article, .cartao-numero, .tabela-dados tbody tr");
    let encontrados = 0;

    for (const cartao of cartoes) {
        const img = cartao.querySelector("img");
        const textoAlt = img ? (img.getAttribute("alt") || "") : "";

        const secaoPai = cartao.closest("section");
        const tituloSecao = secaoPai && secaoPai.querySelector("h2") ? secaoPai.querySelector("h2").textContent : "";

        const conteudoCompleto = `${cartao.textContent} ${textoAlt} ${tituloSecao}`.toLowerCase();

        if (conteudoCompleto.includes(termo)) {
            cartao.classList.add("resultado-busca");

            if (encontrados === 0) {
                cartao.scrollIntoView({ behavior: "smooth", block: "center" });
            }
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