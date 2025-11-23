/*!
 * NoCSS JavaScript Helpers v0.1.0
 * Helpers pour modals, tabs, code viewer et positionnement
 */

(function (global) {
  'use strict';

  const NoCSS = {
    /**
     * Initialise tous les modules NoCSS
     */
    init() {
      this.navigation.init();
      this.tabs.init();
      this.modals.init();
      this.overlays.init();
      this.theme.init();
      // codeViewer doit s'exécuter AVANT syntaxHighlight
      this.codeViewer.init();
      this.syntaxHighlight.init();
      this.sidebar.init();
      console.log('NoCSS initialized');
    },

    /**
     * Module Navigation (mobile hamburger)
     */
    navigation: {
      init() {
        // Gérer le menu hamburger mobile
        // Exclure les boutons de thème qui sont dans [data-theme-switcher]
        const navButtons = document.querySelectorAll('nav > button:not([data-theme])');
        console.log('NoCSS Navigation: Found', navButtons.length, 'nav buttons');

        navButtons.forEach(button => {
          button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const nav = button.closest('nav');
            console.log('Toggle nav menu', nav);
            nav.classList.toggle('open');
          });
        });

        // Fermer le menu mobile quand on clique sur un lien
        document.querySelectorAll('nav ul a').forEach(link => {
          link.addEventListener('click', () => {
            const nav = link.closest('nav');
            if (nav && nav.classList.contains('open')) {
              nav.classList.remove('open');
            }
          });
        });

        // Fermer le menu en cliquant ailleurs (mobile)
        document.addEventListener('click', (e) => {
          const openNav = document.querySelector('nav.open');
          if (openNav && !openNav.contains(e.target)) {
            openNav.classList.remove('open');
          }
        });
      }
    },

    /**
     * Module Tabs
     */
    tabs: {
      init() {
        // Handle tabs with :target
        const tabContainers = document.querySelectorAll('[data-tabs]');

        tabContainers.forEach(container => {
          const links = container.querySelectorAll('nav a');
          const panels = container.querySelectorAll('[data-tab]');

          links.forEach(link => {
            link.addEventListener('click', (e) => {
              const targetId = link.getAttribute('href').substring(1);
              const targetPanel = container.querySelector(`[data-tab="${targetId}"]`);

              if (targetPanel) {
                // Mettre à jour aria-selected
                links.forEach(l => l.setAttribute('aria-selected', 'false'));
                link.setAttribute('aria-selected', 'true');

                // Cacher tous les panels et afficher le bon
                panels.forEach(p => p.style.display = 'none');
                targetPanel.style.display = 'block';
              }
            });
          });

          // Activer le premier tab par défaut
          if (links.length > 0 && !window.location.hash) {
            links[0].setAttribute('aria-selected', 'true');
          }
        });
      }
    },

    /**
     * Module Modals & Dialogs
     */
    modals: {
      init() {
        // Écouter les boutons qui ouvrent des modals
        document.addEventListener('click', (e) => {
          const trigger = e.target.closest('[data-modal-trigger]');
          if (trigger) {
            e.preventDefault();
            const modalId = trigger.getAttribute('data-modal-trigger');
            this.open(modalId);
          }

          // Fermer le modal
          const close = e.target.closest('[data-modal-close]');
          if (close) {
            e.preventDefault();
            const dialog = close.closest('dialog');
            if (dialog) {
              this.close(dialog);
            }
          }
        });

        // Close with Escape
        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape') {
            const openDialog = document.querySelector('dialog[open]');
            if (openDialog) {
              this.close(openDialog);
            }
          }
        });

        // Fermer en cliquant sur le backdrop
        document.querySelectorAll('dialog').forEach(dialog => {
          dialog.addEventListener('click', (e) => {
            const rect = dialog.getBoundingClientRect();
            const isInDialog = (
              e.clientX >= rect.left &&
              e.clientX <= rect.right &&
              e.clientY >= rect.top &&
              e.clientY <= rect.bottom
            );
            if (!isInDialog) {
              this.close(dialog);
            }
          });
        });
      },

      open(modalId) {
        const modal = document.getElementById(modalId);
        if (modal && modal.tagName === 'DIALOG') {
          modal.showModal();

          // Focus trap
          const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusableElements.length > 0) {
            focusableElements[0].focus();
          }
        }
      },

      close(modal) {
        if (modal && modal.tagName === 'DIALOG') {
          modal.close();
        }
      }
    },

    /**
     * Module Overlays (alternatives au dialog)
     */
    overlays: {
      init() {
        document.addEventListener('click', (e) => {
          const trigger = e.target.closest('[data-overlay-trigger]');
          if (trigger) {
            e.preventDefault();
            const overlayId = trigger.getAttribute('data-overlay-trigger');
            this.open(overlayId);
          }

          const close = e.target.closest('[data-overlay-close]');
          if (close) {
            e.preventDefault();
            const overlay = close.closest('[data-overlay]');
            if (overlay) {
              this.close(overlay.id);
            }
          }
        });
      },

      open(overlayId) {
        const overlay = document.getElementById(overlayId);
        if (overlay) {
          overlay.setAttribute('data-open', 'true');
          document.body.style.overflow = 'hidden';

          // Fermer en cliquant sur le backdrop
          overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
              this.close(overlayId);
            }
          });
        }
      },

      close(overlayId) {
        const overlay = document.getElementById(overlayId);
        if (overlay) {
          overlay.setAttribute('data-open', 'false');
          document.body.style.overflow = '';
        }
      }
    },

    /**
     * Module Code Viewer
     */
    codeViewer: {
      init() {
        const viewers = document.querySelectorAll('[data-code-viewer]');

        viewers.forEach(viewer => {
          const toggleSwitch = viewer.querySelector('[data-toggle-view] input[type="checkbox"]');
          const preview = viewer.querySelector('[data-preview]');
          const preBlock = viewer.querySelector('[data-code]');
          const codeBlock = preBlock ? preBlock.querySelector('code') : null;

          if (!toggleSwitch || !preview || !codeBlock || !preBlock) return;

          // Extraire le code HTML du preview si le codeBlock est vide
          // Sauvegarder le code HTML original avant que syntax highlighting soit appliqué
          if (!codeBlock.hasAttribute('data-original-saved')) {
            const existingCode = codeBlock.textContent.trim();
            if (!existingCode) {
              const html = preview.innerHTML.trim();
              const formatted = this.formatHTML(html);
              codeBlock.textContent = formatted;
            }
            codeBlock.setAttribute('data-original-saved', 'true');
          }

          // Toggle entre code et preview
          toggleSwitch.addEventListener('change', () => {
            if (toggleSwitch.checked) {
              preview.style.display = 'none';
              preBlock.style.display = 'block';
            } else {
              preview.style.display = 'block';
              preBlock.style.display = 'none';
            }
          });

          // Initialiser l'état (preview visible, code caché)
          preBlock.style.display = 'none';
          preview.style.display = 'block';
          toggleSwitch.checked = false;
        });
      },

      formatHTML(html) {
        // Nettoyer le HTML: supprimer les attributs data-token et autres artefacts
        let cleaned = html
          .replace(/\s*data-token="[^"]*"/g, '')
          .replace(/\s*data-lang="[^"]*"/g, '')
          .replace(/<span>([^<]*)<\/span>/g, '$1')
          .trim();

        // Format HTML pour un meilleur affichage
        let formatted = cleaned
          .replace(/></g, '>\n<')
          .split('\n')
          .map(line => line.trim())
          .filter(line => line.length > 0)
          .join('\n');

        // Indentation basique
        let indent = 0;
        formatted = formatted.split('\n').map(line => {
          if (line.match(/<\/\w+>/) && !line.match(/<\w+/)) {
            indent = Math.max(0, indent - 2);
          }

          const indented = ' '.repeat(indent) + line;

          if (line.match(/<\w+[^>]*[^\/]>/) && !line.match(/<\/\w+>/)) {
            indent += 2;
          }

          return indented;
        }).join('\n');

        return formatted;
      }
    },

    /**
     * Module Toast Notifications
     */
    toast: {
      show(message, type = 'info', duration = 3000) {
        const toast = document.createElement('div');
        toast.setAttribute('data-toast', '');
        toast.setAttribute('data-type', type);
        toast.setAttribute('data-open', 'true');
        toast.textContent = message;

        document.body.appendChild(toast);

        setTimeout(() => {
          toast.setAttribute('data-open', 'false');
          setTimeout(() => toast.remove(), 300);
        }, duration);
      }
    },

    /**
     * Module Drawer
     */
    drawer: {
      open(drawerId) {
        const drawer = document.getElementById(drawerId);
        if (!drawer) return;

        drawer.setAttribute('data-open', 'true');

        // Create backdrop si nécessaire
        let backdrop = document.querySelector('[data-drawer-backdrop]');
        if (!backdrop) {
          backdrop = document.createElement('div');
          backdrop.setAttribute('data-drawer-backdrop', '');
          backdrop.addEventListener('click', () => this.close(drawerId));
          document.body.appendChild(backdrop);
        }
        backdrop.setAttribute('data-open', 'true');
      },

      close(drawerId) {
        const drawer = document.getElementById(drawerId);
        const backdrop = document.querySelector('[data-drawer-backdrop]');

        if (drawer) {
          drawer.setAttribute('data-open', 'false');
        }
        if (backdrop) {
          backdrop.setAttribute('data-open', 'false');
        }
      }
    },

    /**
     * Module Popover
     */
    popover: {
      show(triggerId, popoverId, position = 'bottom') {
        const trigger = document.getElementById(triggerId);
        const popover = document.getElementById(popoverId);

        if (!trigger || !popover) return;

        // Positionner le popover
        const rect = trigger.getBoundingClientRect();
        popover.setAttribute('data-position', position);

        switch (position) {
          case 'top':
            popover.style.left = `${rect.left + rect.width / 2}px`;
            popover.style.top = `${rect.top - popover.offsetHeight - 8}px`;
            break;
          case 'bottom':
            popover.style.left = `${rect.left + rect.width / 2}px`;
            popover.style.top = `${rect.bottom + 8}px`;
            break;
          case 'left':
            popover.style.left = `${rect.left - popover.offsetWidth - 8}px`;
            popover.style.top = `${rect.top + rect.height / 2}px`;
            break;
          case 'right':
            popover.style.left = `${rect.right + 8}px`;
            popover.style.top = `${rect.top + rect.height / 2}px`;
            break;
        }

        popover.setAttribute('data-open', 'true');

        // Fermer en cliquant ailleurs
        setTimeout(() => {
          const closePopover = (e) => {
            if (!popover.contains(e.target) && e.target !== trigger) {
              popover.setAttribute('data-open', 'false');
              document.removeEventListener('click', closePopover);
            }
          };
          document.addEventListener('click', closePopover);
        }, 10);
      }
    },

    /**
     * Utilitaires de positionnement
     */
    position: {
      center(element) {
        const el = typeof element === 'string' ? document.getElementById(element) : element;
        if (!el) return;

        el.style.position = 'fixed';
        el.style.top = '50%';
        el.style.left = '50%';
        el.style.transform = 'translate(-50%, -50%)';
      },

      sticky(element, top = 0) {
        const el = typeof element === 'string' ? document.getElementById(element) : element;
        if (!el) return;

        el.style.position = 'sticky';
        el.style.top = typeof top === 'number' ? `${top}px` : top;
      },

      fixed(element, position = {}) {
        const el = typeof element === 'string' ? document.getElementById(element) : element;
        if (!el) return;

        el.style.position = 'fixed';
        Object.keys(position).forEach(key => {
          el.style[key] = typeof position[key] === 'number' ? `${position[key]}px` : position[key];
        });
      }
    },

    /**
     * Module Syntax Highlighting
     * Colorisation syntaxique sans classes inline
     */
    syntaxHighlight: {
      init() {
        const codeBlocks = document.querySelectorAll('pre[data-lang] code');
        console.log('NoCSS Syntax Highlight: Found', codeBlocks.length, 'code blocks');

        codeBlocks.forEach(code => {
          const pre = code.closest('pre');
          const lang = pre.getAttribute('data-lang');
          const source = code.textContent;

          if (!lang || !source) return;

          // Skip si déjà highlighted
          if (code.hasAttribute('data-highlighted')) {
            return;
          }

          let highlighted = '';
          switch (lang.toLowerCase()) {
            case 'mixed':
              highlighted = this.highlightMixed(source);
              break;
            case 'html':
            case 'xml':
              highlighted = this.highlightHTML(source);
              break;
            case 'css':
              highlighted = this.highlightCSS(source);
              break;
            case 'javascript':
            case 'js':
              highlighted = this.highlightJS(source);
              break;
            default:
              highlighted = this.escapeHTML(source);
          }

          code.innerHTML = highlighted;
          code.setAttribute('data-highlighted', 'true');
        });
      },

      escapeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
      },

      unescapeHTML(str) {
        const textarea = document.createElement('textarea');
        textarea.innerHTML = str;
        return textarea.value;
      },

      highlightHTMLTag(tagString) {
        // Colore une balise HTML isolée
        return tagString.replace(
          /(&lt;\/?)([\w-]+)((?:\s+[\w-]+(?:=(?:"[^"]*"|'[^']*'))?)*\s*)(\/?&gt;)/g,
          (match, open, tag, attrs, close) => {
            let result = `<span data-token="punctuation">${open}</span><span data-token="tag">${tag}</span>`;

            if (attrs) {
              result += attrs.replace(
                /([\w-]+)(=)("([^"]*)"|'([^']*)')?/g,
                (m, name, eq, quoted) => {
                  return `<span data-token="attr-name">${name}</span><span data-token="operator">${eq}</span><span data-token="attr-value">${quoted}</span>`;
                }
              );
            }

            result += `<span data-token="punctuation">${close}</span>`;
            return result;
          }
        );
      },

      highlightMixed(code) {
        // Tokenizer multi-phase pour HTML + CSS + JS
        const regions = [];
        let processed = this.escapeHTML(code);

        // Phase 1: Extraire et tokeniser les blocs <style>
        processed = processed.replace(
          /(&lt;style[^&]*?&gt;)([\s\S]*?)(&lt;\/style&gt;)/gi,
          (match, openTag, cssContent, closeTag) => {
            const id = `__NOCSS_STYLE_${regions.length}__`;
            regions.push({
              id: id,
              content: this.highlightHTMLTag(openTag) +
                       this.highlightCSS(this.unescapeHTML(cssContent)) +
                       this.highlightHTMLTag(closeTag)
            });
            return id;
          }
        );

        // Phase 2: Extraire et tokeniser les blocs <script>
        processed = processed.replace(
          /(&lt;script[^&]*?&gt;)([\s\S]*?)(&lt;\/script&gt;)/gi,
          (match, openTag, jsContent, closeTag) => {
            const id = `__NOCSS_SCRIPT_${regions.length}__`;
            regions.push({
              id: id,
              content: this.highlightHTMLTag(openTag) +
                       this.highlightJS(this.unescapeHTML(jsContent)) +
                       this.highlightHTMLTag(closeTag)
            });
            return id;
          }
        );

        // Phase 3: Tokeniser le HTML restant
        processed = this.highlightHTML(processed);

        // Phase 4: Restaurer les régions CSS/JS tokenisées
        regions.forEach(region => {
          processed = processed.replace(region.id, region.content);
        });

        return processed;
      },

      highlightHTML(code) {
        const escaped = this.escapeHTML(code);

        return escaped
          // Commentaires HTML
          .replace(/(&lt;!--.*?--&gt;)/g, '<span data-token="comment">$1</span>')
          // Tags with attributes
          .replace(/(&lt;\/?)([\w-]+)((?:\s+[\w-]+(?:=(?:"[^"]*"|'[^']*'))?)*\s*)(\/?&gt;)/g,
            (match, open, tag, attrs, close) => {
              let result = `<span data-token="punctuation">${open}</span><span data-token="tag">${tag}</span>`;

              if (attrs) {
                result += attrs.replace(/([\w-]+)(=)("([^"]*)"|'([^']*)')?/g,
                  (m, name, eq, quoted, dVal, sVal) => {
                    const val = dVal || sVal || '';
                    return `<span data-token="attr-name">${name}</span><span data-token="operator">${eq}</span><span data-token="attr-value">${quoted}</span>`;
                  }
                );
              }

              result += `<span data-token="punctuation">${close}</span>`;
              return result;
            }
          );
      },

      highlightCSS(code) {
        const escaped = this.escapeHTML(code);

        return escaped
          // Commentaires CSS
          .replace(/(\/\*[\s\S]*?\*\/)/g, '<span data-token="comment">$1</span>')
          // Selecteurs (avant {)
          .replace(/^([^{\/]+?)(\s*\{)/gm, (match, selector, brace) => {
            return `<span data-token="selector">${selector}</span><span data-token="punctuation">${brace}</span>`;
          })
          // Propriétés et valeurs
          .replace(/(\s+)([\w-]+)(\s*:\s*)([^;]+)(;)/g,
            (match, space, prop, colon, value, semi) => {
              // Colorer les valeurs spécifiques
              let coloredValue = value
                .replace(/\b(\d+(?:\.\d+)?(?:px|em|rem|%|vh|vw)?)\b/g, '<span data-token="number">$1</span>')
                .replace(/(['"].*?['"])/g, '<span data-token="string">$1</span>')
                .replace(/\b(var|calc|rgb|rgba|hsl|hsla|url)\b/g, '<span data-token="function">$1</span>');

              return `${space}<span data-token="property">${prop}</span>${colon}<span data-token="value">${coloredValue}</span><span data-token="punctuation">${semi}</span>`;
            }
          )
          // Accolades
          .replace(/([{}])/g, '<span data-token="punctuation">$1</span>');
      },

      highlightJS(code) {
        const escaped = this.escapeHTML(code);

        const keywords = [
          'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'do',
          'switch', 'case', 'break', 'continue', 'try', 'catch', 'finally', 'throw',
          'new', 'class', 'extends', 'import', 'export', 'from', 'default', 'async', 'await',
          'typeof', 'instanceof', 'delete', 'void', 'this', 'super', 'static', 'get', 'set'
        ];

        const keywordPattern = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g');

        return escaped
          // Commentaires
          .replace(/(\/\/.*$)/gm, '<span data-token="comment">$1</span>')
          .replace(/(\/\*[\s\S]*?\*\/)/g, '<span data-token="comment">$1</span>')
          // Chaînes de caractères
          .replace(/(['"`])((?:\\.|(?!\1)[^\\])*?)\1/g, '<span data-token="string">$1$2$1</span>')
          // Nombres
          .replace(/\b(\d+(?:\.\d+)?)\b/g, '<span data-token="number">$1</span>')
          // Booléens et null/undefined
          .replace(/\b(true|false)\b/g, '<span data-token="boolean">$1</span>')
          .replace(/\b(null|undefined)\b/g, '<span data-token="null">$1</span>')
          // Regex
          .replace(/\/(?![\/\*])(?:\\.|[^\\/\n])+\/[gimuy]*/g, '<span data-token="regex">$&</span>')
          // Fonctions (mot suivi de parenthèses)
          .replace(/\b([\w$]+)(?=\s*\()/g, '<span data-token="function">$1</span>')
          // Mots-clés
          .replace(keywordPattern, '<span data-token="keyword">$1</span>')
          // Opérateurs
          .replace(/([+\-*\/%=<>!&|?:]+)/g, '<span data-token="operator">$1</span>')
          // Ponctuation
          .replace(/([{}()\[\];,.])/g, '<span data-token="punctuation">$1</span>');
      }
    },

    /**
     * Module Theme Switcher
     */
    theme: {
      STORAGE_KEY: 'nocss-theme',
      currentTheme: null,

      init() {
        // Charger le thème sauvegardé ou utiliser 'auto' par défaut
        this.currentTheme = localStorage.getItem(this.STORAGE_KEY) || 'auto';
        this.applyTheme(this.currentTheme);

        // Écouter les clics sur les boutons de thème
        document.addEventListener('click', (e) => {
          const themeButton = e.target.closest('[data-theme-switcher] button[data-theme]');
          if (themeButton) {
            const theme = themeButton.getAttribute('data-theme');
            this.setTheme(theme);
          }
        });

        // Mettre à jour l'état actif des boutons
        this.updateButtons();

        console.log('NoCSS Theme: Initialized with theme', this.currentTheme);
      },

      setTheme(theme) {
        if (!['auto', 'light', 'dark'].includes(theme)) {
          console.warn('Invalid theme:', theme);
          return;
        }

        this.currentTheme = theme;
        localStorage.setItem(this.STORAGE_KEY, theme);
        this.applyTheme(theme);
        this.updateButtons();

        console.log('NoCSS Theme: Set to', theme);
      },

      applyTheme(theme) {
        const html = document.documentElement;

        // Retirer les anciennes classes de thème
        html.classList.remove('theme-light', 'theme-dark', 'theme-auto');

        // Appliquer la nouvelle classe
        if (theme === 'light') {
          html.classList.add('theme-light');
        } else if (theme === 'dark') {
          html.classList.add('theme-dark');
        } else {
          html.classList.add('theme-auto');
        }
      },

      updateButtons() {
        const buttons = document.querySelectorAll('[data-theme-switcher] button[data-theme]');
        buttons.forEach(button => {
          const buttonTheme = button.getAttribute('data-theme');
          if (buttonTheme === this.currentTheme) {
            button.setAttribute('aria-pressed', 'true');
          } else {
            button.setAttribute('aria-pressed', 'false');
          }
        });
      }
    },

    /**
     * Module Sidebar Observer
     * Détecte la section visible et met à jour la navigation sidebar
     */
    sidebar: {
      init() {
        const sidebar = document.querySelector('aside nav');
        if (!sidebar) return;

        const sidebarLinks = sidebar.querySelectorAll('a[href^="#"]');
        const sections = Array.from(sidebarLinks).map(link => {
          const id = link.getAttribute('href').substring(1);
          return document.getElementById(id);
        }).filter(Boolean);

        if (sections.length === 0) return;

        // Configuration de l'Intersection Observer
        const observerOptions = {
          root: null,
          rootMargin: '-20% 0px -70% 0px',
          threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const id = entry.target.id;
              // Retirer aria-current de tous les liens
              sidebarLinks.forEach(link => {
                link.removeAttribute('aria-current');
              });
              // Add aria-current au lien correspondant
              const activeLink = sidebar.querySelector(`a[href="#${id}"]`);
              if (activeLink) {
                activeLink.setAttribute('aria-current', 'location');
              }
            }
          });
        }, observerOptions);

        // Observer toutes les sections
        sections.forEach(section => observer.observe(section));

        console.log('NoCSS Sidebar: Observing', sections.length, 'sections');
      }
    }
  };

  // Exposer NoCSS globalement
  global.NoCSS = NoCSS;

  // Auto-init au chargement du DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => NoCSS.init());
  } else {
    NoCSS.init();
  }

})(typeof window !== 'undefined' ? window : this);
