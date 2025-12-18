const form = document.getElementById("form");
const atividade = document.getElementById("atividade");
const lista = document.getElementById("lista");

let atividades = JSON.parse(localStorage.getItem("atividades")) || [];
let filtroAtual = 'todas';

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const texto = atividade.value.trim();
    if (texto === "") return;

    atividades.push({
        texto: texto,
        concluida: false
    });

    atividade.value = "";

    salvar();
    renderizar();
});

function renderizar() {
    lista.innerHTML = "";

    atividades.filter(filtrarAtividades).forEach((a, i) => {
        const li = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = a.concluida;

        checkbox.addEventListener("click", () => {
            a.concluida = checkbox.checked;
            salvar();
            renderizar();
        });

        const span = document.createElement("span");
        span.textContent = a.texto;
        if (a.concluida) span.style.textDecoration = "line-through";

        const btnEditar = document.createElement("button");
        btnEditar.classList.add("material-icons", "icone");
        btnEditar.textContent = "edit";
        btnEditar.onclick = () => editar(i);

        const btnExcluir = document.createElement("button");
        btnExcluir.classList.add("material-icons", "icone");
        btnExcluir.textContent = "delete";
        btnExcluir.onclick = () => excluir(i);

        const acoes = document.createElement("div");
        acoes.classList.add("acoes");
        
        acoes.append(btnEditar, btnExcluir);
        li.append(checkbox, span, acoes);
        lista.appendChild(li);
    });
}

function excluir(i) {
    atividades.splice(i, 1);
    salvar();
    renderizar();
}

function editar(i) {
    const novoTexto = document.createElement("input");
    novoTexto.type = "text";
    novoTexto.value = atividades[i].texto;

    novoTexto.onblur = () => {
        atividades[i].texto = novoTexto.value.trim() || atividades[i].texto;
        salvar();
        renderizar();
    }

    novoTexto.onkeydown = (e) => {
        if (e.key === "Enter") novoTexto.blur();
    }

    lista.children[i].querySelector("span").replaceWith(novoTexto);
    novoTexto.focus();
}

function salvar() {
    localStorage.setItem("atividades", JSON.stringify(atividades));
}

function filtrar(tipo) {
    filtroAtual = tipo;
    renderizar();
}

function filtrarAtividades(atividade) {
    if (filtroAtual === "concluidas") return atividade.concluida;
    if (filtroAtual === "pendentes") return !atividade.concluida;
    return true;
}

renderizar();