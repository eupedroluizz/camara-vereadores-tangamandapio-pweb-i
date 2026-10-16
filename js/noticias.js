const noticias = [
    {
        id: "noticia-1",
        titulo: "Projeto de Lei institui o \"Dia Municipal de Evitar a Fadiga\"",
        data: "23/09/2026",
        categoria: "Notícias do Legislativo",
        imagem: "../assets/img/news1.jpg",
        descricaoImagem: "Fotografia de crianças evitando a fadiga na escola",
        resumo: "A câmara aprovou por unanimidade o novo feriado municipal, incentivando o descanso dos trabalhadores locais.",
        texto: "O projeto, de autoria do vereador Jaiminho, foi votado na sessão ordinária de terça-feira. O feriado será comemorado todo ano e terá atividades de lazer na praça principal."
    },
    {
        id: "noticia-2",
        titulo: "Nova frota de bicicletas para a equipe dos correios",
        data: "21/09/2026",
        categoria: "Infraestrutura",
        imagem: "../assets/img/news2.jpeg",
        descricaoImagem: "Fotografia da praça principal de Tangamandápio com novas bicicletas",
        resumo: "O poder legislativo municipal aprovou o orçamento para aquisição de bicicletas com marcha para facilitar as entregas.",
        texto: "Ao todo serão compradas dez bicicletas. A entrega está prevista para o próximo mês e os carteiros também receberão capacetes e coletes refletivos."
    },
    {
        id: "noticia-3",
        titulo: "Professor Girafales lidera a busca pela reforma da escola municipal",
        data: "15/09/2026",
        categoria: "Educação",
        imagem: "../assets/img/professor_girafales_grande.png",
        descricaoImagem: "Fotografia do vereador Professor Girafales",
        resumo: "O projeto apresentado pelo Professor Girafales prevê a troca das carteiras e a pintura das salas de aula.",
        texto: "A reforma deve começar nas férias escolares para não atrapalhar as aulas. O projeto também prevê a criação de uma pequena biblioteca na escola."
    },
    {
        id: "noticia-4",
        titulo: "Vereadores discutem regras para aluguéis na vila",
        data: "10/09/2026",
        categoria: "Notícias do Legislativo",
        imagem: "../assets/img/seu_barriga_grande.jpg",
        descricaoImagem: "Fotografia do vereador Seu Barriga",
        resumo: "Audiência pública reuniu moradores e proprietários para debater o pagamento de aluguéis atrasados.",
        texto: "Durante a audiência foi sugerido o parcelamento das dívidas em até 14 meses. A proposta será analisada pelas comissões antes de ir para votação."
    }
];

const gradeNoticias = document.querySelector("#grade-noticias");
const filtroCategoria = document.querySelector("#filtro-categoria");
const contadorNoticias = document.querySelector("#contador-noticias");

function criarCartaoNoticia(noticia) {
    const cartao = document.createElement("article");
    cartao.classList.add("cartao-noticia");
    cartao.id = noticia.id;

    const imagem = document.createElement("img");
    imagem.classList.add("imagem-noticia");
    imagem.classList.add("img-responsiva");
    imagem.setAttribute("src", noticia.imagem);
    imagem.setAttribute("alt", noticia.descricaoImagem);

    const conteudo = document.createElement("div");
    conteudo.classList.add("conteudo-noticia");

    const data = document.createElement("span");
    data.classList.add("data-noticia");
    data.textContent = noticia.data + " | ";

    const categoria = document.createElement("span");
    categoria.classList.add("categoria-noticia");
    categoria.textContent = noticia.categoria;

    const titulo = document.createElement("h3");
    titulo.textContent = noticia.titulo;

    const resumo = document.createElement("p");
    resumo.textContent = noticia.resumo;

    const textoCompleto = document.createElement("p");
    textoCompleto.classList.add("texto-completo");
    textoCompleto.textContent = noticia.texto;

    const botao = document.createElement("button");
    botao.classList.add("botao-primario");
    botao.classList.add("botao-leia-mais");
    botao.setAttribute("type", "button");
    botao.setAttribute("aria-expanded", "false");
    botao.textContent = "Leia mais";

    conteudo.appendChild(data);
    conteudo.appendChild(categoria);
    conteudo.appendChild(titulo);
    conteudo.appendChild(resumo);
    conteudo.appendChild(textoCompleto);
    conteudo.appendChild(botao);

    cartao.appendChild(imagem);
    cartao.appendChild(conteudo);

    return cartao;
}

function mostrarNoticias() {
    const categoriaEscolhida = filtroCategoria.value;
    let quantidade = 0;

    gradeNoticias.textContent = "";

    for (const noticia of noticias) {
        if (categoriaEscolhida !== "todas" && noticia.categoria !== categoriaEscolhida) {
            continue;
        }

        gradeNoticias.appendChild(criarCartaoNoticia(noticia));
        quantidade++;
    }

    contadorNoticias.textContent = `${quantidade} notícia(s) encontrada(s).`;
}

filtroCategoria.addEventListener("change", mostrarNoticias);

gradeNoticias.addEventListener("click", (event) => {
    const botao = event.target.closest(".botao-leia-mais");

    if (!botao) {
        return;
    }

    const cartao = botao.closest("article");
    const textoCompleto = cartao.querySelector(".texto-completo");

    textoCompleto.classList.toggle("aberto");

    if (textoCompleto.classList.contains("aberto")) {
        botao.textContent = "Mostrar menos";
        botao.setAttribute("aria-expanded", "true");
    } else {
        botao.textContent = "Leia mais";
        botao.setAttribute("aria-expanded", "false");
    }
});

mostrarNoticias();
