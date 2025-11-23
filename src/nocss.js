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
      this.tabs.init();
      this.modals.init();
      this.codeViewer.init();
      this.overlays.init();
      console.log('NoCSS initialized');
    },

    /**
     * Module Tabs
     */
    tabs: {
      init() {
        // Gérer les tabs avec :target
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

        // Fermer avec Escape
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
          const toggleBtn = viewer.querySelector('[data-toggle-view]');
          const preview = viewer.querySelector('[data-preview]');
          const codeBlock = viewer.querySelector('[data-code]');

          if (!toggleBtn || !preview || !codeBlock) return;

          // Extraire le code HTML du preview
          if (!codeBlock.textContent.trim()) {
            const html = preview.innerHTML.trim();
            const formatted = this.formatHTML(html);
            codeBlock.textContent = formatted;
          }

          // Toggle entre code et preview
          let showingCode = false;
          toggleBtn.addEventListener('click', () => {
            showingCode = !showingCode;

            if (showingCode) {
              preview.style.display = 'none';
              codeBlock.style.display = 'block';
              toggleBtn.textContent = '👁 Preview';
            } else {
              preview.style.display = 'block';
              codeBlock.style.display = 'none';
              toggleBtn.textContent = '<> Code';
            }
          });

          // Initialiser l'état
          codeBlock.style.display = 'none';
          toggleBtn.textContent = '<> Code';
        });
      },

      formatHTML(html) {
        // Format HTML pour un meilleur affichage
        let formatted = html
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

          if (line.match(/<\w+/) && !line.match(/\/>/)) {
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

        // Créer backdrop si nécessaire
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
