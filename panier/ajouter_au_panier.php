<?php
session_start();
require 'config.php';

$product_id = $_POST['product_id'];
$quantity = $_POST['quantity'];

if (!isset($_SESSION['panier'])) {
    $_SESSION['panier'] = [];
}

if (isset($_SESSION['panier'][$product_id])) {
    $_SESSION['panier'][$product_id] += $quantity;
} else {
    $_SESSION['panier'][$product_id] = $quantity;
}

echo json_encode($_SESSION['panier']);
?>
