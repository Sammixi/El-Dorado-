<?php
// ajouter_au_panier.php

header('Content-Type: application/json');

session_start();

$product_id = $_POST['product_id'];
$quantity = $_POST['quantity'];

// Vérifiez si le produit et la quantité sont valides
if (empty($product_id) || empty($quantity) || !is_numeric($quantity) || $quantity <= 0) {
    echo json_encode(['success' => false, 'error' => 'Paramètres de produit ou quantité invalides']);
    exit;
}

// Ajoutez le produit au panier
if (!isset($_SESSION['panier'])) {
    $_SESSION['panier'] = [];
}

if (!isset($_SESSION['panier'][$product_id])) {
    $_SESSION['panier'][$product_id] = 0;
}

$_SESSION['panier'][$product_id] += $quantity;

echo json_encode(['success' => true, 'message' => 'Produit ajouté au panier']);
exit;
