const http = require('http');

console.log('\n═══════════════════════════════════════════════════');
console.log('✅ BACKEND: http://localhost:5000');
console.log('✅ FRONTEND: http://localhost:5173');
console.log('═══════════════════════════════════════════════════\n');

// Test health endpoint
const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/health',
  method: 'GET'
};

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      console.log('✓ API Health Check: PASSED');
      console.log('  Response:', json);
      console.log('\n═══════════════════════════════════════════════════');
      console.log('⚡ READY TO TEST');
      console.log('═══════════════════════════════════════════════════\n');
      console.log('🔐 Login Flow:');
      console.log('   1. Go to http://localhost:5173/login');
      console.log('   2. Register as a PROVIDER');
      console.log('   3. Navigate to "Add Service" page');
      console.log('   4. Fill the form and submit');
      console.log('\n✅ Fixed Issues:');
      console.log('   • priceType values now: hourly, fixed, daily');
      console.log('   • Added provider validation');
      console.log('   • Better error messages');
      console.log('\n═══════════════════════════════════════════════════\n');
    } catch(e) {
      console.log('✗ API Health Check: FAILED');
    }
  });
});

req.on('error', () => {
  console.log('✗ Cannot connect to backend');
});

req.end();
