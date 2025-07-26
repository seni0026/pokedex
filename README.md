# mtm6302-capstone-seni0026
Name: Kevon Senior
Student #: 041124394
Project: Building a Pokédex for a capstone project

# Generate sign up form HTML with Js
Instead of creating another HTML page for the website to load, I have generated and change the inner HTML of the login form using JavaScript. This way the website has one less page to load which increases its efficiency.

# Problem when generating the HTML for the sign up form
When generating the HTML for the sign up form, I noticed when the sign up link was clicked, the HTML generated onto the page then quickly disappeared. After taking a step back and analyzed what was happening, when the link was clicked, even though there wasn't any web address to be directed to, it resorted to its default behavior which is to direct the user to another site. 
# Solution
By using preventDefault() which professor Adam Jarvis taught about in class, I was able to stop the link from resorting to its natural behavior.

# Create a Pokédex database
To make users be able to login and out of their pokédex account, I created a database to store users login credentials using phpMyAdmin and the MAMP server.
Since I didn't know much about database and using PHP to log users in and out of a 'session', I watched this tutorial to better understand the process and created the pokédex database.
# Tutorial Link
https://www.youtube.com/watch?v=LiomRvK7AM8

# Problem when connecting to the database
After creating the database and submitting a form, I kept getting a 405 error, which upon research I understand that the server could not connect to the database because the PHP file was not found (even though the file was there).
After sleepless nights and dreadful panic attacks researching, trying to debug (more like a few hours, realistically speaking 🤣😅) I realized that because I was opening the index.html file via VScode live extension, the PHP file was not being interpreted when the form was submitted (stupid me 😢🤦🏽‍♂️).
# Solution
Instead of VScode live serve, I accessed the file through the MAMP server which was able to interpret the PHP file and connect to the database.

# Problem when showing the large Pokémon image 
Upon changing the large pokémon image dynamically, I used the variable from the forEach() that holds the current pokémon the user clicked on as an argument to the function that generates the html for the large pokémon. However, I noticed it return the text 'object HTMLDivElement'. Seems like it was returning the actual div element instead of the image like what was expecting.
# Solution
I watched this youTube tutorial and realized that I needed to target the innerHTML of that div to get the image.
# Tutorial Link
https://www.youtube.com/watch?v=e7nXia_tZ4Y&t=88s

# Problem when retrieving the Pokémon name via the data- attribute
The idea I had was to display each pokemon name on the overlay for the large Pokémon display.In order to do this, I used the data- attribute to attach the name to each Pokémon image in the HTML. However, I later found out that I went about it incorrectly, because when I tried to retrieve the name in Js, I kept getting an empty DOM object in the console. Which basically means the data- attribute was not returning the Pokémon name as I intended.
# Solution
I stumbled upon this video as I did further research on the data- attribute, to see if I was applying it correctly. After watching the video, it dawned on me to attach the Pokémon name via the data- attribute to the div that holds the Pokémon image, instead of the actual image since the the Js function I was using to get the images was returning the entire div + content.
# Tutorial Link
https://www.youtube.com/watch?v=XtEs0SZ_4Y0

# Problem when making the first API call with the PokeApi
It seems so easy in class when learning how to fetch data with APIs, but to my surprise when I first made that call with the PokeApi and receive the data, I was a bit confused as to have I am going get the information that I need. It seems overwhelming looking at all that data, ie; an array of objects that contain other objects with objects inside. 
# Solution
When I fetched the first 20 Pokémon, I got an array of objects (results) with the Pokémon name and url for each Pokémon. To get the sprites, I used a for loop to loop through the array (i noticed the array has an index of 0-19) and get the name value from the object at the n-th position in the array. I stored the name inside a variable then fetch the data for that Pokémon by inserting that variable into the url. With the returned data I was able to access the sprites object for that Pokémon.