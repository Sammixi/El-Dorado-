document.addEventListener('DOMContentLoaded', () => {
    const mainImage = document.getElementById('main-product-image');
    const lens = document.getElementById('lens');
    const thumbnails = document.querySelectorAll('.thumbnail img');
    const addToCartButton = document.querySelector('.add-to-cart');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            const newSrc = thumbnail.getAttribute('data-src');
            mainImage.src = newSrc;
        });

        thumbnail.addEventListener('mouseover', () => {
            const newSrc = thumbnail.getAttribute('data-src');
            mainImage.src = newSrc;
        });
    });

    mainImage.addEventListener('mousemove', moveLens);
    mainImage.addEventListener('mouseenter', () => lens.style.visibility = 'visible');
    mainImage.addEventListener('mouseleave', () => lens.style.visibility = 'hidden');

    function moveLens(e) {
        const rect = mainImage.getBoundingClientRect();
        const lensWidth = lens.offsetWidth;
        const lensHeight = lens.offsetHeight;

        let lensX = e.clientX + 20;
        let lensY = e.clientY + 20;

        const minX = window.pageXOffset + 20;
        const minY = window.pageYOffset + 20;
        const maxX = window.pageXOffset + window.innerWidth - lensWidth - 20;
        const maxY = window.pageYOffset + window.innerHeight - lensHeight - 20;

        lensX = Math.max(minX, Math.min(lensX, maxX));
        lensY = Math.max(minY, Math.min(lensY, maxY));

        lens.style.left = lensX + 'px';
        lens.style.top = lensY + 'px';
        lens.style.backgroundImage = `url(${mainImage.src})`;
        lens.style.backgroundSize = `${mainImage.width * 2}px ${mainImage.height * 2}px`;
        lens.style.backgroundPosition = `-${(e.clientX - rect.left) * 2 - lensWidth / 2}px -${(e.clientY - rect.top) * 2 - lensHeight / 2}px`;
    }

    if (addToCartButton) {
        addToCartButton.addEventListener('click', () => {
            const productId = addToCartButton.getAttribute('data-product-id');
            addToCart(productId, 1);
        });
    }

    function addToCart(productId, quantity) {
        fetch('../panier/ajouter_au_panier.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `product_id=${productId}&quantity=${quantity}`
        })
            .then(response => response.text())
            .then(data => {
                console.log("Réponse brute du serveur après ajout au panier", data);
                try {
                    let jsonData = JSON.parse(data);
                    console.log("Réponse du serveur après ajout au panier", jsonData);
                    if (!jsonData.error) {

                    } else {
                        alert(jsonData.error);
                    }
                } catch (e) {
                    console.error("Erreur de parsing JSON : ", e);
                    console.error("Données de réponse brute : ", data);
                }
            })
            .catch(error => console.error('Erreur lors de l\'ajout au panier :', error));
    }
});
