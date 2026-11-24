#  Dossiê de Evidências e Testes Executados (QA)

**Projeto:** Cafeteria "Grao & Prosa" - CodeWave Solutions  
**Responsavel de QA:** Kaique Daniel  
**Instituicao:** SENAI "Roberto Mange" - Unidade Curricular: Teste de Software (TSOF)  
**Data:** 24/11/2026  

---


**Projeto:** Cafeteria "Grão & Prosa" — CodeWave Solutions  
**Responsável:** Engenharia de Garantia da Qualidade (QA)  
**Data de Execução:** 24/11/2026  
**Status Geral:** Suíte de API 100% aprovada (Backend) | 12 Evidências Visuais Geradas (Frontend)  

---

## 1. Execução dos Testes Automatizados de API (Back-end)

A suíte de testes de API foi executada via **pytest 9.2.0** com **pytest-django** integrado ao Django REST Framework:

```text
============================= test session starts =============================
platform win32 -- Python 3.14.3, pytest-9.2.0, pluggy-1.7.0
django: version: 6.1.3, settings: cafeteria.settings (from ini)
rootdir: C:\Users\kaique.daniel_superl\Downloads\Avaliação TSOF\Cafeteria-Backend-Teste
configfile: pytest.ini
plugins: django-4.14.0
collected 9 items

main/tests.py::TestProductAPISuccess::test_listar_produtos PASSED        [ 11%]
main/tests.py::TestProductAPISuccess::test_criar_produto_valido PASSED   [ 22%]
main/tests.py::TestProductAPISuccess::test_atualizar_produto_put PASSED  [ 33%]
main/tests.py::TestProductAPISuccess::test_atualizar_produto_patch PASSED [ 44%]
main/tests.py::TestProductAPISuccess::test_deletar_produto PASSED        [ 55%]
main/tests.py::TestProductAPIValidations::test_preco_zero_ou_negativo_invalido PASSED [ 66%]
main/tests.py::TestProductAPIValidations::test_estoque_negativo_invalido PASSED [ 77%]
main/tests.py::TestProductAPIValidations::test_nome_excedendo_limite_caracteres PASSED [ 88%]
main/tests.py::TestProductAPIValidations::test_produto_inexistente_retorna_404 PASSED [100%]

======================== 9 passed, 7 warnings in 1.23s ========================
```

> [!NOTE]
> **Warning Identificado pelo DRF:**  
> `UserWarning: min_value should be an integer or Decimal instance.`  
> O modelo `Product` definiu `MinValueValidator(0.01)` utilizando `float` ao invés de `Decimal('0.01')`, o que gera alertas de precisão numérica no Django REST Framework.

---

## 2. Execução dos Testes Automatizados E2E com Cypress (Front-end)

A suíte oficial do Cypress (`cypress/e2e/cafeteria_fluxos.cy.ts`) foi executada diretamente contra a aplicação ativa em `http://127.0.0.1:5173`:

```text
====================================================================================================
  Running:  cafeteria_fluxos.cy.ts                                                          (1 of 1)

  Suíte de Testes E2E com Cypress - Cafeteria Grão & Prosa
    √ CT-CY-01: Deve carregar a tela de Login e capturar print (3834ms)
    √ CT-CY-02: Deve preencher credenciais, fazer login e acessar o Dashboard (3197ms)
    √ CT-CY-03: Deve abrir formulário e cadastrar um novo produto (2945ms)
    √ CT-CY-04: Deve editar um produto existente com sucesso (2299ms)
    √ CT-CY-05: Deve excluir um produto e atualizar a tabela (1343ms)
    √ CT-CY-06: Deve filtrar produtos por categoria (850ms)
    √ CT-CY-07 [BUG EVIDENCIADO]: Busca é estritamente case-sensitive (1264ms)

  7 passing (16s)
  Screenshots gerados: 11
====================================================================================================
```

### Print Oficial da Resposta do Terminal (Cypress Runner)

