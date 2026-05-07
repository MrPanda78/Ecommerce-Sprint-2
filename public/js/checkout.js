
    const userBtn = document.getElementById('userBtn');
    const dropdown = document.getElementById('userDropdown');

    userBtn.addEventListener('click', () => {
        dropdown.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
        if (!userBtn.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.classList.remove('open');
        }
    });

    const total = parseInt(sessionStorage.getItem('totalPoints') || 0);
    document.getElementById('checkoutTotal').textContent = new Intl.NumberFormat('es-CL').format(total);
