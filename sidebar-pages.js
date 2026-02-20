document.addEventListener('DOMContentLoaded', () => {
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
