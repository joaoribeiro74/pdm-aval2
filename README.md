# 📌 Testes em Aplicação React Native com Expo

Este projeto utiliza Jest para testes unitários e Maestro para testes End-to-End (E2E). Todos os testes foram executados em um emulador Android.

## 📦 Instalação das Dependências

Instalar as dependências do projeto:

```
npm install
```

## Instalar o Jest e o React Native Testing Library para testes unitários:

1. Instalar o Jest:

```
npx expo install jest-expo jest @types/jest -- --dev
```

2. Instalar o React Native Testing Library

```
npx expo install @testing-library/react-native -- --dev
```

3. Executar os testes unitários:

```
npm run test
```

## Instalar o Maestro para testes E2E (End-to-End):

1. Instalar o Maestro:

```
curl -fsSL "https://get.maestro.mobile.dev" | bash
```

3. Executar os testes E2E:

```
maestro test flows/example.yaml
```


# Descrição da solução

Esta aplicação foi construída com o objetivo de exibir e gerenciar informações de tênis, permitindo que os usuários visualizem os detalhes de cada item e realizem operações como edição e exclusão de registros. A solução foi desenvolvida utilizando React Native com o Expo. O Firebase foi integrado para fornecer funcionalidades como autenticação de usuários e armazenamento de dados em tempo real, assegurando a persistência e a sincronização dos dados.

Além disso, implementamos testes unitários e testes E2E para validar o funcionamento de componentes e a integração entre as funcionalidades da aplicação.

## Requisitos

### Diferença entre Testes Unitários e Testes E2E (End-to-End):

Testes unitários avaliam partes isoladas do código, como funções, componentes ou hooks, sem se preocupar com a integração com o restante do sistema. Eles garantem que cada unidade do sistema funcione corretamente, ajudando a manter a qualidade do software e reduzindo o risco de erros para os usuários finais.

Testes E2E (End-to-End) simulam a interação real do usuário com a aplicação, verificando fluxos completos, como login, navegação e preenchimento de formulários. Esses testes validam a integração entre diferentes componentes e sistemas, garantindo que o aplicativo funcione corretamente de ponta a ponta.

### Testes Unitários:

Foram implementados testes unitários para dois componentes principais da aplicação: `ViewSneaker` e `CardSneaker`.

Os testes validam funcionalidades cruciais como a renderização correta dos botões e interações com esses componentes, como a simulação de pressionamento de botões.

### 1. Testes para o componente `CardSneaker`:
- **Renderização sem detalhes**: Validamos se o componente renderiza o nome e a marca do tênis sem os detalhes adicionais.
- **Renderização com detalhes**: Verificamos se os detalhes como cor, tamanho e preço são renderizados quando a prop `showDetails` é verdadeira.
- **Imagem padrão**: Validamos se uma imagem padrão é exibida quando a URL da imagem do tênis não está presente.

### 2. Testes para o componente `ViewSneaker`:
- **Renderização de Botões**: Verificamos se os botões de editar e deletar aparecem corretamente.
- **Ação do botão Editar**: Validamos que o botão de editar chama a função `onEdit` com o `id` correto do sneaker.
- **Ação do botão Deletar**: Validamos que o alerta de confirmação de exclusão é disparado e que, ao confirmar, a função `onDelete` é chamada corretamente.


### Testes E2E:

Testes End-to-End foram realizados para garantir que a navegação e operações no app, como a criação, edição, exclusão de itens e logout, funcionem de maneira fluida e sem falhas.

### 1. Fluxo de navegação para criar um item:

- O teste simula a navegação para a tela de criação de um tênis, insere as informações necessárias.

### 2. Fluxo de navegação para editar um item:

- O teste simula a navegação para a tela de edição de um tênis, realiza a alteração de algum dado, e verifica se a alteração foi realizada corretamente.

### 3. Fluxo de navegação para deletar um item:

- O teste simula a navegação até o item a ser excluído, clica no botão de deletar e confirma a exclusão.

### 4. Fluxo de não deletar um item e realizar logout:

- O teste simula a navegação para excluir um item, mas escolhe não deletá-lo após o alerta de confirmação. Em seguida, realiza o logout da aplicação para garantir que a sessão seja finalizada corretamente.
