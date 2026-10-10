// ============================================
// DRIVEX - JAVASCRIPT (COMPLETE)
// ============================================

console.log("Hello DriveX! Script load hui ✅");
// ===== 2. SEARCH BAR =====
const searchBar = document.getElementById('searchBar');
const carCards = document.querySelectorAll('.car-card');

if (searchBar) {
    searchBar.addEventListener('input', function() {
        const searchText = searchBar.value.toLowerCase();
        
        carCards.forEach(function(card) {
            const carName = card.querySelector('h3').textContent.toLowerCase();
            
            if (carName.includes(searchText)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// ===== 3. FILTER BUTTONS =====
const filterButtons = document.querySelectorAll('.filter-btn');
const sortSelect = document.getElementById('sortSelect');
const carGrid = document.querySelector('.car-grid');

if (filterButtons.length > 0) {
    filterButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            filterButtons.forEach(function(b) {
                b.classList.remove('active');
            });
            btn.classList.add('active');
            
            const brand = btn.dataset.brand;
            
            carCards.forEach(function(card) {
                const carName = card.querySelector('h3').textContent.toLowerCase();
                
                if (brand === 'all' || carName.includes(brand)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// ===== 4. SORT =====
if (sortSelect) {
    sortSelect.addEventListener('change', function() {
        const sortValue = sortSelect.value;
        const cardsArray = Array.from(carCards);
        
        cardsArray.sort(function(a, b) {
            const priceA = parseInt(a.querySelector('p').textContent.replace(/[^0-9]/g, ''));
            const priceB = parseInt(b.querySelector('p').textContent.replace(/[^0-9]/g, ''));
            
            if (sortValue === 'low') return priceA - priceB;
            if (sortValue === 'high') return priceB - priceA;
            return 0;
        });
        
        cardsArray.forEach(function(card) {
            carGrid.appendChild(card);
        });
    });
}

// ===== 5. WISHLIST =====
const wishlistBtns = document.querySelectorAll('.wishlist-btn');

if (wishlistBtns.length > 0) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    wishlistBtns.forEach(function(btn) {
        const card = btn.closest('.car-card');
        const carId = card ? card.dataset.id : null;
        
        if (carId && wishlist.includes(carId)) {
            btn.classList.add('active');
            btn.textContent = '❤️';
        }
        
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const card = btn.closest('.car-card');
            if (!card) return;
            
            const carId = card.dataset.id;
            
            if (wishlist.includes(carId)) {
                wishlist = wishlist.filter(function(id) {
                    return id !== carId;
                });
                btn.classList.remove('active');
                btn.textContent = '🤍';
            } else {
                wishlist.push(carId);
                btn.classList.add('active');
                btn.textContent = '❤️';
            }
            
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
        });
    });
}

// ===== 6. CONTACT FORM VALIDATION =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        const formMessage = document.getElementById('formMessage');
        
        formMessage.textContent = '';
        formMessage.className = 'form-message';
        
        if (name === '' || email === '' || message === '') {
            formMessage.textContent = '❌ Please fill all fields!';
            formMessage.classList.add('error');
            return;
        }
        
        if (name.length < 3) {
            formMessage.textContent = '❌ Name must be at least 3 characters!';
            formMessage.classList.add('error');
            return;
        }
        
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            formMessage.textContent = '❌ Please enter a valid email!';
            formMessage.classList.add('error');
            return;
        }
        
        if (message.length < 10) {
            formMessage.textContent = '❌ Message must be at least 10 characters!';
            formMessage.classList.add('error');
            return;
        }
        
        formMessage.textContent = '✅ Message sent successfully! Thank you, ' + name + '!';
        formMessage.classList.add('success');
        
        contactForm.reset();
    });
}
// ===== 7. CARD TILT EFFECT =====
const tiltCards = document.querySelectorAll('.car-card');

tiltCards.forEach(function(card) {
    card.addEventListener('mousemove', function(e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;
        
        card.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        card.style.transform = '';
    });
});
