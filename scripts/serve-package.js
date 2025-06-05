const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const main = () => {
  const packageName = process.argv[2];

  if (!packageName) {
    console.error('Error: Please provide a package name as an argument.');
    console.log('Usage: node scripts/serve-package.js <packageName>');
    process.exit(1);
  }

  console.log(`Attempting to serve package: ${packageName}`);

  const packageDir = path.join('packages', packageName);
  const indexPath = path.join(packageDir, 'index.html');

  if (!fs.existsSync(indexPath)) {
    console.error(`Error: ${indexPath} does not exist.`);
    console.error(`Please make sure the package '${packageName}' has an index.html file in its root directory.`);
    process.exit(1);
  }

  console.log(`Found ${indexPath}. Starting http-server...`);

  const serverProcess = exec(`npx http-server ${packageDir}/`);

  serverProcess.stdout.on('data', (data) => {
    process.stdout.write(data);
  });

  serverProcess.stderr.on('data', (data) => {
    process.stderr.write(data);
  });

  serverProcess.on('close', (code) => {
    console.log(`http-server process exited with code ${code}`);
  });
};

main();
