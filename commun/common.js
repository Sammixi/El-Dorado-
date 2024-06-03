document.addEventListener('DOMContentLoaded', () => {
    const cartCountElement = document.getElementById('cart-count');

    function updateCartCount() {
        fetch('../panier/obtenir_panier.php')
            .then(response => response.json())
            .then(data => {
                console.log('Panier:', data);

                let totalItems = 0;

                if (Array.isArray(data)) {
                    data.forEach(item => {
                        totalItems += item.quantite;
                    });
                }

                if (cartCountElement) cartCountElement.textContent = totalItems.toString();
            })
            .catch(error => {
                console.error('Erreur lors de la récupération du panier:', error);
                if (cartCountElement) cartCountElement.textContent = '0';
            });
    }

    updateCartCount();
});
