# Contributing to NoCSS

Thank you for considering contributing to NoCSS! This document provides guidelines for contributing to the project.

## Code of Conduct

Be respectful, inclusive, and professional in all interactions.

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/dathims/nocss/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Browser and version
   - Code example if possible

### Suggesting Features

1. Check existing issues and discussions
2. Create a new issue with:
   - Clear use case description
   - Why this feature would be useful
   - Possible implementation approach

### Pull Requests

1. **Fork the repository**
2. **Create a new branch** from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**:
   - Follow the existing code style
   - Write clear, semantic HTML
   - Use CSS custom properties when possible
   - Add comments for complex selectors
4. **Test your changes**:
   ```bash
   npm run build:css
   npm run serve
   ```
5. **Commit your changes**:
   ```bash
   git commit -m "feat: add your feature description"
   ```
   Follow [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat:` new feature
   - `fix:` bug fix
   - `docs:` documentation changes
   - `style:` formatting, missing semicolons, etc.
   - `refactor:` code restructuring
   - `test:` adding tests
   - `chore:` maintenance tasks
6. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Create a Pull Request** on GitHub

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/nocss.git
cd nocss

# Install dependencies
npm install

# Start development server
npm run serve

# Build CSS
npm run build:css
```

## Project Structure

```
nocss/
├── src/
│   ├── core/           # Base styles, variables, typography
│   ├── components/     # Component styles (buttons, forms, etc.)
│   ├── utils/          # Utility styles (badges, utilities)
│   └── nocss.js        # JavaScript for interactivity
├── dist/               # Compiled CSS and JS
├── examples/           # Example pages
├── docs/               # Documentation
└── components.html     # Component library
```

## Coding Guidelines

### CSS

- Use semantic selectors, avoid arbitrary class names
- Prefer `:has()` and contextual selectors
- Mobile-first responsive design
- Use CSS custom properties for theming
- Keep specificity low
- Comment complex selectors

Example:
```css
/* Card with avatar layout */
article:has(> img[width="48"]) {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}
```

### HTML

- Use semantic elements (`<article>`, `<header>`, `<nav>`)
- No utility classes
- Use ARIA attributes when appropriate
- Keep markup minimal

### JavaScript

- Vanilla JavaScript only (no dependencies)
- Progressive enhancement
- Comment complex logic

## Testing

Before submitting a PR:

1. Test in multiple browsers (Chrome, Firefox, Safari)
2. Test responsive behavior (mobile, tablet, desktop)
3. Test dark mode
4. Verify no console errors
5. Check accessibility with keyboard navigation

## Questions?

Feel free to ask questions in:
- [Discussions](https://github.com/dathims/nocss/discussions)
- [Issues](https://github.com/dathims/nocss/issues)

Thank you for contributing! 🎉
