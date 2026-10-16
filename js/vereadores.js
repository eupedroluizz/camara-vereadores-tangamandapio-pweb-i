const vereadores = [
    {
        id: "jaiminho",
        nome: "Jaiminho, O Carteiro",
        cargo: "1º Secretário",
        partido: "Partido da Fadiga Zero (PFZ)",
        foto: "../assets/img/jaiminho.jpeg",
        telefone: "(00) 1234-5601",
        email: "jaiminho@tangamandapio.leg.mx",
        biografia: "Carteiro de Tangamandápio há mais de 30 anos. Defende melhores condições de trabalho para os servidores dos correios e a construção de ciclovias na cidade."
    },
    {
        id: "seu-barriga",
        nome: "Seu Barriga",
        cargo: "Vice-presidente",
        partido: "Partido dos Proprietários da Vila (PPV)",
        foto: "../assets/img/seu_barriga.jpg",
        telefone: "(00) 1234-5602",
        email: "seubarriga@tangamandapio.leg.mx",
        biografia: "Empresário e proprietário da vila. Seus projetos tratam da regularização de aluguéis e da conservação dos imóveis do município."
    },
    {
        id: "seu-madruga",
        nome: "Seu Madruga",
        cargo: "Vereador",
        partido: "Partido do Trabalhador Autônomo (PTA)",
        foto: "../assets/img/seu_madruga.png",
        telefone: "(00) 1234-5603",
        email: "seumadruga@tangamandapio.leg.mx",
        biografia: "Trabalhador autônomo, já foi sapateiro, carpinteiro e vendedor de churros. Luta pela geração de empregos e pelo parcelamento de dívidas dos moradores."
    },
    {
        id: "professor-girafales",
        nome: "Professor Girafales",
        cargo: "Presidente",
        partido: "Partido da Educação (PE)",
        foto: "../assets/img/professor_girafales.png",
        telefone: "(00) 1234-5604",
        email: "girafales@tangamandapio.leg.mx",
        biografia: "Professor da escola municipal há muitos anos. É autor de projetos voltados para a educação, a leitura e a reforma das escolas da cidade."
    }
];

let favoritos = [];

const gradeVereadores = document.querySelector("#grade-vereadores");
const campoFiltro = document.querySelector("#filtro-vereador");
const caixaFavoritos = document.querySelector("#somente-favoritos");
const contadorVereadores = document.querySelector("#contador-vereadores");

function criarCartaoVereador(vereador) {
    const cartao = document.createElement("article");
    cartao.classList.add("cartao-vereador");
    cartao.id = vereador.id;

    const foto = document.createElement("img");
    foto.classList.add("img-responsiva");
    foto.setAttribute("src", vereador.foto);
    foto.setAttribute("alt", "Foto do Vereador " + vereador.nome);

    const info = document.createElement("div");
    info.classList.add("info-vereador");

    const nome = document.createElement("h3");
    nome.textContent = vereador.nome;

    const partido = document.createElement("p");
    partido.classList.add("partido-vereador");
    partido.textContent = vereador.cargo + " - " + vereador.partido;

    const botaoPerfil = document.createElement("button");
    botaoPerfil.classList.add("botao-primario");
    botaoPerfil.classList.add("botao-perfil");
    botaoPerfil.setAttribute("type", "button");
    botaoPerfil.setAttribute("aria-expanded", "false");
    botaoPerfil.textContent = "Ver Perfil";

    const botaoFavorito = document.createElement("button");
    botaoFavorito.classList.add("botao-favorito");
    botaoFavorito.setAttribute("type", "button");
    botaoFavorito.setAttribute("aria-label", "Favoritar " + vereador.nome);

    if (favoritos.indexOf(vereador.id) !== -1) {
        botaoFavorito.classList.add("favorito");
        botaoFavorito.textContent = "★";
    } else {
        botaoFavorito.textContent = "☆";
    }

    const detalhes = document.createElement("div");
    detalhes.classList.add("detalhes-vereador");

    const biografia = document.createElement("p");
    biografia.textContent = vereador.biografia;

    const telefone = document.createElement("p");
    telefone.textContent = "Telefone: " + vereador.telefone;

    const email = document.createElement("p");
    email.textContent = "E-mail: " + vereador.email;

    detalhes.appendChild(biografia);
    detalhes.appendChild(telefone);
    detalhes.appendChild(email);

    info.appendChild(nome);
    info.appendChild(partido);
    info.appendChild(botaoPerfil);
    info.appendChild(botaoFavorito);
    info.appendChild(detalhes);

    cartao.appendChild(foto);
    cartao.appendChild(info);

    return cartao;
}

function mostrarVereadores(lista) {
    gradeVereadores.textContent = "";

    lista.forEach((vereador) => {
        gradeVereadores.appendChild(criarCartaoVereador(vereador));
    });

    if (lista.length === 0) {
        contadorVereadores.textContent = "Nenhum vereador encontrado.";
    } else {
        contadorVereadores.textContent = `Exibindo ${lista.length} de ${vereadores.length} vereadores.`;
    }
}

function filtrarVereadores() {
    const termo = campoFiltro.value.trim().toLowerCase();
    const resultado = [];

    for (const vereador of vereadores) {
        if (vereador.nome.toLowerCase().indexOf(termo) === -1) {
            continue;
        }

        if (caixaFavoritos.checked && favoritos.indexOf(vereador.id) === -1) {
            continue;
        }

        resultado.push(vereador);
    }

    mostrarVereadores(resultado);
}

campoFiltro.addEventListener("input", filtrarVereadores);
caixaFavoritos.addEventListener("change", filtrarVereadores);

gradeVereadores.addEventListener("click", (event) => {
    const botaoPerfil = event.target.closest(".botao-perfil");
    const botaoFavorito = event.target.closest(".botao-favorito");

    if (botaoPerfil) {
        const cartao = botaoPerfil.closest("article");
        const detalhes = cartao.querySelector(".detalhes-vereador");

        detalhes.classList.toggle("aberto");

        if (detalhes.classList.contains("aberto")) {
            botaoPerfil.textContent = "Ocultar Perfil";
            botaoPerfil.setAttribute("aria-expanded", "true");
        } else {
            botaoPerfil.textContent = "Ver Perfil";
            botaoPerfil.setAttribute("aria-expanded", "false");
        }
    }

    if (botaoFavorito) {
        const id = botaoFavorito.closest("article").id;
        const posicao = favoritos.indexOf(id);

        if (posicao === -1) {
            favoritos.push(id);
        } else {
            favoritos.splice(posicao, 1);
        }

        filtrarVereadores();
    }
});

mostrarVereadores(vereadores);
