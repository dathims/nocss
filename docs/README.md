# NoCSS Framework

A modern, classless CSS framework that brings intelligent styling to semantic HTML. NoCSS detects your HTML structure and applies beautiful, responsive styles automatically—no utility classes, no CSS-in-JS, just pure semantic markup.

## ✨ Features

- **Zero Classes Required** - Write semantic HTML, get beautiful styling automatically
- **Intelligent Detection** - Styles adapt based on element position, siblings, and context
- **Modern CSS** - Built with `:has()`, container queries, and CSS Grid/Flexbox
- **Fully Responsive** - Mobile-first design with automatic breakpoint handling
- **Dark Mode** - Built-in dark mode with system preference detection
- **Accessible** - ARIA-aware styling and keyboard navigation support
- **Lightweight** - ~60KB minified CSS, zero JavaScript dependencies
- **Developer-Friendly** - Syntax highlighting, code viewer, and component library included

## 🚀 Quick Start

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@dathims/nocss/dist/nocss.min.css">
</head>
<body>
  <main>
    <header>
      <h1>Hello NoCSS</h1>
      <p>No classes needed!</p>
    </header>

    <article>
      <h2>Article Card</h2>
      <p>This automatically becomes a beautiful card.</p>
      <footer>
        <button>Primary</button>
        <button>Secondary</button>
      </footer>
    </article>
  </main>
</body>
</html>
```

## 📦 Installation

### CDN
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@dathims/nocss/dist/nocss.min.css">
```

### npm
```bash
npm install @dathims/nocss
```

### Manual
Download the latest release from [GitHub Releases](https://github.com/dathims/nocss/releases)

## 🎯 How It Works

NoCSS uses modern CSS selectors to detect your HTML structure and apply intelligent styling:

**Position-based styling:**
```css
button:first-of-type { /* Primary button */ }
button:nth-of-type(n+2) { /* Secondary buttons */ }
```

**Contextual detection:**
```css
article:has(> img:first-child) { /* Card with cover image */ }
article:has(> img[width="48"]) { /* Card with avatar */ }
```

**Semantic attributes:**
```html
<a href="#" aria-current="page">Active Link</a>
<div role="alert" data-type="success">Success message</div>
```

## 🧩 Components

All components work with semantic HTML only:

- **Cards** - `<article>` with automatic layouts
- **Forms** - `<form>`, `<label>`, `<input>` with built-in validation
- **Navigation** - `<nav>` with active states and mobile menu
- **Tables** - `<table>` with responsive design
- **Tabs** - Chrome-style tabs with `data-tabs`
- **Modals** - Native `<dialog>` with backdrop
- **Alerts** - `role="alert"` with color variants
- **Badges & Tags** - `data-badge` and `data-tag` attributes
- **Code Blocks** - Syntax highlighting for HTML/CSS/JS

See the [Component Library](https://dathims.github.io/nocss/components.html) for live examples.

## 🎨 Customization

NoCSS uses CSS custom properties for theming:

```css
:root {
  --color-primary-600: #2563eb;
  --space-4: 1rem;
  --radius-lg: 0.75rem;
  --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}
```

## 📱 Browser Support

- Chrome 105+ (`:has()` support)
- Firefox 121+
- Safari 15.4+
- Edge 105+

## ⚖️ Trade-offs

NoCSS is powerful but has limitations:

- **Structure matters** - HTML order affects styling
- **Modern browsers only** - Requires `:has()` support
- **Less granular control** - Not suitable for pixel-perfect designs
- **Learning curve** - Understanding selector logic takes time

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📄 License

MIT License - see [LICENSE](LICENSE) for details

## 💖 Support

If you find NoCSS useful, consider supporting development:

- ⭐ Star this repository
- 🐛 Report bugs and suggest features
- 💰 [Sponsor on GitHub](https://github.com/sponsors/dathims)

## 🔗 Links

- [Live Demo](https://dathims.github.io/nocss)
- [Component Library](https://dathims.github.io/nocss/components.html)
- [GitHub Repository](https://github.com/dathims/nocss)

---

Built with ❤️ by [dathims](https://github.com/dathims)
