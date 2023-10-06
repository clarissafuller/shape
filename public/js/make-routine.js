//DEPENDENCIES
const setsInput = document.getElementById("sets-input");
const exerciseId = document.getElementById("exerciseId");
// const exerciseButton = document.querySelectorAll(".add-exercise");
const searchButton = document.getElementById("search-button");
const exerciseButton = document.getElementById("add-exercise");

//DATA
const addedExercises = [];

//FUNCTIONS
function getExercises() {
  const searchInput = document.getElementById("search-input").value.trim();
  const dropdownInput = document.getElementById("dropdown-input").value.trim();

  const preparedBody = {};
  if (searchInput.length) preparedBody.name = searchInput;
  if (dropdownInput.length) preparedBody.muscle = dropdownInput;

  console.log(preparedBody);

  fetch("/api/exercises/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(preparedBody),
  })
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        console.error("OMDB Error: " + response.statusText);
        return null;
      }
    })
    .then((data) => loadExercises(data));
}

function loadExercises(data) {
  const container = document.getElementById("exercises-container");
  container.innerHTML = "";
  console.log(data);
  for (const exercise of data) {
    container.innerHTML += `<div class="m-1">
    <div
      class="card text-light bg-dark border border-tertiary-subtle rounded-3"
      style="width: 18rem;"
    >
      <div class="card-body">
        <h3 class="card-title text-center">${exercise.name}</h3>
        <p class="card-text text-center">targeting: ${exercise.muscle}</p>
        <div class="accordion" id="accordionAddRoutine">
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button text-light bg-dark text-center"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapse0"
                aria-expanded="true"
                aria-controls="collapse0"
              >
                Add to Routine
              </button>
            </h2>
            <div
              id="collapse0"
              class="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div
                class="accordion-body text-secondary-emphasis bg-dark-subtle border border-tertiary-subtle"
              >
                <div class="input-group mb-3">
                  <span
                    class="input-group-text text-light bg-dark"
                    id="inputGroup-sizing-default weight-input"
                  >Weight in lbs </span>
                  <input
                    type="text"
                    class="form-control bg-secondary"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                  />
                </div>
                <div class="input-group mb-3">
                  <span
                    class="input-group-text text-light bg-dark"
                    id="inputGroup-sizing-default sets-input"
                  ># of Sets</span>
                  <input
                    type="text"
                    class="form-control bg-secondary"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                  />
                  <input
                    type="hidden"
                    value="0"
                    id="exerciseId"
                    aria-label="id"
                  />
                  <input
                    type="hidden"
                    value="${exercise.name}"
                    id="exerciseName"
                    aria-label="exercise title"
                  />
                </div>
                <a href="#" class="btn btn-dark add-exercise">add to routine</a>
  
              </div>
            </div>
          </div>
  
        </div>
  
      </div>
    </div>
  
  </div>`;
  }
}

const addExercise = function (event) {
  event.preventDefault();
  console.log("its working");
  //testing how to get data from input
  //   console.log(event.target.parentNode.children[0].children[1].value);

  //target and trim input data
  const weight = event.target.parentNode.children[0].children[1].value.trim();
  console.log(weight);
  const sets = event.target.parentNode.children[1].children[1].value.trim();

  //get exercise ID and name
  const exerciseId = event.target.parentNode.children[1].children[2].value;
  const name = event.target.parentNode.children[1].children[3].value;

  //add to array of added exercises
  addedExercises.push({ weight, sets, exerciseId, name });
  console.log(addedExercises);

  // function to render added exercise to sidebar
  const addToRoutine = (addedExercises) => {
    const exerciseCards = addedExercises.forEach(function (exercises) {
      const exerciseName = exercises.name;
      const exerciseWeight = exercises.weight;
      const exerciseSets = exercises.sets;

      const cardContent = `<div class="card-body">
  <h3 class="card-title text-center">${exerciseName}</h3>
  <p text-center>${exerciseWeight}, ${exerciseSets}</p>
  </div>`;
      //meh????
      return cardContent;
    });
  };
};

//USER INTERACTIONS
searchButton.addEventListener("click", getExercises);

exerciseButton.addEventListener("click", console.log("blahhh"));
// for (let i = 0; i < exerciseButton.length; i++) {
//   const element = exerciseButton[i];
//   element.addEventListener("click", console.log("its working"), addExercise);
// }
