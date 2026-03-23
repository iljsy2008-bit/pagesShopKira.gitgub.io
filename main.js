 // Бургер-меню
        function toggleMenu() {
            document.getElementById('navLinks').classList.toggle('active');
        }
        
        // Закрыть меню при клике на ссылку (мобилка)
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    document.getElementById('navLinks').classList.remove('active');
                }
            });
        });


        // Фильтрация по категории
        function filterCategory(category) {
            const cards = document.querySelectorAll('.product-card');
            cards.forEach(card => {
                const cat = card.querySelector('.product-category').textContent;
                if (category === 'all' || cat === category) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
            searchProducts(); // совместить с поиском
        }

        // Поиск (твой код + улучшение)
       function searchProducts() {
    let input = document.getElementById('searchInput');
    let filter = input.value.toUpperCase().trim();
    let products = document.querySelectorAll('.product-card');
    let noResults = document.getElementById('noResults');
    let visibleProducts = 0;
    
    products.forEach(function(product) {
        let productName = product.getAttribute('data-name') || '';
        let category = product.querySelector('.product-category')?.textContent || '';
        let price = product.querySelector('.product-price')?.textContent || '';
        
        let searchText = (productName + ' ' + category + ' ' + price).toUpperCase();
        
        if (searchText.indexOf(filter) > -1 || filter === '') {
            product.classList.remove('hidden');
            product.style.order = ''; // Сбрасываем order при поиске
            visibleProducts++;
        } else {
            product.classList.add('hidden');
        }
        
        
    });
            
            noResults.classList.toggle('show', visibleProducts === 0 && filter.length > 0);
         }

        // Твой код корзины (оставь как есть)
        function addToCart(name, price, category, image) {
            // ... твой код ...
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            let existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ name, price, category, image, quantity: 1 });
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            showNotification('✅ Товар в корзине!');
            updateCartCount();
        }

        function showNotification(text) {
            let notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed; bottom: 20px; right: 20px; left: 20px;
                background: #000; color: #fff; padding: 15px 20px;
                border-radius: 12px; border-left: 4px solid #FF8C42;
                box-shadow: 0 5px 25px rgba(0,0,0,0.4); z-index: 2000;
                animation: slideIn 0.3s ease; text-align: center;
            `;
            notification.textContent = text;
            document.body.appendChild(notification);
            setTimeout(() => {
                notification.style.animation = 'slideOut 0.3s ease forwards';
                setTimeout(() => notification.remove(), 300);
            }, 2500);
        }

        function updateCartCount() {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
            let cartTotal = document.querySelector('.cart-total');
            if (cartTotal) cartTotal.textContent = total.toLocaleString('ru-RU') + ' ₽';
        }

        // Инициализация
        document.addEventListener('DOMContentLoaded', () => {
            updateCartCount();
            // Закрыть меню при изменении размера окна
            window.addEventListener('resize', () => {
                if (window.innerWidth > 768) {
                    document.getElementById('navLinks').classList.remove('active');
                }
            });
        });