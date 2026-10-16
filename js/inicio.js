const aviso = document.querySelector("#aviso");
const botaoFecharAviso = document.querySelector("#fechar-aviso");

if (aviso && botaoFecharAviso) {
    botaoFecharAviso.addEventListener("click", () => {
        aviso.remove();
    });
}