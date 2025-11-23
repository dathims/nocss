/*!
 * NoCSS Component Loader v0.1.0
 * Vanilla JS component injection system
 * Copyright (c) 2025
 * Licensed under MIT
 */

(function(global) {
  'use strict';

  const ComponentLoader = {
    /**
     * Détermine le chemin de base selon la profondeur du répertoire
     */
    getBasePath() {
      const path = window.location.pathname;

      // Si dans examples/, remonter d'un niveau
      if (path.includes('/examples/')) {
        return '../';
      }

      // Sinon, chemin racine
      return './';
    },

    /**
     * Charge un composant HTML via fetch
     */
    async loadComponent(componentName, placeholder) {
      const basePath = this.getBasePath();
      const componentPath = `${basePath}src/components/${componentName}.html`;

      try {
        const response = await fetch(componentPath);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${componentPath}`);
        }

        const html = await response.text();

        // Remplacer le placeholder par le contenu
        if (placeholder) {
          placeholder.outerHTML = html;
        }

        console.log(`NoCSS: Component "${componentName}" loaded`);
        return true;
      } catch (error) {
        console.error(`NoCSS Component Loader: Failed to load ${componentName}`, error);
        return false;
      }
    },

    /**
     * Met à jour les liens relatifs pour la page courante
     */
    updateActiveLinks() {
      const currentPath = window.location.pathname;
      const links = document.querySelectorAll('nav a[href]');

      links.forEach(link => {
        const href = link.getAttribute('href');

        // Vérifier si le lien correspond à la page actuelle
        if (href === currentPath ||
            (href !== '/' && currentPath.includes(href.replace(/^\.\.\//, '')))) {
          link.setAttribute('aria-current', 'page');
        }
      });
    },

    /**
     * Initialise tous les composants
     */
    async init() {
      const components = [
        { name: 'header', selector: '[data-component="header"]' },
        { name: 'footer', selector: '[data-component="footer"]' }
      ];

      // Charger les composants séquentiellement
      for (const component of components) {
        const placeholder = document.querySelector(component.selector);
        if (placeholder) {
          await this.loadComponent(component.name, placeholder);
        }
      }

      // Mettre à jour les liens actifs
      this.updateActiveLinks();

      // Ré-initialiser les modules NoCSS après chargement
      if (global.NoCSS) {
        if (global.NoCSS.navigation) {
          global.NoCSS.navigation.init();
        }
        if (global.NoCSS.syntaxHighlight) {
          global.NoCSS.syntaxHighlight.init();
        }
        if (global.NoCSS.theme) {
          global.NoCSS.theme.updateButtons();
        }
      }

      console.log('NoCSS: All components loaded');
    }
  };

  // Exposer globalement
  global.ComponentLoader = ComponentLoader;

  // Auto-init au chargement du DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => ComponentLoader.init());
  } else {
    ComponentLoader.init();
  }

})(typeof window !== 'undefined' ? window : this);
