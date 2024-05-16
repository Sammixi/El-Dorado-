document.addEventListener('DOMContentLoaded', () => {
    const cartItems = document.getElementById('cart-items');
    const productCountElement = document.getElementById('product-count');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');

    function afficherPanier() {
        fetch('../panier/obtenir_panier.php')
            .then(response => response.json())
            .then(data => {
                console.log('Panier:', data);
                cartItems.innerHTML = ''; // Vider le panier

                if (data.length === 0) {
                    cartItems.innerHTML = '<p>Votre panier est vide.</p>';
                    productCountElement.textContent = '0 PRODUIT';
                    subtotalElement.textContent = '0,00 €';
                    totalElement.textContent = '0,00 €';
                    updateCartCount();
                    return;
                }

                let subtotal = 0;
                let totalItems = 0;

                data.forEach(item => {
                    const cartItem = document.createElement('div');
                    cartItem.className = 'cart-item';

                    const prix = parseFloat(item.prix);

                    if (isNaN(prix)) {
                        console.error('Prix non valide pour l\'article', item);
                        return;
                    }

                    const itemDetails = `
                        <img src="${item.image}" alt="${item.nom}">
                        <div class="item-details">
                            <h4>${item.nom}</h4>
                            <p>${item.couleur}</p>
                            <p>${item.quantite} x ${prix.toFixed(2)} €</p>
                        </div>
                        <button class="remove-item" data-id="${item.id}">Supprimer</button>
                    `;

                    cartItem.innerHTML = itemDetails;
                    cartItems.appendChild(cartItem);

                    subtotal += prix * item.quantite;
                    totalItems += item.quantite;
                });

                subtotalElement.textContent = `${subtotal.toFixed(2)} €`;
                const total = subtotal + 13.00; // Supposons une taxe fixe
                totalElement.textContent = `${total.toFixed(2)} €`;
                productCountElement.textContent = `${totalItems} PRODUIT${totalItems > 1 ? 'S' : ''}`;

                updateCartCount();

                document.querySelectorAll('.remove-item').forEach(button => {
                    button.addEventListener('click', (e) => {
                        const itemId = e.target.getAttribute('data-id');
                        supprimerArticle(itemId);
                    });
                });
            })
            .catch(error => {
                console.error('Erreur lors de la récupération du panier:', error);
                cartItems.innerHTML = '<p>Erreur lors de la récupération du panier. Veuillez réessayer plus tard.</p>';
                productCountElement.textContent = '0 PRODUIT';
                subtotalElement.textContent = '0,00 €';
                totalElement.textContent = '0,00 €';
                updateCartCount();
            });
    }

    function supprimerArticle(id) {
        fetch(`../panier/supprimer_du_panier.php?id=${id}`, { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                console.log('Réponse de la suppression:', data);
                if (data.success) {
                    afficherNotification('Article supprimé du panier');
                    afficherPanier(); // Mettre à jour le panier après suppression
                    updateCartCount();
                } else {
                    afficherNotification(data.message, true);
                    console.error('Erreur lors de la suppression de l\'article:', data.message);
                }
            })
            .catch(error => {
                afficherNotification('Erreur lors de la suppression de l\'article', true);
                console.error('Erreur lors de la suppression de l\'article:', error);
            });
    }

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
                    afficherNotification('Produit ajouté au panier');
                    afficherPanier();
                    updateCartCount();
                } else {
                    afficherNotification(data.error, true);
                }
            })
            .catch(error => {
                afficherNotification('Erreur lors de l\'ajout au panier', true);
                console.error('Erreur lors de l\'ajout au panier :', error);
            });
    }

    function afficherNotification(message, isError = false) {
        const notification = document.getElementById('notification');
        notification.textContent = message;
        notification.style.backgroundColor = isError ? '#f44336' : '#cadetblue';
        notification.style.display = 'block';

        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);
    }

    function updateCartCount() {
        const cartCountElement = document.getElementById('cart-count');

        if (cartCountElement) {
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
                    console.error('Erreur lors de la récupération du panier:', error);
                    cartCountElement.textContent = '0';
                });
        }
    }

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-product-id');
            ajouterAuPanier(productId, 1);
        });
    });

    afficherPanier();
});
