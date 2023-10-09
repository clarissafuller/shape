//DEPENDENCIES
const setsInput = document.getElementById("sets-input");
const exerciseId = document.getElementById("exerciseId");
const searchButton = document.getElementById("search-button");
let exerciseButton = document.getElementsByClassName("add-exercise");
//sidebar
const sidebar = document.getElementById("routine-list");
const addButton = document.getElementById("add-routine");

//DATA
let addedExercises = [];
let exerciseNames = [];
//for rotuine id to be added to each exercise pushed
let id = 1;
//for weird default value not found bug for sequelize id
let sequelizeId = 1;
//FUNCTIONS
function getExercises() {
  const searchInput = document.getElementById("search-input").value.trim();
  const dropdownInput = document.getElementById("dropdown-input").value.trim();

  const preparedBody = {};
  if (searchInput.length) preparedBody.name = searchInput;
  if (dropdownInput.length) preparedBody.muscle = dropdownInput;

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
  let id = 0;
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
                data-bs-target="#collapse${id}"
                aria-expanded="true"
                aria-controls="collapse${id}"
              >
                Add to Routine
              </button>
            </h2>
            <div
              id="collapse${id}"
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
                  <input
                    type="hidden"
                    value="${exercise.instructions}"
                    id="exerciseName"
                    aria-label="exercise title"
                  />
                </div>
                <div class="input-group mb-3">
                  <span
                    class="input-group-text text-light bg-dark"
                    id="inputGroup-sizing-default weight-input"
                  ># of reps </span>
                  <input
                    type="text"
                    class="form-control bg-secondary"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
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
    //fixes problem of all dropdowns opening at the same time
    id++;
  }
  exerciseButton = document.getElementsByClassName("add-exercise");
  for (let i = 0; i < exerciseButton.length; i++) {
    const element = exerciseButton[i];
    element.addEventListener("click", addExercise);
  }
}

const addExercise = function (event) {
  event.preventDefault();
  console.log(event);

  //target and trim input data
  const weight = event.target.parentNode.children[0].children[1].value.trim();
  console.log(weight);
  const sets = event.target.parentNode.children[1].children[1].value.trim();
  const reps = event.target.parentNode.children[2].children[1].value.trim();
  const target =
    event.target.parentNode.parentNode.parentNode.parentNode.parentNode
      .children[1].innerHTML;

  //get exercise ID and name and instructions
  const exerciseId = event.target.parentNode.children[1].children[2].value;
  const name = event.target.parentNode.children[1].children[3].value;
  const instructions = event.target.parentNode.children[1].children[4].value;
  console.log(instructions);

  //add to array of added exercises with routine id
  addedExercises.push({
    routine_id: id.toString(),
    weight: weight,
    sets: sets,
    reps: reps,
    target: target,
    instructions: instructions,
    name: name,
  });
  const currentExercise = {
    weight,
    sets,
    reps,
    target,
    instructions,
    exerciseId,
    name,
  };

  // function to render added exercise to sidebar
  const addToRoutine = (currentExercise) => {
    const exerciseCards = [];

    const exerciseName = currentExercise.name;
    const exerciseWeight = currentExercise.weight;
    const exerciseSets = currentExercise.sets;
    const exerciseTarget = currentExercise.target;
    const exerciseReps = currentExercise.reps;

    const cardContent = `
    <div class="d-flex flex-column justify-content-center bg-dark border border-tertiary-subtle rounded-3 my-2">
      <h3 class="text-light text-center mt-2 exercise-name">${exerciseName}</h3>
      <p class="text-light text-center">${exerciseTarget}</p>
      <div class="d-flex justify-content-center">
        <div class="input-group my-2 self-align-center" style="width: 75%;">
          <span
            class="input-group-text text-light bg-dark">
            Weight in lbs: </span>
            <p class="form-control bg-secondary sidebar-p" id="weight-input"> ${exerciseWeight} </p>
        </div>
      </div>
      <div class="d-flex justify-content-center">
        <div class="input-group my-2 self-align-center" style="width: 75%;">
          <span
            class="input-group-text text-light bg-dark">
            Sets: </span>
            <p class="form-control bg-secondary sidebar-p" id="sets-input"> ${exerciseSets} </p>
        </div>
      </div>
      <div class="d-flex justify-content-center">
        <div class="input-group my-2 mb-4 self-align-center" style="width: 75%;">
          <span
            class="input-group-text text-light bg-dark">
            Reps: </span>
            <p class="form-control bg-secondary sidebar-p" id="reps-input"> ${exerciseReps} </p>
        </div>
      </div>
    </div>`;

    exerciseCards.push(cardContent);

    for (const obj of exerciseCards) {
      const card = document.createElement("div");
      card.innerHTML = obj;
      sidebar.appendChild(card);
      exerciseNames.push(target.slice(11));
    }
  };
  addToRoutine(currentExercise);
};

const getExercise = async (exercise) => {
  console.log(exercise);
  try {
    const response = await fetch("/api/exercises/searchname", {
      method: "POST",
      body: JSON.stringify({ name: exercise }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
      alert("New routine created!");
    } else {
      alert("Incorrect inputs, try again.");
    }
  } catch (err) {
    console.log(err);
  }
};

const submitNewRoutine = async (event) => {
  event.preventDefault();

  const routineName = document.getElementById("routine-name").value.trim();
  const routineDate = document.getElementById("routine-date").value.trim();
  const routineStartTime = document.getElementById("start-time").value.trim();
  const routineEndTime = document.getElementById("end-time").value.trim();

  //add exercises from array to database with corresponding routine_id

  for (const obj of addedExercises) {
    try {
      const response = await fetch("/api/exercises/add", {
        method: "POST",
        body: JSON.stringify(obj),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        alert("New exercise added!");
      } else {
        alert("Incorrect inputs, try again.");
      }
    } catch (err) {
      alert(err);
    }
  }

  //get routine name
  const body = {
    routine_id: id,
    name: routineName,
    start_date: routineDate,
    start_time: routineStartTime,
    end_time: routineEndTime,
  };

  console.log(exerciseNames);
  console.log(body);

  try {
    const response = await fetch("/api/routines/addroutine", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      console.log(addedExercises);
      alert("New routine created!");
    } else {
      alert("Incorrect inputs, try again.");
    }
  } catch (err) {
    alert(err);
  }

  //reset list for next routine submit
  exerciseNames = [];
  //add 1 to id, so that the next routine will have a different id, as well as the correllated exercises
  id++;
};

//USER INTERACTIONS
searchButton.addEventListener("click", getExercises);

for (let i = 0; i < exerciseButton.length; i++) {
  const element = exerciseButton[i];
  element.addEventListener("click", addExercise);
}

addButton.addEventListener("click", submitNewRoutine);
