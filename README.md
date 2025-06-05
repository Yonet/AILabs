# Project Title

## Description
A project for web scraping.

## Getting Started
1. Clone the repository.
2. Install dependencies using `yarn install`.
3. Run the project using `yarn start`.

## Project Structure
- `packages/`: Contains the core functionality of the project.
  - `scraper-core/`: The core scraping library.
- `node_modules/`: Contains the project's dependencies.
- `package.json`: Defines the project's dependencies and scripts.
- `yarn.lock`: Locks the project's dependencies to specific versions.

## Development

### Scaffolding New Packages

To easily create a new package within the `packages/` directory with a standard structure, you can use the `scaffold:package` script. This script will set up a new TypeScript package with basic configuration for building, linting, and testing.

**Command:**

```bash
npm run scaffold:package -- <packageName>
```

Replace `<packageName>` with the desired name for your new package (e.g., `my-new-util`, `api-client`). The `--` is important to ensure that `<packageName>` is passed as an argument to the script and not to npm itself.

**Example:**

```bash
npm run scaffold:package -- my-new-util
```

**Generated Structure:**

Running the command will create a new directory `packages/<packageName>` with the following structure:

```
packages/
└── <packageName>/
    ├── package.json        # Package manifest
    ├── tsconfig.json       # TypeScript configuration for the package
    ├── src/
    │   └── index.ts        # Main entry point for the package's source code
    └── tests/
        └── index.test.ts   # Basic test setup
```

The script will also automatically update the root `tsconfig.json` to include a project reference to the newly created package, allowing it to be built as part of the overall project.

## Contributing
Contributions are welcome! Please follow these guidelines:
1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Submit a pull request.
