//DEPENDENCIES
const routineButtons = document.querySelectorAll(".add-routine");
const setsInput = document.getElementById("sets-input");
const exerciseId = document.getElementById("exerciseId");

const addedExercises = [];

//DATA

//FUNCTIONS
const formSubmitHandler = function (event) {
  event.preventDefault();

  console.log(event.target.parentNode.children[0].children[1].value);
  //get name

  const weight = event.target.parentNode.children[0].children[1].value.trim();
  const sets = event.target.parentNode.children[1].children[1].value.trim();

  const exerciseId = event.target.parentNode.children[1].children[2].value;
  const name = event.target.parentNode.children[1].children[3].value;
  //add to array of added exercises
  addedExercises.push({ weight, sets, exerciseId, name });

  //make function for rendering exercises to the "routine"
  console.log(addedExercises);
};

//USER INTERACTIONS

//INITIALIZATIONS

for (let i = 0; i < routineButtons.length; i++) {
  const element = routineButtons[i];
  element.addEventListener("click", formSubmitHandler);
}
