const aviso = document.querySelector("#aviso");
const botaoFecharAviso = document.querySelector("#fechar-aviso");

if (aviso && botaoFecharAviso) {
    if (sessionStorage.getItem("avisoFechado") === "sim") {
        aviso.remove();
    } else {
        botaoFecharAviso.addEventListener("click", () => {
            aviso.remove();
            sessionStorage.setItem("avisoFechado", "sim");
        });
    }
}
