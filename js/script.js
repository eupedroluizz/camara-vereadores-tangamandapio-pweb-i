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