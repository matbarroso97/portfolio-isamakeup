// Loading Screen
window.addEventListener('load', () => {
    const loading = document.querySelector('.loading');
    if (loading) {
        setTimeout(() => {
            loading.classList.add('hidden');
            setTimeout(() => {
                loading.remove();
            }, 500);
        }, 1500);
    }
});

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const statNumbers = document.querySelectorAll('.stat-number');
const galleryItems = document.querySelectorAll('.gallery-item');
const form = document.querySelector('.form');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Counter Animation for Stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const isDecimal = target % 1 !== 0; // Check if target has decimal places
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            if (isDecimal) {
                element.textContent = start.toFixed(1);
            } else {
                element.textContent = Math.floor(start).toLocaleString();
            }
            requestAnimationFrame(updateCounter);
        } else {
            if (isDecimal) {
                element.textContent = target.toFixed(1);
            } else {
                element.textContent = target.toLocaleString();
            }
        }
    }
    
    updateCounter();
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Animate stats when stats section comes into view
            if (entry.target.classList.contains('hero-stats')) {
                const statsInSection = entry.target.querySelectorAll('.stat-number');
                statsInSection.forEach((stat, index) => {
                    const target = parseFloat(stat.dataset.target);
                    setTimeout(() => {
                        animateCounter(stat, target);
                    }, index * 200);
                });
            }
        }
    });
}, observerOptions);

// Observe elements for animation
const animatedElements = document.querySelectorAll('.hero-stats, .about-content, .gallery-item, .contact-content');
animatedElements.forEach(el => observer.observe(el));

// Parallax effect for hero background orbs
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.gradient-orb');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
});

// Gallery hover effects and lightbox functionality
galleryItems.forEach((item, index) => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0) scale(1)';
    });
    
    // Add click functionality for lightbox with navigation
    item.addEventListener('click', () => {
        const img = item.querySelector('.gallery-image');
        if (img) {
            // Create lightbox with navigation
            createLightbox(img.src, img.alt, index);
        }
    });
});

