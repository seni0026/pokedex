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
    <link rel="icon" type="image/x-icon" href="../images/Pokeball.png">

    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css">

    <!-- Animate.css -->
      <link rel="stylesheet"href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">

    <title>Pokédex Dashboard</title>
</head>
<body>
    <header>
        <div class="wrapper">
            <!-- Nav Bar start -->
            <nav class="navbar">
                <div class="navbar-container">
                    <span class="toggler-icon">
                        <i class="fa-solid fa-circle-user"></i>
                        <span id="user-name"><?php echo strtoupper($_SESSION['name']);?></span>
                    </span>
                    <div class="open" id="navbarNav">
                        <ul id="nav-links">
                            <li class="nav-item"><a class="nav-link" href="dashboard.php">Dashboard</a></li>
                            <li class="nav-item"><a class="nav-link" href="pokeland.php">Enter Pokéland</a></li>
                            <li class="nav-item"><a class="nav-link" href="#">Manage Account</a></li>
                            <li class="nav-item"><a class="nav-link" href="log_out.php">Log out <span><i class="fa-solid fa-right-from-bracket"></i></span></a></li>
                        </ul>
                    </div>
                </div>
            </nav>
            <!-- Nav Bar end --> 

            <!-- Welcome Section -->
            <section>
                <div class="container" id="welcome-section">
                    <h1>Welcome, <span><?php echo strtoupper($_SESSION['name']);?></span> to your Pokédex Dashboard!</h1>

                    <h3>0 Pokémon are in Pokéland</h3>
                    <a id="pokeland-link" href="../php/pokeland.php">Enter Pokéland</a>
                </div>
            </section>
        </div>
    </header>
    <main>
        <!-- Gotta Catch 'Em All Section -->
        <section id="pokemon-section">
            <div id="pikachu-banner">
                <img id="angry-pikachu" src="../images/Pikachu.svg" alt="" data-name="" height="200px">
                <h2>Gotta Catch 'Em All</h2>
            </div>

            <!-- Pokemon Display -->
            <div id="pokemon-display">
                <div class="pokemon" data-name="Squirtle">
                    <img src="../images/Squirtle.svg" alt=""  height="80px">
                    <p class="pokemon-name">Squirtle</p>
                </div>

                <div class="pokemon" data-name="Bulbasaur">
                    <img src="../images/bulbasaur.png" alt="" height="80px">
                    <p class="pokemon-name">Bulbasaur</p>
                </div>

                <div class="pokemon" data-name="Caterpie">
                    <img src="../images/caterpie.png" alt="" height="80px">
                    <p class="pokemon-name">Caterpie</p>
                </div>

                <div class="pokemon" data-name="Charmander">
                    <img class="plusHeight" src="../images/Charmander.svg" alt="" height="80px">
                    <p class="pokemon-name">Charmander</p>
                </div>

                <div class="pokemon" data-name="Pikachu">
                    <img class="plusHeight" src="../images/Pikachu.png" alt="" height="80px">
                    <p class="pokemon-name">Pikachu</p>
                </div>

                <div class="pokemon" data-name="Caterpie">
                    <img src="../images/caterpie.png" alt="" height="80px">
                    <p class="pokemon-name">Caterpie</p>
                </div>

                <div class="pokemon" data-name="Bulbasaur">
                    <img src="../images/bulbasaur.png" alt="" height="80px">
                    <p class="pokemon-name">Bulbasaur</p>
                </div>

                <div class="pokemon" data-name="Squirtle">
                    <img src="../images/Squirtle.svg" alt="" height="80px">
                    <p class="pokemon-name">Squirtle</p>
                </div>

                <div class="pokemon"  data-name="Charmander">
                    <img class="plusHeight" src="../images/Charmander.svg" alt="" height="80px">
                    <p class="pokemon-name">Charmander</p>
                </div>

                <div class="pokemon" data-name="Pikachu">
                    <img class="plusHeight" src="../images/Pikachu.png" alt="" height="80px">
                    <p class="pokemon-name">Pikachu</p>
                </div>

                <div class="pokemon"  data-name="Squirtle">
                    <img src="../images/Squirtle.svg" alt="" height="80px">
                    <p class="pokemon-name">Squirtle</p>
                </div>

                <div class="pokemon" data-name="Charmander">
                    <img class="plusHeight" src="../images/Charmander.svg" alt="" height="80px">
                    <p class="pokemon-name">Charmander</p>
                </div>

                <div class="pokemon" data-name="Bulbasaur">
                    <img src="../images/bulbasaur.png" alt="" height="80px">
                    <p class="pokemon-name">Bulbasaur</p>
                </div>

                <div class="pokemon"  data-name="Squirtle">
                    <img src="../images/Squirtle.svg" alt="" height="80px">
                    <p class="pokemon-name">Squirtle</p>
                </div>

                <div class="pokemon" data-name="Caterpie">
                    <img src="../images/caterpie.png" alt="" height="80px">
                    <p class="pokemon-name">Caterpie</p>
                </div>

                <div class="pokemon" data-name="Pikachu">
                    <img class="plusHeight" src="../images/Pikachu.png" alt="" height="80px">
                    <p class="pokemon-name">Pikachu</p>
                </div>

                <div class="pokemon"  data-name="Bulbasaur">
                    <img src="../images/bulbasaur.png" alt="" height="80px">
                    <p class="pokemon-name">Bulbasaur</p>
                </div>

                <div class="pokemon"  data-name="Charmander">
                    <img class="plusHeight" src="../images/Charmander.svg" alt="" height="80px">
                    <p class="pokemon-name">Charmander</p>
                </div>

                <div class="pokemon" data-name="Caterpie">
                    <img src="../images/caterpie.png" alt=""height="80px">
                    <p class="pokemon-name">Caterpie</p>
                </div>

                <div class="pokemon" data-name="Squirtle">
                    <img src="../images/Squirtle.svg" alt="" height="80px">
                    <p class="pokemon-name">Squirtle</p>
                </div>
            </div>

            <button class="load-pokemon-btn" id="more-pokemon">more Pokémon...</button>
        </section>
    </main>
</body>
<script src="../scripts/dashboard.js"></script>
</html>