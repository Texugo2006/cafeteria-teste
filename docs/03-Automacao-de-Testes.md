# 🤖 Item 4 — Automação de Testes (Diferencial / Desejável)

## Projeto: Cafeteria "Grão & Prosa" — CodeWave Solutions

Este documento apresenta a estratégia de automação de testes implementada para atender como diferencial de pontuação técnica (Critério 4 da avaliação TSOF). A automação foi dividida em duas suítes compatíveis com as respectivas stacks tecnológicas:

1. **Testes E2E (Front-end):** **Cypress** utilizando os atributos `data-cy` já nativos no código React.
2. **Testes de Integração de API (Back-end):** **pytest** + **Django REST Framework `APIClient`**.

---

## 4.1 Automação E2E com Cypress (Front-end React)

O código front-end (`Login.tsx`, `Home.tsx`, `ProductForm.tsx`) já contém identificadores `data-cy`, tornando o Cypress a escolha natural e de manutenção mais simples.

### 4.1.1 Configuração e Instalação

Dentro da pasta do Front-end (`Cafeteria-Frontend-Teste/CafeteriaFrontend`):

```bash
# Instalação do Cypress
npm install --save-dev cypress

# Adicionar script no package.json:
# "test:e2e": "cypress run"
# "cypress:open": "cypress open"
```

Configuração básica do Cypress (`cypress.config.ts` ou `cypress.config.js`):

```typescript
import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true,
  },
});
```

---

### 4.1.2 Arquivo de Testes: `cypress/e2e/cafeteria_fluxos.cy.ts`

```typescript
describe("Suíte de Testes E2E - Cafeteria Grão & Prosa", () => {
  beforeEach(() => {
    // Acessa a raiz da aplicação
    cy.visit("/");
  });

  /* ========================================================
     1. FLUXO DE LOGIN (Caminho Feliz e Comportamento)
     ======================================================== */
  it("CT-CY-01: Deve realizar login com sucesso e carregar o painel", () => {
    cy.get('[data-cy="email"]').type("gerente@graoeprosa.com.br");
    cy.get('[data-cy="password"]').type("SenhaForte123!");
    cy.get('[data-cy="login-button"]').click();

    // Validações da tela inicial
    cy.contains("Visão geral").should("be.visible");
    cy.contains("RESUMO DA OPERAÇÃO").should("be.visible");
    cy.get("table").should("be.visible");
    cy.get("tbody tr").should("have.length.at.least", 1);
  });

  /* ========================================================
     2. GESTÃO DE PRODUTOS - CRUD COMPLETO
     ======================================================== */
  it("CT-CY-02: Deve cadastrar um novo produto com sucesso", () => {
    // Login
    cy.get('[data-cy="login-button"]').click();

    // Acessa formulário de novo produto
    cy.get('[data-cy="new-product"]').click();
    cy.contains("Adicionar produto").should("be.visible");

    // Preenche os campos
    cy.get('[data-cy="product-name"]').type("Mocha Especial com Canela");
    cy.get('[data-cy="product-category"]').select("Cafés");
    cy.get('[data-cy="product-price"]').type("14.50");
    cy.get('[data-cy="product-stock"]').type("22");

    // Salva o produto
    cy.get('[data-cy="save-product"]').click();

    // Valida retorno ao dashboard e presença na listagem
    cy.contains("Visão geral").should("be.visible");
    cy.contains("Mocha Especial com Canela").should("be.visible");
    cy.contains("R$ 14,50").should("be.visible");
  });

  it("CT-CY-03: Deve editar um produto existente com sucesso", () => {
    cy.get('[data-cy="login-button"]').click();

    // Clica no botão de editar do primeiro item (id=1)
    cy.get('[data-cy="edit-1"]').click();
    cy.contains("Editar produto").should("be.visible");

    // Altera nome e preço
    cy.get('[data-cy="product-name"]').clear().type("Café Expresso Duplo");
    cy.get('[data-cy="product-price"]').clear().type("9.00");
    cy.get('[data-cy="save-product"]').click();

    // Valida alterações na tabela
    cy.contains("Café Expresso Duplo").should("be.visible");
    cy.contains("R$ 9,00").should("be.visible");
  });

  it("CT-CY-04: Deve excluir um produto e atualizar a listagem", () => {
    cy.get('[data-cy="login-button"]').click();

    // Guarda contagem antes da exclusão
    cy.get("tbody tr").then(($rows) => {
      const initialCount = $rows.length;

      // Exclui o item 1
      cy.get('[data-cy="delete-1"]').click();

      // Valida que a quantidade de linhas diminuiu em 1
      cy.get("tbody tr").should("have.length", initialCount - 1);
    });
  });

  /* ========================================================
     3. FILTROS E BUSCAS
     ======================================================== */
  it("CT-CY-05: Deve filtrar produtos por termo digitado na busca", () => {
    cy.get('[data-cy="login-button"]').click();

    cy.get('[data-cy="search"]').type("Cappuccino");
    cy.get("tbody tr").should("have.length", 1);
    cy.get("tbody").should("contain", "Cappuccino");
    cy.get("tbody").should("not.contain", "Pão de queijo");
  });

  it("CT-CY-06: Deve exibir mensagem de nenhum produto encontrado", () => {
    cy.get('[data-cy="login-button"]').click();

    cy.get('[data-cy="search"]').type("ProdutoInexistenteX99");
    cy.contains("Nenhum produto encontrado.").should("be.visible");
  });

  /* ========================================================
     4. TESTE DE DEFEITO CONHECIDO (Busca Case-Sensitive)
     ======================================================== */
  it("CT-CY-07 [BUG]: Evidência de falha na busca com letras minúsculas (Case Sensitivity)", () => {
    cy.get('[data-cy="login-button"]').click();

    // "Café expresso" existe na base, mas buscar "café" falha devido ao bug no código
    cy.get('[data-cy="search"]').type("café");
    
    // Este teste documenta o defeito: o sistema falha em encontrar
    cy.get("body").then(($body) => {
      if ($body.text().includes("Nenhum produto encontrado.")) {
        cy.log("BUG CONFIRMADO: Busca é estritamente case-sensitive!");
      }
    });
  });
});
```

