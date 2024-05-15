


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
