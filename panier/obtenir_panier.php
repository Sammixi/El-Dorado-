<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

session_start();

header('Content-Type: application/json');

// Vérifier si le panier est vide
if (!isset($_SESSION['panier']) || empty($_SESSION['panier'])) {
    echo json_encode([]);
    exit;
}

$panier = $_SESSION['panier'];
$result = [];

require 'db_connect.php'; 

foreach ($panier as $id => $quantite) {
    $stmt = $conn->prepare("
        SELECT p.id, p.nom, p.couleur, p.prix, p.image 
        FROM produits p 
        WHERE p.id = ?
    ");
    if (!$stmt) {
        echo json_encode(['error' => 'Erreur de préparation de la requête']);
        exit;
    }
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $resultSet = $stmt->get_result();
    $produit = $resultSet->fetch_assoc();

    if ($produit) {
        $produit['quantite'] = $quantite;
        $result[] = $produit;
    }
    $stmt->close();
}

echo json_encode($result);

$conn->close();
