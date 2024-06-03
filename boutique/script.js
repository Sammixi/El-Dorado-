document.addEventListener('DOMContentLoaded', () => {
    const productCountElement = document.getElementById('cart-count');

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
                    updateCartCount();
                } else {
                    console.error('Erreur lors de l\'ajout au panier :', data.error);
                }
            })
            .catch(error => {
                console.error('Erreur lors de l\'ajout au panier :', error);
            });
    }

    function updateCartCount() {
        fetch('../panier/obtenir_panier.php')
            .then(response => response.json())
            .then(data => {
                let totalItems = 0;
                data.forEach(item => {
                    totalItems += item.quantite;
                });
                if (productCountElement) productCountElement.textContent = totalItems.toString();
            })
            .catch(error => {
                console.error('Erreur lors de la mise à jour du compteur de panier :', error);
                if (productCountElement) productCountElement.textContent = '0';
            });
    }

    document.querySelectorAll('.add-to-cart').forEach(button => {
        // Ajout de logs pour déboguer les clics
        console.log('Ajout d\'un événement de clic au bouton:', button);
        button.addEventListener('click', (e) => {
            console.log('Clic détecté sur le bouton:', e.target);
            const productId = button.getAttribute('data-product-id');
            ajouterAuPanier(productId, 1);
        });
    });

    // Initialiser le compteur de panier au chargement de la page
    updateCartCount();
});
