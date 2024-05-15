<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start();
require 'db_connect.php';

header('Content-Type: application/json');

$product_id = isset($_POST['product_id']) ? (int)$_POST['product_id'] : 0;
$quantity = isset($_POST['quantity']) ? (int)$_POST['quantity'] : 0;

// Ajouter des messages de débogage
if (!$product_id || !$quantity) {
    echo json_encode(['error' => 'ID de produit ou quantité manquants', 'product_id' => $product_id, 'quantity' => $quantity]);
    exit;
}

// Vérifiez si le produit existe dans la base de données
$stmt = $conn->prepare("SELECT * FROM produits WHERE id = ?");
if ($stmt === false) {
    echo json_encode(['error' => 'Erreur lors de la préparation de la requête']);
    exit;
}

$stmt->bind_param("i", $product_id);
$stmt->execute();
$result = $stmt->get_result();
$product = $result->fetch_assoc();

// Ajouter des messages de débogage
if ($product) {
    if (!isset($_SESSION['panier'])) {
        $_SESSION['panier'] = [];
    }

    if (isset($_SESSION['panier'][$product_id])) {
        $_SESSION['panier'][$product_id] += $quantity;
    } else {
        $_SESSION['panier'][$product_id] = $quantity;
    }

    echo json_encode($_SESSION['panier']);
} else {
    echo json_encode(['error' => 'Produit non trouvé', 'product_id' => $product_id]);
}
