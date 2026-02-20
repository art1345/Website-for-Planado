document.addEventListener('DOMContentLoaded', () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').catch((error) => {
            console.warn('Service Worker registration failed:', error);
        });
    }

    const ensureHeader = () => {
        if (document.querySelector('header')) return;

        const header = document.createElement('header');
        header.innerHTML = `
            <div class="header-container">
                <div class="logo-section">
                    <div class="logo">
                        <span class="logo-icon"><i class="fas fa-users"></i></span>
                        <h1>Planado</h1>
                    </div>
                    <p class="tagline">Your Friends' Space</p>
                </div>
                <div class="header-controls">
                    <button class="post-button" onclick="window.location.href='index.html'">
                        <i class="fas fa-home"></i>
                        <span>Back Home</span>
                    </button>
                </div>
            </div>
        `;

        document.body.insertBefore(header, document.body.firstChild);
    };

    ensureHeader();

    const setupMobileSidebarToggle = () => {
        const headerControls = document.querySelector('.header-controls');
        const sidebar = document.getElementById('sidebar');
        if (!headerControls || !sidebar) return;

        let toggleBtn = document.getElementById('mobileMenuToggle');
        if (!toggleBtn) {
            toggleBtn = document.createElement('button');
            toggleBtn.id = 'mobileMenuToggle';
            toggleBtn.className = 'mobile-menu-toggle';
            toggleBtn.type = 'button';
            toggleBtn.setAttribute('aria-label', 'Open menu');
            toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
            headerControls.insertBefore(toggleBtn, headerControls.firstChild);
        }

        let overlay = document.getElementById('mobileSidebarOverlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'mobileSidebarOverlay';
            overlay.className = 'mobile-sidebar-overlay';
            document.body.appendChild(overlay);
        }

        const closeMenu = () => document.body.classList.remove('sidebar-open');
        const toggleMenu = () => document.body.classList.toggle('sidebar-open');

        toggleBtn.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', closeMenu);

        document.querySelectorAll('#sidebar nav a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) closeMenu();
        });
    };

    setupMobileSidebarToggle();

    const savedPreference = localStorage.getItem('planadoThemePreference') || 'dark';
    const resolvedTheme = savedPreference === 'system'
        ? (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')
        : savedPreference;
    document.body.setAttribute('data-theme', resolvedTheme);

    const systemThemeMedia = window.matchMedia('(prefers-color-scheme: light)');
    systemThemeMedia.onchange = () => {
        const currentPreference = localStorage.getItem('planadoThemePreference') || 'dark';
        if (currentPreference === 'system') {
            const nextTheme = systemThemeMedia.matches ? 'light' : 'dark';
            document.body.setAttribute('data-theme', nextTheme);
        }
    };

    const links = document.querySelectorAll('#sidebar nav ul li a');
    const current = window.location.pathname.split('/').pop() || 'index.html';

    links.forEach(link => {
        const href = link.getAttribute('href');

        if (href === current) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }

        link.addEventListener('click', (e) => {
            e.preventDefault();
            if (href) {
                window.location.href = href;
            }
        });
    });
});
