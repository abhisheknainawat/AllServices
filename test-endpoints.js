const http = require('http');

const endpoints = [
  { method: 'GET', path: '/api/health', name: 'Health Check' },
  { method: 'GET', path: '/api/services', name: 'Get All Services' },
  { method: 'GET', path: '/api/auth/providers', name: 'Get All Providers' },
];

function testEndpoint(method, path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: path,
      method: method,
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

    req.end();
  });
}

async function runTests() {
  console.log('Starting endpoint tests...\n');
  
  for (const endpoint of endpoints) {
    try {
      console.log(`Testing: ${endpoint.name} (${endpoint.method} ${endpoint.path})`);
      const result = await testEndpoint(endpoint.method, endpoint.path);
      console.log(`Status: ${result.status}`);
      console.log(`Response: ${result.data}\n`);
    } catch (error) {
      console.log(`ERROR: ${error.message}\n`);
    }
  }
}

setTimeout(() => runTests(), 2000);
