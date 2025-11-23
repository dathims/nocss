# NoCSS

> A revolutionary CSS framework that styles your HTML based on structure, not classes.

NoCSS is a modern, mobile-first CSS framework that uses intelligent contextual selectors to automatically style your HTML elements. Write semantic HTML and let NoCSS handle the styling without cluttering your markup with utility classes.

## Philosophy

Traditional CSS frameworks require you to add numerous classes to your HTML:

```html
<!-- Traditional approach -->
<button class="btn btn-primary btn-lg flex items-center gap-2">
  <svg class="w-5 h-5">...</svg>
  Click me
</button>
```

With NoCSS, you write clean, semantic HTML:

```html
<!-- NoCSS approach -->
<button>
  <svg>...</svg>
  Click me
</button>
```

NoCSS automatically detects that your button contains an SVG and applies the appropriate styling based on the element structure and context.

## Features

- **Zero Classes**: No utility classes in your HTML markup
- **Semantic HTML**: Write clean, accessible HTML
- **Intelligent Selectors**: Context-aware styling based on element relationships
- **Position-Based Variants**: Button styles adapt based on DOM position
- **Chrome-Style Tabs**: Modern tab interface with :target support
- **Modal & Overlays**: Dialog, drawer, popover, toast components
- **Code Viewer**: Built-in toggle between code and preview
- **Mobile-First**: Responsive design out of the box
- **Modern Design**: Flat, minimalist aesthetic
- **Dark Mode**: Automatic dark mode support via `prefers-color-scheme`
- **Accessibility**: Built-in focus states and ARIA support
- **System Fonts**: Fast-loading, native font stack
- **JavaScript Helpers**: Optional JS for enhanced interactions

## Installation

### Download

Download `nocss.min.css` from the `/dist` folder and include it in your HTML:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My App</title>
  <link rel="stylesheet" href="path/to/nocss.min.css">
</head>
<body>
  <!-- Your content here -->

  <!-- Optional: Include JavaScript helpers for enhanced interactions -->
  <script src="path/to/nocss.js"></script>
</body>
</html>
```

### Build from source

```bash
npm install
npm run build
```

## Components

### Typography

NoCSS automatically styles all typography elements with a harmonious scale:

```html
<h1>Main Title</h1>
<h2>Section Title</h2>
<p>This is a paragraph with automatic styling.</p>
<ul>
  <li>List item 1</li>
  <li>List item 2</li>
</ul>
<blockquote>
  <p>A beautiful quote</p>
  <cite>Author Name</cite>
</blockquote>
```

### Forms

Forms are intelligently styled based on their structure:

```html
<form>
  <!-- Label above input -->
  <label>Email</label>
  <input type="email" />

  <!-- Label with input in a wrapper -->
  <div>
    <label>Password</label>
    <input type="password" />
  </div>

  <!-- Input with help text -->
  <label>Username</label>
  <input type="text" />
  <span>Choose a unique username</span>

  <!-- Checkbox with inline label -->
  <label>
    <input type="checkbox" />
    Remember me
  </label>

  <!-- Button with icon -->
  <button>
    <svg>...</svg>
    Submit
  </button>
</form>
```

**Intelligent detection:**
- `form > label + input` → Label positioned above input
- `form > div > label + input` → Wrapped form field
- `label:has(input[type="checkbox"])` → Inline checkbox label
- `button:has(svg)` → Button with icon
- `input:invalid + span` → Error message styling

### Navigation

Create navigation menus without any classes:

```html
<!-- Horizontal navigation -->
<nav>
  <a href="/">Logo</a>
  <ul>
    <li><a href="/home">Home</a></li>
    <li><a href="/about">About</a></li>
    <li><a href="/contact">Contact</a></li>
  </ul>
</nav>

<!-- Breadcrumb -->
<nav>
  <ol>
    <li><a href="/">Home</a></li>
    <li><a href="/products">Products</a></li>
    <li>Current Page</li>
  </ol>
</nav>

