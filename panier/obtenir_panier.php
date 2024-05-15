<?php
session_start();

if (isset($_SESSION['panier'])) {
    echo json_encode($_SESSION['panier']);
} else {
    echo json_encode([]);
}
?>
