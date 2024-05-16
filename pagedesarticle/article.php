<?php
require '../panier/db_connect.php'; // Assurez-vous que le chemin vers db_connect.php est correct

// Récupérer l'ID de l'article depuis l'URL
$article_id = isset($_GET['id']) ? (int)$_GET['id'] : 0;

if (!$article_id) {
    die("ID de l'article manquant ou incorrect.");
}

// Récupérer les informations sur l'article depuis la base de données
$stmt = $conn->prepare("SELECT * FROM article WHERE id = ?");
if (!$stmt) {
    die("Erreur de préparation de la requête : " . $conn->error);
}
$stmt->bind_param("i", $article_id);
$stmt->execute();
$result = $stmt->get_result();
$article = $result->fetch_assoc();

if (!$article) {
    die("Article non trouvé.");
}

// Récupérer les images supplémentaires depuis la base de données
$image_stmt = $conn->prepare("SELECT * FROM product_images WHERE product_id = ?");
if (!$image_stmt) {
    die("Erreur de préparation de la requête des images : " . $conn->error);
}
$image_stmt->bind_param("i", $article_id);
$image_stmt->execute();
$image_result = $image_stmt->get_result();
$images = [];
while ($row = $image_result->fetch_assoc()) {
    $images[] = $row['image_path'];
}
?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo htmlspecialchars($article['nom']); ?></title>
    <link rel="stylesheet" href="styles.css">
    <script src="commun/common.js" defer></script>
</head>

<body>
    <div class="header-container">
        <header>
            <div class="logo">
                <img src="../pageindex/logo.png" alt="Logo">
            </div>
            <div class="cart">
                <a href="#facebook">
                    <img src="../pageindex/facebook.jpg" alt="facebook">
                </a>
            </div>
            <div class="cart">
                <a href="https://www.instagram.com/eldorado.handmade/" target="_blank">
                    <img src="../pageindex/insta.jpg" alt="insta">
                </a>
            </div>
            <nav>
                <ul>
                    <li><a href="../index.html#accueil">Accueil</a></li>
                    <li><a href="../boutique/boutique.html">Boutique</a></li>
                    <li><a href="../index.html#boutique">Nouveauté</a></li>
                    <li><a href="../index.html#histoire">Histoire</a></li>
                    <li><a href="../index.html#contact">Contact</a></li>
                    <li><a href="../index.html#mon-compte">Mon compte</a></li>
                </ul>
            </nav>
            <div class="cart">
                <a href="../panier/panier.html">
                    <img src="../pageindex/panier.png" alt="Cart">
                    <span id="cart-count" class="cart-count">0</span>
                </a>
            </div>
        </header>
    </div>

    <div class="product-page">
        <div class="product-image">
            <div class="main-image">
                <img id="main-product-image" src="<?php echo htmlspecialchars($images[0]); ?>" alt="<?php echo htmlspecialchars($article['nom']); ?>">
                <div id="lens" class="img-zoom-lens"></div>
            </div>
            <div class="thumbnail-images">
                <?php foreach ($images as $image) : ?>
                    <div class="thumbnail">
                        <img src="<?php echo htmlspecialchars($image); ?>" alt="Miniature" data-src="<?php echo htmlspecialchars($image); ?>">
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
        <div class="product-details">
            <h1 class="product-title"><?php echo htmlspecialchars($article['nom']); ?></h1>
            <p class="product-price">€<?php echo htmlspecialchars($article['prix']); ?></p>
            <div class="product-options">
                <p>Couleur:</p>
            </div>
            <button class="add-to-cart" data-product-id="<?php echo $article['id']; ?>">Ajouter au Panier • €<?php echo htmlspecialchars($article['prix']); ?></button>
            <ul class="product-description">
                <li>Entièrement conçu à la main en Colombie</li>
                <li>Matériaux : Ivoire végétal et acier chirurgical (hypoallergénique)</li>
                <li>Poids : 2.8g par boucle</li>
            </ul>
        </div>
    </div>

    <script src="script.js" defer></script> <!-- Chemin correct pour le script -->

</body>

</html>