// This calculates the BMR, BMI and provides recommendations

var bmr = 0;
var bmi = 0;
var targetBMR = 0;
var activityFactor = 0;

var calcBtn = document.getElementById('calculateBtn')
calcBtn.addEventListener('click', bmrbmicalc)

function bmrbmicalc() {
  var weight = Number(document.getElementById("weight").value);
  var height = Number(document.getElementById("height").value);
  var age = Number(document.getElementById("age").value);
  var gender = document.getElementById("gender").value;
  activityFactor = Number(document.getElementById("activity").value);
  var goal = document.getElementById("goal").value;
  if (gender === 'male') {
    bmr = 66.5 + (13.75 * weight) + (5.003 * height) - (6.75 * age);
  } else if (gender === 'female') {
    bmr = 655.1 + (9.563 * weight) + (1.850 * height) - (4.676 * age);
  } else {
    document.getElementById("result").innerHTML = "Please select your gender.";
    return;
  }
  bmi = weight / (height ** 2);
  var weightStatus = "";
  if (bmi < 18.5) {
      weightStatus = "underweight";
  } else if (bmi >= 18.5 && bmi < 24.9) {
      weightStatus = "normal";
  } else {
      weightStatus = "overweight";
  }
  if (goal === 'burnfat') {
    targetBMR = bmr - 0.2 * bmr;
  } else if (goal === 'tone') {
    targetBMR = bmr;
  } else if (goal === 'strengthtrain') {
    targetBMR = bmr + 0.2 * bmr;
  } else {
    document.getElementById("result").innerHTML = "Please select your fitness goal.";
    return;
  }
  var recommendedCalories = targetBMR * activityFactor;
  var resultString = `Your BMR is ${bmr.toFixed(2)} calories per day.<br>
  Your BMI is ${bmi.toFixed(2)} (${weightStatus}).<br>Recommended daily calorie intake: ${recommendedCalories.toFixed(2)} calories.<br>`;
  document.getElementById("result2").innerHTML = resultString;
  displayFoodRecommendations(goal);
}

var fitnessGoal = document.getElementById('goal');
var activityFactor = Number(document.getElementById("activity").value);

fitnessGoal.addEventListener('change', function(){
  var goal = fitnessGoal.value;
  
  // Update targetBMR based on user's fitness goal selection
  if (goal === 'burnfat') {
    targetBMR = bmr - 0.2 * bmr;
  } else if (goal === 'tone') {
    targetBMR = bmr;
  } else if (goal === 'strengthtrain') {
    targetBMR = bmr + 0.2 * bmr;
  } else {
    document.getElementById("result").innerHTML = "Please select your fitness goal.";
    return;
  }
  
  // Update recommended calorie intake based on the new targetBMR value
  var recommendedCalories = targetBMR * activityFactor;
  
  // Update result string with new recommended calorie intake value
  var weightStatus = "";
  if (bmi < 18.5) {
      weightStatus = "underweight";
  } else if (bmi >= 18.5 && bmi < 24.9) {
      weightStatus = "normal";
  } else {
      weightStatus = "overweight";
  }
  var resultString = `Your BMR is ${bmr.toFixed(2)} calories per day.<br>
  Your BMI is ${bmi.toFixed(2)} (${weightStatus}).<br>Recommended daily calorie intake: ${recommendedCalories.toFixed(2)} calories.<br>`;
  document.getElementById("result2").innerHTML = resultString;
  displayFoodRecommendations(goal);
});



//END OF MIKE'S WORK SECTION
// 3pm 3/26/2023: HAROLD WORK ON LINES 65 (STARTING WITH FUNCTION DISPLAY FOOD RECOMMENDATIONS)
//START OF HAROLD'S SECTION
function displayFoodRecommendations(goal) {
  let foodRecommendations = `<p>Here are some food recommendations based on your fitness goal:</p>`;
  if (goal === "burnfat") {
      foodRecommendations = `
          <h3>Burn Fat:</h3>
          <ul>
              <li>Lean protein sources (e.g., chicken, turkey, fish, beans, tofu)</li>
              <li>Fiber-rich foods (e.g., vegetables, fruits, whole grains, legumes)</li>
              <li>Healthy fats (e.g., nuts, seeds, avocado, olive oil)</li>
              <li>Low-sugar and low-calorie foods</li>
              <li>Drink plenty of water to stay hydrated</li>
          </ul>
      `;
  } else if (goal === "tone") {
      foodRecommendations = `
          <h3>Tone:</h3>
          <ul>
              <li>Protein-rich foods (e.g., chicken, turkey, fish, beans, tofu, Greek yogurt)</li>
              <li>Complex carbohydrates (e.g., whole grains like brown rice, quinoa, whole wheat bread)</li>
              <li>Fiber-rich foods (e.g., vegetables, fruits, legumes)</li>
              <li>Healthy fats (e.g., nuts, seeds, avocado, olive oil)</li>
              <li>Stay hydrated by drinking plenty of water throughout the day</li>
          </ul>
      `;
  } else if (goal === "strengthtrain") {
      foodRecommendations = `
          <h3>Strength Train:</h3>
          <ul>
              <li>Protein-rich foods (e.g., chicken, turkey, fish, beans, tofu, Greek yogurt) to support muscle growth and repair.</li>
              <li>Complex carbohydrates (e.g., whole grains like brown rice, quinoa, whole wheat bread) for sustained energy during workouts.</li>
              <li>Healthy fats (e.g., nuts, seeds, avocado, olive oil) to support hormone production and provide energy for workouts.</li>
              <li>Fiber-rich foods (e.g., vegetables, fruits, legumes) to support digestion and keep you feeling full.</li>
              <li>Stay hydrated by drinking plenty of water throughout the day, especially before, during, and after workouts.</li>
          </ul>
      `;
  } else {
      document.getElementById("result").innerHTML = "<p>Please select a fitness goal.</p>";
      return;
  }
  document.getElementById("result").innerHTML = foodRecommendations;
}

