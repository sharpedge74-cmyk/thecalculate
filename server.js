import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const HOST = '0.0.0.0';

// Aliases for navigation links that reference alternate calculator slugs
app.get('/sports-bra-size-calculator', (req, res) => {
  res.sendFile(path.join(__dirname, 'sports-bra-calculator.html'));
});

app.get('/maternity-bra-size-calculator', (req, res) => {
  res.sendFile(path.join(__dirname, 'maternity-bra-calculator.html'));
});

// Serve static assets and HTML files with clean URL extension resolution
app.use(express.static(__dirname, {
  extensions: ['html'],
  index: 'index.html'
}));

// 404 fallback page
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '404.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`IMRango server running on http://${HOST}:${PORT}`);
});
