<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Boutique - Page 6</title>
    <link rel="stylesheet" href="../animations/animations.css">
    <link rel="icon" href="../pageindex/icon.png" type="image/png">
    <link rel="stylesheet" href="styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Montserrat:wght@400;700&family=Roboto:wght@400;700&display=swap" rel="stylesheet">
    <script src="../commun/common.js?v=1.0" defer></script>
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
                <div class="cart">
                    <a href="https://www.instagram.com/eldorado.handmade/" target="_blank">
                        <img src="../pageindex/insta.jpg" alt="insta">
                    </a>
                </div>
            </div>
            <nav>
                <ul>
                    <li><a href="../index.html#accueil">Accueil</a></li>
                    <li><a href="../boutique/boutique.html">Boutique</a></li>
                    <li><a href="../index.html#boutique">Nouveauté</a></li>
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
    <section class="hero">
        <h1>Boutique - Page 6</h1>
    </section>
    <div class="breadcrumbs">
        <a href="../index.html">Accueil</a>
        <span> > </span>
        <a href="boutique.html">Boutique</a>
        <span> > </span>
        <a href="boutique_page6.html">Page 6</a>
    </div>
    <section class="categories">
        <label for="category-select">Catégories de produits</label>
        <select id="category-select">
            <option value="">Sélectionner une catégorie</option>
        </select>
    </section>
    <section class="product-list">
        <?php
        include '../db_connect.php';  // Assurez-vous que le chemin est correct

        $sql = "SELECT id, nom, image, prix FROM produits LIMIT 40 OFFSET 200";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                echo '<div class="product-item">';
                echo '<a href="../pagedesarticle/article.php?id=' . $row["id"] . '"><img src="../imgTest/' . $row["image"] . '" alt="Article ' . $row["id"] . '"></a>';
                echo '<h2>' . $row["nom"] . '</h2>';
                echo '<p class="price">' . number_format($row["prix"], 2, ',', ' ') . '€</p>';
                echo '<div class="button-container">';
                echo '<a href="../pagedesarticle/article.php?id=' . $row["id"] . '" class="button left-button">Voir l\'article</a>';
                echo '<button class="button right-button add-to-cart" data-product-id="' . $row["id"] . '">Ajouter au panier</button>';
                echo '</div>';
                echo '</div>';
            }
        } else {
            echo "0 résultats";
        }
        $conn->close();
        ?>
    </section>
    <div class="pagination">
        <a href="boutique_page5.html">&laquo; </a>
        <a href="boutique.html">1</a>
        <a href="boutique_page2.html">2</a>
        <a href="boutique_page3.html">3</a>
        <a href="boutique_page4.html">4</a>
        <a href="boutique_page5.html">5</a>
        <a href="boutique_page6.html" class="active">6</a>
        <a href="boutique_page7.html">7</a>
        <a href="boutique_page7.html"> &raquo;</a>
    </div>

    <footer></footer>
    <script src="script.js?v=1.0" defer></script>
    <script src="../footer/footer.js" defer></script>
</body>

</html>