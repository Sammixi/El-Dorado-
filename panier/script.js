document.addEventListener("DOMContentLoaded", function () {
    console.log("Document loaded");

    // Fonction pour charger le panier
    function chargerPanier() {
        fetch('obtenir_panier.php')
            .then(response => response.json())
            .then(data => {
                console.log("Panier chargé", data);
                let cartItemsContainer = document.getElementById('cart-items');
                cartItemsContainer.innerHTML = '';
                let subtotal = 0;

                data.forEach(item => {
                    let itemTotalPrice = item.prix * item.quantity;
                    subtotal += itemTotalPrice;

                    let cartItem = document.createElement('div');
                    cartItem.className = 'cart-item';
                    cartItem.innerHTML = `
                        <img src="${item.image}" alt="${item.nom}">
                        <div class="item-details">
                            <p class="item-name">${item.nom}</p>
                            <p class="item-color">${item.couleur}</p>
                            <p class="item-price">${itemTotalPrice.toFixed(2)} €</p>
                            <button class="remove-from-cart" data-product-id="${item.id}">Supprimer</button>
                        </div>
                    `;
                    cartItemsContainer.appendChild(cartItem);
                });

                document.getElementById('subtotal').innerText = subtotal.toFixed(2) + ' €';
                document.getElementById('total').innerText = subtotal.toFixed(2) + ' €';

                // Ajouter des écouteurs d'événements pour les boutons de suppression
                document.querySelectorAll('.remove-from-cart').forEach(button => {
                    button.addEventListener('click', function () {
                        let productId = this.getAttribute('data-product-id');
                        removeFromCart(productId);
                    });
                });
            })
            .catch(error => console.error('Erreur lors du chargement du panier :', error));
    }

    // Fonction pour ajouter un article au panier
    function addToCart(productId, quantity) {
        fetch('ajouter_au_panier.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `product_id=${productId}&quantity=${quantity}`
        })
            .then(response => response.json())
            .then(data => {
                console.log("Réponse du serveur après ajout au panier", data);
                if (!data.error) {
                    chargerPanier(); // Recharger le panier après l'ajout
                } else {
                    alert(data.error); // Afficher une alerte en cas d'erreur
                }
            })
            .catch(error => console.error('Erreur lors de l\'ajout au panier :', error));
    }

    // Fonction pour supprimer un article du panier
    function removeFromCart(productId) {
        fetch('supprimer_du_panier.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `product_id=${productId}`
        })
            .then(response => response.json())
            .then(data => {
                console.log("Réponse du serveur après suppression du panier", data);
                if (!data.error) {
                    chargerPanier(); // Recharger le panier après la suppression
                } else {
                    alert(data.error); // Afficher une alerte en cas d'erreur
                }
            })
            .catch(error => console.error('Erreur lors de la suppression du panier :', error));
    }

    // Fonction pour vider le panier
    function emptyCart() {
        fetch('vider_panier.php', {
            method: 'POST'
        })
            .then(response => response.json())
            .then(data => {
                console.log("Réponse du serveur après vidage du panier", data);
                if (!data.error) {
                    chargerPanier(); // Recharger le panier après le vidage
                } else {
                    alert(data.error); // Afficher une alerte en cas d'erreur
                }
            })
            .catch(error => console.error('Erreur lors du vidage du panier :', error));
    }

    // Charger le panier au chargement de la page
    chargerPanier();

    // Ajouter un article au panier (test)
    document.querySelector('.add-to-cart').addEventListener('click', function () {
        console.log("Bouton ajouter au panier cliqué");
        let productId = this.getAttribute('data-product-id'); // ID de produit fictif pour le test
        let quantity = 1;
        addToCart(productId, quantity);
    });

    // Vider le panier
    document.getElementById('empty-cart').addEventListener('click', function () {
        console.log("Bouton vider le panier cliqué");
        emptyCart();
    });
});
