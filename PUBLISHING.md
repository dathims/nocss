# Publishing NoCSS Framework to npm

## Prerequisites

1. **Create an npm account** at https://www.npmjs.com/signup
2. **Verify your email** address
3. **Enable 2FA** (Two-Factor Authentication) - Required for publishing

## Manual Publishing

### Step 1: Login to npm

```bash
npm login
```

Enter your:
- Username
- Password
- Email
- 2FA code (from your authenticator app)

### Step 2: Verify you're logged in

```bash
npm whoami
```

Should display your npm username.

### Step 3: Check package before publishing

```bash
# Dry run to see what will be published
npm publish --dry-run
```

This shows:
- Files that will be included
- Package size
- Any warnings or errors

### Step 4: Publish to npm

```bash
npm publish
```

That's it! Your package is now live at:
- https://www.npmjs.com/package/nocss-framework

Users can install it with:
```bash
npm install nocss-framework
```

## Automatic Publishing with GitHub Actions

### Step 1: Create npm Access Token

1. Go to https://www.npmjs.com/settings/YOUR_USERNAME/tokens
2. Click **"Generate New Token"** → **"Classic Token"**
3. Select **"Automation"** type
4. Copy the token (you won't see it again!)

### Step 2: Add Token to GitHub Secrets

1. Go to your repo: https://github.com/dathims/nocss/settings/secrets/actions
2. Click **"New repository secret"**
3. Name: `NPM_TOKEN`
4. Value: Paste your npm token
5. Click **"Add secret"**

### Step 3: Publish via GitHub Release

The workflow is already configured in `.github/workflows/publish.yml`.

To publish a new version:

1. **Update version in package.json**:
   ```bash
   npm version patch  # 0.1.0 → 0.1.1
   npm version minor  # 0.1.0 → 0.2.0
   npm version major  # 0.1.0 → 1.0.0
   ```

2. **Push the version tag**:
   ```bash
   git push --follow-tags
   ```

3. **Create a GitHub Release**:
   - Go to https://github.com/dathims/nocss/releases/new
   - Select the tag you just created
   - Write release notes
   - Click **"Publish release"**

The package will automatically publish to npm! 🚀

## Version Management

Follow [Semantic Versioning](https://semver.org/):

- **MAJOR** (1.0.0): Breaking changes
- **MINOR** (0.1.0): New features (backward compatible)
- **PATCH** (0.0.1): Bug fixes

## Check Your Package

After publishing, verify at:
- npm: https://www.npmjs.com/package/nocss-framework
- unpkg CDN: https://unpkg.com/nocss-framework@latest/dist/nocss.min.css

## Update README with Installation

Add to README.md:

```markdown
## Installation

### npm
\`\`\`bash
npm install nocss-framework
\`\`\`

### CDN
\`\`\`html
<link rel="stylesheet" href="https://unpkg.com/nocss-framework@latest/dist/nocss.min.css">
<script src="https://unpkg.com/nocss-framework@latest/dist/nocss.js" defer></script>
\`\`\`

### Download
Download the [latest release](https://github.com/dathims/nocss/releases/latest)
```

## Troubleshooting

### "You do not have permission to publish"
- Make sure you're logged in: `npm whoami`
- Check package name isn't taken: https://www.npmjs.com/package/nocss-framework
- Verify 2FA is enabled

### "Package name too similar to existing package"
- Try a different name in package.json
- Current name: `nocss-framework` (should be available)

### "Failed to publish"
- Run `npm run build` first
- Check `.npmignore` doesn't exclude important files
- Verify `files` in package.json is correct

## Files Included in Package

According to `package.json`:
- `dist/nocss.css` - Full CSS
- `dist/nocss.min.css` - Minified CSS
- `dist/nocss.js` - JavaScript helpers
- `dist/component-loader.js` - Component loader
- `src/**/*.css` - Source CSS files
- `src/**/*.js` - Source JavaScript
- `README.md` - Documentation
- `LICENSE` - MIT License

## Unpublishing (Emergency Only)

⚠️ **Warning**: Unpublishing can break existing projects!

```bash
# Unpublish a specific version
npm unpublish nocss-framework@0.1.0

# Unpublish all versions (use with extreme caution!)
npm unpublish nocss-framework --force
```

Only unpublish within 72 hours of publishing or if there's a critical security issue.
