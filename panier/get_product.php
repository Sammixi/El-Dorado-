<?php
require 'db_connect.php'; // Assurez-vous que le chemin vers db_connect.php est correct

header('Content-Type: application/json');

$product_id = isset($_GET['id']) ? (int)$_GET['id'] : 0;

if (!$product_id) {
    echo json_encode(['error' => 'ID de produit manquant ou incorrect']);
    exit;
}

$stmt = $conn->prepare("SELECT * FROM article WHERE id = ?");
if (!$stmt) {
    echo json_encode(['error' => 'Erreur de préparation de la requête']);
    exit;
}
$stmt->bind_param("i", $product_id);
$stmt->execute();
$result = $stmt->get_result();
$article = $result->fetch_assoc();

if (!$article) {
    echo json_encode(['error' => 'Produit non trouvé']);
    exit;
}

$image_stmt = $conn->prepare("SELECT * FROM product_images WHERE product_id = ?");
if (!$image_stmt) {
    echo json_encode(['error' => 'Erreur de préparation de la requête des images']);
    exit;
}
$image_stmt->bind_param("i", $product_id);
$image_stmt->execute();
$image_result = $image_stmt->get_result();
$images = [];
while ($row = $image_result->fetch_assoc()) {
    $images[] = $row['image_path'];
}

echo json_encode([
    'id' => $article['id'],
    'nom' => $article['nom'],
    'prix' => $article['prix'],
    'description' => $article['description'],
    'images' => $images
]);
