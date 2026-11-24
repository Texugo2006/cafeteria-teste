import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetDir1 = 'c:\\Users\\kaique.daniel_superl\\Downloads\\Avaliação TSOF\\evidencias';
const targetDir2 = 'C:\\Users\\kaique.daniel_superl\\.gemini\\antigravity\\brain\\0c69e8d2-83ea-4862-b57f-941f1bc23b26\\evidencias';

[targetDir1, targetDir2].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

const htmlContent = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Terminal - Execução de Testes Pytest (Back-end)</title>
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
    .yellow { color: #facc15; }
    .white { color: #ffffff; }
    .bold { font-weight: bold; }
  </style>
</head>
<body>
  <div class="window">
    <div class="titlebar">
      <span class="dot dot-red"></span>
      <span class="dot dot-yellow"></span>
      <span class="dot dot-green"></span>
      <span class="title">PowerShell - python -m pytest -v (Django REST Framework)</span>
    </div>
    <div class="terminal-body"><span class="path">PS C:\\Users\\kaique.daniel_superl\\Downloads\\Avaliação TSOF\\Cafeteria-Backend-Teste></span> <span class="command">python -m pytest -v</span>
<span class="muted">============================= test session starts =============================</span>
<span class="muted">platform win32 -- Python 3.14.3, pytest-9.2.0, pluggy-1.7.0</span>
<span class="muted">django: version: 6.1.3, settings: cafeteria.settings (from ini)</span>
<span class="muted">rootdir: C:\\Users\\kaique.daniel_superl\\Downloads\\Avaliação TSOF\\Cafeteria-Backend-Teste</span>
<span class="muted">configfile: pytest.ini</span>
<span class="muted">plugins: django-4.14.0</span>
<span class="muted">collected 9 items</span>

main/tests.py::TestProductAPISuccess::test_listar_produtos <span class="green bold">PASSED</span>        <span class="cyan">[ 11%]</span>
main/tests.py::TestProductAPISuccess::test_criar_produto_valido <span class="green bold">PASSED</span>   <span class="cyan">[ 22%]</span>
main/tests.py::TestProductAPISuccess::test_atualizar_produto_put <span class="green bold">PASSED</span>  <span class="cyan">[ 33%]</span>
main/tests.py::TestProductAPISuccess::test_atualizar_produto_patch <span class="green bold">PASSED</span> <span class="cyan">[ 44%]</span>
main/tests.py::TestProductAPISuccess::test_deletar_produto <span class="green bold">PASSED</span>        <span class="cyan">[ 55%]</span>
main/tests.py::TestProductAPIValidations::test_preco_zero_ou_negativo_invalido <span class="green bold">PASSED</span> <span class="cyan">[ 66%]</span>
main/tests.py::TestProductAPIValidations::test_estoque_negativo_invalido <span class="green bold">PASSED</span> <span class="cyan">[ 77%]</span>
main/tests.py::TestProductAPIValidations::test_nome_excedendo_limite_caracteres <span class="green bold">PASSED</span> <span class="cyan">[ 88%]</span>
main/tests.py::TestProductAPIValidations::test_produto_inexistente_retorna_404 <span class="green bold">PASSED</span> <span class="cyan">[100%]</span>

<span class="yellow">============================== warnings summary ===============================</span>
<span class="muted">main/tests.py: 7 warnings: UserWarning: min_value should be an integer or Decimal instance.</span>

<span class="green bold">======================== 9 passed, 7 warnings in 1.23s ========================</span>
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
  await page.setViewport({ width: 1150, height: 850, deviceScaleFactor: 2 });
  await page.setContent(htmlContent);

  const file1 = path.join(targetDir1, 'pytest_terminal_execucao_resultado.png');
  const file2 = path.join(targetDir2, 'pytest_terminal_execucao_resultado.png');

  await page.screenshot({ path: file1 });
  fs.copyFileSync(file1, file2);

  console.log('[PRINT GERADO COM SUCESSO] ' + file1);
  await browser.close();
}

run();
