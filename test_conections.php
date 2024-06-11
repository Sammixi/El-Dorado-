<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Utilisez l'adresse IP directe du serveur MySQL ou localhost si c'est le bon hôte
$servername = "127.0.0.1"; // Remplacez par l'adresse IP si disponible
$port = "3306"; // Généralement, le port est 3306
$username = "u652266785_ElDorado"; // Votre nom d'utilisateur MySQL
$password = "5_9V69ysxAC5d#u"; // Votre mot de passe MySQL
$dbname = "u652266785_db_eldorado"; // Le nom de votre base de données

// Créer la connexion
$conn = new mysqli($servername, $username, $password, $dbname, $port);

// Vérifier la connexion
if ($conn->connect_error) {
    die("Connection failed: (" . $conn->connect_errno . ") " . $conn->connect_error);
} else {
    echo "Connection successful!";
}
