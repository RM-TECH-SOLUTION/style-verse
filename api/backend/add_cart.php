<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit(0);

$conn = new mysqli("127.0.0.1", "root", "", "cart");

$input = json_decode(file_get_contents("php://input"), true);

// Debug log
file_put_contents("add_debug.txt", print_r($input, true), FILE_APPEND);

// Validate input
if (!isset($input["cartItems"]) || !is_array($input["cartItems"])) {
    echo json_encode(["success" => false, "message" => "cartItems must be an array"]);
    exit;
}

$inserted = 0;
$lastId = null;

foreach ($input["cartItems"] as $item) {

    // SAFE DEFAULT VALUES
    $discount     = isset($item["discount"])     ? floatval($item["discount"]) : 0;
    $price        = isset($item["price"])        ? floatval($item["price"])    : 0;
    $qty          = isset($item["qty"])          ? intval($item["qty"])        : 1;
    $name         = isset($item["name"])         ? $conn->real_escape_string($item["name"]) : "Unknown Product";
    $image        = isset($item["image"])        ? $conn->real_escape_string($item["image"]) : "no-image.png";
    $catalog_id   = isset($item["catalog_id"])   ? intval($item["catalog_id"]) : 0;
    $description  = isset($item["description"])  ? $conn->real_escape_string($item["description"]) : "";
    $item_id      = isset($item["item_id"])      ? intval($item["item_id"]) : 0;
    $cart_id      = isset($item["cart_id"])      ? intval($item["cart_id"]) : 0;

    // AUTO CALCULATED FIELDS
    $finalPrice = $price - $discount;
    $totalPrice = $finalPrice * $qty;

    // FINAL INSERT — MATCH TABLE COLUMNS EXACTLY
    $sql = "INSERT INTO cart
            (discount, finalPrice, image, name, price, qty, totalPrice, catalog_id, description, cart_id, item_id)
            VALUES 
            ($discount, $finalPrice, '$image', '$name', $price, $qty, $totalPrice, $catalog_id, '$description', $cart_id, $item_id)";

    file_put_contents("add_debug.txt", "SQL: $sql\n", FILE_APPEND);

    if ($conn->query($sql)) {
        $inserted++;
        $lastId = $conn->insert_id;
    } else {
        file_put_contents("add_debug.txt", "ERROR: ".$conn->error."\n", FILE_APPEND);
    }
}

echo json_encode([
    "success" => true,
    "message" => "$inserted inserted",
    "cart_id" => $lastId
]);

$conn->close();
?>
