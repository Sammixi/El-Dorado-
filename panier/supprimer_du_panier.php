<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

session_start();

header('Content-Type: application/json');

if (!isset($_GET['id']) || !is_numeric($_GET['id'])) {
    echo json_encode(['success' => false, 'message' => 'ID de produit manquant ou incorrect.']);
    exit;
}

$product_id = (int)$_GET['id'];

if (!isset($_SESSION['panier'])) {
    echo json_encode(['success' => false, 'message' => 'Le panier est vide.']);
    exit;
}

$panier = $_SESSION['panier'];

if (!isset($panier[$product_id])) {
    echo json_encode(['success' => false, 'message' => 'Produit non trouvé dans le panier.']);
    exit;
}

// Supprimer l'article du panier
unset($panier[$product_id]);

// Mettre à jour la session panier
$_SESSION['panier'] = $panier;

echo json_encode(['success' => true, 'message'  => 'Article supprimé du panier.']);
