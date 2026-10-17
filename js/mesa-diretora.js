const membrosMesa = [
    {
        id: "girafales-mesa",
        nome: "Professor Girafales",
        cargo: "Presidente",
        partido: "Partido da Educação (PE)",
        foto: "../assets/img/professor_girafales.png",
        atribuicoes: "Preside as sessões plenárias, promulga resoluções, representa o poder legislativo em juízo e fora dele e coordena os trabalhos parlamentares."
    },
    {
        id: "barriga-mesa",
        nome: "Seu Barriga",
        cargo: "Vice-presidente",
        partido: "Partido dos Proprietários da Vila (PPV)",
        foto: "../assets/img/seu_barriga.jpg",
        atribuicoes: "Substitui o Presidente em suas ausências ou impedimentos eventuais e fiscaliza as finanças e o patrimônio da Câmara Municipal."
    },
    {
        id: "jaiminho-mesa",
        nome: "Jaiminho, O Carteiro",
        cargo: "1º Secretário",
        partido: "Partido da Fadiga Zero (PFZ)",
        foto: "../assets/img/jaiminho.jpeg",
        atribuicoes: "Responsável pela leitura das correspondências e atas, contagem das votações em plenário e despacho do expediente oficial para evitar a fadiga."
    },
    {
        id: "madruga-mesa",
        nome: "Seu Madruga",
        cargo: "2º Secretário",
        partido: "Partido do Trabalhador Autônomo (PTA)",
        foto: "../assets/img/seu_madruga.png",
        atribuicoes: "Substitui o 1º Secretário em suas faltas e auxilia na verificação de quórum e redação das atas das sessões ordinárias."
    }
];

const gradeMesa = document.querySelector("#grade-mesa");
const filtroCargo = document.querySelector("#filtro-cargo");
const contadorMesa = document.querySelector("#contador-mesa");

function criarCartaoMesa(membro) {
    const cartao = document.createElement("article");
    cartao.classList.add("cartao-vereador");
    cartao.id = membro.id;

    const foto = document.createElement("img");
    foto.classList.add("img-responsiva");
    foto.setAttribute("src", membro.foto);
    foto.setAttribute("alt", "Foto do " + membro.cargo + " " + membro.nome);

    const info = document.createElement("div");
    info.classList.add("info-vereador");

    const nome = document.createElement("h3");
    nome.textContent = membro.nome;

    const partido = document.createElement("p");
    partido.classList.add("partido-vereador");
    partido.textContent = membro.cargo + " - " + membro.partido;

    const botaoAtribuicoes = document.createElement("button");
    botaoAtribuicoes.classList.add("botao-primario");
    botaoAtribuicoes.classList.add("botao-perfil");
    botaoAtribuicoes.setAttribute("type", "button");
    botaoAtribuicoes.setAttribute("aria-expanded", "false");
    botaoAtribuicoes.textContent = "Ver Atribuições";

    const detalhes = document.createElement("div");
    detalhes.classList.add("detalhes-vereador");

    const atribuicoes = document.createElement("p");
    atribuicoes.textContent = membro.atribuicoes;

    detalhes.appendChild(atribuicoes);

    info.appendChild(nome);
    info.appendChild(partido);
    info.appendChild(botaoAtribuicoes);
    info.appendChild(detalhes);

    cartao.appendChild(foto);
    cartao.appendChild(info);

    return cartao;
}

function mostrarMembros(lista) {
    gradeMesa.textContent = "";

    for (const membro of lista) {
        gradeMesa.appendChild(criarCartaoMesa(membro));
    }

    contadorMesa.textContent = `${lista.length} integrante(s) exibido(s).`;
}

function filtrarMesa() {
    const cargoEscolhido = filtroCargo.value;

    if (cargoEscolhido === "todos") {
        mostrarMembros(membrosMesa);
        return;
    }

    const resultado = [];
    for (const membro of membrosMesa) {
        if (membro.cargo === cargoEscolhido) {
            resultado.push(membro);
        }
    }

    mostrarMembros(resultado);
}

filtroCargo.addEventListener("change", filtrarMesa);

gradeMesa.addEventListener("click", (event) => {
    const botao = event.target.closest(".botao-perfil");

    if (!botao) {
        return;
    }

    const cartao = botao.closest("article");
    const detalhes = cartao.querySelector(".detalhes-vereador");

    detalhes.classList.toggle("aberto");

    if (detalhes.classList.contains("aberto")) {
        botao.textContent = "Ocultar Atribuições";
        botao.setAttribute("aria-expanded", "true");
    } else {
        botao.textContent = "Ver Atribuições";
        botao.setAttribute("aria-expanded", "false");
    }
});

mostrarMembros(membrosMesa);
