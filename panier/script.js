document.addEventListener('DOMContentLoaded', () => {
    const cartItems = document.getElementById('cart-items');
    const productCountElement = document.getElementById('cart-count');  
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    const productCountSummaryElement = document.getElementById('product-count');

    function updateCartCount() {
        fetch('../panier/obtenir_panier.php')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Données du panier pour la mise à jour du compteur:', data);
                let totalItems = 0;
                data.forEach(item => {
                    console.log('Item:', item);
                    totalItems += item.quantite;
                });
                console.log('Total items:', totalItems);
                productCountElement.textContent = totalItems.toString();
                if (productCountSummaryElement) {
                    productCountSummaryElement.textContent = `${totalItems} PRODUIT${totalItems > 1 ? 'S' : ''}`;
                }
            })
            .catch(error => {
                console.error('Erreur lors de la mise à jour du compteur du panier:', error);
                productCountElement.textContent = '0';
                if (productCountSummaryElement) {
                    productCountSummaryElement.textContent = '0 PRODUIT';
                }
            });
    }

    function afficherPanier() {
        fetch('../panier/obtenir_panier.php')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Panier:', data);
                cartItems.innerHTML = ''; // Vider le panier

                if (data.length === 0) {
                    cartItems.innerHTML = '<p>Votre panier est vide.</p>';
                    productCountElement.textContent = '0';
                    if (productCountSummaryElement) {
                        productCountSummaryElement.textContent = '0 PRODUIT';
                    }
                    subtotalElement.textContent = '0,00 €';
                    totalElement.textContent = '0,00 €';
                    return;
                }

                let subtotal = 0;
                let totalItems = 0;

                data.forEach(item => {
                    console.log('Item dans afficherPanier:', item);
                    const cartItem = document.createElement('div');
                    cartItem.className = 'cart-item';

                    const prix = parseFloat(item.prix);
                    const quantite = item.quantite || 1;

                    if (isNaN(prix)) {
                        console.error('Prix non valide pour l\'article', item);
                        return;
                    }

                    const itemDetails = `
                        <img src="${item.image}" alt="${item.nom}">
                        <div class="item-details">
                            <h4>${item.nom}</h4>
                            <p>${item.couleur}</p>
                            <p>${quantite} x ${prix.toFixed(2)} €</p>
                        </div>
                        <button class="remove-item" data-id="${item.id}">Supprimer</button>
                    `;

                    cartItem.innerHTML = itemDetails;
                    cartItems.appendChild(cartItem);

                    subtotal += prix * quantite;
                    totalItems += quantite;
                });

                subtotalElement.textContent = `${subtotal.toFixed(2)} €`;
                const total = subtotal + 13.00; // Supposons une taxe fixe
                totalElement.textContent = `${total.toFixed(2)} €`;
                productCountElement.textContent = `${totalItems}`;
                if (productCountSummaryElement) {
                    productCountSummaryElement.textContent = `${totalItems} PRODUIT${totalItems > 1 ? 'S' : ''}`;
                }

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
                productCountElement.textContent = '0';
                if (productCountSummaryElement) {
                    productCountSummaryElement.textContent = '0 PRODUIT';
                }
                subtotalElement.textContent = '0,00 €';
                totalElement.textContent = '0,00 €';
            });
    }

    function supprimerArticle(id) {
        fetch(`../panier/supprimer_du_panier.php?id=${id}`, { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                console.log('Réponse de la suppression:', data);
                if (data.success) {
                    afficherPanier(); // Mettre à jour le panier après suppression
                    updateCartCount(); // Mettre à jour le compteur après suppression
                } else {
                    console.error('Erreur lors de la suppression de l\'article:', data.message);
                }
            })
            .catch(error => {
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
            .then(response => response.text())
            .then(text => {
                console.log("Données de réponse brute :", text);

                let data;
                try {
                    data = JSON.parse(text);
                } catch (e) {
                    console.error('Erreur de parsing JSON :', e);
                    return;
                }

                console.log("Réponse du serveur après ajout au panier", data);
                if (data.success) {
                    afficherPanier();
                    updateCartCount(); // Mettre à jour le compteur après ajout
                } else {
                    console.error('Erreur lors de l\'ajout au panier :', data.error);
                }
            })
            .catch(error => console.error('Erreur lors de l\'ajout au panier :', error));
    }

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-product-id');
            ajouterAuPanier(productId, 1);
        });
    });

    afficherPanier();
    updateCartCount();
});
