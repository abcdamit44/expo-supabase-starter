# Lefthook & Biome Setup

This project uses **Lefthook** for git hooks and **Biome** for code formatting and linting. This setup ensures consistent code quality and style across the project.

## Overview

- **Biome**: A fast formatter, linter, and more for JavaScript, TypeScript, JSX, and JSON
- **Lefthook**: A fast and powerful git hooks manager

## Available Scripts

### Biome Scripts

- `bun run lint:biome` - Check for linting issues using Biome
- `bun run format` - Format code using Biome
- `bun run format:check` - Check if code is formatted (dry run)
- `bun run biome:check` - Run both linting and formatting checks
- `bun run biome:fix` - Fix auto-fixable linting and formatting issues

### Lefthook Scripts

- `bun run hooks:install` - Install git hooks
- `bun run hooks:uninstall` - Uninstall git hooks

### General Scripts

- `bun run check` - Run TypeScript type checking and Biome checks
- `bun run generate-colors` - Generate colors file with Biome formatting

## Git Hooks Configuration

The project is configured with the following git hooks:

### Pre-commit Hook

Runs automatically before each commit:

- **Lint & Format**: Uses Biome to check and fix staged files
- **Type Check**: Runs TypeScript type checking (skipped during merge/rebase)

### Pre-push Hook

Runs automatically before pushing:

- **Full Lint Check**: Runs Biome on entire codebase
- **Type Check**: Runs TypeScript type checking
- **Test Placeholder**: Currently echoes a message (add tests here)

### Commit Message Hook

- **Commit Lint**: Placeholder for commit message validation

## Biome Configuration

The Biome configuration is defined in `biome.json` with the following features:

### Formatting Rules

- **Indentation**: 2 spaces
- **Line Width**: 100 characters
- **Quotes**: Double quotes for JSX, configurable for JS/TS
- **Semicolons**: Always required
- **Trailing Commas**: ES5 style

### Linting Rules

- **Recommended Rules**: Enabled by default
- **Import Organization**: Automatic import sorting
- **Node.js Protocols**: Enforces `node:` protocol for built-in modules
- **TypeScript**: Warns on explicit `any` usage

### File Coverage

- **Includes**: All TypeScript, JavaScript, and JSX files in app directories
- **Excludes**: Node modules, build outputs, config files, and VS Code settings

## Manual Usage

### Format Code

```bash
# Format all files
bun run format

# Check formatting without modifying files
bun run format:check
```

### Lint Code

```bash
# Check for linting issues
bun run biome:check

# Fix auto-fixable issues
bun run biome:fix
```

### Run Complete Check

```bash
# Run TypeScript check + Biome check
bun run check
```

## IDE Integration

### VS Code

Install the Biome extension for VS Code:

1. Install the "Biome" extension (biomejs.biome)
2. The extension will automatically use the project's `biome.json` configuration
3. Enable format on save in VS Code settings

### Other IDEs

Biome provides integrations for:
- IntelliJ IDEA / WebStorm
- Neovim
- Sublime Text
- And more

Check the [Biome documentation](https://biomejs.dev/guides/integrate-in-editor/) for setup instructions.

## Troubleshooting

### Hooks Not Running

If git hooks aren't running:

```bash
# Reinstall hooks
bun run hooks:uninstall
bun run hooks:install
```

### Permission Issues

If you get permission errors:

```bash
# Make sure lefthook is executable
chmod +x ./node_modules/.bin/lefthook
```

### Skip Hooks Temporarily

To skip hooks for a single commit:

```bash
# Skip pre-commit hooks
git commit --no-verify

# Skip pre-push hooks  
git push --no-verify
```

### Fixing Linting Issues

Most linting issues can be auto-fixed:

```bash
# Auto-fix safe issues
bun run biome:fix

# Apply unsafe fixes (be careful!)
bun biome check --write --unsafe .
```

## Configuration Files

- `biome.json` - Biome configuration
- `lefthook.yml` - Lefthook git hooks configuration
- `.biomeignore` - Files ignored by Biome

## Best Practices

1. **Run checks before committing**: Use `bun run check` to verify everything is working
2. **Format on save**: Configure your editor to format on save
3. **Review auto-fixes**: Always review changes made by auto-fixes
4. **Update configurations**: Keep Biome and Lefthook updated for latest features

## Migration from ESLint/Prettier

This project has migrated from ESLint/Prettier to Biome for better performance and simpler configuration. Key differences:

- **Single tool**: Biome replaces both ESLint and Prettier
- **Faster**: Significantly faster than ESLint/Prettier combination
- **Simpler config**: One configuration file instead of multiple
- **Better defaults**: Sensible defaults with minimal configuration needed

The old ESLint configuration is still present for compatibility but Biome is the primary tool.
