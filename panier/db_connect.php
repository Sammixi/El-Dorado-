<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$servername = "127.0.0.1"; // Utilisez 127.0.0.1 au lieu de localhost
$port = "3309"; // Assurez-vous que ce port est correct
$username = "root";
$password = "";
$dbname = "db_panier"; // Nom de la base de données

// Créer la connexion
$conn = new mysqli($servername, $username, $password, $dbname, $port);

// Vérifier la connexion
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} else {
    echo "Connection successful!";
}
