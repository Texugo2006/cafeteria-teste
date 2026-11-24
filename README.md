# ☕ Projeto de Garantia da Qualidade (QA) — Cafeteria "Grão & Prosa"

**Situação de Aprendizagem:** Teste de Software (TSOF)  
**Instituição:** Escola e Faculdade de Tecnologia SENAI "Roberto Mange"  
**Docente:** Vinícius Almeida  
**Turma:** 3DES-MSL  
**Aluno / Responsável de QA:** **Kaique Daniel**  
**Data:** 24/11/2026  

---

## 📌 1. Visão Geral do Projeto

Este repositório consolida o projeto completo de Teste de Software e Garantia da Qualidade (QA) desenvolvido para o sistema web de gestão da cafeteria **Grão & Prosa**, encomendado pela empresa **CodeWave Solutions**.

O trabalho cobre integralmente todos os critérios técnicos (obrigatórios) e desejáveis (diferenciais) da Situação de Aprendizagem:
* Análise detalhada de requisitos, arquitetura e riscos técnicos/de negócio.
* Plano com mais de 70 cenários de teste (Caminho Feliz, Exceções, Limites e Falhas de Negócio).
* Automação de testes E2E com **Cypress** e de API com **Pytest / Django REST Framework**.
* Dossiê de evidências com capturas de tela das telas e terminais de execução.
* Registro formal de defeitos (Bugs) com parecer técnico final de QA (**NO-GO**).

---

## 📂 2. Estrutura do Repositório

```text
├── docs/                                          # Documentação completa de QA (Critérios SA)
│   ├── 01-Analise-Requisitos-Riscos-e-Ambiente.md # Item 1 & 3: Requisitos, riscos e setup do ambiente
│   ├── 02-Plano-Cenarios-de-Teste.md              # Item 2: Matriz com 70 cenários de teste detalhados
│   ├── 03-Automacao-de-Testes.md                  # Item 4: Scripts e estratégias de automação
│   ├── 04-Registro-de-Defeitos-e-Relatorio-Final.md # Item 5: Bugs reportados e Relatório Final
│   └── 05-Dossie-de-Evidencias-e-Testes-Executados.md # Catálogo de evidências e prints
├── evidencias/                                    # Capturas de tela e prints de execução
│   ├── cypress/                                   # 11 screenshots de teste E2E + print do terminal
│   │   ├── cypress_01_tela_login.png
│   │   ├── cypress_terminal_execucao_resultado.png
│   │   └── ...
│   └── pytest_terminal_execucao_resultado.png     # Print do console da execução dos testes de API
├── Cafeteria-Backend-Teste/                       # Código-fonte da API Back-end (Django + DRF)
│   ├── main/tests.py                              # Suíte de testes automatizados com pytest (100% Pass)
│   ├── pytest.ini                                 # Configuração de testes do Django
│   └── popular_banco.py                           # Seed do banco SQLite
└── Cafeteria-Frontend-Teste/                      # Código-fonte do Front-end (React + Vite + TS)
    └── CafeteriaFrontend/
        ├── cypress/e2e/cafeteria_fluxos.cy.ts     # Suíte oficial de testes E2E Cypress
        └── cypress.config.ts                      # Configuração do Cypress
```

---

## 🚀 3. Como Executar o Projeto Localmente

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
> O painel estará acessível em: `http://127.0.0.1:5173/`

---

## 🧪 4. Como Executar os Testes Automatizados

### 4.1 Testes de API (Pytest)
No diretório `Cafeteria-Backend-Teste`:
```bash
python -m pytest -v
```
* **Resultado:** 9 testes executados, 9 aprovados (100% de sucesso).

### 4.2 Testes E2E (Cypress)
No diretório `Cafeteria-Frontend-Teste/CafeteriaFrontend`:
```bash
npx cypress run --spec "cypress/e2e/cafeteria_fluxos.cy.ts"
```
* **Resultado:** 7 testes executados, 7 aprovados (100% de sucesso).

---

## 🐞 5. Principais Defeitos Identificados (Bugs Críticos)

1. **[BUG-001] Front-end não consome a API Back-end:** Dados geridos apenas em memória local (`useState`) e perdidos ao recarregar a tela (`F5`).
2. **[BUG-002] Tela de Login sem validação:** Permite login com campos vazios e sem autenticação no back-end.
3. **[BUG-003] Formulário aceita valores inválidos:** Permite preço zero/negativo e estoque negativo sem validação client-side.
4. **[BUG-004] Busca estritamente case-sensitive:** Pesquisar por "café" falha ao encontrar "Café expresso".
5. **[BUG-005] Vulnerabilidade em produção:** `SECRET_KEY` hardcoded, `DEBUG=True` e `CORS_ALLOW_ALL_ORIGINS=True`.

---

## ⚖️ 6. Parecer Técnico Conclusivo de QA

> **NO-GO PARA PRODUÇÃO:**  
> Devido ao desacoplamento entre Front-end e Back-end, à ausência de persistência real e à falta dos módulos contratuais de **Reservas** e **Pedidos**, o sistema **não reúne condições de liberação para ambiente produtivo** até que a sprint de correção seja concluída.