//END OF HAROLD'S WORK SECTION
//START OF SHABAB'S WORK SECTION

//possible duplicate (extra console log)
var appedaKey = '96c9812e34d70f8817c3c0855d4ebb4a';
var appeda_Id = 'a230f40d';
var ingredients = document.getElementById("ingredient");
var searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener('click', getResults);
// searchBtn.addEventListener('click', addToTotalCard)
function getResults() {
  //sample fetch request
  fetch('https://api.edamam.com/api/food-database/v2/parser?app_id=' + appeda_Id + '&app_key=' + appedaKey + '&ingr=' + searchInput.value, {
    method: 'GET', //GET is the default.
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data.calories); //console logging accessing calories from data response
      console.log(data.totalNutrientsKCal);
    });
}
//Created by mNova
var appedaKey = '96c9812e34d70f8817c3c0855d4ebb4a';
var appeda_Id = 'a230f40d';
var searchInput = document.getElementById("searchInput");
var searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener('click', getEdamamResults);
let energyCals = 0;
let proteinCals = 0;
let carbCals = 0;
let fatCals = 0;
let meal = []

//created by Harold
let totalEnergyCal=0;
let totalproteinCals=0;
let totalcarbCals=0;
let totalfatCals=0;
function getEdamamResults() {
fetch('https://api.edamam.com/api/food-database/v2/parser?app_id=' + appeda_Id + '&app_key=' + appedaKey + '&ingr=' + searchInput.value, {
  method: 'GET', //GET is the default.
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    console.log(data.parsed[0].food.nutrients);
    energyCals = data.parsed[0].food.nutrients.ENERC_KCAL;
    proteinCals = data.parsed[0].food.nutrients.PROCNT;
    carbCals = data.parsed[0].food.nutrients.FAT;
    fatCals = data.parsed[0].food.nutrients.PROCNT;
    var item = {
      food: data.text,
      energy: energyCals,
      protein: proteinCals,
      carbs: carbCals,
      fat: fatCals
    }
  console.log(energyCals,proteinCals,carbCals,fatCals)
  meal.push(item)
  console.log(meal)
  sumArray(meal)
    displayInfoResults(energyCals, proteinCals, carbCals, fatCals)
  });
}

// //added by Harold. This will total the Calories 3/25
// function addToTotalCard(){
//   console.log("Inside addtoTotalCard");
//   var divTotal = document.getElementById('totalCal');
//  //created by Harold
//  totalEnergyCal = totalEnergyCal + energyCals[i];
//  totalproteinCals =  totalproteinCals + proteinCals[i];
//  totalcarbCals = totalcarbCals + carbCals[i];
//  totalfatCals =   totalfatCals + fatCals[i];
// totalEverything = [carbCals, fatCals, proteinCals]
// sumArray(totalEverything)
// //added the total calories inside the function by harold 3/25
//  divTotal.innerHTML = `
//  <p>Total Energy Calories: ${totalEnergyCal}</p>
//  <p>Total Protein Calories: ${ totalproteinCals}</p>
//  <p>Total Carb Calories: ${ totalcarbCals}</p>
//  <p>Total Fat Calories: ${ totalfatCals }</p>`
//  console.log(divTotal);
// ;
// }


// by michael
function sumArray(meal) {
  let sum = 0; // the sum is initialized to 0
  for (let i = 0; i < meal.length; i++) {
    // take every item in the array and add it to sum variable
    sum += meal[i].energy;
    console.log(sum);
  }
  
  var totalSum = document.getElementById('totalSum');
  totalSum.innerHTML = "Your total Food energy calories: " + sum;
  
  // Storing it to local Storage
  localStorage.setItem('Meals', JSON.stringify(meal)); // save the sum into local storage
}
var storedSum = localStorage.getItem('Meals'); // retrieve the sum from local storage
console.log(storedSum); // log the retrieved sum to the console

