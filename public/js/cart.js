
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


    function recalcularTotal() {
        let total = 0;
        
        // Busca todos los inputs de cantidad
        document.querySelectorAll('.qty-input').forEach(input => {
            const cantidad = parseInt(input.value) || 1;
            const puntos = parseInt(input.dataset.points) || 0; // Lee desde data-points
            total += cantidad * puntos;
        });
        
        // Actualiza el texto con formato chileno (puntos de miles)
        const totalElement = document.querySelector('.checkout h1');
        if (totalElement) {
            totalElement.textContent = `Total de puntos: ${new Intl.NumberFormat('es-CL').format(total)}`;
        }
        sessionStorage.setItem('totalPoints', total);
    }

    /* ============================================================= */

    // Script para eliminar un producto y recalcular el total
    document.querySelectorAll('.product-remove-button').forEach(btn => {
        btn.addEventListener('click', (e) => {
            // 1. Encontrar el contenedor del producto más cercano
            const productCard = e.target.closest('.product-cart');
            
            if (productCard) {
                // 2. (Opcional) Animación de salida
                productCard.style.opacity = '0';
                productCard.style.transform = 'translateX(-20px)';
                productCard.style.transition = 'all 0.3s ease';
                
                // 3. Eliminar después de la animación
                setTimeout(() => {
                    productCard.remove();
                    
                    // 4. Recalcular el total después de eliminar
                    if (typeof recalcularTotal === 'function') {
                        recalcularTotal();
                    }

                    // Verifica si ya no hay productos
                    const hayProductos = document.querySelectorAll('.product-cart').length;
                    
                    // 5. (Opcional) Mostrar mensaje si el carrito está vacío
                    if (hayProductos === 0) {
                        const container = document.querySelector('.container');
                        const emptyMsg = document.createElement('h2');
                        emptyMsg.textContent = 'Tu carrito está vacío.';
                        emptyMsg.style.textAlign = 'center';
                        container.appendChild(emptyMsg);

                        // Oculta o muestra los elementos según corresponda
                        document.querySelectorAll('h1').forEach(el => {
                            el.style.display = hayProductos ? 'block' : 'none';
                        });
                        document.querySelector('.button-pay').style.display = hayProductos ? 'block' : 'none';
                    }
                }, 300);
            }
        });
    });

    /* ============================================================= */

    // Selecciona todos los selectores de cantidad (uno por producto)
    const selectors = document.querySelectorAll('.quantity-selector');

    selectors.forEach(selector => {
        const input = selector.querySelector('.qty-input');
        const minusBtn = selector.querySelector('.minus');
        const plusBtn = selector.querySelector('.plus');
        const minQty = 1; // Cantidad mínima

        // Actualiza el input y avisa al resto del sistema
        const setValue = (val) => {
            if (val >= minQty) {
                input.value = val;
                // Dispara el evento para que el listener de 'change' ejecute recalcularTotal()
                input.dispatchEvent(new Event('change', { bubbles: true }));
            }
        };

        // Botón -
        minusBtn.addEventListener('click', () => {
            const current = parseInt(input.value) || minQty;
            setValue(current - 1);
        });

        // Botón +
        plusBtn.addEventListener('click', () => {
            const current = parseInt(input.value) || minQty;
            setValue(current + 1);
        });

        // Evita que escriban manualmente valores inválidos
        input.addEventListener('change', () => {
            let val = parseInt(input.value);
            if (isNaN(val) || val < minQty) input.value = minQty;
            recalcularTotal();
        });

        input.addEventListener('input', () => {
            // 'input' se dispara con cada tecla
            recalcularTotal();
        });

        recalcularTotal();
    });