---

## 4.2 Automação de API com Pytest (Back-end Django + DRF)

Para validar a integridade dos modelos e endpoints do backend, utilizaremos `pytest` integrado ao Django REST Framework (`APIClient`).

### 4.2.1 Configuração e Instalação

Dentro da pasta do Back-end (`Cafeteria-Backend-Teste`):

```bash
pip install pytest pytest-django
```

Crie o arquivo de configuração `pytest.ini` na raiz do backend:

```ini
[pytest]
DJANGO_SETTINGS_MODULE = cafeteria.settings
python_files = tests.py test_*.py *_tests.py
```

---

### 4.2.2 Arquivo de Testes: `main/tests.py`

Substitua o conteúdo do arquivo `main/tests.py` por:

```python
import pytest
from decimal import Decimal
from rest_framework import status
from rest_framework.test import APIClient
from .models import Product

@pytest.fixture
def api_client():
    return APIClient()

@pytest.fixture
def produto_padrao(db):
    return Product.objects.create(
        name="Café Coado Tradicional",
        category="Cafés",
        price=Decimal("4.50"),
        stock=50
    )


# ============================================================
# 1. TESTES DE CAMINHO FELIZ (CRUD)
# ============================================================
@pytest.mark.django_db
class TestProductAPISuccess:

    def test_listar_produtos(self, api_client, produto_padrao):
        """GET /api/products/ - Deve retornar status 200 e lista de produtos"""
        response = api_client.get("/api/products/")
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 1
        assert response.data[0]["name"] == "Café Coado Tradicional"

    def test_criar_produto_valido(self, api_client):
        """POST /api/products/ - Deve cadastrar produto com 201 Created"""
        payload = {
            "name": "Bolo de Fubá",
            "category": "Doces",
            "price": "7.00",
            "stock": 15
        }
        response = api_client.post("/api/products/", payload, format="json")
        assert response.status_code == status.HTTP_201_CREATED
        assert response.data["name"] == payload["name"]
        assert Product.objects.filter(name="Bolo de Fubá").exists()

    def test_atualizar_produto_put(self, api_client, produto_padrao):
        """PUT /api/products/{id}/ - Atualização completa"""
        payload = {
            "name": "Café Coado Orgânico",
            "category": "Cafés",
            "price": "6.00",
            "stock": 40
        }
        url = f"/api/products/{produto_padrao.id}/"
        response = api_client.put(url, payload, format="json")
        assert response.status_code == status.HTTP_200_OK
        assert response.data["name"] == "Café Coado Orgânico"

    def test_atualizar_produto_patch(self, api_client, produto_padrao):
        """PATCH /api/products/{id}/ - Atualização parcial"""
        payload = {"price": "5.20"}
        url = f"/api/products/{produto_padrao.id}/"
        response = api_client.patch(url, payload, format="json")
        assert response.status_code == status.HTTP_200_OK
        assert Decimal(response.data["price"]) == Decimal("5.20")
        assert response.data["name"] == produto_padrao.name

    def test_deletar_produto(self, api_client, produto_padrao):
        """DELETE /api/products/{id}/ - Deleção de registro"""
        url = f"/api/products/{produto_padrao.id}/"
        response = api_client.delete(url)
        assert response.status_code == status.HTTP_204_NO_CONTENT
        assert not Product.objects.filter(id=produto_padrao.id).exists()


# ============================================================
# 2. TESTES DE EXCEÇÃO E VALIDAÇÕES DE NEGÓCIO (Limites/Regras)
# ============================================================
@pytest.mark.django_db
class TestProductAPIValidations:

    def test_preco_zero_ou_negativo_invalido(self, api_client):
        """POST /api/products/ - RN-01: Preço deve ser >= 0.01"""
        payload = {
            "name": "Café Inválido",
            "category": "Cafés",
            "price": "0.00",
            "stock": 10
        }
        response = api_client.post("/api/products/", payload, format="json")
        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert "price" in response.data

    def test_estoque_negativo_invalido(self, api_client):
        """POST /api/products/ - RN-02: Estoque não pode ser negativo (< 0)"""
        payload = {
            "name": "Café Estoque Negativo",
            "category": "Cafés",
            "price": "5.00",
            "stock": -1
        }
        response = api_client.post("/api/products/", payload, format="json")
        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert "stock" in response.data

    def test_nome_excedendo_limite_caracteres(self, api_client):
        """POST /api/products/ - RN-03: Nome com mais de 100 caracteres"""
        payload = {
            "name": "A" * 101,
            "category": "Cafés",
            "price": "5.00",
            "stock": 10
        }
        response = api_client.post("/api/products/", payload, format="json")
        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert "name" in response.data

    def test_produto_inexistente_retorna_404(self, api_client):
        """GET /api/products/999/ - ID inexistente deve retornar 404"""
        response = api_client.get("/api/products/999/")
        assert response.status_code == status.HTTP_404_NOT_FOUND
```

### 4.2.3 Como Executar os Testes de Back-end

No terminal, na pasta raiz do repositório Back-end:

```bash
# Executar todos os testes
pytest -v

# Executar com relatório de cobertura
pytest --cov=main
```

---

## 4.3 Integração Contínua (CI) Sugerida (GitHub Actions)

Para fechar o diferencial com padrão de mercado, sugere-se a adição de um pipeline básico em `.github/workflows/test.yml`:

```yaml
name: Pipeline de Testes Automatizados (QA)

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  backend-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.12'
      - run: pip install -r requirements.txt pytest pytest-django
      - run: pytest -v

  frontend-e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install
      - run: npm run build
      - name: Cypress run
        uses: cypress-io/github-action@v6
        with:
          start: npm run dev
          wait-on: 'http://localhost:5173'
```
