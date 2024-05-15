document.addEventListener("DOMContentLoaded", function() {
    // Fonction pour charger le panier
    function chargerPanier() {
        fetch('obtenir_panier.php')
            .then(response => response.json())
            .then(data => {
                let cartItemsContainer = document.getElementById('cart-items');
                cartItemsContainer.innerHTML = '';
                let subtotal = 0;

                for (let productId in data) {
                    let quantity = data[productId];
                    // Pour des fins de démonstration, vous pouvez remplacer les valeurs suivantes
                    let item = {
                        id: productId,
                        name: 'Nom de produit',
                        color: 'Couleur',
                        price: 39.00, // Remplacer par le prix réel
                        image: 'imgTest/000.JPG' // Remplacer par l'URL de l'image réelle
                    };
                    let itemTotalPrice = item.price * quantity;
                    subtotal += itemTotalPrice;

                    let cartItem = document.createElement('div');
                    cartItem.className = 'cart-item';
                    cartItem.innerHTML = `
                        <img src="${item.image}" alt="${item.name}">
                        <div class="item-details">
                            <p class="item-name">${item.name}</p>
                            <p class="item-color">${item.color}</p>
                            <p class="item-price">${itemTotalPrice.toFixed(2)} €</p>
                        </div>
                    `;
                    cartItemsContainer.appendChild(cartItem);
                }

                document.getElementById('subtotal').innerText = subtotal.toFixed(2) + ' €';
                document.getElementById('total').innerText = subtotal.toFixed(2) + ' €';
            });
    }

    // Charger le panier au chargement de la page
    chargerPanier();
});