function displayInfoResults(energyCals, proteinCals, carbCals, fatCals) {
  
  //added  by Harold.  <h2>${searchInput.value}</h2> and <button type="button" id="addFood">Add</button>  
  var divResults = document.getElementById('meal')
  console.log(divResults);
  divResults.innerHTML += `
  <h2>${searchInput.value}</h2>
  <p>Energy Calories: ${energyCals}</p>
  <p>Protein Calories: ${proteinCals}</p>
  <p>Carb Calories: ${carbCals}</p>
  <p>Fat Calories: ${fatCals}</p>
`;

//Added by mike to display total calories of search query food
/*
function displayFoodTotalCaloriesOnly(energyCals, proteinCals, carbCals, fatCals) {

  var totalCals = document.getElementById('resultsArray')
  console.log(totalCals);
  totalCals.innerHTML = `
  <h2>${searchInput.value}</h2>
  <p>Total Calories: ${energyCals + proteinCals + carbCals + fatCals }</p>
  <button type="button" id="addFood">Add</button> 
`;
*/
//added by Harold. This is to add the selected search food to the today calories
// var addFoodEl = document.querySelector(".addFood");
// addFoodEl.addEventListener("click", addToTotalCard)

//  var divTotal = document.getElementById('totalCal');
//  //created by Harold
//  totalEnergyCal = totalEnergyCal + energyCals;
//  totalproteinCals =  totalproteinCals + proteinCals;
//  totalcarbCals = totalcarbCals + carbCals;
//  totalfatCals =   totalfatCals + fatCals;
//  divTotal.innerHTML = `
//  <p>Total Energy Calories: ${totalEnergyCal}</p>
//  <p>Total Protein Calories: ${ totalproteinCals}</p>
//  <p>Total Carb Calories: ${ totalcarbCals}</p>
//  <p>Total Fat Calories: ${ totalfatCals }</p>`
;
}

//created by Harold. Clear button
var clearBtn = document.getElementById('clearBtn');
function clearResults() {
    var divResults = document.getElementById('meal');
    divResults.innerHTML = '';
    var divTotal = document.getElementById('totalCal');
    divTotal.innerHTML = '';
    totalEnergyCal = 0;
    totalproteinCals =  0;
    totalcarbCals = 0;
    totalfatCals =0 ;
}


clearBtn.addEventListener('click', clearResults);

// To set object into local storage (mike 3.26 1:45pm)
// resultsArray = {}
// var entryLogLocalStorage = JSON.stringify(resultsArray);
// localStorage.setItem('testJSON', entryLogLocalStorage);
// console.log(userStringFromLocalStorage);
// // To retrieve object from local storage (mike 3.26 1:44pm)
// var entryLogLocalStorage = localStorage.getItem('testJSON');
// let obj = JSON.parse(text);
// document.getElementById("localStorageResults").innerHTML = obj.calories;
// console.log(userStringFromLocalStorage);
// // Outputs the user as an object to the console



  //created by aarellano
var searchInput = document.getElementById('searchInput')
var searchBtn = document.getElementById('searchBtn')
var searchResult = document.getElementById('searchResult')
searchBtn.addEventListener('click', getNutrixResults, displayInfoResults)
function getNutrixResults() {
  var apiKey = '6b6d64cee3b28347ac2bcf9249459402';
  var appId = '494da15a';
  var query = searchInput.value
  fetch(`https://trackapi.nutritionix.com/v2/search/instant?query=${query}`, {
    method: 'GET',
    headers: {
      'x-app-id': appId,
      'x-app-key': apiKey,
      'x-remote-user-id': '0',
    },
  })
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    // Do something with the returned data
    foodName = data.common[0].food_name
    image = data.common[0].photo.thumb
    displayNutrix(image, foodName)
  })
  .catch((error) => {
    console.error(error);
  });
}

function displayNutrix(image, foodName, meal) {
  var column1 = `<p>Food Name: ${foodName}</p>
                 <img src="${image}">`;
  var column2 = "";
  if (meal) {
    column2 = `<p>Search Results:</p>
               <ul>`;
    for (var i = 0; i < meal.length; i++) {
      column2 += `<li>${meal[i]}</li>`;
    }
    column2 += `</ul>`;
  }
  var newCard = document.createElement("div");
  newCard.className = "row";
  newCard.innerHTML = `<div class="col-md-6">${column1}</div>
                        <div class="col-md-6">${column2}</div>`;
  var searchResult = document.getElementById("searchResult");
  searchResult.appendChild(newCard);
}




// Get the modal
var modal = document.getElementById("exampleModalCenter");

// Get the button that opens the modal
var btn = document.querySelector("[data-target='#exampleModalCenter']");

// Get the <span> element that closes the modal
var span = document.querySelector("#exampleModalCenter .close");

// When the user clicks the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}