// Lightbox functionality with navigation
function createLightbox(src, alt, currentIndex) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    
    // Get all gallery images
    const allImages = Array.from(galleryItems).map(item => {
        const img = item.querySelector('.gallery-image');
        return { src: img.src, alt: img.alt };
    });
    
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="lightbox-close">&times;</span>
            <button class="lightbox-nav lightbox-prev" ${currentIndex === 0 ? 'disabled' : ''}>
                <i class="fas fa-chevron-left"></i>
            </button>
            <button class="lightbox-nav lightbox-next" ${currentIndex === allImages.length - 1 ? 'disabled' : ''}>
                <i class="fas fa-chevron-right"></i>
            </button>
            <img src="${src}" alt="${alt}" class="lightbox-image">
            <div class="lightbox-counter">${currentIndex + 1} / ${allImages.length}</div>
        </div>
    `;
    
    // Add lightbox styles
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const lightboxContent = lightbox.querySelector('.lightbox-content');
    lightboxContent.style.cssText = `
        position: relative;
        width: 80%;
        max-width: 600px;
        height: 85vh;
        max-height: 650px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        background: linear-gradient(135deg, #FFB6C1 0%, #FFC0CB 25%, #FFE4E1 50%, #FFB6C1 75%, #FF69B4 100%);
        border-radius: 30px;
        padding: 6px;
        box-shadow: 
            0 30px 100px rgba(255, 105, 180, 0.5),
            0 0 0 4px rgba(255, 182, 193, 0.9),
            inset 0 2px 10px rgba(255, 255, 255, 0.3),
            inset 0 -2px 10px rgba(255, 105, 180, 0.2);
        position: relative;
        overflow: hidden;
    `;
    
    // Adicionar corações e estrelas apenas nas bordas da moldura
    const heartsOverlay = document.createElement('div');
    heartsOverlay.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: 
            url("data:image/svg+xml,%3Csvg width='70' height='70' viewBox='0 0 70 70' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='35' y='50' font-family='Arial' font-size='28' fill='%23FFB6C1' opacity='0.6' text-anchor='middle'%3E♥%3C/text%3E%3C/svg%3E"),
            url("data:image/svg+xml,%3Csvg width='70' height='70' viewBox='0 0 70 70' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='35' y='50' font-family='Arial' font-size='24' fill='%23FFB6C1' opacity='0.4' text-anchor='middle'%3E💕%3C/text%3E%3C/svg%3E");
        background-size: 70px 70px, 60px 60px;
        background-position: 0 0, 35px 35px;
        background-repeat: repeat;
        pointer-events: none;
        border-radius: 30px;
        z-index: 1;
    `;
    lightboxContent.appendChild(heartsOverlay);
    
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    lightboxImage.style.cssText = `
        max-width: 100%;
        max-height: 100%;
        width: auto;
        height: auto;
        object-fit: contain;
        border-radius: 20px;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        border: 2px solid rgba(255, 255, 255, 0.3);
        position: relative;
        z-index: 2;
    `;
    
    // Aumentar largura específica para a foto 3 (imagem3.jpg)
    if (lightboxImage.src.includes('imagem3.jpg')) {
        lightboxImage.style.width = '120%';
        lightboxImage.style.maxWidth = '120%';
    }
    
    const closeBtn = lightbox.querySelector('.lightbox-close');
    closeBtn.style.cssText = `
        position: absolute;
        top: 10px;
        right: 10px;
        color: white;
        font-size: 24px;
        cursor: pointer;
        background: linear-gradient(135deg, #FF69B4, #FFB6C1);
        width: 35px;
        height: 35px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        transition: all 0.3s ease;
        z-index: 10002;
        box-shadow: 0 8px 25px rgba(255, 105, 180, 0.4), 0 0 0 2px rgba(255, 255, 255, 0.3);
    `;
    
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');
    
    [prevBtn, nextBtn].forEach(btn => {
        btn.style.cssText = `
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: linear-gradient(135deg, #FF69B4, #FFB6C1);
            color: white;
            border: none;
            width: 45px;
            height: 45px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            transition: all 0.3s ease;
            z-index: 10001;
            box-shadow: 0 6px 20px rgba(255, 105, 180, 0.4), 0 0 0 2px rgba(255, 255, 255, 0.3);
        `;
    });
    
    prevBtn.style.left = '5px';
    nextBtn.style.right = '5px';
    
    const counter = lightbox.querySelector('.lightbox-counter');
    counter.style.cssText = `
        position: absolute;
        bottom: -40px;
        left: 50%;
        transform: translateX(-50%);
        color: white;
        background: rgba(0, 0, 0, 0.7);
        padding: 8px 16px;
        border-radius: 20px;
        font-size: 14px;
        font-weight: 500;
    `;
    
    document.body.appendChild(lightbox);
    
    // Animate in
    setTimeout(() => {
        lightbox.style.opacity = '1';
    }, 10);
    
    // Navigation functionality
    const updateImage = (newIndex) => {
        if (newIndex >= 0 && newIndex < allImages.length) {
            lightboxImage.src = allImages[newIndex].src;
            lightboxImage.alt = allImages[newIndex].alt;
            counter.textContent = `${newIndex + 1} / ${allImages.length}`;
            
            prevBtn.disabled = newIndex === 0;
            nextBtn.disabled = newIndex === allImages.length - 1;
            
            prevBtn.style.opacity = newIndex === 0 ? '0.5' : '1';
            nextBtn.style.opacity = newIndex === allImages.length - 1 ? '0.5' : '1';
        }
    };
    
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateImage(currentIndex);
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentIndex < allImages.length - 1) {
            currentIndex++;
            updateImage(currentIndex);
        }
    });
    
    // Close functionality
    const closeLightbox = () => {
        lightbox.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(lightbox);
        }, 300);
    };
    
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    const handleKeydown = (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
            document.removeEventListener('keydown', handleKeydown);
        } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
            currentIndex--;
            updateImage(currentIndex);
        } else if (e.key === 'ArrowRight' && currentIndex < allImages.length - 1) {
            currentIndex++;
            updateImage(currentIndex);
        }
    };
    document.addEventListener('keydown', handleKeydown);
    
    // Hover effects
    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.background = 'rgba(255, 105, 180, 1)';
        closeBtn.style.transform = 'scale(1.1)';
    });
    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.background = 'rgba(255, 105, 180, 0.9)';
        closeBtn.style.transform = 'scale(1)';
    });
    
    [prevBtn, nextBtn].forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            if (!btn.disabled) {
                btn.style.background = 'rgba(255, 105, 180, 1)';
                btn.style.transform = 'translateY(-50%) scale(1.1)';
            }
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.background = 'rgba(255, 105, 180, 0.8)';
            btn.style.transform = 'translateY(-50%) scale(1)';
        });
    });
}

