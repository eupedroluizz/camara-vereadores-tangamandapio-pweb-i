const leis = [
    {
        id: "lei-101",
        tipo: "Lei Ordinária",
        numero: "Lei nº 101/2026",
        data: "23/09/2026",
        titulo: "Institui o \"Dia Municipal de Evitar a Fadiga\"",
        ementa: "Fica instituído no calendário oficial do município o Dia de Evitar a Fadiga, promovendo o descanso e a qualidade de vida aos trabalhadores locais.",
        textoCompleto: "Art. 1º Fica instituído o dia 23 de setembro como o Dia Municipal de Evitar a Fadiga. Art. 2º O Poder Executivo apoiará atividades de recreação e repouso na praça central. Art. 3º Esta Lei entra em vigor na data de sua publicação."
    },
    {
        id: "lei-102",
        tipo: "Lei Ordinária",
        numero: "Lei nº 102/2026",
        data: "21/09/2026",
        titulo: "Incentivo e modernização da frota postal ciclística",
        ementa: "Autoriza o Poder Legislativo e Executivo a adquirir bicicletas ergonômicas com marcha para os profissionais dos correios e entregadores.",
        textoCompleto: "Art. 1º Fica autorizada a renovação da frota de bicicletas com marcha para serviços de entrega. Art. 2º Os condutores receberão kits de segurança e manutenção periódica. Art. 3º Revogam-se as disposições em contrário."
    },
    {
        id: "lei-103",
        tipo: "Lei Ordinária",
        numero: "Lei nº 103/2026",
        data: "15/09/2026",
        titulo: "Plano de Manutenção e Reforma da Escola Municipal",
        ementa: "Dispõe sobre a reforma estrutural, pintura e aquisição de novas carteiras e livros didáticos para a Escola Municipal de Tangamandápio.",
        textoCompleto: "Art. 1º Fica criado o plano de melhoria das salas de aula municipais. Art. 2º A execução ocorrerá preferencialmente durante os períodos de recesso escolar. Art. 3º Esta lei entra em vigor imediatamente."
    },
    {
        id: "decreto-14",
        tipo: "Decreto Legislativo",
        numero: "Decreto nº 14/2026",
        data: "10/09/2026",
        titulo: "Regulamenta o parcelamento de débitos locatícios residenciais",
        ementa: "Estabelece condições especiais para mediação e parcelamento voluntário de aluguéis em atraso para moradores da vila.",
        textoCompleto: "Art. 1º Os débitos de locação residencial poderão ser objeto de mediação comunitária para parcelamento em até 14 meses sem juros punitivos. Art. 2º Este decreto produz efeitos a partir da publicação."
    },
    {
        id: "decreto-15",
        tipo: "Decreto Legislativo",
        numero: "Decreto nº 15/2026",
        data: "01/09/2026",
        titulo: "Concede Título de Cidadão Benemérito a Jaime Garabito",
        ementa: "Outorga honraria ao carteiro Jaiminho em reconhecimento aos mais de trinta anos de dedicação exemplar ao serviço público de Tangamandápio.",
        textoCompleto: "Art. 1º É concedido o Título de Cidadão Benemérito ao ilustre senhor Jaime Garabito (Jaiminho). Art. 2º A entrega ocorrerá em sessão solene no plenário municipal."
    },
    {
        id: "resolucao-01",
        tipo: "Resolução",
        numero: "Resolução nº 01/2026",
        data: "18/08/2026",
        titulo: "Atualização do Regimento Interno da Câmara de Tangamandápio",
        ementa: "Reformula as diretrizes de funcionamento das sessões ordinárias, horário do expediente e tramitação das proposições dos vereadores.",
        textoCompleto: "Art. 1º O Regimento Interno da Câmara Municipal passa a vigorar com novos intervalos para descanso dos parlamentares e servidores. Art. 2º As sessões acontecerão às quintas-feiras."
    }
];

