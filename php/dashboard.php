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
    <link rel="stylesheet" href="../styles/dashboard-style.css">

    <!-- Fav Icon -->
    <link rel="icon" type="image/x-icon" href="/images/Pokeball.png">

    <title>Pokedex Dashboard</title>
</head>
<body>
    <main>
        <!-- Welcome Section -->
        <section>
            <div class="container" id="welcome-section">
                <h1>Welcome, <span><?php echo $_SESSION['name'];?></span> to your Pokedex Dashboard!</h1>

                <h3>0 Pokemon are in Pokeland</h3>
                <a id="pokeland-link" href="../pokeland.html">Enter Pokeland</a>

                <a href="log_out.php">Log out</a>

            </div>
        </section>

        <!-- Gotta Catch 'Em All Section -->
        <section id="pokemon-section">
            <div id="pikachu-banner">
                <img id="angry-pikachu" src="../images/Pikachu.svg" alt="Angry Pikachu" height="100px">
                <h2>Gotta Catch 'Em All</h2>
            </div>

            <!-- Pokemon Display -->
            <div class="container" id="pokemon-display">
                <div class="pokemon">
                    <img src="../images/Squirtle.svg" alt="" height="80px">
                </div>

                <div class="pokemon">
                    <img src="../images/bulbasaur.png" alt="" height="80px">
                </div>

                <div class="pokemon">
                    <img src="../images/Pokeball.png" alt="" height="80px">
                </div>

                <div class="pokemon">
                    <img src="../images/Charmander.png" alt="" height="120px">
                </div>

                <div class="pokemon">
                    <img src="../images/Pikachu.svg" alt="" height="120px">
                </div>

                <div class="pokemon">
                    <img src="../images/Pokeball.png" alt="" height="80px">
                </div>

                <div class="pokemon">
                    <img src="../images/bulbasaur.png" alt="" height="80px">
                </div>

                <div class="pokemon">
                    <img src="../images/Squirtle.svg" alt="" height="80px">
                </div>

                <div class="pokemon">
                    <img src="../images/Charmander.png" alt="" height="120px">
                </div>

                <div class="pokemon">
                    <img src="../images/Pikachu.svg" alt="" height="120px">
                </div>

                <div class="pokemon">
                    <img src="../images/Squirtle.svg" alt="" height="80px">
                </div>

                <div class="pokemon">
                    <img src="../images/Charmander.png" alt="" height="120px">
                </div>

                <div class="pokemon">
                    <img src="../images/bulbasaur.png" alt="" height="80px">
                </div>

                <div class="pokemon">
                    <img src="../images/Squirtle.svg" alt="" height="80px">
                </div>

                <div class="pokemon">
                    <img src="../images/Pokeball.png" alt="" height="80px">
                </div>

                <div class="pokemon">
                    <img src="../images/Pikachu.svg" alt="" height="120px">
                </div>

                <div class="pokemon">
                    <img src="../images/bulbasaur.png" alt="" height="80px">
                </div>

                <div class="pokemon">
                    <img src="../images/Charmander.png" alt="" height="120px">
                </div>

                <div class="pokemon">
                    <img src="../images/Pokeball.png" alt="" height="80px">
                </div>

                <div class="pokemon">
                    <img src="../images/Squirtle.svg" alt="" height="80px">
                </div>
            </div>

            <button class="load-pokemon-btn" id="more-pokemon">more Pokemon...</button>
        </section>
    </main>
</body>
</html>