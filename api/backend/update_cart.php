<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit(0);

$conn = new mysqli("127.0.0.1", "root", "", "cart");

$input = json_decode(file_get_contents("php://input"), true);

// Validate
if (!isset($input["item_id"])) {
    echo json_encode(["success" => false, "message" => "Missing item_id"]);
    exit;
}

$item_id = intval($input["item_id"]);
$qty = $input["qty"] ?? null;

// If qty missing OR qty = 0 → delete this product
if ($qty === null || intval($qty) <= 0) {
    $conn->query("DELETE FROM cart WHERE item_id=$item_id");
    echo json_encode(["success" => true, "message" => "Item removed"]);
    exit;
}

$qty = intval($qty);

// Get old item
$result = $conn->query("SELECT price, discount FROM cart WHERE item_id=$item_id");
if (!$result || $result->num_rows == 0) {
    echo json_encode(["success" => false, "message" => "Item not found"]);
    exit;
}

$row = $result->fetch_assoc();
$price = floatval($row["price"]);
$discount = floatval($row["discount"]);
$finalPrice = $price - $discount;
$totalPrice = $finalPrice * $qty;

// Update item
$sql = "UPDATE cart 
        SET qty=$qty, totalPrice=$totalPrice, finalPrice=$finalPrice 
        WHERE item_id=$item_id";

if ($conn->query($sql)) {
    echo json_encode(["success" => true, "message" => "Qty updated"]);
} else {
    echo json_encode(["success" => false, "message" => "DB error"]);
}

$conn->close();
?>
