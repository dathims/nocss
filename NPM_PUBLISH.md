# Publishing NoCSS to npm Registry

This guide explains how to publish the `@dathims/nocss` package to the npm registry.

## Prerequisites

1. **npm account**: You already have an npm account
2. **npm login**: You need to login once on your machine

## First Time Setup

### 1. Login to npm

```bash
npm login
```

You'll be prompted for:
- Username: your npm username
- Password: your npm password
- Email: your npm email

**Note:** This only needs to be done once on your machine.

### 2. Verify your login

```bash
npm whoami
```

This should display your npm username.

## Publishing Process

### 1. Make sure everything is built

```bash
npm run build
```

This will:
- Build the CSS files (dist/nocss.css and dist/nocss.min.css)
- Copy the JavaScript files to dist/

### 2. Check what will be published

```bash
npm pack --dry-run
```

This shows you exactly what files will be included in the package.

### 3. Publish to npm

For scoped packages like `@dathims/nocss`, use:

```bash
npm publish --access public
```

**Important:** The `--access public` flag is required for scoped packages to make them publicly available.

### 4. Verify the publication

```bash
npm view @dathims/nocss
```

This should show your package information.

## Updating the Package

When you want to publish a new version:

### 1. Update the version

```bash
# Patch version (0.1.0 -> 0.1.1)
npm version patch

# Minor version (0.1.0 -> 0.2.0)
npm version minor

# Major version (0.1.0 -> 1.0.0)
npm version major
```

### 2. Build and publish

```bash
npm run build
npm publish --access public
```

### 3. Push the version tag to GitHub

```bash
git push origin main --tags
```

## Automation

The `package.json` includes a `prepublishOnly` script that automatically runs the build before publishing:

```json
"prepublishOnly": "npm run build"
```

So you can simply run:
```bash
npm publish --access public
```

And it will build automatically before publishing.

## Package Contents

The published package includes:
- `dist/nocss.css` - Full CSS file
- `dist/nocss.min.css` - Minified CSS file
- `dist/nocss.js` - JavaScript utilities
- `dist/component-loader.js` - Component loader
- `src/**/*.css` - Source CSS files (for customization)
- `src/**/*.js` - Source JavaScript files
- `README.md` - Package documentation
- `LICENSE` - MIT License

Excluded files (see `.npmignore`):
- Examples
- Documentation
- HTML demo files
- Configuration files
- Development files

## CDN

After publishing, your package will be available on:

### jsDelivr
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@dathims/nocss/dist/nocss.min.css">
```

### unpkg
```html
<link rel="stylesheet" href="https://unpkg.com/@dathims/nocss/dist/nocss.min.css">
```

## Troubleshooting

### Error: "You must sign in to publish packages"
Run `npm login` and enter your credentials.

### Error: "You do not have permission to publish"
Make sure you're using `--access public` for scoped packages.

### Error: "Package name already exists"
Scoped packages like `@dathims/nocss` use your username as namespace, so conflicts are unlikely.

### Files missing from package
Check `.npmignore` and the `files` field in `package.json`.

## Quick Reference

```bash
# First time setup
npm login

# Publish new version
npm version patch  # or minor, or major
npm run build
npm publish --access public
git push origin main --tags

# Verify
npm view @dathims/nocss
```

## Support

For questions about npm publishing, see:
- [npm documentation](https://docs.npmjs.com/)
- [Publishing scoped packages](https://docs.npmjs.com/creating-and-publishing-scoped-public-packages)