<!-- Tabs -->
<nav role="tablist">
  <a href="#tab1" class="active">Tab 1</a>
  <a href="#tab2">Tab 2</a>
  <a href="#tab3">Tab 3</a>
</nav>
```

### Containers & Cards

Automatic layout and card styling:

```html
<!-- Card -->
<article>
  <img src="image.jpg" alt="Cover" />
  <header>
    <h3>Card Title</h3>
  </header>
  <p>Card content goes here.</p>
  <footer>
    <button>Read more</button>
  </footer>
</article>

<!-- Grid of cards -->
<div>
  <article>Card 1</article>
  <article>Card 2</article>
  <article>Card 3</article>
</div>
```

**Intelligent detection:**
- `article > img:first-child` → Full-width cover image
- `article > header` → Card header with border
- `article > footer` → Card footer with border
- `div:has(> article + article)` → Automatic grid layout

### Utilities

Common utility elements styled automatically:

```html
<!-- Links with automatic external icon -->
<a href="https://example.com">External link</a>

<!-- Download link -->
<a href="file.pdf" download>Download PDF</a>

<!-- Badge in button -->
<button>
  Messages
  <span>5</span>
</button>

<!-- Alert messages -->
<div role="alert" data-type="success">
  Operation successful!
</div>

<!-- Progress bar -->
<progress value="70" max="100"></progress>

<!-- Keyboard shortcuts -->
<p>Press <kbd>Ctrl</kbd> + <kbd>S</kbd> to save</p>

<!-- Tooltip -->
<span data-tooltip="This is a tooltip">Hover me</span>
```

### Button Variants (Position-based)

NoCSS automatically styles buttons differently based on their position in the DOM:

```html
<div>
  <button>Primary Action</button>    <!-- First button = Primary (blue) -->
  <button>Secondary Action</button>  <!-- 2nd+ buttons = Secondary (gray) -->
  <button>Tertiary Action</button>   <!-- Last in 3+ group = Tertiary (outline) -->
</div>
```

**How it works:**
- `button:first-of-type` → Primary styling (default blue)
- `button:nth-of-type(n+2)` → Secondary styling (gray)
- `button:nth-of-type(n+3):last-of-type` → Tertiary styling (outline)

### Tabs (Chrome-style)

Modern tab interface with automatic styling:

```html
<div data-tabs>
  <nav>
    <a href="#tab1" aria-selected="true">Tab 1</a>
    <a href="#tab2">Tab 2</a>
    <a href="#tab3">Tab 3</a>
  </nav>
  <div>
    <div data-tab="tab1">Content 1</div>
    <div data-tab="tab2" style="display: none;">Content 2</div>
    <div data-tab="tab3" style="display: none;">Content 3</div>
  </div>
</div>
```

Features:
- Chrome-like tab appearance
- Automatic aria-selected handling via JavaScript
- Supports icons and badges
- Responsive mobile view

### Modal & Dialog

Accessible modal dialogs with backdrop:

```html
<button data-modal-trigger="my-modal">Open Modal</button>

<dialog id="my-modal">
  <header>
    <h3>Modal Title</h3>
    <button data-modal-close aria-label="Close">×</button>
  </header>
  <article>
    <p>Modal content goes here.</p>
  </article>
  <footer>
    <button>Confirm</button>
    <button data-modal-close>Cancel</button>
  </footer>
</dialog>
```

Features:
- Automatic backdrop with blur
- Click outside or ESC to close
- Focus trap
- Size variants via `data-size="sm|md|lg|full"`

### Overlays & Popovers

Additional overlay components:

```html
<!-- Drawer (side panel) -->
<div id="my-drawer" data-drawer data-position="left">
  <h3>Drawer Content</h3>
</div>

<!-- Popover -->
<div id="my-popover" data-popover data-position="bottom">
  <p>Popover content with arrow</p>
</div>

<!-- Toast notification -->
<div data-toast data-type="success" data-open="true">
  Operation successful!
</div>
```

### Code Viewer

Built-in code/preview toggle for documentation:

```html
<article data-code-viewer>
  <button data-toggle-view></button>

  <div data-preview>
    <!-- Your component here -->
    <button>Click me</button>
  </div>

  <pre data-code><code>
