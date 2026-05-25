<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");

// Database Connection
$servername = "sql111.byetcluster.com";
$username   = "if0_40456400";
$password   = "rqX7nj7RAS";
$dbname     = "if0_40456400_demoApp";


mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

try {
    $conn = new mysqli($servername, $username, $password, $dbname);
    $conn->set_charset("utf8mb4");
} catch (mysqli_sql_exception $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
    exit();
}

// Read GET parameters
$action = $_GET['action'] ?? "";

if (!$action) {
    echo json_encode(["success" => false, "message" => "Action required"]);
    exit();
}

// Get all catalogs
if ($action === "get_all") {
    try {
        $sql = "SELECT * FROM demoCatlog";
        $result = $conn->query($sql);

        $catalogs = [];
        while ($row = $result->fetch_assoc()) {
            $catalogs[] = $row;
        }

        echo json_encode([
            "success" => true,
            "message" => "Catalog list fetched successfully",
            "data" => $catalogs
        ]);
        exit();

    } catch (mysqli_sql_exception $e) {
        echo json_encode(["success" => false, "message" => $e->getMessage()]);
        exit();
    }
}

// Get by ID
if ($action === "get_by_id") {
    $id = intval($_GET['id'] ?? 0);

    if ($id <= 0) {
        echo json_encode(["success" => false, "message" => "Missing or invalid ID"]);
        exit();
    }

    try {
        $stmt = $conn->prepare("SELECT * FROM demoCatlog WHERE id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();

        echo json_encode([
            "success" => true,
            "data" => $result->fetch_assoc()
        ]);
        exit();

    } catch (mysqli_sql_exception $e) {
        echo json_encode(["success" => false, "message" => $e->getMessage()]);
        exit();
    }
}

echo json_encode(["success" => false, "message" => "Invalid action"]);
$conn->close();
?>
