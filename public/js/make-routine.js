//DEPENDENCIES
const routineButtons = document.querySelectorAll(".add-routine");
const setsInput = document.getElementById("sets-input");
const exerciseId = document.getElementById("exerciseId");

//DATA
const addedExercises = [];



//FUNCTIONS
const formSubmitHandler = function (event) {
  event.preventDefault();

  //testing how to get data from input
//   console.log(event.target.parentNode.children[0].children[1].value);
  
//target and trim input data 
  const weight = event.target.parentNode.children[0].children[1].value.trim();
  const sets = event.target.parentNode.children[1].children[1].value.trim();

  //get exercise ID and name 
  const exerciseId = event.target.parentNode.children[1].children[2].value;
  const name = event.target.parentNode.children[1].children[3].value;

  //add to array of added exercises
  addedExercises.push({ weight, sets, exerciseId, name });
  console.log(addedExercises);


//function to render added exercise to sidebar
// const addToRoutine = (addedExercises) => {

// addedExercises.forEach(function (exercises) {

// const exerciseName = exercises.name
// const exerciseWeight = exercises.weight
// const exerciseSets = exercises.sets

// const cardContent = `<div class="card-body">
// <h3 class="card-title text-center">${exerciseName}</h3>
// <p text-center>${exerciseWeight}, ${exerciseSets}</p>
// </div>`
// //meh????
// })
    
};


  
//USER INTERACTIONS

//INITIALIZATIONS

for (let i = 0; i < routineButtons.length; i++) {
  const element = routineButtons[i];
  element.addEventListener("click", formSubmitHandler);
}
