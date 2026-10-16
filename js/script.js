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