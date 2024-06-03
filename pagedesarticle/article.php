<?php
require '../panier/db_connect.php'; // Assurez-vous que le chemin vers db_connect.php est correct

// Récupérer l'ID de l'article depuis l'URL
$article_id = isset($_GET['id']) ? (int)$_GET['id'] : 0;

if (!$article_id) {
    die("ID de l'article manquant ou incorrect.");
}

// Récupérer les informations sur l'article depuis la base de données
$stmt = $conn->prepare("SELECT * FROM produits WHERE id = ?");
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

// Récupérer des articles aléatoires pour les suggestions
$suggestion_stmt = $conn->prepare("SELECT * FROM produits WHERE id != ? ORDER BY RAND() LIMIT 4");
if (!$suggestion_stmt) {
    die("Erreur de préparation de la requête des suggestions : " . $conn->error);
}
$suggestion_stmt->bind_param("i", $article_id);
$suggestion_stmt->execute();
$suggestion_result = $suggestion_stmt->get_result();
$suggestions = [];
while ($row = $suggestion_result->fetch_assoc()) {
    $suggestions[] = $row;
}
?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo htmlspecialchars($article['nom']); ?></title>
    <link rel="stylesheet" href="styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Montserrat:wght@400;700&family=Roboto:wght@400;700&display=swap" rel="stylesheet">
</head>

<body>
    <div class="header-container">
        <header>
            <div class="logo">
                <img src="../pageindex/logo.png" alt="Logo">
                <link rel="icon" href="../pageindex/icon.png" type="image/png">
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
                    <li><a href="../index.html#boutique">Nouveauté</li>
                    <li><a href="../index.html#histoire">Blog</a></li>
                    <li><a href="../navigation/nouscontacter.html">Contact</a></li>
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
        <div class="product-main">
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
                    <li>Matériaux : Lorem ipsum dolor sit amet, consectetur adipisicing elit.</li>
                    <li>Poids : Lorem ipsum dolor sit amet, consectetur adipisicing elit </li>
                </ul>
                <!-- Ajout de la description avec animation -->
                <div class="description-container">
                    <button class="description-toggle">Description</button>
                    <div class="product-full-description">
                        <p>
                            <strong>Origine</strong> : Entièrement fabriqué à la main par les artisans Wayuu en Colombie.<br>
                            <strong>Matériaux</strong> : 100% coton, garantissant une durabilité et un confort exceptionnels.<br>
                            <strong>Dimensions</strong> : Environ 30 cm de hauteur et 25 cm de largeur, avec une bandoulière ajustable pour un port confortable.<br>
                            <strong>Motifs</strong> : Chaque sac présente des motifs uniques et complexes, inspirés par la nature, la spiritualité et la vie quotidienne des Wayuu.<br>
                            <strong>Usage</strong> : Parfait pour une utilisation quotidienne, ce sac spacieux peut contenir tous vos essentiels tout en ajoutant une touche de style et de culture à votre tenue.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <!-- Ajout des suggestions de produits -->
        <div class="related-products">
            <h2> Autres Produits</h2>
            <div class="product-grid">
                <?php foreach ($suggestions as $suggestion) : ?>
                    <div class="product-item">
                        <a href="article.php?id=<?php echo $suggestion['id']; ?>">
                            <img src="<?php echo htmlspecialchars($suggestion['image']); ?>" alt="<?php echo htmlspecialchars($suggestion['nom']); ?>">
                            <h3><?php echo htmlspecialchars($suggestion['nom']); ?></h3>
                            <p>€<?php echo htmlspecialchars($suggestion['prix']); ?></p>
                        </a>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </div>
    <footer></footer>
    <script src="script.js?v=1.0" defer></script>
    <script src="../footer/footer.js" defer></script>
</body>

</html>