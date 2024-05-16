document.addEventListener('DOMContentLoaded', () => {
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

    updateCartCount();
});
