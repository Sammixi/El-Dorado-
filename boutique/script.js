document.addEventListener('DOMContentLoaded', () => {
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
                    alert('Produit ajouté au panier');
                    afficherPanier();
                } else {
                    alert(data.error);
                }
            })
            .catch(error => console.error('Erreur lors de l\'ajout au panier :', error));
    }

    function afficherPanier() {
        fetch('../panier/obtenir_panier.php')
            .then(response => response.json())
            .then(data => {
                console.log(data);

                const cartItems = document.getElementById('cart-items');
                const subtotalElement = document.getElementById('subtotal');
                const totalElement = document.getElementById('total');
                cartItems.innerHTML = '';
                let subtotal = 0;

                if (Array.isArray(data)) {
                    data.forEach(item => {
                        const itemElement = document.createElement('div');
                        itemElement.className = 'cart-item';
                        itemElement.innerHTML = `
                            <div class="cart-item-image">
                                <img src="${item.image}" alt="${item.nom}">
                            </div>
                            <div class="cart-item-details">
                                <span class="cart-item-name">${item.nom}</span>
                                <span class="cart-item-price">€${item.prix.toFixed(2)}</span>
                                <span class="cart-item-quantity">Quantité: ${item.quantity}</span>
                            </div>
                        `;
                        cartItems.appendChild(itemElement);
                        subtotal += item.prix * item.quantity;
                    });
                }

                subtotalElement.textContent = `€${subtotal.toFixed(2)}`;
                totalElement.textContent = `€${(subtotal + 13).toFixed(2)}`; // Ajoutez 13€ de taxes
            })
            .catch(error => console.error('Erreur lors de la récupération du panier:', error));
    }

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-product-id');
            ajouterAuPanier(productId, 1);
        });
    });

    afficherPanier();
});
