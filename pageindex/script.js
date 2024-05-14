// script.js

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

    if (window.scrollY > 0) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    const nav = document.querySelector('nav');
    const navPosition = nav.getBoundingClientRect().top;

    if (navPosition < 0) {
        nav.classList.add('black-text');
    } else {
        nav.classList.remove('black-text');
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
    document.getElementById(id).scrollIntoView({
        behavior: 'smooth'
    });
}

// Initialiser les animations et événements lorsque le contenu est chargé
document.addEventListener('DOMContentLoaded', function() {
    createHeaderAndNav();
    addFadeInToProducts();
    animateAccueilElements();

    // Réduire le délai pour commencer l'animation de fondu
    setTimeout(function() {
        const overlay = document.getElementById('overlay');
        overlay.classList.add('fade-out');
        setTimeout(function() {
            overlay.style.display = 'none'; // Enlever complètement l'overlay après l'animation
        }, 500); // Durée de l'animation
    }, 200); // Réduire le délai avant de commencer l'animation de fondu

    // Gérer le défilement
    window.addEventListener('scroll', handleScroll);
});
