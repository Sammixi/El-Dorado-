<?php
require 'db_connect.php';

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} else {
    echo "Connexion réussie à la base de données";
}
