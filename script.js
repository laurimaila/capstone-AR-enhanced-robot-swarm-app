const video = document.getElementById('video');

navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(error => {
        console.log('Error accessing webcam:', error);
    });


// Get the toggle button and card element

const robot1Btn = document.getElementById("robot1-btn");
const robot2Btn = document.getElementById("robot2-btn");

const card1 = document.querySelector(".card1");
const card2 = document.querySelector(".card2");



// Add event listener to toggle button
robot1Btn.addEventListener("click", function() {
  // Toggle the display of the card
  if (card1.style.display === "none") {
    card1.style.display = "block";
  } else {
    card1.style.display = "none";
  }
});

// Function to update the values in the table
function updateValues1() {
  // Generate random values for x and y
  var x_robot1 = Math.floor(Math.random() * 100) + 1;
  var y_robot1 = Math.floor(Math.random() * 100) + 1;
  var name_robot1 = "Robot 1";
  var battery_robot1 = 100 + "%"
    

  // Update the values displayed on the page
  document.getElementById("x-value1").textContent = x_robot1;
  document.getElementById("name1").textContent = name_robot1;
  document.getElementById("y-value1").textContent = y_robot1;
  document.getElementById("Battery1").textContent = battery_robot1;
}

// Update the values every second
setInterval(updateValues1, 1000);


// Add event listener to toggle button
robot2Btn.addEventListener("click", function() {
    // Toggle the display of the card
    if (card2.style.display === "none") {
      card2.style.display = "block";
    } else {
      card2.style.display = "none";
    }
  });

  // Function to update the values in the table
function updateValues2() {
    // Generate random values for x and y
    var x_robot2 = Math.floor(Math.random() * 100) + 1;
    var y_robot2 = Math.floor(Math.random() * 100) + 1;
    var name_robot2 = "Robot 2";
    var battery_robot2 = 100 + "%"
      
  
    // Update the values displayed on the page
    document.getElementById("x-value2").textContent = x_robot2;
    document.getElementById("name2").textContent = name_robot2;
    document.getElementById("y-value2").textContent = y_robot2;
    document.getElementById("Battery2").textContent = battery_robot2;
  }

// Update the values every second
setInterval(updateValues2, 1000);


  



