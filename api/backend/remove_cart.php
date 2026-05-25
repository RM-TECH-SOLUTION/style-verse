<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit(0);

$conn = new mysqli("127.0.0.1", "root", "", "cart");
if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "DB connection failed"]);
    exit;
}

$input = json_decode(file_get_contents("php://input"), true);

// Expect item_id
if (!isset($input["item_id"])) {
    echo json_encode(["success" => false, "message" => "Missing item_id"]);
    exit;
}

$item_id = intval($input["item_id"]);

// DELETE by item_id
$sql = "DELETE FROM cart WHERE item_id = $item_id";

if ($conn->query($sql)) {
    echo json_encode(["success" => true, "message" => "Item deleted"]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Delete failed: " . $conn->error
    ]);
}

$conn->close();
?>