const gradeLeis = document.querySelector("#grade-leis");
const filtroTipoLei = document.querySelector("#filtro-tipo-lei");
const buscaLei = document.querySelector("#busca-lei");
const contadorLeis = document.querySelector("#contador-leis");
const ultimaLeiElemento = document.querySelector("#ultima-lei");

function mostrarUltimaLei() {
    if (!ultimaLeiElemento) {
        return;
    }
    const numero = getCookie("ultimaLei");
    if (numero) {
        ultimaLeiElemento.textContent = "Última norma consultada: " + numero;
    }
}

function criarCartaoLei(lei) {
    const cartao = document.createElement("article");
    cartao.classList.add("cartao-lei");
    cartao.id = lei.id;

    const topo = document.createElement("div");
    topo.classList.add("topo-cartao-lei");

    const etiqueta = document.createElement("span");
    etiqueta.classList.add("etiqueta-lei");
    etiqueta.textContent = lei.tipo;

    const data = document.createElement("span");
    data.classList.add("data-lei");
    data.textContent = lei.data;

    topo.appendChild(etiqueta);
    topo.appendChild(data);

    const titulo = document.createElement("h3");
    titulo.textContent = lei.numero + " - " + lei.titulo;

    const ementa = document.createElement("p");
    ementa.textContent = lei.ementa;

    const botaoEmenta = document.createElement("button");
    botaoEmenta.classList.add("botao-primario");
    botaoEmenta.classList.add("botao-ementa");
    botaoEmenta.setAttribute("type", "button");
    botaoEmenta.setAttribute("aria-expanded", "false");
    botaoEmenta.textContent = "Ver Texto Completo";

    const detalhes = document.createElement("div");
    detalhes.classList.add("detalhes-lei");

    const textoCompleto = document.createElement("p");
    textoCompleto.textContent = lei.textoCompleto;

    detalhes.appendChild(textoCompleto);

    cartao.appendChild(topo);
    cartao.appendChild(titulo);
    cartao.appendChild(ementa);
    cartao.appendChild(botaoEmenta);
    cartao.appendChild(detalhes);

    return cartao;
}

function filtrarLeis() {
    const tipoEscolhido = filtroTipoLei.value;
    const termo = buscaLei.value.trim().toLowerCase();
    let quantidade = 0;

    gradeLeis.textContent = "";

    for (const lei of leis) {
        if (tipoEscolhido !== "todas" && lei.tipo !== tipoEscolhido) {
            continue;
        }

        if (termo !== "") {
            const noTitulo = lei.titulo.toLowerCase().indexOf(termo) !== -1;
            const naEmenta = lei.ementa.toLowerCase().indexOf(termo) !== -1;
            const noNumero = lei.numero.toLowerCase().indexOf(termo) !== -1;

            if (!noTitulo && !naEmenta && !noNumero) {
                continue;
            }
        }

        gradeLeis.appendChild(criarCartaoLei(lei));
        quantidade++;
    }

    contadorLeis.textContent = `${quantidade} norma(s) encontrada(s).`;
}

filtroTipoLei.addEventListener("change", filtrarLeis);
buscaLei.addEventListener("input", filtrarLeis);

gradeLeis.addEventListener("click", (event) => {
    const botao = event.target.closest(".botao-ementa");

    if (!botao) {
        return;
    }

    const cartao = botao.closest("article");
    const detalhes = cartao.querySelector(".detalhes-lei");

    detalhes.classList.toggle("aberto");

    if (detalhes.classList.contains("aberto")) {
        botao.textContent = "Ocultar Texto Completo";
        botao.setAttribute("aria-expanded", "true");

        for (const lei of leis) {
            if (lei.id === cartao.id) {
                setCookie("ultimaLei", lei.numero, 30);
                mostrarUltimaLei();
                break;
            }
        }
    } else {
        botao.textContent = "Ver Texto Completo";
        botao.setAttribute("aria-expanded", "false");
    }
});

mostrarUltimaLei();
filtrarLeis();
