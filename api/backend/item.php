<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");

// ✅ Database connection
$servername = "127.0.0.1";
$username   = "root";
$password   = "";
$dbname     = "items"; // change to your actual DB name

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

// ✅ Read JSON body
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['action'])) {
    echo json_encode([
        "success" => false,
        "message" => "Please provide action"
    ]);
    exit();
}

$action = $data['action'];

try {
    // ✅ 1️⃣ Get all items
    if ($action === "get_all") {
        $sql = "SELECT * FROM items";
        $result = $conn->query($sql);
        $items = [];

        while ($row = $result->fetch_assoc()) {
            $items[] = $row;
        }

        echo json_encode([
            "success" => true,
            "message" => "Items fetched successfully",
            "data" => $items
        ]);
        exit();
    }

    // ✅ 2️⃣ Get items by catalog_id
    if ($action === "get_by_catalog") {
        if (!isset($data['catalog_id'])) {
            echo json_encode([
                "success" => false,
                "message" => "Missing catalog_id"
            ]);
            exit();
        }

        $catalog_id = intval($data['catalog_id']);
        $stmt = $conn->prepare("SELECT * FROM items WHERE catalog_id = ?");
        $stmt->bind_param("i", $catalog_id);
        $stmt->execute();
        $result = $stmt->get_result();

        $items = [];
        while ($row = $result->fetch_assoc()) {
            $items[] = $row;
        }

        echo json_encode([
            "success" => true,
            "message" => "Items fetched for catalog ID: $catalog_id",
            "data" => $items
        ]);
        exit();
    }

    // ✅ 3️⃣ Add new item
    if ($action === "create") {
        $catalog_id = intval($data['catalog_id'] ?? 0);
        $name = $data['name'] ?? '';
        $description = $data['description'] ?? '';
        $price = floatval($data['price'] ?? 0);
        $discount = floatval($data['discount'] ?? 0);
        $image = $data['image'] ?? '';

        if (empty($name)) {
            echo json_encode([
                "success" => false,
                "message" => "Item name is required"
            ]);
            exit();
        }

        $stmt = $conn->prepare("INSERT INTO items (catalog_id, name, description, price, discount, image) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("issdds", $catalog_id, $name, $description, $price, $discount, $image);
        $stmt->execute();

        echo json_encode([
            "success" => true,
            "message" => "Item added successfully",
            "id" => $conn->insert_id
        ]);
        exit();
    }

    // ❌ Invalid action
    echo json_encode([
        "success" => false,
        "message" => "Invalid action"
    ]);
    exit();

} catch (mysqli_sql_exception $e) {
    echo json_encode([
        "success" => false,
        "message" => "Database error: " . $e->getMessage()
    ]);
    exit();
}

$conn->close();
?>
