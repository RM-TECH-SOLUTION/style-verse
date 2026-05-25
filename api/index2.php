<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

$servername = "127.0.0.1";
$username   = "root";
$password   = "";
$dbname     = "test_db";

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

try {
    $conn = new mysqli($servername, $username, $password, $dbname);
    $conn->set_charset("utf8mb4");
} catch (mysqli_sql_exception $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Database connection failed: " . $e->getMessage()
    ]);
    exit();
}

// ✅ Handle POST (update name)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents("php://input"), true);
    $id = $input['id'] ?? null;
    $newName = $input['name'] ?? null;

    if ($id && $newName) {
        $stmt = $conn->prepare("UPDATE users SET name = ? WHERE id = ?");
        $stmt->bind_param("si", $newName, $id);
        $stmt->execute();
        echo json_encode(["success" => true, "message" => "User updated successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Invalid input"]);
    }

    $conn->close();
    exit();
}

// ✅ Handle GET (fetch users)
$sql = "SELECT id, name FROM users";
$result = $conn->query($sql);
$users = $result->fetch_all(MYSQLI_ASSOC);
$conn->close();

echo json_encode([
    "success" => true,
    "message" => "Fetched successfully!",
    "users" => $users
]);
