<?php
include "connection.php";

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    if (isset($_GET['email']) && isset($_GET['password'])) {
        $email = $_GET['email'];
        $password = $_GET['password'];

        $sql = "SELECT * FROM Customers WHERE email = '$email'";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                if ($password == $row["password"]) {
                    echo "Login successful!";
                    header("Location: Menu.html");
                    exit(); // Ensure script execution stops after redirection
                } else {
                    echo "Incorrect password!";
                }
            }
        } else {
            echo "Email not registered!";
        }
    }
}

$conn->close();
?>
