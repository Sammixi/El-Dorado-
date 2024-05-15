

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
