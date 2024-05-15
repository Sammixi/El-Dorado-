<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start();
require 'db_connect.php';

header('Content-Type: application/json');

if (isset($_SESSION['panier'])) {
    unset($_SESSION['panier']);
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['error' => 'Le panier est déjà vide']);
}
?>
