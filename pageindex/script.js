// Créer l'en-tête et la liste de navigation
function createHeaderAndNav() {
    let header = document.querySelector('header');

    // Si l'en-tête n'existe pas, le créer
    if (!header) {
        header = document.createElement('header');
        document.body.prepend(header); // Pour placer l'en-tête au début du body
    }

    // Vérifier si la liste de navigation existe déjà dans l'en-tête
    let nav = header.querySelector('nav');

    // Si la liste de navigation n'existe pas, la créer
    if (!nav) {
        nav = document.createElement('nav');
        header.append(nav);
    }

    // Vérifier si la liste ul existe déjà dans la liste de navigation
    let ul = nav.querySelector('ul');

    // Si la liste ul n'existe pas, la créer
    if (!ul) {
        ul = document.createElement('ul');
        nav.append(ul);
    }

    // Ajout des éléments de navigation à la liste (si elle est vide)
    if (ul.children.length === 0) {
        const navItems = ["Logo", "Accueil", "Boutique", "Histoire", "Contact", "Mon compte", "CGV"];
        navItems.forEach(itemText => {
            const li = document.createElement('li');
            ul.append(li);

            const a = document.createElement('a');
            a.setAttribute('href', '#' + itemText.toLowerCase());
            a.textContent = itemText;
            li.append(a);
        });
    }
}

// Ajouter une classe à l'en-tête lorsque le défilement commence
function handleScroll() {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 0) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        const nav = document.querySelector('nav');
        if (nav) {
            const navPosition = nav.getBoundingClientRect().top;
            if (navPosition < 0) {
                nav.classList.add('black-text');
            } else {
                nav.classList.remove('black-text');
            }
        }
    }

    // Cacher le bouton de défilement lorsque l'utilisateur fait défiler
    const scrollDownButton = document.querySelector('.scroll-down'); // Assurez-vous d'utiliser la classe correcte pour votre bouton
    if (scrollDownButton) {
        if (window.scrollY > 0) {
            scrollDownButton.classList.add('hidden');
        } else {
            scrollDownButton.classList.remove('hidden');
        }
    }
}

// Ajouter des classes de fade-in aux éléments des produits
function addFadeInToProducts() {
    document.querySelectorAll('.product-item').forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('fade-in');
        }, index * 200); // Délai progressif pour chaque produit
    });

    document.querySelectorAll('.single-product').forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('fade-in');
        }, index * 200); // Délai progressif pour chaque produit
    });
}

// Animer les éléments de la page d'accueil
function animateAccueilElements() {
    const accueilElements = document.querySelectorAll('#accueil h1, #accueil h2, #accueil p, #accueil .button-container, #accueil .scroll-down');

    accueilElements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('animated');
        }, index * 200); // Délai de 200 ms entre chaque élément
    });
}

// Fonction pour défiler jusqu'à une section donnée
function scrollToSection(id) {
    const section = document.getElementById(id);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth'
        });
    }
}

// Fonction pour ajouter un produit au panier
function ajouterAuPanier(productId, quantite) {
    fetch('panier/ajouter_au_panier.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `product_id=${productId}&quantity=${quantite}`
    })
        .then(response => response.json())
        .then(data => {
            console.log("Réponse du serveur après ajout au panier", data);
            if (data.success) {
                updateCartCount(); // Mettre à jour le compteur du panier après ajout
            } else {
                console.error('Erreur lors de l\'ajout au panier :', data.error);
            }
        })
        .catch(error => console.error('Erreur lors de l\'ajout au panier :', error));
}

// Fonction pour mettre à jour le compteur de panier
function updateCartCount() {
    fetch('panier/obtenir_panier.php')
        .then(response => response.json())
        .then(data => {
            let totalItems = 0;
            data.forEach(item => {
                totalItems += item.quantite;
            });
            const cartCountElement = document.getElementById('cart-count');
            if (cartCountElement) cartCountElement.textContent = totalItems.toString();
        })
        .catch(error => {
            console.error('Erreur lors de la mise à jour du compteur du panier:', error);
            const cartCountElement = document.getElementById('cart-count');
            if (cartCountElement) cartCountElement.textContent = '0';
        });
}

// Initialiser les animations et événements lorsque le contenu est chargé
document.addEventListener('DOMContentLoaded', function () {
    createHeaderAndNav();
    addFadeInToProducts();
    animateAccueilElements();

    // Réduire le délai pour commencer l'animation de fondu
    setTimeout(function () {
        const overlay = document.getElementById('overlay');
        if (overlay) {
            overlay.classList.add('fade-out');
            setTimeout(function () {
                overlay.style.display = 'none'; // Enlever complètement l'overlay après l'animation
            }, 500); // Durée de l'animation
        }
    }, 200); // Réduire le délai avant de commencer l'animation de fondu

    // Gérer le défilement
    window.addEventListener('scroll', handleScroll);

    // Initialiser le compteur de panier
    updateCartCount();

    // Ajouter au panier
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-product-id');
            ajouterAuPanier(productId, 1);
        });
    });
});

let currentIndex = 0;

function moveCarousel(direction) {
    const carousel = document.querySelector('.carousel');
    const items = document.querySelectorAll('.carousel-item');
    const totalItems = items.length;

    // Chaque déplacement couvre deux éléments
    currentIndex += direction * 2;

    if (currentIndex < 0) {
        currentIndex = totalItems - 2;
    } else if (currentIndex >= totalItems) {
        currentIndex = 0;
    }

    const translateX = -currentIndex * 50; // Déplacement de 50% pour deux éléments
    carousel.style.transform = `translateX(${translateX}%)`;
}

// Optional: Automatic slide change
setInterval(() => {
    moveCarousel(1);
}, 3000); // Change every 3 seconds

let currentSlide = 0;
const slides = document.querySelectorAll('.image-slider-item');
const slideInterval = setInterval(nextSlide, 3000);

function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
    updateSlideOpacity();
}

function updateSlideOpacity() {
    slides.forEach((slide, index) => {
        if (index === currentSlide) {
            slide.style.opacity = '1';
        } else {
            slide.style.opacity = '0.5';
        }
    });
}

function moveImageSlider(n) {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    updateSlideOpacity();
    clearInterval(slideInterval); // Stops the automatic sliding when manually controlled
    setTimeout(() => {
        setInterval(nextSlide, 3000); // Restarts the automatic sliding
    }, 3000);
}

document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.info-item');
    let currentIndex = 0;
  
    function highlightItem() {
      items.forEach((item, index) => {
        if (index === currentIndex) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
      currentIndex = (currentIndex + 1) % items.length;
    }
  
    highlightItem(); // Initial highlight
    setInterval(highlightItem, 5400); 
  });
  