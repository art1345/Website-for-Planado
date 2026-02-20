document.addEventListener('DOMContentLoaded', () => {
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
