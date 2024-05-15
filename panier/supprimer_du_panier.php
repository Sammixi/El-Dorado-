<?php
session_start();

$product_id = $_POST['product_id'];

if (isset($_SESSION['panier'][$product_id])) {
    unset($_SESSION['panier'][$product_id]);
}

echo json_encode($_SESSION['panier']);
?>
