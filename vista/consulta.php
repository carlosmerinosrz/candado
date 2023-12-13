<?php
$servidor = '2daw.esvirgua.com';
$usuario =  'user2daw_09';
$contrasenia = 'lQ)qFW^cg8w(';
$bbdd = 'user2daw_BD2-09';

$conn = new mysqli($servidor, $usuario, $contrasenia, $bbdd);

if ($conn->connect_error) {
    die("La conexión a la base de datos falló: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $receivedCode = json_decode(file_get_contents("php://input"), true);

    $sql = "SELECT * FROM codigo_seguro  WHERE codigo = '" . implode("", $receivedCode) . "'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $response = array("status" => "success");
    } else {
        $response = array("status" => "error");
    }

    header('Content-Type: application/json');
    echo json_encode($response);
} else {
    $response = array("status" => "error");
    header('Content-Type: application/json');
    echo json_encode($response);
}

$conn->close();
?>
