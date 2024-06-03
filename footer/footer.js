document.addEventListener('DOMContentLoaded', function () {
    console.log("Tentative de chargement du pied de page...");

    fetch('/El-Dorado-laragon/footer/footer.html')  // Assurez-vous que ce chemin est correct
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur HTTP : ' + response.status);
            }
            return response.text();
        })
        .then(data => {
            document.querySelector('footer').innerHTML = data;
            console.log("Pied de page chargé avec succès.");
        })
        .catch(error => console.error('Erreur de chargement du pied de page:', error));
});
