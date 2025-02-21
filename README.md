## Testes unitários:

Avaliam partes isoladas do código, como funções, componentes ou hooks, sem se preocupar com a integração com o restante do sistema. Eles garantem que cada unidade do sistema funcione corretamente, ajudando a manter a qualidade do software e reduzindo o risco de erros para os usuários finais. 

## Testes E2E (End-to-End):

Simulam a interação real do usuário com a aplicação, verificando fluxos completos, como login, navegação e preenchimento de formulários. Esses testes validam a integração entre diferentes componentes e sistemas, garantindo que o aplicativo funcione corretamente de ponta a ponta.



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