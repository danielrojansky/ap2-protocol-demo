const http = require('http');
const url = require('url');
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');
  if (req.method === 'OPTIONS') return res.end();
  if (path === '/api/agents/status') {
    return res.end(JSON.stringify({
      shopping_agent: { status: 'online', load: '12%' },
      merchant_agent: { status: 'online', load: '8%' },
      payment_processor: { status: 'online', load: '5%' },
      credentials_provider: { status: 'online', load: '3%' }
    }));
  }
  if (path === '/api/mandates/create') {
    return setTimeout(() => {
      res.end(JSON.stringify({
        success: true,
        mandate_id: 'mandate_' + Date.now(),
        type: 'intent_mandate',
        signature: 'mock_signature_' + Math.random().toString(36).substr(2, 9)
      }));
    }, 1000);
  }
  res.statusCode = 404;
  res.end(JSON.stringify({ error: 'Not found' }));
});
server.listen(3000, () => console.log('Mock API http://localhost:3000'));