// Form handling with animation
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        
        // Animate button
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.style.pointerEvents = 'none';
        
        // Simulate form submission
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Enviado!';
            submitBtn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.style.pointerEvents = 'auto';
                form.reset();
            }, 2000);
        }, 1500);
    });
}

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(255, 105, 180, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Add floating animation to elements
function addFloatingAnimation() {
    const floatingElements = document.querySelectorAll('.stat-icon, .highlight-icon');
    
    floatingElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.2}s`;
        element.classList.add('floating');
    });
}

// Add floating animation CSS
const style = document.createElement('style');
style.textContent = `
    .floating {
        animation: floating 3s ease-in-out infinite;
    }
    
    @keyframes floating {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
    
    .animate-in {
        animation: slideInUp 0.8s ease-out forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .gallery-item {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .gallery-item.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .about-content {
        opacity: 0;
        transform: translateX(-30px);
        transition: all 0.8s ease;
    }
    
    .about-content.animate-in {
        opacity: 1;
        transform: translateX(0);
    }
    
    .contact-content {
        opacity: 0;
        transform: translateX(30px);
        transition: all 0.8s ease;
    }
    
    .contact-content.animate-in {
        opacity: 1;
        transform: translateX(0);
    }
`;
document.head.appendChild(style);

// Initialize floating animations
addFloatingAnimation();

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title .colorful');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 150);
        }, 1000);
    }
});

// Add particle effect to hero section
function createParticles() {
    const hero = document.querySelector('.hero');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const isStar = Math.random() > 0.5;
        particle.innerHTML = isStar ? '⭐' : '💋';
        particle.style.cssText = `
            position: absolute;
            font-size: ${8 + Math.random() * 12}px;
            pointer-events: none;
            animation: particleFloat ${4 + Math.random() * 6}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 3}s;
            opacity: ${0.4 + Math.random() * 0.5};
            transform: rotate(${Math.random() * 360}deg);
            color: ${isStar ? '#FF69B4' : '#FFB6C1'};
            filter: drop-shadow(0 0 8px ${isStar ? '#FF69B4' : '#FFB6C1'}) drop-shadow(0 0 16px ${isStar ? '#FF1493' : '#FF69B4'});
            text-shadow: 0 0 10px ${isStar ? '#FF69B4' : '#FFB6C1'};
            z-index: -1;
        `;
        hero.appendChild(particle);
    }
}



// Add particle and floating element animation CSS
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes floatingElement {
        0% {
            transform: translateY(0px) rotate(0deg) scale(1);
            opacity: 0.2;
        }
        25% {
            transform: translateY(-30px) rotate(90deg) scale(1.2);
            opacity: 0.6;
        }
        50% {
            transform: translateY(-60px) rotate(180deg) scale(0.8);
            opacity: 0.4;
        }
        75% {
            transform: translateY(-30px) rotate(270deg) scale(1.1);
            opacity: 0.5;
        }
        100% {
            transform: translateY(0px) rotate(360deg) scale(1);
            opacity: 0.2;
        }
    }
`;
document.head.appendChild(particleStyle);

// Sparkles estáticos removidos - apenas elementos em movimento

// Create floating elements (stars and kisses)
function createFloatingElements() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const floatingCount = 15;
    
    for (let i = 0; i < floatingCount; i++) {
        const element = document.createElement('div');
        element.className = 'floating-element';
        const isStar = Math.random() > 0.5;
        element.innerHTML = isStar ? '⭐' : '💋';
        element.style.cssText = `
            position: absolute;
            font-size: ${12 + Math.random() * 16}px;
            pointer-events: none;
            animation: floatingElement ${6 + Math.random() * 8}s ease-in-out infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 5}s;
            opacity: ${0.3 + Math.random() * 0.4};
            transform: rotate(${Math.random() * 360}deg);
            color: ${isStar ? '#FF69B4' : '#FFB6C1'};
            filter: drop-shadow(0 0 6px ${isStar ? '#FF69B4' : '#FFB6C1'});
            text-shadow: 0 0 8px ${isStar ? '#FF69B4' : '#FFB6C1'};
            z-index: -1;
        `;
        hero.appendChild(element);
    }
}

// Initialize particles and floating elements
createParticles();
createFloatingElements();

// Add smooth reveal animation for sections
const revealElements = document.querySelectorAll('.section-title, .section-subtitle, .about-description, .contact-item');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s ease';
    revealObserver.observe(el);
});

