<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// ⭐ Correct ByetHost credentials
$servername = "sql100.byethost7.com";
$username   = "b7_40497172";
$password   = "Ram@937900";
$dbname     = "b7_40497172_demoApps";

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

// Database connection
try {
    $conn = new mysqli($servername, $username, $password, $dbname);
    $conn->set_charset("utf8mb4");
} catch (mysqli_sql_exception $e) {
    echo json_encode(["success" => false, "message" => "DB Error: ".$e->getMessage()]);
    exit();
}

$action = $_GET['action'] ?? "";

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

    } catch (Exception $e) {

        echo json_encode(["success" => false, "message" => $e->getMessage()]);
        exit();
    }

}

echo json_encode(["success" => false, "message" => "Invalid action"]);
$conn->close();
?>
