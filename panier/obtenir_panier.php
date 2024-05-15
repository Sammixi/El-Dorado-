<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start();
require 'db_connect.php';

header('Content-Type: application/json');

if (isset($_SESSION['panier'])) {
    $cart = [];
    foreach ($_SESSION['panier'] as $product_id => $quantity) {
        $stmt = $conn->prepare("SELECT * FROM produits WHERE id = ?");
        $stmt->bind_param("i", $product_id);
        $stmt->execute();
        $result = $stmt->get_result();
        $product = $result->fetch_assoc();
        if ($product) {
            $product['quantity'] = $quantity;
            $cart[] = $product;
        }
    }
    echo json_encode($cart);
} else {
    echo json_encode([]);
}
