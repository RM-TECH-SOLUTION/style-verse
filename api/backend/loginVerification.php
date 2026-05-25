<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
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

// ✅ Get POST data
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['password']) || (!isset($data['email']) && !isset($data['phone']))) {
    echo json_encode([
        "success" => false,
        "message" => "Please provide phone/email and password"
    ]);
    exit();
}

$password = $data['password'];
$emailOrPhone = $data['email'] ?? $data['phone'];

// ✅ Prepare SQL: Check by email or phone
$sql = "SELECT * FROM name WHERE (email = ? OR phone = ?) LIMIT 1";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $emailOrPhone, $emailOrPhone);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode([
        "success" => false,
        "message" => "No user found with that email or phone"
    ]);
    exit();
}

$user = $result->fetch_assoc();

// ✅ Check password match (plain text example — you can replace with password_hash later)
if ($user['password'] === $password) {
    echo json_encode([
        "success" => true,
        "message" => "Login successful!",
        "user" => [
            "name" => $user['name'],
            "email" => $user['email'],
            "phone" => $user['phone'],
            "gender" => $user['Gender']
        ]
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Incorrect password"
    ]);
}

$conn->close();
?>
