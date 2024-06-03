document.addEventListener('DOMContentLoaded', () => {
    const cartCountElement = document.getElementById('cart-count');
    const mainImage = document.getElementById('main-product-image');
    const lens = document.getElementById('lens');
    const thumbnails = document.querySelectorAll('.thumbnail img');

    // Fonction pour mettre à jour le compteur du panier
    function updateCartCount() {
        fetch('../panier/obtenir_panier.php')
            .then(response => response.json())
            .then(data => {
                let totalItems = 0;
                data.forEach(item => {
                    totalItems += item.quantite;
                });
                cartCountElement.textContent = totalItems;
            })
            .catch(error => {
                console.error('Erreur lors de la mise à jour du compteur du panier:', error);
                cartCountElement.textContent = '0';
            });
    }

    // Fonction pour ajouter un produit au panier
    function ajouterAuPanier(productId, quantity) {
        fetch('../panier/ajouter_au_panier.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `product_id=${productId}&quantity=${quantity}`
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

    // Appel initial de updateCartCount
    updateCartCount();

    // Événements pour ajouter au panier
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-product-id');
            ajouterAuPanier(productId, 1);
        });
    });

    // Zoom image et changement d'image principale
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

    function getCursorPos(e) {
        const rect = mainImage.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        return { x: x - window.pageXOffset, y: y - window.pageYOffset };
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const descriptionToggle = document.querySelector('.description-toggle');
    const descriptionContainer = document.querySelector('.description-container');

    descriptionToggle.addEventListener('click', () => {
        descriptionContainer.classList.toggle('active');
    });
});

