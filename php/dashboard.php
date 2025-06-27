<?php
    session_start();

    if(!isset($_SESSION['email'])) {
        header('Location: ../index.html');
        exit();
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Custom CSS -->
    <link rel="stylesheet" href="">

    <!-- Fav Icon -->
    <link rel="icon" type="image/x-icon" href="/images/Pokeball.png">

    <title>Pokedex Dashboard</title>
</head>
<body>
    hello welcome, <?php echo $_SESSION['name'];?> to you pokedex dashboard!
    <a href="log_out.php">Log out</a>
</body>
</html>