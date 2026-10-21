# Sistema de Gerenciamento de Artigos

## 1. Apresentação

Este projeto consiste em uma aplicação web para cadastro, visualização, edição e exclusão de artigos. A interface foi desenvolvida com HTML, CSS e JavaScript puro, sem dependências externas, e utiliza o armazenamento local do navegador para preservar os dados durante a utilização da aplicação.

## 2. Objetivo

O sistema tem como objetivo oferecer uma solução simples para o gerenciamento de conteúdos editoriais, permitindo que o usuário registre artigos com título, imagem, resumo e texto completo. Os dados também podem ser exportados em formato JSON para utilização ou arquivamento posterior.

## 3. Funcionalidades

- Cadastro de novos artigos;
- Inclusão de imagens nos artigos;
- Exibição dos artigos em cartões;
- Visualização do conteúdo completo de um artigo;
- Edição dos dados cadastrados;
- Exclusão de artigos mediante confirmação;
- Persistência dos dados no `localStorage` do navegador;
- Carregamento inicial dos registros presentes em `artigos.json`;
- Exportação dos artigos cadastrados para um arquivo JSON.

## 4. Tecnologias Utilizadas

- HTML5;
- CSS3;
- JavaScript (ES6+);
- Web Storage API (`localStorage`);
- FileReader API, utilizada para a leitura das imagens selecionadas.

## 5. Estrutura do Projeto

```text
.
├── artigos.json   # Dados iniciais dos artigos
├── index.html     # Estrutura da interface
├── script.js      # Regras de negócio e manipulação dos dados
├── style.css      # Estilos da aplicação
└── README.md      # Documentação do projeto
```

## 6. Execução

1. Abra um terminal na pasta do projeto.
2. Inicie um servidor HTTP local. Por exemplo:

	```bash
	python3 -m http.server 8000
	```

3. Acesse `http://localhost:8000` em um navegador atualizado.

O uso de um servidor local é recomendado porque a aplicação realiza a leitura do arquivo `artigos.json` por meio da função `fetch`.

## 7. Utilização

Para cadastrar um artigo, preencha o título, selecione uma imagem, informe o resumo e insira o texto completo. Em seguida, selecione a opção de cadastro.

Cada artigo exibido possui opções para:

- Ler o conteúdo completo;
- Editar as informações cadastradas;
- Excluir o registro.

O botão de exportação gera um arquivo denominado `artigos.json` com os dados atualmente armazenados no navegador.

## 8. Armazenamento e Exportação

Na primeira execução, os dados são obtidos do arquivo `artigos.json`. Após o carregamento, ou após qualquer alteração realizada pelo usuário, os registros são armazenados no `localStorage`.

Enquanto os dados permanecerem apenas no armazenamento local, eles estarão vinculados ao navegador e à origem utilizada para acessar a aplicação. A limpeza dos dados do navegador pode removê-los. Para preservar ou transferir os registros, utilize a funcionalidade de exportação JSON.

## 9. Observações

Este projeto funciona exclusivamente no lado do cliente e não possui banco de dados, autenticação ou servidor de aplicação. As imagens são convertidas para Data URL antes de serem armazenadas, portanto recomenda-se utilizar arquivos de tamanho moderado.
