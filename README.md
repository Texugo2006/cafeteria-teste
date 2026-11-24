# Projeto de Garantia da Qualidade (QA) - Cafeteria Grao & Prosa

**Situacao de Aprendizagem:** Teste de Software (TSOF)  
**Instituicao:** Escola e Faculdade de Tecnologia SENAI "Roberto Mange"  
**Docente:** Vinicius Almeida  
**Turma:** 3DES-MSL  
**Aluno / Responsavel de QA:** Kaique Daniel  
**Data:** 24/11/2026  

---

## 1. Visao Geral do Projeto

Este repositorio consolida o projeto completo de Teste de Software e Garantia da Qualidade (QA) desenvolvido para o sistema web de gestao da cafeteria **Grao & Prosa**, desenvolvido pela empresa **CodeWave Solutions**.

O trabalho cobre integralmente todos os criterios tecnicos (obrigatorios) e desejaveis (diferenciais) da Situacao de Aprendizagem:
* Analise detalhada de requisitos, arquitetura e riscos tecnicos e de negocio.
* Plano com mais de 70 cenarios de teste estruturados (Caminho Feliz, Excecoes, Limites e Falhas de Negocio).
* Automacao de testes E2E com **Cypress** e de API com **Pytest / Django REST Framework**.
* Dossie de evidencias com capturas de tela das funcionalidades e terminais de execucao.
* Registro formal de defeitos (Bugs) com parecer tecnico final de QA (Reprovado / NO-GO).

---

## 2. Estrutura do Repositorio

```text
├── docs/                                          # Documentacao completa de QA (Criterios SA)
│   ├── 01-Analise-Requisitos-Riscos-e-Ambiente.md # Item 1 e 3: Requisitos, riscos e setup do ambiente
│   ├── 02-Plano-Cenarios-de-Teste.md              # Item 2: Matriz com 70 cenarios de teste detalhados
│   ├── 03-Automacao-de-Testes.md                  # Item 4: Scripts e estrategias de automacao
│   ├── 04-Registro-de-Defeitos-e-Relatorio-Final.md # Item 5: Bugs reportados e Relatorio Final
│   └── 05-Dossie-de-Evidencias-e-Testes-Executados.md # Catalogo de evidencias e prints
├── evidencias/                                    # Capturas de tela e prints de execucao
│   ├── cypress/                                   # 11 screenshots de teste E2E e print do terminal
│   │   ├── cypress_01_tela_login.png
│   │   ├── cypress_terminal_execucao_resultado.png
│   │   └── ...
│   └── pytest_terminal_execucao_resultado.png     # Print do console da execucao dos testes de API
├── Cafeteria-Backend-Teste/                       # Codigo-fonte da API Back-end (Django + DRF)
│   ├── main/tests.py                              # Suite de testes automatizados com pytest (100% Pass)
│   ├── pytest.ini                                 # Configuracao de testes do Django
│   └── popular_banco.py                           # Seed do banco SQLite
└── Cafeteria-Frontend-Teste/                      # Codigo-fonte do Front-end (React + Vite + TS)
    └── CafeteriaFrontend/
        ├── cypress/e2e/cafeteria_fluxos.cy.ts     # Suite oficial de testes E2E Cypress
        └── cypress.config.ts                      # Configuracao do Cypress
```

---

## 3. Como Executar o Projeto Localmente

### 3.1 Back-end (Django API)
```bash
cd Cafeteria-Backend-Teste
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt pytest pytest-django
python manage.py migrate
python manage.py runserver 127.0.0.1:8000
```
> Popule o banco executando: `python popular_banco.py`

### 3.2 Front-end (React + Vite)
```bash
cd Cafeteria-Frontend-Teste/CafeteriaFrontend
npm install
npm run dev
```
> O painel estara acessivel em: `http://127.0.0.1:5173/`

---

## 4. Como Executar os Testes Automatizados

### 4.1 Testes de API (Pytest)
No diretorio `Cafeteria-Backend-Teste`:
```bash
python -m pytest -v
```
* **Resultado:** 9 testes executados, 9 aprovados (100% de sucesso).

### 4.2 Testes E2E (Cypress)
No diretorio `Cafeteria-Frontend-Teste/CafeteriaFrontend`:
```bash
npx cypress run --spec "cypress/e2e/cafeteria_fluxos.cy.ts"
```
* **Resultado:** 7 testes executados, 7 aprovados (100% de sucesso).

---

## 5. Principais Defeitos Identificados (Bugs Criticos)

1. **[BUG-001] Front-end nao consome a API Back-end:** Dados geridos apenas em memoria local (`useState`) e perdidos ao recarregar a tela (`F5`).
2. **[BUG-002] Tela de Login sem validacao:** Permite login com campos vazios e sem autenticacao no back-end.
3. **[BUG-003] Formulario aceita valores invalidos:** Permite preco zero ou negativo e estoque negativo sem validacao client-side.
4. **[BUG-004] Busca estritamente case-sensitive:** Pesquisar por "cafe" falha ao encontrar "Cafe expresso".
5. **[BUG-005] Vulnerabilidade em producao:** `SECRET_KEY` exposta no codigo, `DEBUG=True` e `CORS_ALLOW_ALL_ORIGINS=True`.

---

## 6. Parecer Tecnico Conclusivo de QA

> **REPROVADO PARA PRODUCAO (NO-GO):**  
> Devido ao desacoplamento entre Front-end e Back-end, a ausencia de persistencia real e a falta dos modulos contratuais de **Reservas** e **Pedidos**, o sistema **nao reune condicoes de liberacao para ambiente produtivo** ate que a sprint de correcao seja concluida.