* **Captura de Tela do Terminal:** [cypress_terminal_execucao_resultado.png](file:///c:/Users/kaique.daniel_superl/Downloads/Avaliação%20TSOF/evidencias/cypress/cypress_terminal_execucao_resultado.png)

![cypress_terminal_execucao_resultado](/C:/Users/kaique.daniel_superl/.gemini/antigravity/brain/0c69e8d2-83ea-4862-b57f-941f1bc23b26/evidencias/cypress/cypress_terminal_execucao_resultado.png)

### Prints Gerados Diretamente pelo Cypress

| Evidência | Descrição do Teste Cypress | Arquivo |
| :--- | :--- | :--- |
| **Print 01** | Tela de Login carregada | [cypress_01_tela_login.png](file:///c:/Users/kaique.daniel_superl/Downloads/Avaliação%20TSOF/evidencias/cypress/cypress_01_tela_login.png) |
| **Print 02** | Credenciais preenchidas no formulário | [cypress_02_login_preenchido.png](file:///c:/Users/kaique.daniel_superl/Downloads/Avaliação%20TSOF/evidencias/cypress/cypress_02_login_preenchido.png) |
| **Print 03** | Dashboard após Login autenticado | [cypress_03_dashboard_visao_geral.png](file:///c:/Users/kaique.daniel_superl/Downloads/Avaliação%20TSOF/evidencias/cypress/cypress_03_dashboard_visao_geral.png) |
| **Print 04** | Modal/Tela de Novo Produto aberta | [cypress_04_formulario_novo_produto.png](file:///c:/Users/kaique.daniel_superl/Downloads/Avaliação%20TSOF/evidencias/cypress/cypress_04_formulario_novo_produto.png) |
| **Print 05** | Preenchimento dos campos do novo produto | [cypress_05_preenchimento_novo_produto.png](file:///c:/Users/kaique.daniel_superl/Downloads/Avaliação%20TSOF/evidencias/cypress/cypress_05_preenchimento_novo_produto.png) |
| **Print 06** | Novo produto cadastrado e visível na tabela | [cypress_06_produto_cadastrado_sucesso.png](file:///c:/Users/kaique.daniel_superl/Downloads/Avaliação%20TSOF/evidencias/cypress/cypress_06_produto_cadastrado_sucesso.png) |
| **Print 07** | Formulário aberto para edição do produto | [cypress_07_formulario_edicao_produto.png](file:///c:/Users/kaique.daniel_superl/Downloads/Avaliação%20TSOF/evidencias/cypress/cypress_07_formulario_edicao_produto.png) |
| **Print 08** | Produto com dados editados e atualizados | [cypress_08_produto_editado_sucesso.png](file:///c:/Users/kaique.daniel_superl/Downloads/Avaliação%20TSOF/evidencias/cypress/cypress_08_produto_editado_sucesso.png) |
| **Print 09** | Remoção de produto e atualização da lista | [cypress_09_produto_excluido.png](file:///c:/Users/kaique.daniel_superl/Downloads/Avaliação%20TSOF/evidencias/cypress/cypress_09_produto_excluido.png) |
| **Print 10** | Filtro por categoria aplicado ("Doces") | [cypress_10_filtro_categoria_doces.png](file:///c:/Users/kaique.daniel_superl/Downloads/Avaliação%20TSOF/evidencias/cypress/cypress_10_filtro_categoria_doces.png) |
| **Print 11** | **[BUG COMPROVADO]** Busca não encontra por case-sensitive | [cypress_11_bug_busca_case_sensitive.png](file:///c:/Users/kaique.daniel_superl/Downloads/Avaliação%20TSOF/evidencias/cypress/cypress_11_bug_busca_case_sensitive.png) |

---

## 3. Evidências Visuais Adicionais (Puppeteer)

---

### Evidência 01 — Tela Inicial de Login
* **Cenário:** Acesso à página inicial (`/`).
* **Observação:** Interface visual carregada com sucesso; campos de e-mail e senha visíveis.
* **Arquivo:** [01_tela_login.png](file:///c:/Users/kaique.daniel_superl/Downloads/Avaliação%20TSOF/evidencias/01_tela_login.png)

![01_tela_login](/C:/Users/kaique.daniel_superl/.gemini/antigravity/brain/0c69e8d2-83ea-4862-b57f-941f1bc23b26/evidencias/01_tela_login.png)

---

### Evidência 02 — Preenchimento de Credenciais de Acesso
* **Cenário:** Preenchimento do formulário de autenticação.
* **Arquivo:** [02_login_preenchido.png](file:///c:/Users/kaique.daniel_superl/Downloads/Avaliação%20TSOF/evidencias/02_login_preenchido.png)

![02_login_preenchido](/C:/Users/kaique.daniel_superl/.gemini/antigravity/brain/0c69e8d2-83ea-4862-b57f-941f1bc23b26/evidencias/02_login_preenchido.png)

---

### Evidência 03 — Painel Dashboard (Visão Geral)
* **Cenário:** Redirecionamento após o login com listagem inicial e métricas de estoque.
* **Resultado:** Cards com 5 produtos, 102 unidades em estoque e valor total de R$ 815,00.
* **Arquivo:** [03_dashboard_visao_geral.png](file:///c:/Users/kaique.daniel_superl/Downloads/Avaliação%20TSOF/evidencias/03_dashboard_visao_geral.png)

![03_dashboard_visao_geral](/C:/Users/kaique.daniel_superl/.gemini/antigravity/brain/0c69e8d2-83ea-4862-b57f-941f1bc23b26/evidencias/03_dashboard_visao_geral.png)

---

### Evidência 04 — Tela de Adicionar Novo Produto
* **Cenário:** Abertura do formulário de cadastro através do botão "+ Novo produto".
* **Arquivo:** [04_formulario_novo_produto.png](file:///c:/Users/kaique.daniel_superl/Downloads/Avaliação%20TSOF/evidencias/04_formulario_novo_produto.png)

![04_formulario_novo_produto](/C:/Users/kaique.daniel_superl/.gemini/antigravity/brain/0c69e8d2-83ea-4862-b57f-941f1bc23b26/evidencias/04_formulario_novo_produto.png)

---

### Evidência 05 — Preenchimento dos Dados do Novo Produto
* **Cenário:** Preenchimento de nome, categoria, preço e estoque ("Mocha Artesanal com Canela").
* **Arquivo:** [05_preenchimento_novo_produto.png](file:///c:/Users/kaique.daniel_superl/Downloads/Avaliação%20TSOF/evidencias/05_preenchimento_novo_produto.png)

![05_preenchimento_novo_produto](/C:/Users/kaique.daniel_superl/.gemini/antigravity/brain/0c69e8d2-83ea-4862-b57f-941f1bc23b26/evidencias/05_preenchimento_novo_produto.png)

---

### Evidência 06 — Produto Cadastrado com Sucesso na Tabela
* **Cenário:** Retorno ao Dashboard após inclusão do produto.
* **Resultado:** O item "Mocha Artesanal com Canela" passa a constar na tabela e os cards de resumo foram recalculados.
* **Arquivo:** [06_produto_cadastrado_na_listagem.png](file:///c:/Users/kaique.daniel_superl/Downloads/Avaliação%20TSOF/evidencias/06_produto_cadastrado_na_listagem.png)

![06_produto_cadastrado_na_listagem](/C:/Users/kaique.daniel_superl/.gemini/antigravity/brain/0c69e8d2-83ea-4862-b57f-941f1bc23b26/evidencias/06_produto_cadastrado_na_listagem.png)

---

### Evidência 07 — Formulário de Edição de Produto
* **Cenário:** Clique no ícone de lápis [Editar] para editar um produto já cadastrado.
* **Arquivo:** [07_formulario_edicao_produto.png](file:///c:/Users/kaique.daniel_superl/Downloads/Avaliação%20TSOF/evidencias/07_formulario_edicao_produto.png)

![07_formulario_edicao_produto](/C:/Users/kaique.daniel_superl/.gemini/antigravity/brain/0c69e8d2-83ea-4862-b57f-941f1bc23b26/evidencias/07_formulario_edicao_produto.png)

---

### Evidência 08 — Produto Editado com Sucesso
* **Cenário:** Atualização dos dados do produto ("Café Expresso Especial" por R$ 8,50).
* **Arquivo:** [08_produto_editado_na_listagem.png](file:///c:/Users/kaique.daniel_superl/Downloads/Avaliação%20TSOF/evidencias/08_produto_editado_na_listagem.png)

![08_produto_editado_na_listagem](/C:/Users/kaique.daniel_superl/.gemini/antigravity/brain/0c69e8d2-83ea-4862-b57f-941f1bc23b26/evidencias/08_produto_editado_na_listagem.png)

---

### Evidência 09 — Exclusão de Produto da Listagem
* **Cenário:** Remoção de item através do botão de lixeira/delete [Remover].
* **Resultado:** O item foi retirado da listagem e o contador foi decrementado.
* **Arquivo:** [09_produto_excluido.png](file:///c:/Users/kaique.daniel_superl/Downloads/Avaliação%20TSOF/evidencias/09_produto_excluido.png)

![09_produto_excluido](/C:/Users/kaique.daniel_superl/.gemini/antigravity/brain/0c69e8d2-83ea-4862-b57f-941f1bc23b26/evidencias/09_produto_excluido.png)

---

### Evidência 10 — Filtro por Categoria ("Doces")
* **Cenário:** Seleção da categoria "Doces" no dropdown de filtragem.
* **Resultado:** Apenas itens pertencentes à categoria selecionada permanecem visíveis.
* **Arquivo:** [10_filtro_categoria_doces.png](file:///c:/Users/kaique.daniel_superl/Downloads/Avaliação%20TSOF/evidencias/10_filtro_categoria_doces.png)

![10_filtro_categoria_doces](/C:/Users/kaique.daniel_superl/.gemini/antigravity/brain/0c69e8d2-83ea-4862-b57f-941f1bc23b26/evidencias/10_filtro_categoria_doces.png)

---

### Evidência 11 — [BUG CONFIRMADO] Busca com Diferenciação de Maiúsculas/Minúsculas
* **Cenário:** Digitação de `café` (minúsculo) na barra de pesquisa.
* **Defeito Identificado:** A busca exibe *"Nenhum produto encontrado."*, ignorando a existência do produto "Café expresso", comprovando a falha de case-sensitivity no código de `Home.tsx`.
* **Arquivo:** [11_bug_busca_case_sensitive.png](file:///c:/Users/kaique.daniel_superl/Downloads/Avaliação%20TSOF/evidencias/11_bug_busca_case_sensitive.png)

![11_bug_busca_case_sensitive](/C:/Users/kaique.daniel_superl/.gemini/antigravity/brain/0c69e8d2-83ea-4862-b57f-941f1bc23b26/evidencias/11_bug_busca_case_sensitive.png)

---

### Evidência 12 — [BUG CRÍTICO CONFIRMADO] Perda Total do Estado após F5 (Reload)
* **Cenário:** Recarregamento da página (`F5`).
* **Defeito Identificado:** Por não haver comunicação com a API do Django nem persistência em banco ou localStorage, todo o estado é perdido e a aplicação retorna à tela de login, comprovando o desacoplamento entre Front e Back.
* **Arquivo:** [12_bug_perda_estado_apos_reload_f5.png](file:///c:/Users/kaique.daniel_superl/Downloads/Avaliação%20TSOF/evidencias/12_bug_perda_estado_apos_reload_f5.png)

![12_bug_perda_estado_apos_reload_f5](/C:/Users/kaique.daniel_superl/.gemini/antigravity/brain/0c69e8d2-83ea-4862-b57f-941f1bc23b26/evidencias/12_bug_perda_estado_apos_reload_f5.png)

---

## 3. Localização das Evidências em Disco

Todos os arquivos de imagem em alta resolução estão disponíveis tanto na pasta local do projeto quanto na pasta de artefatos:

* **Diretório do Projeto:** `c:\Users\kaique.daniel_superl\Downloads\Avaliação TSOF\evidencias\`
* **Diretório de Artefatos:** `C:\Users\kaique.daniel_superl\.gemini\antigravity\brain\0c69e8d2-83ea-4862-b57f-941f1bc23b26\evidencias\`