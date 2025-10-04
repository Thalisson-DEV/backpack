document.addEventListener('DOMContentLoaded', () => {

    // --- REMOVIDO: Seletor de Tema ---

    // --- MENU MOBILE ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuBtn.addEventListener('click', () => {
        const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
        mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
        mobileMenu.classList.toggle('hidden');
    });
    
    // --- LÓGICA DO BANNER DE COOKIES ---
    const cookieBanner = document.getElementById('cookie-banner');
    const cookieDismissBtn = document.getElementById('cookie-dismiss-btn');
    const COOKIE_CONSENT_KEY = 'backpack_cookie_consent';

    // Garante que os elementos existem antes de adicionar os eventos
    if (cookieBanner && cookieDismissBtn) {
        // Verifica se o usuário já aceitou os cookies
        if (!localStorage.getItem(COOKIE_CONSENT_KEY)) {
            // Mostra o banner após um pequeno delay para não ser intrusivo
            setTimeout(() => {
                cookieBanner.classList.add('visible');
            }, 1500);
        }

        // Adiciona o evento para fechar o banner
        cookieDismissBtn.addEventListener('click', () => {
            cookieBanner.classList.remove('visible');
            // Salva a preferência do usuário para não mostrar novamente
            localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
        });
    }

    // --- ANIMAÇÃO DE SCROLL ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || '0ms';
                entry.target.style.animationDelay = delay;
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.animate-fade-in-up').forEach(el => {
        observer.observe(el);
    });
    
    // --- ACORDEÃO DO FAQ ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = '0px';
                }
            });

            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                item.classList.remove('active');
                answer.style.maxHeight = '0px';
            }
        });
    });
    
    // --- BOTÃO VOLTAR AO TOPO ---
    const backToTopBtn = document.getElementById('back-to-top-btn');
    if (backToTopBtn) {
        window.onscroll = () => {
            if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        };
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});