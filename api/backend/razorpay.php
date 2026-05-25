<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$input = json_decode(file_get_contents("php://input"), true);

$api_key = "rzp_test_RfB9T8TS7ruuZP";
$api_secret = "yJPvFhupD6obwFVQISZdoRPC";

if (!isset($input["action"])) {
    echo json_encode(["success" => false, "message" => "Missing action"]);
    exit;
}

if ($input["action"] === "create_order") {
    $amount = intval($input["amount"]); // amount in paise
    $postFields = [
        "amount" => $amount,
        "currency" => "INR",
        "receipt" => "order_rcptid_" . rand(1000, 9999)
    ];

    $ch = curl_init("https://api.razorpay.com/v1/orders");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_USERPWD, "$api_key:$api_secret");
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($postFields));
    curl_setopt($ch, CURLOPT_HTTPHEADER, ["Content-Type: application/json"]);

    $response = curl_exec($ch);
    $error = curl_error($ch);
    $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($error) {
        echo json_encode(["success" => false, "message" => "cURL Error: $error"]);
        exit;
    }

    if ($status >= 200 && $status < 300) {
        echo $response;
    } else {
        echo json_encode(["success" => false, "message" => "Razorpay API Error", "response" => $response]);
    }
    exit;
}

if ($input["action"] === "verify_signature") {
    $order_id = $input["razorpay_order_id"];
    $payment_id = $input["razorpay_payment_id"];
    $signature = $input["razorpay_signature"];

    $generated_signature = hash_hmac('sha256', $order_id . "|" . $payment_id, $api_secret);

    if ($generated_signature === $signature) {
        echo json_encode(["success" => true, "message" => "Payment verified successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Invalid signature"]);
    }
    exit;
}

echo json_encode(["success" => false, "message" => "Invalid action"]);
?>
