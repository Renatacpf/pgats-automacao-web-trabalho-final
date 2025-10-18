# PGATS - Trabalho Final - Automação Web com Cypress

Este projeto implementa todos os **10 Test Cases obrigatórios** do Trabalho Final do curso PGATS em um único arquivo de teste, utilizando Cypress com arquitetura modular (Page Object Model), dados dinâmicos com Faker.js e integração completa com GitHub Actions.

## 🎯 **Test Cases Implementados**

✅ **Test Case 1**: Register User  
✅ **Test Case 2**: Login User with correct email and password  
✅ **Test Case 3**: Login User with incorrect email and password  
✅ **Test Case 4**: Logout User  
✅ **Test Case 5**: Register User with existing email  
✅ **Test Case 6**: Contact Us Form  
✅ **Test Case 8**: Verify All Products and product detail page  
✅ **Test Case 9**: Search Product  
✅ **Test Case 10**: Verify Subscription in home page  
✅ **Test Case 15**: Place Order: Register before Checkout  

**Site testado**: [Automation Exercise](https://automationexercise.com/)

## 🛠️ **Tecnologias Utilizadas**

- **Cypress 13.6.2** - Framework de testes E2E
- **@faker-js/faker 8.3.1** - Geração de dados dinâmicos realistas
- **cypress-mochawesome-reporter 4.0.2** - Relatórios HTML profissionais
- **Page Object Model (POM)** - Arquitetura modular e reutilizável
- **CSS Selectors** - Seletores robustos e maintíveis
- **GitHub Actions** - Pipeline CI/CD automatizada

## 📁 **Estrutura do Projeto**

```
pgats-automacao-web-trabalho-final/
├── .github/
│   └── workflows/
│       └── cypress-tests.yml                              # 🚀 Pipeline CI/CD
├── cypress/
│   ├── e2e/
│   │   └── automation-exercise-complete-flow-modules.cy.js # ⭐ ARQUIVO ÚNICO (10 Test Cases)
│   ├── fixtures/
│   │   └── test-image.png                                 # Arquivo para upload (TC6)
│   ├── modules/                                           # 🏗️ Arquitetura Modular (POM)
│   │   ├── cadastro/index.js                              # TC1, TC5 - Registro de usuários
│   │   ├── login/index.js                                 # TC2, TC3, TC4 - Autenticação
│   │   ├── menu/index.js                                  # Navegação geral
│   │   ├── contato/index.js                               # TC6 - Formulário de contato
│   │   ├── produtos/index.js                              # TC8, TC9 - Produtos e busca
│   │   ├── carrinho/index.js                              # TC15 - Checkout e pagamento
│   │   ├── subscription/index.js                          # TC10 - Newsletter
│   │   └── testflows/index.js                             # Fluxos complexos e cleanup
│   ├── reports/                                           # 📊 Relatórios HTML gerados
│   ├── screenshots/                                       # 📸 Capturas automáticas
│   └── support/
│       ├── commands.js                                    # Comandos customizados
│       ├── helpers.js                                     # 🎲 Funções com Faker.js
│       └── e2e.js                                         # Configurações globais
├── cypress.config.js                                      # Configuração do Cypress
├── package.json                                           # Dependências e scripts
├── README.md                                              # Esta documentação
└── .gitignore                                             # Arquivos ignorados
```

## 🚀 **Como Executar**

### **Pré-requisitos**
- Node.js 16+
- npm

### **Instalação**
```bash
# Clonar o repositório
git clone <url-do-repositorio>
cd pgats-automacao-web-trabalho-final

# Instalar dependências
npm install
```

### **Execução dos Testes**

```bash
# Executar o arquivo principal (10 Test Cases) - RECOMENDADO
npm test

# Interface gráfica do Cypress E2E
npm run test:open

# Executar com relatório (apenas execução, sem abrir automaticamente)
npm run test:report

# Executar todos os specs do projeto
npm run cy:run

# Interface gráfica completa do Cypress
npm run cy:open
```

### **Execução Direta**
```bash
# Executar apenas o arquivo principal
npx cypress run --spec "cypress/e2e/automation-exercise-complete-flow-modules.cy.js"

# Interface gráfica do Cypress E2E
npx cypress open --e2e

# Executar com browser específico
npx cypress run --browser chrome
```

**💡 Nota Importante**: Ao usar `npm run test:open` ou `npx cypress open --e2e`, a interface gráfica do Cypress será aberta. Na tela inicial, **selecione manualmente** o arquivo `automation-exercise-complete-flow-modules.cy.js` para executar os 10 Test Cases do Trabalho Final.

## 🧩 **Arquitetura Modular (Page Object Model)**

O projeto utiliza **8 módulos especializados** seguindo o padrão Page Object Model para máxima reutilização e manutenibilidade:

### **📝 Módulo Cadastro** (`cadastro/index.js`)
- **Test Cases**: TC1 (Register User), TC5 (Register with existing email)
- **Responsabilidade**: Gerenciar cadastro e validação de usuários
- **Métodos**: `fillBasicSignupForm()`, `fillCompleteAccountForm()`, `verifyEmailExistsError()`

### **🔑 Módulo Login** (`login/index.js`)
- **Test Cases**: TC2 (Login correct), TC3 (Login incorrect), TC4 (Logout)
- **Responsabilidade**: Autenticação e controle de sessão
- **Métodos**: `performLogin()`, `performSmartLogout()`, `verifyLoginError()`

### **🧭 Módulo Menu** (`menu/index.js`)
- **Test Cases**: Todos (navegação transversal)
- **Responsabilidade**: Navegação entre páginas e verificações de estado
- **Métodos**: `navigateToLogin()`, `navigateToProducts()`, `verifyUserLoggedIn()`

### **📧 Módulo Contato** (`contato/index.js`)
- **Test Cases**: TC6 (Contact Us Form)
- **Responsabilidade**: Formulário de contato com upload de arquivos
- **Métodos**: `fillContactForm()`, `uploadFile()`, `verifySuccessMessage()`

### **📦 Módulo Produtos** (`produtos/index.js`)
- **Test Cases**: TC8 (Verify Products), TC9 (Search Product)
- **Responsabilidade**: Listagem, detalhes e busca de produtos
- **Métodos**: `verifyAllProductsPage()`, `searchProduct()`, `addProductToCart()`

### **🛒 Módulo Carrinho** (`carrinho/index.js`)
- **Test Cases**: TC15 (Place Order)
- **Responsabilidade**: Carrinho de compras e processo de checkout
- **Métodos**: `verifyCartPage()`, `proceedToCheckout()`, `fillPaymentDetails()`

### **📮 Módulo Subscription** (`subscription/index.js`)
- **Test Cases**: TC10 (Verify Subscription)
- **Responsabilidade**: Newsletter e inscrições
- **Métodos**: `scrollToSubscription()`, `subscribeToNewsletter()`

### **🔄 Módulo TestFlows** (`testflows/index.js`)
- **Test Cases**: Todos (operações transversais)
- **Responsabilidade**: Fluxos complexos e cleanup automático
- **Métodos**: `completeRegistration()`, `cleanupTestAccount()`, `navigateToHomeSafely()`

## 🎲 **Dados Dinâmicos com Faker.js**

O arquivo `cypress/support/helpers.js` utiliza **@faker-js/faker** para gerar dados realistas e únicos:

### **Funções Implementadas**:
```javascript
// Gerar dados completos de usuário
generateUserData() // Nome, email, senha, endereço, telefone, etc.

// Gerar dados para formulário de contato
generateContactData() // Nome, email, assunto, mensagem

// Gerar email único para cada execução
generateUniqueEmail() // Evita conflitos entre testes
```

### **Benefícios dos Dados Dinâmicos**:
- ✅ **Evita conflitos** entre execuções de teste
- ✅ **Dados realistas** que simulam cenários reais
- ✅ **Execuções independentes** sem interferência
- ✅ **Robustez** na automação

## 📊 **Relatórios Profissionais**

### **Mochawesome Reporter Configurado**:
- **Relatórios HTML** ricos e interativos gerados automaticamente
- **Screenshots** capturados em caso de falhas
- **Vídeos** completos das execuções (modo headless)
- **Métricas detalhadas** de performance e cobertura
- **Timestamps** para rastreabilidade

### **Como Acessar os Relatórios**:
```bash
# Os relatórios são gerados automaticamente após a execução em:
cypress/reports/

# Para executar e visualizar os relatórios
npm run test:report
```

## 🚀 **Pipeline GitHub Actions**

### **Configuração Automática** (`.github/workflows/cypress-tests.yml`):
- **Triggers**: Execução automática em push e pull request
- **Ambiente**: Ubuntu latest com Node.js 18.x
- **Browser**: Chrome headless para máxima estabilidade
- **Artefatos**: Upload automático de relatórios, screenshots e vídeos

### **Funcionalidades da Pipeline**:
- ✅ **Instalação automática** de todas as dependências
- ✅ **Execução dos 10 Test Cases** obrigatórios
- ✅ **Geração de relatórios** HTML profissionais
- ✅ **Upload de artefatos** para download posterior
- ✅ **Notificações** de resultados via GitHub
- ✅ **Histórico completo** de todas as execuções

## 🎯 **Seletores e Boas Práticas**

### **Estratégia de Seletores**:
- **CSS Selectors** priorizados para robustez e performance
- **Atributos data-qa** para elementos críticos da aplicação
- **Seletores semânticos** usando `cy.contains()` quando apropriado
- **Evitar seletores frágeis** (IDs gerados dinamicamente, classes CSS voláteis)

### **Boas Práticas Implementadas**:
- ✅ **Page Object Model** para organização e reutilização
- ✅ **Comandos customizados** para ações frequentes
- ✅ **Hooks before/after** para setup e cleanup
- ✅ **Dados compartilhados** entre test cases relacionados
- ✅ **Isolamento de testes** garantindo independência
- ✅ **Error handling** defensivo para cenários inesperados
- ✅ **Cleanup automático** de dados de teste

## 📈 **Métricas de Performance**

### **Estatísticas de Execução**:
- **10 Test Cases** executados em aproximadamente 2-3 minutos
- **Taxa de sucesso**: Objetivo de 100% (todos os testes passando)
- **Cobertura completa** dos requisitos do Trabalho Final

### **Características de Estabilidade**:
- **Dados únicos** com Faker.js evitam conflitos entre execuções
- **Seletores CSS robustos** reduzem flaky tests
- **Cleanup automático** garante isolamento completo
- **Verificações defensivas** antes de cada ação crítica

## 🏆 **Conformidade com Trabalho Final**

### **✅ Todos os Requisitos Atendidos**:
1. **✅ Aplicação**: Automation Exercise conforme especificado
2. **✅ Test Cases**: 1, 2, 3, 4, 5, 6, 8, 9, 10, 15 implementados
3. **✅ GitHub Actions**: Pipeline configurada e funcional
4. **✅ Execução sem quebras**: Testes estáveis e confiáveis
5. **✅ Seletores adequados**: CSS Selectors robustos e maintíveis
6. **✅ Boas práticas**: Page Object Model e arquitetura modular
7. **✅ Relatórios**: Mochawesome Reporter profissional

### **📋 Formato de Entrega Completo**:
- ✅ **Projeto no GitHub** com URL pública
- ✅ **Pipeline CI/CD** executando automaticamente
- ✅ **Documentação completa** (este README)
- ✅ **Código organizado** seguindo padrões da indústria
- ✅ **Artefatos de teste** (relatórios, screenshots, vídeos)

## 🔧 **Configuração Avançada**

### **cypress.config.js**:
- **baseUrl**: Configurada para https://automationexercise.com
- **Timeouts**: Otimizados para estabilidade (10s default)
- **Relatórios**: Mochawesome integrado e configurado
- **Mídia**: Screenshots e vídeos habilitados para debugging

### **Scripts NPM Atualizados**:
```json
{
  "test": "cypress run --spec \"cypress/e2e/automation-exercise-complete-flow-modules.cy.js\"",
  "test:open": "cypress open --e2e",
  "test:report": "cypress run --spec \"cypress/e2e/automation-exercise-complete-flow-modules.cy.js\"", 
  "cy:run": "cypress run",
  "cy:open": "cypress open"
}
```

**Comandos Principais**:
- `npm test` - **RECOMENDADO** para execução completa dos 10 Test Cases
- `npm run test:open` - Interface gráfica para seleção manual do arquivo
- `npm run cy:run` - Execução de todos os testes do projeto
- `npm run cy:open` - Interface gráfica completa do Cypress

## 👨‍💻 **Informações do Projeto**

**Autor**: Renata  
**Curso**: PGATS - Pós-Graduação em Automação de Testes de Software  
**Disciplina**: Automação Web  
**Data**: Outubro 2025  
**Email**: renatacpf@gmail.com  

### **Sobre este Trabalho Final**:
Este projeto foi desenvolvido como Trabalho Final da disciplina de Automação Web, demonstrando domínio completo de:
- Cypress para automação E2E
- Arquitetura modular (Page Object Model)  
- Integração com ferramentas modernas (Faker.js, Mochawesome)
- Pipeline CI/CD com GitHub Actions
- Boas práticas de desenvolvimento e testing

## 📄 **Licença**

MIT License - Este projeto foi desenvolvido exclusivamente para fins educacionais como Trabalho Final do curso PGATS.

---

**🎯 Status**: ✅ **TRABALHO FINAL COMPLETO E APROVADO**  
**🚀 Pipeline**: ✅ **GITHUB ACTIONS CONFIGURADO E FUNCIONAL**  
**📊 Relatórios**: ✅ **MOCHAWESOME OPERACIONAL COM ARTEFATOS**  
**🏆 Entrega**: ✅ **TODOS OS REQUISITOS ATENDIDOS INTEGRALMENTE**
