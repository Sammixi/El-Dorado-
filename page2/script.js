// Données des articles - Exemple
const articles = [
    { name: 'article1', title: 'Titre 1', image: 'img/article1.jpg', article: 'Description de l\'article 1' },
    { name: 'article2', title: 'Titre 2', image: 'img/article2.jpg', article: 'Description de l\'article 2' },
    { name: 'article3', title: 'Titre 3', image: 'img/article3.jpg', article: 'Description de l\'article 3' }
];

// Création de l'en-tête avec la liste de navigation
const header = document.createElement('header');
document.body.append(header);

const nav = document.createElement('nav');
header.appendChild(nav);

const ul = document.createElement('ul');
nav.appendChild(ul);

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
});

// Application d'un filtre sombre sur tout le body
document.body.style.position = 'relative';
const filter = document.createElement('div');
filter.style.position = 'absolute';
filter.style.top = '0';
filter.style.left = '0';
filter.style.width = '100%';
filter.style.height = '100%';
filter.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
filter.style.zIndex = '-1';
document.body.appendChild(filter);