&lt;button&gt;Click me&lt;/button&gt;
  </code></pre>
</article>
```

The code viewer automatically extracts HTML from the preview and formats it.

## JavaScript API

NoCSS includes optional JavaScript helpers for enhanced interactions:

```javascript
// Auto-initialized on page load
NoCSS.init();

// Manual API usage
NoCSS.modals.open('my-modal');
NoCSS.modals.close(dialogElement);

NoCSS.drawer.open('my-drawer');
NoCSS.drawer.close('my-drawer');

NoCSS.toast.show('Message', 'success', 3000);

NoCSS.popover.show('triggerId', 'popoverId', 'bottom');

// Positioning helpers
NoCSS.position.center('my-element');
NoCSS.position.sticky('my-header', 0);
NoCSS.position.fixed('my-element', { top: 20, right: 20 });
```

All interactions work automatically with data attributes:
- `data-modal-trigger="modal-id"` → Opens modal
- `data-modal-close` → Closes current modal
- `data-overlay-trigger="overlay-id"` → Opens overlay
- `data-toggle-view` → Toggles code viewer

## Contextual Selectors

NoCSS uses modern CSS selectors to detect context and apply appropriate styling:

### `:has()` Selector
Detects parent elements based on their children:
- `button:has(svg)` → Button containing an icon
- `label:has(input[type="checkbox"])` → Label wrapping a checkbox
- `div:has(> article + article)` → Container with multiple cards

### Combinators
Detects relationships between elements:
- `label + input` → Input immediately after a label
- `input:invalid + span` → Error message after invalid input
- `article > img:first-child` → Cover image at the start of a card

### Structural Pseudo-classes
Applies styles based on position:
- `:first-child`, `:last-child` → First/last elements
- `:nth-child(even)` → Alternating styles
- `:only-child` → Single child elements

## Browser Support

NoCSS uses modern CSS features and supports:

- Chrome 105+
- Firefox 121+
- Safari 15.4+
- Edge 105+

**Required features:**
- `:has()` selector
- `:is()` / `:where()` selectors
- CSS Grid
- CSS Custom Properties
- Flexbox

## Customization

NoCSS uses CSS custom properties for easy theming:

```css
:root {
  --color-primary-600: #2563eb;
  --font-sans: "Your Font", system-ui;
  --space-4: 1rem;
  --radius-md: 0.5rem;
}
```

All variables are defined in `/src/core/_variables.css`.

## Examples

Check the `/examples` folder for complete page templates:

- `index.html` - Component showcase
- `form-example.html` - Complete form example
- `landing-page.html` - Landing page template
- `dashboard.html` - Dashboard layout

## Development

```bash
# Install dependencies
npm install

# Watch mode (development)
npm run dev

# Build for production
npm run build

# Serve examples locally
npm run serve
```

## How It Works

NoCSS leverages modern CSS selectors to create "intelligent" stylesheets:

1. **Structure detection**: Uses `:has()` to detect element children
2. **Relationship detection**: Uses combinators (`+`, `>`, `~`) to detect sibling/child relationships
3. **Position detection**: Uses `:first-child`, `:last-child`, `:nth-child()` for positional styling
4. **Attribute detection**: Uses attribute selectors for `[type]`, `[role]`, etc.

Example:
```css
/* Detects button with an SVG inside */
button:has(svg) {
  gap: var(--space-2);
}

/* Detects label followed by input */
label + input {
  margin-top: 0;
}
```

## Limitations

- **Browser support**: Requires modern browsers with `:has()` support
- **Specificity**: Sometimes you may need minimal custom classes
- **Complex layouts**: Very custom designs may require additional CSS
- **Learning curve**: Requires understanding of semantic HTML structure

## Contributing

Contributions are welcome! Please read the contributing guidelines first.

## License

MIT License - feel free to use NoCSS in your projects.

## Credits

Built with modern CSS, PostCSS, and a vision for cleaner HTML.

---

**No classes. No bloat. Just semantic HTML.**
