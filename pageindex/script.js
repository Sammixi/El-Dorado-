// Créer l'en-tête et la liste de navigation
function createHeaderAndNav() {
    // Vérifier si l'en-tête existe déjà
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

// Appeler la fonction pour créer l'en-tête et la liste de navigation
createHeaderAndNav();

// Ajouter une classe à l'en-tête lorsque le défilement commence
window.addEventListener('scroll', function() {
    // Sélectionner l'en-tête
    const header = document.querySelector('header');

    // Définir une classe pour l'en-tête lorsqu'il est défilé
    if (window.scrollY > 0) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Sélection de la liste de navigation
const nav = document.querySelector('nav');

// Écouteur d'événement pour détecter le défilement de la page
window.addEventListener('scroll', function() {
    // Récupération de la position de la liste de navigation par rapport au haut de la page
    const navPosition = nav.getBoundingClientRect().top;

    // Si la position de la liste de navigation est supérieure à la hauteur de l'en-tête, changer la couleur du texte en noir
    if (navPosition < 0) {
        nav.classList.add('black-text');
    } else {
        nav.classList.remove('black-text');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Sélectionne tous les éléments avec la classe .product-item et leur ajoute la classe .fade-in
    document.querySelectorAll('.product-item').forEach(function(element, index) {
        setTimeout(() => {
            element.classList.add('fade-in');
        }, index * 200); // Délai progressif pour chaque produit
    });
});
