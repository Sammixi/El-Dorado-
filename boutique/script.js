document.addEventListener("DOMContentLoaded", function () {
    console.log("Document loaded");

    // Fonction pour ajouter un article au panier
    function addToCart(productId, quantity) {
        fetch('../ajouter_au_panier.php', { // Ajustez le chemin ici
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `product_id=${productId}&quantity=${quantity}`
        })
            .then(response => response.text()) // Utilisez response.text() pour voir la réponse brute
            .then(data => {
                console.log("Réponse brute du serveur après ajout au panier", data);
                try {
                    let jsonData = JSON.parse(data); // Essayez de parser la réponse en JSON
                    console.log("Réponse du serveur après ajout au panier", jsonData);
                    if (!jsonData.error) {
                        alert('Produit ajouté au panier');
                    } else {
                        alert(jsonData.error); // Afficher une alerte en cas d'erreur
                    }
                } catch (e) {
                    console.error("Erreur de parsing JSON : ", e);
                    console.error("Données de réponse brute : ", data);
                }
            })
            .catch(error => console.error('Erreur lors de l\'ajout au panier :', error));
    }

    // Ajouter des écouteurs d'événements pour les boutons "Ajouter au panier"
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function () {
            let productId = this.getAttribute('data-product-id');
            addToCart(productId, 1);
        });
    });
});
