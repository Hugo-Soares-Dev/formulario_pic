let artigos = [];

// Guarda a posição do artigo que está sendo editado.
// null significa que estamos fazendo um novo cadastro.
let edicao = null;

// Guarda a imagem original durante a edição.
let imagemAtual = null;

// ========================== CLASSE ARTIGO ==========================

class Artigo {
  constructor(titulo, img, resumo, texto) {
    this.titulo = titulo;
    this.img = img;
    this.resumo = resumo;
    this.texto = texto;
  }
}

// ========================== CARREGAR JSON ==========================

async function carregarArquivo() {
  try {
    const resposta = await fetch("artigos.json");

    if (!resposta.ok) {
      throw new Error("Não foi possível ler o arquivo artigos.json");
    }

    const dados = await resposta.json();

    artigos = dados.map(function (dado) {
      return new Artigo(dado.titulo, dado.img, dado.resumo, dado.texto);
    });

    salvarDados();
    renderizarArtigos();
  } catch (erro) {
    console.error("Erro ao carregar os artigos:", erro);
  }
}

// ========================== SALVAR DADOS ==========================

function salvarDados() {
  const dadosJson = JSON.stringify(artigos);
  localStorage.setItem("artigos", dadosJson);
}

// ========================== INICIAR SISTEMA ==========================

async function iniciarSistema() {
  const dadosSalvos = localStorage.getItem("artigos");

  if (dadosSalvos !== null) {
    const dados = JSON.parse(dadosSalvos);

    artigos = dados.map(function (dado) {
      return new Artigo(dado.titulo, dado.img, dado.resumo, dado.texto);
    });

    renderizarArtigos();
  } else {
    await carregarArquivo();
  }
}

// ========================== EXPORTAR JSON ==========================

function exportarJson() {
  const conteudoJson = JSON.stringify(artigos, null, 4);

  const arquivo = new Blob([conteudoJson], { type: "application/json" });

  const endereco = URL.createObjectURL(arquivo);

  const link = document.createElement("a");
  link.href = endereco;
  link.download = "artigos.json";

  document.body.appendChild(link);
  link.click();
  link.remove();

  setTimeout(function () {
    URL.revokeObjectURL(endereco);
  }, 1000);
}

// ========================== CRIAR E ATUALIZAR ==========================

const formArtigo = document.getElementById("formArtigo");

formArtigo.addEventListener("submit", function (event) {
  event.preventDefault();

  // Recupera os dados digitados no formulário.
  const titulo = document.getElementById("titulo").value.trim();
  const arquivoImagem = document.getElementById("img").files[0];
  const resumo = document.getElementById("resumo").value.trim();
  const texto = document.getElementById("texto").value.trim();

  // Em um cadastro novo, a imagem é obrigatória.
  if (edicao === null && !arquivoImagem) {
    alert("Selecione uma imagem para o artigo.");
    return;
  }

  // Função que cadastra ou atualiza o artigo.
  function salvarArtigo(imagem) {
    const novoArtigo = new Artigo(titulo, imagem, resumo, texto);

    if (edicao === null) {
      // CREATE: adiciona um novo artigo.
      artigos.push(novoArtigo);
    } else {
      // UPDATE: substitui o artigo editado.
      artigos[edicao] = novoArtigo;
    }

    // Salva e atualiza a página.
    salvarDados();
    renderizarArtigos();

    // Encerra a edição e limpa o formulário.
    edicao = null;
    imagemAtual = null;
    formArtigo.reset();

    document.getElementById("salvar").textContent = "Cadastrar artigo";
  }

  // Se uma nova imagem foi selecionada, lê o arquivo.
  if (arquivoImagem) {
    // Verifica se o arquivo é uma imagem.
    if (!arquivoImagem.type.startsWith("image/")) {
      alert("Selecione um arquivo de imagem válido.");
      return;
    }

    const leitor = new FileReader();

    leitor.onload = function (event) {
      // A imagem é convertida para uma string Data URL.
      const imagem = event.target.result;

      salvarArtigo(imagem);
    };

    leitor.onerror = function () {
      alert("Não foi possível ler a imagem selecionada.");
    };

    leitor.readAsDataURL(arquivoImagem);
  } else {
    // Se não escolheu outra imagem, mantém a imagem atual.
    salvarArtigo(imagemAtual);
  }
});

// ========================== LER (READ) ==========================

function renderizarArtigos() {
  const lista = document.getElementById("listaDeArtigos");

  lista.innerHTML = "";

  // Percorre os artigos de trás para frente.
  for (let indice = artigos.length - 1; indice >= 0; indice--) {
    const artigo = artigos[indice];

    const card = document.createElement("div");
    card.className = "artigo";

    // Imagem do artigo.
    const imagem = document.createElement("img");
    imagem.src = artigo.img;
    imagem.alt = artigo.titulo;

    // Título do artigo.
    const titulo = document.createElement("h3");
    titulo.textContent = artigo.titulo;

    // Resumo do artigo.
    const resumo = document.createElement("p");
    resumo.textContent = artigo.resumo;

    // Botão para ler o artigo.
    const botaoLer = document.createElement("button");
    botaoLer.textContent = "Ler artigo";

    botaoLer.addEventListener("click", function () {
      visualizarArtigo(indice);
    });

    // Botão para editar o artigo.
    const botaoEditar = document.createElement("button");
    botaoEditar.textContent = "Editar";

    botaoEditar.addEventListener("click", function () {
      editarArtigo(indice);
    });

    // Botão para excluir o artigo.
    const botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "Excluir";

    botaoExcluir.addEventListener("click", function () {
      excluirArtigo(indice);
    });

    // Adiciona os elementos ao card.
    card.appendChild(imagem);
    card.appendChild(titulo);
    card.appendChild(resumo);
    card.appendChild(botaoLer);
    card.appendChild(botaoEditar);
    card.appendChild(botaoExcluir);

    // Adiciona o card à página.
    lista.appendChild(card);
  }
}

// ========================== VISUALIZAR ARTIGO ==========================

function visualizarArtigo(indice) {
  const artigo = artigos[indice];

  alert(
    "Título: " +
      artigo.titulo +
      "\n\nResumo: " +
      artigo.resumo +
      "\n\nTexto: " +
      artigo.texto,
  );
}

// ========================== EXCLUIR (DELETE) ==========================

function excluirArtigo(indice) {
  const confirma = confirm("Deseja excluir este artigo?");

  if (confirma) {
    artigos.splice(indice, 1);

    // Ajusta ou encerra a edição, se necessário.
    if (edicao === indice) {
      edicao = null;
      imagemAtual = null;
      formArtigo.reset();

      document.getElementById("salvar").textContent = "Cadastrar artigo";
    } else if (edicao !== null && edicao > indice) {
      edicao--;
    }

    salvarDados();
    renderizarArtigos();
  }
}

// ========================== EDITAR (UPDATE) ==========================

function editarArtigo(indice) {
  const artigo = artigos[indice];

  // Preenche os campos de texto.
  document.getElementById("titulo").value = artigo.titulo;
  document.getElementById("resumo").value = artigo.resumo;
  document.getElementById("texto").value = artigo.texto;

  // Guarda a imagem atual para mantê-la se não houver troca.
  imagemAtual = artigo.img;

  // Não preenche o input file: o navegador não permite isso.
  document.getElementById("img").value = "";

  // Guarda qual artigo será atualizado.
  edicao = indice;

  document.getElementById("salvar").textContent = "Salvar alterações";

  formArtigo.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

// ========================== INICIAR ==========================

iniciarSistema();
