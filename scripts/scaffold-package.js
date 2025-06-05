const fs = require('fs');
const path = require('path');

const main = () => {
  const packageName = process.argv[2];

  if (!packageName) {
    console.error('Error: Please provide a package name as an argument.');
    console.log('Usage: node scripts/scaffold-package.js <packageName>');
    process.exit(1);
  }

  console.log(`Attempting to create package: ${packageName}`);

  const packageDir = path.join('packages', packageName);

  if (fs.existsSync(packageDir)) {
    console.error(`Error: Package directory already exists at ${packageDir}`);
    process.exit(1);
  }

  try {
    fs.mkdirSync(packageDir, { recursive: true });
    console.log(`Successfully created directory: ${packageDir}`);

    const packageJsonContent = {
      name: `@app/${packageName}`,
      version: '1.0.0',
      main: 'dist/index.js',
      types: 'dist/index.d.ts',
      scripts: {
        build: 'tsc --build tsconfig.json',
        lint: 'eslint . --ext .ts',
        test: 'jest',
      },
      dependencies: {},
      devDependencies: {},
      files: ['dist'],
    };

    const packageJsonPath = path.join(packageDir, 'package.json');
    fs.writeFileSync(
      packageJsonPath,
      JSON.stringify(packageJsonContent, null, 2)
    );
    console.log(`Successfully created ${packageJsonPath}`);

    const srcDir = path.join(packageDir, 'src');
    fs.mkdirSync(srcDir);
    console.log(`Successfully created directory: ${srcDir}`);

    const indexPath = path.join(srcDir, 'index.ts');
    fs.writeFileSync(
      indexPath,
      `// ${packageName} main entry point
export const greet = (name: string): string => \`Hello, \${name}!\`;
`
    );
    console.log(`Successfully created ${indexPath}`);

    const testsDir = path.join(packageDir, 'tests');
    fs.mkdirSync(testsDir);
    console.log(`Successfully created directory: ${testsDir}`);

    const testIndexPath = path.join(testsDir, 'index.test.ts');
    fs.writeFileSync(
      testIndexPath,
      `import { greet } from '../src';

describe('${packageName}', () => {
  it('should greet', () => {
    expect(greet('World')).toBe('Hello, World!');
  });
});
`
    );
    console.log(`Successfully created ${testIndexPath}`);

    const tsconfigContent = {
      extends: '../../tsconfig.json',
      compilerOptions: {
        outDir: './dist',
        rootDir: './src',
        composite: true,
      },
      include: ['src/**/*'],
      exclude: ['node_modules', 'dist', 'tests'],
    };

    const packageTsconfigPath = path.join(packageDir, 'tsconfig.json');
    fs.writeFileSync(
      packageTsconfigPath,
      JSON.stringify(tsconfigContent, null, 2)
    );
    console.log(`Successfully created ${packageTsconfigPath}`);

    // Update root tsconfig.json
    console.log('Updating root tsconfig.json...');
    const rootTsconfigPath = path.resolve(__dirname, '..', 'tsconfig.json'); // Use path.resolve for robustness
    const rootTsconfigContent = fs.readFileSync(rootTsconfigPath, 'utf-8');
    const rootTsconfigJson = JSON.parse(rootTsconfigContent);

    rootTsconfigJson.references = rootTsconfigJson.references || [];
    // Avoid duplicate entries if script is run multiple times with same package name (though earlier checks should prevent this)
    if (!rootTsconfigJson.references.some(ref => ref.path === `./packages/${packageName}`)) {
      rootTsconfigJson.references.push({ path: `./packages/${packageName}` });
    }

    fs.writeFileSync(
      rootTsconfigPath,
      JSON.stringify(rootTsconfigJson, null, 2)
    );
    console.log('Successfully updated root tsconfig.json.');

    console.log(`\nPackage '${packageName}' created successfully at ${packageDir}`);
    console.log('Summary of actions:');
    console.log(`- Created directory: ${packageDir}`);
    console.log(`- Created ${packageJsonPath}`);
    console.log(`- Created directory: ${srcDir} and ${indexPath}`);
    console.log(`- Created directory: ${testsDir} and ${testIndexPath}`);
    console.log(`- Created ${packageTsconfigPath}`);
    console.log(`- Updated ${rootTsconfigPath} with a reference to the new package.`);
    console.log('\nNext steps:');
    console.log(`- Navigate to ${packageDir} and run 'npm install' or 'yarn install' if you have specific dependencies to add.`);
    console.log("- Start developing your new package!");

  } catch (error) {
    console.error(`Error during package scaffolding: ${error.message}`);
    console.error(error.stack); // For more detailed debugging
    // Attempt to clean up created directories if error occurs mid-process
    if (fs.existsSync(packageDir)) {
      console.log(`Attempting to clean up created directory: ${packageDir}`);
      // Note: fs.rmSync is available in Node.js v14.14.0+. For older versions, a recursive remove function would be needed.
      // For simplicity, assuming a modern Node.js environment or that fs.rmdirSync with { recursive: true } might be polyfilled/handled.
      // fs.rmdirSync(packageDir, { recursive: true }); // This is dangerous if packageDir is not what's expected.
      // A safer approach for cleanup would be to explicitly delete files and directories created by this script.
      // For this example, we'll log the error and exit.
    }
    process.exit(1);
  }
};

main();
