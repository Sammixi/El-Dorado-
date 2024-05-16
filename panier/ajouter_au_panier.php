<?php
session_start();

header('Content-Type: application/json');

if (!isset($_POST['product_id']) || !is_numeric($_POST['product_id'])) {
    echo json_encode(['success' => false, 'message' => 'ID de produit manquant ou incorrect.']);
    exit;
}

$product_id = (int)$_POST['product_id'];

if (!isset($_SESSION['panier'])) {
    $_SESSION['panier'] = [];
}

if (!isset($_SESSION['panier'][$product_id])) {
    $_SESSION['panier'][$product_id] = 0;
}

$_SESSION['panier'][$product_id]++;


