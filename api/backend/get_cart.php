<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit(0);

$conn = new mysqli("127.0.0.1", "root", "", "cart");

if ($conn->connect_error) {
    echo json_encode([
        "success" => false,
        "message" => "Database connection error"
    ]);
    exit;
}

$input = json_decode(file_get_contents("php://input"), true);

// 🔍 If cart_Id provided → filter by cart_id
if (isset($input["cart_Id"])) {
    $cart_Id = intval($input["cart_Id"]);
    $sql = "SELECT * FROM cart WHERE cart_id = $cart_Id ORDER BY id DESC";
} 
else {
    // Default → return ALL cart items
    $sql = "SELECT * FROM cart ORDER BY id DESC";
}

$result = $conn->query($sql);

$cartData = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $cartData[] = $row;
    }
}

echo json_encode([
    "success" => true,
    "data" => $cartData
]);

$conn->close();
?>
