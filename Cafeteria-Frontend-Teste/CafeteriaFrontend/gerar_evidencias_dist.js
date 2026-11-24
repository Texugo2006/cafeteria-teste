import puppeteer from 'puppeteer';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, 'dist');

const targetDir1 = 'c:\\Users\\kaique.daniel_superl\\Downloads\\Avaliação TSOF\\evidencias';
const targetDir2 = 'C:\\Users\\kaique.daniel_superl\\.gemini\\antigravity\\brain\\0c69e8d2-83ea-4862-b57f-941f1bc23b26\\evidencias';

[targetDir1, targetDir2].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

function startStaticServer(port = 4173) {
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
  };

  const server = http.createServer((req, res) => {
    let filePath = path.join(distDir, req.url === '/' ? 'index.html' : req.url);
    if (!fs.existsSync(filePath)) {
      filePath = path.join(distDir, 'index.html');
    }

    const ext = path.extname(filePath);
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading file');
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf-8');
      }
    });
  });

  return new Promise((resolve) => {
    server.listen(port, '127.0.0.1', () => {
      console.log(`Servidor HTTP local rodando em http://127.0.0.1:${port}`);
      resolve(server);
    });
  });
}

async function saveScreenshot(page, filename) {
  const p1 = path.join(targetDir1, filename);
  const p2 = path.join(targetDir2, filename);
  await page.screenshot({ path: p1, fullPage: true });
  fs.copyFileSync(p1, p2);
  console.log(`[EVIDÊNCIA SALVA] ${filename}`);
}

async function run() {
  const server = await startStaticServer(4173);

  console.log('Iniciando o navegador Chromium...');
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-gpu',
      '--disable-dev-shm-usage'
    ],
    defaultViewport: { width: 1280, height: 800 }
  });

  const page = await browser.newPage();

  try {
    // ----------------------------------------------------
    // TESTE 1: TELA DE LOGIN INICIAL
    // ----------------------------------------------------
    console.log('Executando: CT-01 Tela de Login...');
    await page.goto('http://127.0.0.1:4173', { waitUntil: 'networkidle0' });
    await page.waitForSelector('[data-cy="login-button"]');
    await saveScreenshot(page, '01_tela_login.png');

    // ----------------------------------------------------
    // TESTE 2: PREENCHIMENTO DE CREDENCIAIS
    // ----------------------------------------------------
    console.log('Executando: CT-02 Preenchimento de Credenciais...');
    await page.type('[data-cy="email"]', 'gerente@graoeprosa.com.br');
    await page.type('[data-cy="password"]', 'Admin123*');
    await saveScreenshot(page, '02_login_preenchido.png');

    // ----------------------------------------------------
    // TESTE 3: DASHBOARD / VISÃO GERAL
    // ----------------------------------------------------
    console.log('Executando: CT-03 Dashboard Visão Geral...');
    await page.click('[data-cy="login-button"]');
    await page.waitForSelector('[data-cy="new-product"]');
    await new Promise(r => setTimeout(r, 600));
    await saveScreenshot(page, '03_dashboard_visao_geral.png');

    // ----------------------------------------------------
    // TESTE 4: FORMULÁRIO DE NOVO PRODUTO
    // ----------------------------------------------------
    console.log('Executando: CT-04 Acessar Formulário Novo Produto...');
    await page.click('[data-cy="new-product"]');
    await page.waitForSelector('[data-cy="save-product"]');
    await new Promise(r => setTimeout(r, 400));
    await saveScreenshot(page, '04_formulario_novo_produto.png');

    // ----------------------------------------------------
    // TESTE 5: PREENCHIMENTO E CADASTRO COM SUCESSO
    // ----------------------------------------------------
    console.log('Executando: CT-05 Cadastro de Produto com Sucesso...');
    await page.type('[data-cy="product-name"]', 'Mocha Artesanal com Canela');
    await page.select('[data-cy="product-category"]', 'Cafés');
    await page.type('[data-cy="product-price"]', '13.50');
    await page.type('[data-cy="product-stock"]', '25');
    await saveScreenshot(page, '05_preenchimento_novo_produto.png');

    await page.click('[data-cy="save-product"]');
    await page.waitForSelector('[data-cy="new-product"]');
    await new Promise(r => setTimeout(r, 600));
    await saveScreenshot(page, '06_produto_cadastrado_na_listagem.png');

    // ----------------------------------------------------
    // TESTE 6: EDIÇÃO DE PRODUTO
    // ----------------------------------------------------
    console.log('Executando: CT-06 Edição de Produto...');
    await page.waitForSelector('[data-cy="edit-1"]');
    await page.click('[data-cy="edit-1"]');
    await page.waitForSelector('[data-cy="save-product"]');
    await new Promise(r => setTimeout(r, 400));
    await page.click('[data-cy="product-name"]', { clickCount: 3 });
    await page.type('[data-cy="product-name"]', 'Café Expresso Especial');
    await page.click('[data-cy="product-price"]', { clickCount: 3 });
    await page.type('[data-cy="product-price"]', '8.50');
    await saveScreenshot(page, '07_formulario_edicao_produto.png');

    await page.click('[data-cy="save-product"]');
    await page.waitForSelector('[data-cy="new-product"]');
    await new Promise(r => setTimeout(r, 600));
    await saveScreenshot(page, '08_produto_editado_na_listagem.png');

    // ----------------------------------------------------
    // TESTE 7: EXCLUSÃO DE PRODUTO
    // ----------------------------------------------------
    console.log('Executando: CT-07 Exclusão de Produto...');
    await page.waitForSelector('[data-cy="delete-2"]');
    await page.click('[data-cy="delete-2"]');
    await new Promise(r => setTimeout(r, 600));
    await saveScreenshot(page, '09_produto_excluido.png');

    // ----------------------------------------------------
    // TESTE 8: FILTRAR POR CATEGORIA
    // ----------------------------------------------------
    console.log('Executando: CT-08 Filtro por Categoria...');
    await page.select('select', 'Doces');
    await new Promise(r => setTimeout(r, 600));
    await saveScreenshot(page, '10_filtro_categoria_doces.png');

    // ----------------------------------------------------
    // TESTE 9: BUG DE BUSCA CASE-SENSITIVE
    // ----------------------------------------------------
    console.log('Executando: CT-09 Bug Busca Case-Sensitive...');
    await page.select('select', 'Todas');
    await new Promise(r => setTimeout(r, 400));
    await page.type('[data-cy="search"]', 'café');
    await new Promise(r => setTimeout(r, 600));
    await saveScreenshot(page, '11_bug_busca_case_sensitive.png');

    // ----------------------------------------------------
    // TESTE 10: BUG DE PERDA DE DADOS NO RELOAD (F5)
    // ----------------------------------------------------
    console.log('Executando: CT-10 Bug Perda de Dados no F5...');
    await page.reload({ waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 800));
    await saveScreenshot(page, '12_bug_perda_estado_apos_reload_f5.png');

    console.log('\n>>> SUCESSO TOTAL: TODOS OS 12 PRINTS DE EVIDÊNCIAS FORAM GERADOS COM SUCESSO! <<<');

  } catch (error) {
    console.error('Erro durante a execução dos testes:', error);
  } finally {
    await browser.close();
    server.close();
    process.exit(0);
  }
}

run();
