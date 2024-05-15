<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start();
require 'db_connect.php';

header('Content-Type: application/json');

$product_id = isset($_POST['product_id']) ? (int)$_POST['product_id'] : 0;

if (!$product_id) {
    echo json_encode(['error' => 'ID de produit manquant']);
    exit;
}

if (isset($_SESSION['panier'][$product_id])) {
    unset($_SESSION['panier'][$product_id]);
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['error' => 'Produit non trouvé dans le panier']);
}