// Video tabs functionality
function initVideoTabs() {
    const generalBtn = document.querySelector('[data-tab="general"]');
    const advertisingBtn = document.querySelector('[data-tab="advertising"]');
    const generalContent = document.getElementById('general');
    const advertisingContent = document.getElementById('advertising');
    
    console.log('Elementos encontrados:');
    console.log('General button:', generalBtn);
    console.log('Advertising button:', advertisingBtn);
    console.log('General content:', generalContent);
    console.log('Advertising content:', advertisingContent);
    
    if (generalBtn && advertisingBtn && generalContent && advertisingContent) {
        console.log('Configurando abas...');
        
        // Configurar abas
        generalBtn.onclick = function() {
            console.log('Clique em Vídeos Gerais');
            generalContent.style.display = 'block';
            advertisingContent.style.display = 'none';
            generalBtn.classList.add('active');
            advertisingBtn.classList.remove('active');
            console.log('General display:', generalContent.style.display);
            console.log('Advertising display:', advertisingContent.style.display);
        };
        
        advertisingBtn.onclick = function() {
            console.log('Clique em Publicidade');
            generalContent.style.display = 'none';
            advertisingContent.style.display = 'block';
            advertisingBtn.classList.add('active');
            generalBtn.classList.remove('active');
            console.log('General display:', generalContent.style.display);
            console.log('Advertising display:', advertisingContent.style.display);
        };
        
        // Estado inicial
        generalContent.style.display = 'block';
        advertisingContent.style.display = 'none';
        generalBtn.classList.add('active');
        advertisingBtn.classList.remove('active');
        console.log('Abas configuradas!');
    } else {
        console.error('Elementos não encontrados!');
    }
}

