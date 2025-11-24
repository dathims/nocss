# Changelog

All notable changes to NoCSS will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.1] - 2024-11-24

### Added
- Mobile sidebar with slide transitions (left/right positioning)
- Backdrop overlay for mobile sidebar
- Sidebar toggle button with close functionality
- Keyboard support (Escape key to close sidebar)
- Scroll spy for sidebar navigation
- GitHub Actions workflow for automated npm publishing
- Comprehensive publishing documentation (PUBLISHING.md)

### Fixed
- Removed conflicting CSS rules for mobile sidebar
- Fixed sidebar appearing at bottom instead of sliding from side
- Removed bottom-sticky aside behavior on mobile
- Component paths now use relative URLs for better compatibility

### Changed
- Improved sidebar UX with smooth transitions
- Better mobile navigation experience
- Component loader now adjusts navigation links dynamically

### Removed
- Obsolete NPM_PUBLISH.md documentation
- Backup files (.bak) from repository
- Legacy sidebar positioning code

## [0.1.0] - 2024-11-24

### Added
- Initial public release
- Complete documentation
- GitHub Pages deployment
- npm package setup
- CDN distribution
- Mobile sidebar with slide transitions
- Component loader system
- Syntax highlighting for code blocks
- Theme switcher (auto/light/dark)
- Responsive navigation

---

## Release Types

- **Major** (X.0.0): Breaking changes, major features
- **Minor** (0.X.0): New features, backwards compatible
- **Patch** (0.0.X): Bug fixes, small improvements
