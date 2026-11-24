describe("Suíte de Testes E2E com Cypress - Cafeteria Grão & Prosa", () => {
  beforeEach(() => {
    // Acessa a tela que está rodando
    cy.visit("/");
  });

  it("CT-CY-01: Deve carregar a tela de Login e capturar print", () => {
    cy.contains("Grão & Prosa").should("be.visible");
    cy.get('[data-cy="email"]').should("be.visible");
    cy.get('[data-cy="password"]').should("be.visible");
    cy.get('[data-cy="login-button"]').should("be.visible");
    cy.screenshot("cypress_01_tela_login");
  });

  it("CT-CY-02: Deve preencher credenciais, fazer login e acessar o Dashboard", () => {
    cy.get('[data-cy="email"]').type("gerente@graoeprosa.com.br");
    cy.get('[data-cy="password"]').type("Admin123*");
    cy.screenshot("cypress_02_login_preenchido");

    cy.get('[data-cy="login-button"]').click();

    cy.contains("Visão geral").should("be.visible");
    cy.contains("RESUMO DA OPERAÇÃO").should("be.visible");
    cy.get("table").should("be.visible");
    cy.screenshot("cypress_03_dashboard_visao_geral");
  });

  it("CT-CY-03: Deve abrir formulário e cadastrar um novo produto", () => {
    cy.get('[data-cy="login-button"]').click();

    cy.get('[data-cy="new-product"]').click();
    cy.contains("Adicionar produto").should("be.visible");
    cy.screenshot("cypress_04_formulario_novo_produto");

    cy.get('[data-cy="product-name"]').type("Mocha Artesanal com Canela");
    cy.get('[data-cy="product-category"]').select("Cafés");
    cy.get('[data-cy="product-price"]').type("13.50");
    cy.get('[data-cy="product-stock"]').type("25");
    cy.screenshot("cypress_05_preenchimento_novo_produto");

    cy.get('[data-cy="save-product"]').click();

    cy.contains("Visão geral").should("be.visible");
    cy.contains("Mocha Artesanal com Canela").should("be.visible");
    cy.contains("R$ 13,50").should("be.visible");
    cy.screenshot("cypress_06_produto_cadastrado_sucesso");
  });

  it("CT-CY-04: Deve editar um produto existente com sucesso", () => {
    cy.get('[data-cy="login-button"]').click();

    cy.get('[data-cy="edit-1"]').click();
    cy.contains("Editar produto").should("be.visible");

    cy.get('[data-cy="product-name"]').clear().type("Café Expresso Especial");
    cy.get('[data-cy="product-price"]').clear().type("8.50");
    cy.screenshot("cypress_07_formulario_edicao_produto");

    cy.get('[data-cy="save-product"]').click();

    cy.contains("Café Expresso Especial").should("be.visible");
    cy.contains("R$ 8,50").should("be.visible");
    cy.screenshot("cypress_08_produto_editado_sucesso");
  });

  it("CT-CY-05: Deve excluir um produto e atualizar a tabela", () => {
    cy.get('[data-cy="login-button"]').click();

    cy.get('[data-cy="delete-2"]').click();
    cy.screenshot("cypress_09_produto_excluido");
  });

  it("CT-CY-06: Deve filtrar produtos por categoria", () => {
    cy.get('[data-cy="login-button"]').click();

    cy.get("select").select("Doces");
    cy.screenshot("cypress_10_filtro_categoria_doces");
  });

  it("CT-CY-07 [BUG EVIDENCIADO]: Busca é estritamente case-sensitive", () => {
    cy.get('[data-cy="login-button"]').click();

    // Digita 'café' em minúsculas (falha em achar 'Café expresso')
    cy.get('[data-cy="search"]').type("café");
    cy.contains("Nenhum produto encontrado.").should("be.visible");
    cy.screenshot("cypress_11_bug_busca_case_sensitive");
  });
});
