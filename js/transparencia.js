const licitacoes = [
    {
        processo: "Proc. 01/2026",
        objeto: "Aquisição de 10 bicicletas com marcha para serviços postais",
        valor: "R$ 18.000,00",
        data: "10/02/2026",
        status: "Concluída"
    },
    {
        processo: "Proc. 02/2026",
        objeto: "Reforma geral e pintura da Escola Municipal de Tangamandápio",
        valor: "R$ 85.000,00",
        data: "05/03/2026",
        status: "Homologada"
    },
    {
        processo: "Proc. 03/2026",
        objeto: "Fornecimento de papelaria e suprimentos de informática",
        valor: "R$ 4.200,00",
        data: "15/04/2026",
        status: "Concluída"
    },
    {
        processo: "Proc. 04/2026",
        objeto: "Fornecimento contínuo de água mineral, lanches e café para sessões",
        valor: "R$ 3.500,00",
        data: "20/05/2026",
        status: "Em andamento"
    },
    {
        processo: "Proc. 05/2026",
        objeto: "Manutenção preventiva de microcomputadores da secretaria legislativa",
        valor: "R$ 6.800,00",
        data: "12/06/2026",
        status: "Concluída"
    }
];

const corpoTabela = document.querySelector("#corpo-tabela-licitacoes");
const filtroStatus = document.querySelector("#filtro-status-licitacao");
const contadorLicitacoes = document.querySelector("#contador-licitacoes");

function criarLinhaLicitacao(item) {
    const tr = document.createElement("tr");

    const tdProcesso = document.createElement("td");
    tdProcesso.textContent = item.processo;

    const tdObjeto = document.createElement("td");
    tdObjeto.textContent = item.objeto;

    const tdValor = document.createElement("td");
    tdValor.textContent = item.valor;

    const tdData = document.createElement("td");
    tdData.textContent = item.data;

    const tdStatus = document.createElement("td");
    tdStatus.textContent = item.status;

    if (item.status === "Concluída") {
        tdStatus.classList.add("status-concluida");
    } else if (item.status === "Em andamento") {
        tdStatus.classList.add("status-andamento");
    } else if (item.status === "Homologada") {
        tdStatus.classList.add("status-homologada");
    }

    tr.appendChild(tdProcesso);
    tr.appendChild(tdObjeto);
    tr.appendChild(tdValor);
    tr.appendChild(tdData);
    tr.appendChild(tdStatus);

    return tr;
}

function mostrarLicitacoes() {
    const statusEscolhido = filtroStatus.value;
    let quantidade = 0;

    corpoTabela.textContent = "";

    for (const item of licitacoes) {
        if (statusEscolhido !== "todos" && item.status !== statusEscolhido) {
            continue;
        }

        corpoTabela.appendChild(criarLinhaLicitacao(item));
        quantidade++;
    }

    contadorLicitacoes.textContent = `${quantidade} processo(s) listado(s).`;
}

filtroStatus.addEventListener("change", mostrarLicitacoes);

mostrarLicitacoes();