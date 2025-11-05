<?php
// staff_api.php

header("Content-Type: application/json; charset=UTF-8");

// --- (0) Check if SQLite PDO driver is available ---
if (!in_array("sqlite", PDO::getAvailableDrivers())) {
    http_response_code(500);
    echo json_encode(['error' => 'PDO SQLite driver not installed or enabled in php.ini']);
    exit;
}

// --- 1) Database connection via PDO (SQLite) ---
$dbFile = __DIR__ . '/attendance_db.db';
$dsn = "sqlite:$dbFile";

try {
    // No username/password needed for SQLite
    $pdo = new PDO($dsn, null, null, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
    exit;
}

// --- 2) Helper to parse input JSON body ---
function getRequestData() {
    $input = file_get_contents('php://input');
    return $input ? json_decode($input, true) : [];
}

// --- 3) Route by HTTP method ---
$method = $_SERVER['REQUEST_METHOD'];
$id = isset($_GET['id']) ? (int)$_GET['id'] : null;

switch ($method) {
    case 'GET':
        if ($id) {
            // Fetch one
            $stmt = $pdo->prepare("SELECT * FROM staff WHERE id = ?");
            $stmt->execute([$id]);
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($row) {
                echo json_encode($row);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Staff not found']);
            }
        } else {
            // Fetch all
            $stmt = $pdo->query("SELECT * FROM staff ORDER BY id");
            $all = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($all);
        }
        break;

    case 'POST':
        // Create new
        $data = getRequestData();
        if (empty($data['name'] ?? '') || empty($data['designation'] ?? '')) {
            http_response_code(400);
            echo json_encode(['error' => 'Name & designation are required']);
            exit;
        }

        $stmt = $pdo->prepare("
            INSERT INTO staff (name, designation, department, type)
            VALUES (:name, :designation, :department, :type)
        ");
        $stmt->execute([
            ':name' => $data['name'],
            ':designation' => $data['designation'],
            ':department' => $data['department'] ?? null,
            ':type' => $data['type'] ?? null,
        ]);

        http_response_code(201);
        echo json_encode(['id' => $pdo->lastInsertId()]);
        break;

    case 'PUT':
        // Update existing
        if (!$id) {
            http_response_code(400);
            echo json_encode(['error' => 'ID is required for update']);
            exit;
        }

        $data = getRequestData();
        $fields = [];
        foreach (['name','designation','department','type'] as $col) {
            if (array_key_exists($col, $data)) {
                $fields[] = "$col = :$col";
            }
        }

        if (empty($fields)) {
            http_response_code(400);
            echo json_encode(['error' => 'No valid fields provided']);
            exit;
        }

        $sql = "UPDATE staff SET " . implode(', ', $fields) . " WHERE id = :id";
        $stmt = $pdo->prepare($sql);
        $data['id'] = $id;
        $stmt->execute($data);

        echo json_encode(['updated' => $stmt->rowCount()]);
        break;

    case 'DELETE':
        // Delete record
        if (!$id) {
            http_response_code(400);
            echo json_encode(['error' => 'ID is required for delete']);
            exit;
        }

        $stmt = $pdo->prepare("DELETE FROM staff WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(['deleted' => $stmt->rowCount()]);
        break;

    default:
        http_response_code(405);
        header("Allow: GET, POST, PUT, DELETE");
        echo json_encode(['error' => 'Method not allowed']);
        break;
}
