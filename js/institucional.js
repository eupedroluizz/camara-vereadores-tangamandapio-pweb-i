const botaoHistoria = document.querySelector("#botao-historia");
const textoHistoria = document.querySelector("#texto-historia");

if (botaoHistoria && textoHistoria) {
    botaoHistoria.addEventListener("click", () => {
        textoHistoria.classList.toggle("aberto");

        if (textoHistoria.classList.contains("aberto")) {
            botaoHistoria.textContent = "Mostrar menos";
            botaoHistoria.setAttribute("aria-expanded", "true");
        } else {
            botaoHistoria.textContent = "Saiba mais sobre nossa história";
            botaoHistoria.setAttribute("aria-expanded", "false");
        }
    });
}
