<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$servername = "127.0.0.1"; // or "localhost"
$username   = "root";
$password   = "";
$dbname     = "test_db"; // ✅ changed from test_db to user_db

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "DB connection failed: " . $conn->connect_error]);
    exit;
}

$input = json_decode(file_get_contents("php://input"), true);

if (!$input || !isset($input['name']) || !isset($input['email'])) {
    echo json_encode(["success" => false, "message" => "Invalid data"]);
    exit;
}

$name   = $conn->real_escape_string($input['name']);
$phone  = $conn->real_escape_string($input['phone']);
$email  = $conn->real_escape_string($input['email']);
$gender = $conn->real_escape_string($input['gender']);
$password  = $conn->real_escape_string($input['password']);

// ✅ Change table name from `users` → `name`
$exists = $conn->query("SELECT id FROM name WHERE email='$email' OR phone='$phone'");
if ($exists && $exists->num_rows > 0) {
    // Update existing user
    $sql = "UPDATE name SET name='$name', gender='$gender' WHERE email='$email' OR phone='$phone'";
    $msg = "User updated successfully";
} else {
    // Insert new user
    $sql = "INSERT INTO name (name, phone, email, gender,password) VALUES ('$name', '$phone', '$email', '$gender', '$password')";
    $msg = "User added successfully";
}

if ($conn->query($sql)) {
    echo json_encode(["success" => true, "message" => $msg]);
} else {
    echo json_encode(["success" => false, "message" => "Database error: " . $conn->error]);
}

$conn->close();
?>
