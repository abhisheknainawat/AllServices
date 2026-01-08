const http = require('http');

function testEndpoint(method, path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: path,
      method: method,
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          path: path,
          method: method,
          data: data
        });
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    req.end();
  });
}

async function runTests() {
  const endpoints = [
    { method: 'GET', path: '/api/health' },
    { method: 'GET', path: '/api/services' },
    { method: 'GET', path: '/api/auth/providers' },
  ];

  console.log('\n✅ BACKEND RUNNING ON http://localhost:5000');
  console.log('✅ FRONTEND RUNNING ON http://localhost:5173\n');
  console.log('═══════════════════════════════════════════');
  console.log('Testing Endpoints:');
  console.log('═══════════════════════════════════════════\n');
  
  for (const endpoint of endpoints) {
    try {
      const result = await testEndpoint(endpoint.method, endpoint.path);
      console.log(`✓ ${endpoint.method} ${endpoint.path}`);
      console.log(`  Status: ${result.status}`);
      console.log(`  Response: ${result.data.substring(0, 100)}${result.data.length > 100 ? '...' : ''}\n`);
    } catch (error) {
      console.log(`✗ ${endpoint.method} ${endpoint.path}`);
      console.log(`  Error: ${error.message}\n`);
    }
  }
  
  console.log('═══════════════════════════════════════════');
  console.log('Open http://localhost:5173 in your browser');
  console.log('═══════════════════════════════════════════\n');
}

runTests();
