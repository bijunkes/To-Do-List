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

        const span = document.createElement("span");
        span.textContent = a.texto;
        if (a.concluida) span.style.textDecoration = "line-through";

        span.addEventListener("click", () => {
            a.concluida = !a.concluida;
            salvar();
            renderizar();
        });

        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.onclick = () => editar(i);

        const btnExcluir = document.createElement("button");
        btnExcluir.textContent = "Excluir";
        btnExcluir.onclick = () => excluir(i);


        li.append(span, btnEditar, btnExcluir);
        lista.appendChild(li);
    });
}

function excluir(i) {
    atividades.splice(i, 1);
    salvar();
    renderizar();
}

function editar(i) {
    const novoTexto = prompt("Editar:", atividades[i].texto);
    if (novoTexto && novoTexto.trim() !== "") {
        atividades[i].texto = novoTexto.trim();
        salvar();
        renderizar();
    }
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