<?php
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $fullname = filter_input(INPUT_POST, 'fullname', FILTER_SANITIZE_SPECIAL_CHARS);
    $whatsapp = filter_input(INPUT_POST, 'whatsapp', FILTER_SANITIZE_STRING);
    $guests = filter_input(INPUT_POST, 'guests', FILTER_VALIDATE_INT);

    // Normalize/clean whatsapp number (digits only)
    $whatsapp_digits = '';
    if ($whatsapp) {
        $whatsapp_digits = preg_replace('/[^0-9]/', '', $whatsapp);
    }

    if (!$fullname || !$whatsapp || !$guests || strlen($whatsapp_digits) < 6) {
        echo json_encode(["status" => "error", "message" => "Please fill out all fields correctly."]);
        exit;
    }

    // Ensure data directory exists
    $dataDir = __DIR__ . '/data';
    if (!is_dir($dataDir)) {
        mkdir($dataDir, 0755, true);
    }

    $file = $dataDir . '/reservations.json';
    $reservations = [];
    if (file_exists($file)) {
        $content = file_get_contents($file);
        $reservations = json_decode($content, true) ?: [];
    }

    $entry = [
        'fullname' => $fullname,
        'whatsapp' => $whatsapp,
        'whatsapp_digits' => $whatsapp_digits,
        'guests' => (int)$guests,
        'created_at' => date('c')
    ];

    $reservations[] = $entry;
    file_put_contents($file, json_encode($reservations, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

    echo json_encode([
        "status" => "success",
        "message" => "Reservation saved for " . $fullname . " (" . $guests . " guests)."
    ]);
    exit;
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
    exit;
}

?>