// Video Modal functionality - Instagram Reels Style
function initVideoModal() {
    const modal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    const closeBtn = document.querySelector('.video-close');
    const reelItems = document.querySelectorAll('.reel-item');
    const scrollInstruction = document.querySelector('.scroll-instruction');
    
    let currentVideoIndex = 0;
    let videoList = [];
    let isScrolling = false;
    let isFirstVideo = true;
    let isMobile = window.innerWidth <= 768;

    // Get all video sources
    reelItems.forEach(item => {
        videoList.push(item.getAttribute('data-video'));
    });

    // Update instruction text based on device
    function updateInstructionText() {
        if (isMobile) {
            if (isFirstVideo) {
                scrollInstruction.innerHTML = '<i class="fas fa-mouse"></i> Deslize para cima para trocar de vídeo';
            } else {
                scrollInstruction.style.display = 'none';
            }
        } else {
            scrollInstruction.innerHTML = '<i class="fas fa-mouse"></i> Role para baixo para trocar de vídeo';
            scrollInstruction.style.display = 'block';
        }
    }

    // Open modal when reel is clicked
    reelItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            // Save current scroll position
            const scrollY = window.scrollY;
            document.body.style.top = `-${scrollY}px`;
            
            currentVideoIndex = index;
            showVideo(currentVideoIndex);
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
            
            // Update instruction text
            updateInstructionText();
        });
    });

    // Show specific video
    function showVideo(index) {
        if (index >= 0 && index < videoList.length) {
            modalVideo.src = videoList[index];
            currentVideoIndex = index;
        }
    }

    // Scroll navigation (Instagram Reels style)
    modal.addEventListener('wheel', (e) => {
        if (isScrolling) return;
        
        isScrolling = true;
        e.preventDefault();
        e.stopPropagation();
        
        // Hide instruction after first scroll on mobile
        if (isMobile && isFirstVideo) {
            isFirstVideo = false;
            scrollInstruction.style.display = 'none';
        }
        
        if (e.deltaY > 0) {
            // Scroll down - next video
            const nextIndex = currentVideoIndex < videoList.length - 1 ? currentVideoIndex + 1 : 0;
            showVideo(nextIndex);
        } else {
            // Scroll up - previous video
            const prevIndex = currentVideoIndex > 0 ? currentVideoIndex - 1 : videoList.length - 1;
            showVideo(prevIndex);
        }
        
        setTimeout(() => {
            isScrolling = false;
        }, 500);
    }, { passive: false });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (modal.style.display !== 'block') return;
        
        switch(e.key) {
            case 'Escape':
                closeModal();
                break;
            case 'ArrowUp':
                e.preventDefault();
                const prevIndex = currentVideoIndex > 0 ? currentVideoIndex - 1 : videoList.length - 1;
                showVideo(prevIndex);
                break;
            case 'ArrowDown':
                e.preventDefault();
                const nextIndex = currentVideoIndex < videoList.length - 1 ? currentVideoIndex + 1 : 0;
                showVideo(nextIndex);
                break;
        }
    });

    // Close modal
    function closeModal() {
        modal.style.display = 'none';
        modalVideo.pause();
        modalVideo.src = '';
        
        // Reset instruction state
        isFirstVideo = true;
        updateInstructionText();
        
        // Restore scroll position
        const scrollY = document.body.style.top;
        document.body.style.position = 'static';
        document.body.style.top = '';
        document.body.style.width = 'auto';
        document.body.style.overflow = 'auto';
        
        if (scrollY) {
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
    }

    closeBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Update mobile detection on window resize
    window.addEventListener('resize', () => {
        isMobile = window.innerWidth <= 768;
        updateInstructionText();
    });
}

// Create floating icons for videos section
function createVideoIcons() {
    const videosSection = document.querySelector('.videos');
    if (!videosSection) return;

    // Camera icons
    const cameraIcons = ['📹', '📷', '🎥', '📸'];
    const sparkleIcons = ['✨', '⭐', '💫', '🌟'];

    // Create 15 camera icons - more spread out
    for (let i = 0; i < 15; i++) {
        const icon = document.createElement('div');
        icon.className = 'floating-icon camera';
        icon.textContent = cameraIcons[i % cameraIcons.length];
        // Spread more across the screen with some margin
        icon.style.left = (Math.random() * 80 + 10) + '%';
        icon.style.top = (Math.random() * 80 + 10) + '%';
        icon.style.animationDelay = Math.random() * 20 + 's';
        icon.style.animationDuration = (18 + Math.random() * 12) + 's';
        videosSection.appendChild(icon);
    }

    // Create 20 sparkle icons - more spread out
    for (let i = 0; i < 20; i++) {
        const icon = document.createElement('div');
        icon.className = 'floating-icon sparkle';
        icon.textContent = sparkleIcons[i % sparkleIcons.length];
        // Spread more across the screen with some margin
        icon.style.left = (Math.random() * 80 + 10) + '%';
        icon.style.top = (Math.random() * 80 + 10) + '%';
        icon.style.animationDelay = Math.random() * 20 + 's';
        icon.style.animationDuration = (15 + Math.random() * 10) + 's';
        videosSection.appendChild(icon);
    }
}

// Executar quando a página carregar
window.onload = function() {
    initVideoTabs();
    initVideoModal();
    createVideoIcons();
};

// Video play button functionality
const playButtons = document.querySelectorAll('.play-button');
playButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Add a simple click effect
        btn.style.transform = 'translate(-50%, -50%) scale(0.9)';
        setTimeout(() => {
            btn.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 150);
        
        // Here you could add actual video playing functionality
        console.log('Playing video...');
    });
});

// Social media links functionality - removed to allow normal link behavior

// Brand items hover effect
const brandItems = document.querySelectorAll('.brand-item');
brandItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0) scale(1)';
    });
});


console.log('🎨 Isa Beauty Portfolio loaded successfully!');
