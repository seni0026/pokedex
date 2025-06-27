# mtm6302-capstone-seni0026
Name: Kevon Senior
Student #: 041124394
Project: Building a Pokedex for a capstone project

# Generate sign up form HTML with Js
Instead of creating another HTML page for the website to load, I have generated and change the inner HTML of the login form using JavaScript. This way the website has one less page to load which increases its efficiency.

# Problem when generating the HTML for the sign up form
When generating the HTML for the sign up form, I noticed when the sign up link was clicked, the HTML generated onto the page then quickly disappeared. After taking a step back and analyzed what was happening, when the link was clicked, even though there wasn't any web address to be directed to, it resorted to its default behavior which is to direct the user to another site. 
# Solution
By using preventDefault() which professor Adam Jarvis taught about in class, I was able to stop the link from resorting to its natural behavior.

# Create a Pokedex database
To make users be able to login and out of their pokedex account, I created a database to store users login credentials using phpMyAdmin and the MAMP server.
Since I didn't know much about database and using PHP to log users in and out of a 'session', I watched this tutorial to better understand the process and created the pokedex database.
# Tutorial Link
https://www.youtube.com/watch?v=LiomRvK7AM8

# Problem when connecting to the database
After creating the database and submitting a form, I kept getting a 405 error, which upon research I understand that the server could not connect to the database because the PHP file was not found (even though the file was there).
After sleepless nights and dreadful panic attacks researching, trying to debug (more like a few hours, realistically speaking 🤣😅) I realized that because I was opening the index.html file via VScode live extension, the PHP file was not being interpreted when the form was submitted (stupid me 😢🤦🏽‍♂️).
# Solution
Instead of VScode live serve, I accessed the file through the MAMP server which was able to interpret the PHP file and connect to the database.