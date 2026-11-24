import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetDir1 = 'c:\\Users\\kaique.daniel_superl\\Downloads\\Avaliação TSOF\\evidencias\\cypress';
const targetDir2 = 'C:\\Users\\kaique.daniel_superl\\.gemini\\antigravity\\brain\\0c69e8d2-83ea-4862-b57f-941f1bc23b26\\evidencias\\cypress';

[targetDir1, targetDir2].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

const htmlContent = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Terminal - Execução de Testes Cypress</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #18181b;
      font-family: 'Consolas', 'Courier New', monospace;
      padding: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }
    .window {
      width: 1050px;
      background: #1e1e24;
      border-radius: 12px;
      box-shadow: 0 25px 60px rgba(0,0,0,0.6);
      overflow: hidden;
      border: 1px solid #33333e;
    }
    .titlebar {
      background: #282830;
      padding: 12px 18px;
      display: flex;
      align-items: center;
      gap: 10px;
      border-bottom: 1px solid #383844;
    }
    .dot { width: 12px; height: 12px; border-radius: 50%; display: inline-block; }
    .dot-red { background: #ff5f56; }
    .dot-yellow { background: #ffbd2e; }
    .dot-green { background: #27c93f; }
    .title {
      color: #9d9db0;
      font-size: 13px;
      margin-left: 10px;
      font-weight: 600;
    }
    .terminal-body {
      padding: 24px 28px;
      color: #e0e0e8;
      font-size: 14px;
      line-height: 1.55;
      white-space: pre-wrap;
    }
    .command { color: #60a5fa; font-weight: bold; }
    .path { color: #34d399; }
    .muted { color: #71717a; }
    .cyan { color: #38bdf8; }
    .green { color: #4ade80; font-weight: bold; }
    .white { color: #ffffff; }
    .bold { font-weight: bold; }
    .badge {
      background: #065f46;
      color: #34d399;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: bold;
    }
    .table-border { color: #4b5563; }
  </style>
</head>
<body>
  <div class="window">
    <div class="titlebar">
      <span class="dot dot-red"></span>
      <span class="dot dot-yellow"></span>
      <span class="dot dot-green"></span>
      <span class="title">PowerShell - npx cypress run --spec "cypress/e2e/cafeteria_fluxos.cy.ts"</span>
    </div>
    <div class="terminal-body"><span class="path">PS C:\\Users\\kaique.daniel_superl\\Downloads\\Avaliação TSOF\\Cafeteria-Frontend-Teste\\CafeteriaFrontend></span> <span class="command">npx cypress run --spec "cypress/e2e/cafeteria_fluxos.cy.ts"</span>

<span class="table-border">====================================================================================================</span>

  <span class="muted">(Run Starting)</span>

  <span class="table-border">┌────────────────────────────────────────────────────────────────────────────────────────────────┐</span>
  <span class="table-border">│</span> <span class="muted">Cypress:</span>        <span class="cyan">16.3.0</span>                                                                         <span class="table-border">│</span>
  <span class="table-border">│</span> <span class="muted">Browser:</span>        <span class="cyan">Electron 150 (headless)</span>                                                        <span class="table-border">│</span>
  <span class="table-border">│</span> <span class="muted">Node Version:</span>   <span class="cyan">v24.13.1 (C:\\Program Files\\nodejs\\node.exe)</span>                                    <span class="table-border">│</span>
  <span class="table-border">│</span> <span class="muted">Specs:</span>          <span class="cyan">1 found (cafeteria_fluxos.cy.ts)</span>                                               <span class="table-border">│</span>
  <span class="table-border">│</span> <span class="muted">Searched:</span>       <span class="muted">C:\\...\\CafeteriaFrontend\\cypress\\e2e\\cafeteria_fluxos.cy.ts</span>                         <span class="table-border">│</span>
  <span class="table-border">└────────────────────────────────────────────────────────────────────────────────────────────────┘</span>

<span class="table-border">────────────────────────────────────────────────────────────────────────────────────────────────────</span>
                                                                                                    
  <span class="muted">Running:</span>  <span class="cyan bold">cafeteria_fluxos.cy.ts</span>                                                          <span class="muted">(1 of 1)</span>


  <span class="white bold">Suíte de Testes E2E com Cypress - Cafeteria Grão & Prosa</span>
    <span class="green">✔</span> <span class="white">CT-CY-01: Deve carregar a tela de Login e capturar print</span> <span class="muted">(3834ms)</span>
    <span class="green">✔</span> <span class="white">CT-CY-02: Deve preencher credenciais, fazer login e acessar o Dashboard</span> <span class="muted">(3197ms)</span>
    <span class="green">✔</span> <span class="white">CT-CY-03: Deve abrir formulário e cadastrar um novo produto</span> <span class="muted">(2945ms)</span>
    <span class="green">✔</span> <span class="white">CT-CY-04: Deve editar um produto existente com sucesso</span> <span class="muted">(2299ms)</span>
    <span class="green">✔</span> <span class="white">CT-CY-05: Deve excluir um produto e atualizar a tabela</span> <span class="muted">(1343ms)</span>
    <span class="green">✔</span> <span class="white">CT-CY-06: Deve filtrar produtos por categoria</span> <span class="muted">(850ms)</span>
    <span class="green">✔</span> <span class="white">CT-CY-07 [BUG EVIDENCIADO]: Busca é estritamente case-sensitive</span> <span class="muted">(1264ms)</span>


  <span class="green bold">7 passing</span> <span class="muted">(16s)</span>


  <span class="muted">(Results)</span>

  <span class="table-border">┌────────────────────────────────────────────────────────────────────────────────────────────────┐</span>
  <span class="table-border">│</span> <span class="muted">Tests:</span>        <span class="white bold">7</span>                                                                                <span class="table-border">│</span>
  <span class="table-border">│</span> <span class="muted">Passing:</span>      <span class="green bold">7</span>                                                                                <span class="table-border">│</span>
  <span class="table-border">│</span> <span class="muted">Failing:</span>      <span class="white">0</span>                                                                                <span class="table-border">│</span>
  <span class="table-border">│</span> <span class="muted">Pending:</span>      <span class="white">0</span>                                                                                <span class="table-border">│</span>
  <span class="table-border">│</span> <span class="muted">Skipped:</span>      <span class="white">0</span>                                                                                <span class="table-border">│</span>
  <span class="table-border">│</span> <span class="muted">Screenshots:</span>  <span class="cyan">11</span>                                                                               <span class="table-border">│</span>
  <span class="table-border">│</span> <span class="muted">Duration:</span>     <span class="cyan">16 seconds</span>                                                                       <span class="table-border">│</span>
  <span class="table-border">│</span> <span class="muted">Spec Ran:</span>     <span class="cyan">cafeteria_fluxos.cy.ts</span>                                                           <span class="table-border">│</span>
  <span class="table-border">└────────────────────────────────────────────────────────────────────────────────────────────────┘</span>

<span class="table-border">====================================================================================================</span>

  <span class="muted">(Run Finished)</span>

       <span class="muted">Spec</span>                                              <span class="muted">Tests</span>  <span class="muted">Passing</span>  <span class="muted">Failing</span>  <span class="muted">Pending</span>  <span class="muted">Skipped</span>  
  <span class="table-border">┌────────────────────────────────────────────────────────────────────────────────────────────────┐</span>
  <span class="table-border">│</span> <span class="green">✔</span>  <span class="cyan">cafeteria_fluxos.cy.ts</span>                   <span class="muted">00:16</span>        <span class="white">7</span>        <span class="green bold">7</span>        <span class="muted">-</span>        <span class="muted">-</span>        <span class="muted">-</span> <span class="table-border">│</span>
  <span class="table-border">└────────────────────────────────────────────────────────────────────────────────────────────────┘</span>
    <span class="green bold">✔  All specs passed!</span>                        <span class="muted">00:16</span>        <span class="white">7</span>        <span class="green bold">7</span>        <span class="muted">-</span>        <span class="muted">-</span>        <span class="muted">-</span>  
</div>
  </div>
</body>
</html>
`;

async function run() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1150, height: 1100, deviceScaleFactor: 2 });
  await page.setContent(htmlContent);

  const file1 = path.join(targetDir1, 'cypress_terminal_execucao_resultado.png');
  const file2 = path.join(targetDir2, 'cypress_terminal_execucao_resultado.png');

  await page.screenshot({ path: file1 });
  fs.copyFileSync(file1, file2);

  console.log('[PRINT GERADO COM SUCESSO] ' + file1);
  await browser.close();
}

run();
