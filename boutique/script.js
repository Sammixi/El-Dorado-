


// Ajout du logo dans la liste de navigation
const imgLogo = document.createElement('img');
imgLogo.src = 'img/logo.png'; // Assurez-vous que le chemin vers le logo est correct
imgLogo.style.height = '50px';
const liLogo = document.createElement('li');
liLogo.appendChild(imgLogo);
ul.appendChild(liLogo);

// Ajout des liens à la liste de navigation
articles.forEach(article => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = `#${article.name}`;
    a.textContent = article.title;
    li.appendChild(a);
    ul.appendChild(li);
});

// Création des sections pour les articles
articles.forEach((article, index) => {
    const section = document.createElement('section');
    section.id = article.name;
    document.body.appendChild(section);

    const imgArticle = document.createElement('img');
    imgArticle.src = article.image;
    imgArticle.className = 'rounded';
    section.appendChild(imgArticle);

    const div = document.createElement('div');
    section.appendChild(div);

    const h2 = document.createElement('h2');
    h2.textContent = article.title;
    div.appendChild(h2);

    const p = document.createElement('p');
    p.textContent = article.article;
    div.appendChild(p);

    if (index % 2 !== 0) {
        section.insertBefore(div, imgArticle);
    }

    // Ajouter des écouteurs d'événements pour les boutons "Ajouter au panier"
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function () {
            let productId = this.getAttribute('data-product-id');
            addToCart(productId, 1);
        });
    });
});
document.addEventListener("DOMContentLoaded", function() {
    console.log("Document loaded");

    // Fonction pour ajouter un article au panier
    function addToCart(productId, quantity) {
        fetch('../ajouter_au_panier.php', { // Ajustez le chemin ici si nécessaire
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `product_id=${productId}&quantity=${quantity}`
        })
        .then(response => response.text()) // Utilisez response.text() pour voir la réponse brute
        .then(data => {
            console.log("Réponse brute du serveur après ajout au panier", data);
            try {
                let jsonData = JSON.parse(data); // Essayez de parser la réponse en JSON
                console.log("Réponse du serveur après ajout au panier", jsonData);
                if (!jsonData.error) {
                    alert('Produit ajouté au panier');
                } else {
                    alert(jsonData.error); // Afficher une alerte en cas d'erreur
                }
            } catch (e) {
                console.error("Erreur de parsing JSON : ", e);
                console.error("Données de réponse brute : ", data);
            }
        })
        .catch(error => console.error('Erreur lors de l\'ajout au panier :', error));
    }

    // Ajouter des écouteurs d'événements pour les boutons "Ajouter au panier"
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            let productId = this.getAttribute('data-product-id');
            addToCart(productId, 1);
        });
    });
});
