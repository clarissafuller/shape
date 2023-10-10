//DEPENDENCIES
const setsInput = document.getElementById("sets-input");
const exerciseId = document.getElementById("exerciseId");
const searchButton = document.getElementById("search-button");
let exerciseButton = document.getElementsByClassName("add-exercise");
const updateNameButton = document.getElementById("update-name-button");
const updateDayButton = document.getElementById("update-day-button");
const addRoutineButton = document.getElementById("add-routine-button");

//sidebar
const sidebar = document.getElementById("routine-list");

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
        console.error(response.statusText);
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
                    value="${exercise.id}"
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
  //testing how to get data from input
  //   console.log(event.target.parentNode.children[0].children[1].value);

  //target and trim input data
  const weight = event.target.parentNode.children[0].children[1].value.trim();
  console.log(weight);
  const sets = event.target.parentNode.children[1].children[1].value.trim();
  const reps = event.target.parentNode.children[2].children[1].value.trim();
  const target =
    event.target.parentNode.parentNode.parentNode.parentNode.parentNode
      .children[1].innerHTML;
  const routineId = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  //get exercise ID and name
  const exerciseId = event.target.parentNode.children[1].children[2].value;
  const name = event.target.parentNode.children[1].children[3].value;

  //add to array of added exercises
  addedExercises.push({
    weight,
    sets,
    reps,
    target,
    exerciseId,
    name,
    routineId,
  });
  const currentExercise = {
    weight,
    sets,
    reps,
    target,
    exerciseId,
    name,
    routineId,
  };
  console.log(addedExercises);

  // function to render added exercise to sidebar
  const addToRoutine = (currentExercise) => {
    const exerciseCards = [];

    const exerciseName = currentExercise.name;
    const exerciseWeight = currentExercise.weight;
    const exerciseSets = currentExercise.sets;
    const exerciseTarget = currentExercise.target;
    const exerciseReps = currentExercise.reps;
    // const windowId = currentExercise.routineId;

    const cardContent = `
    <div class="d-flex flex-column justify-content-center bg-dark border border-tertiary-subtle rounded-3 my-2">
      <h3 class="text-light text-center mt-2">${exerciseName}</h3>
      <p class="text-light text-center">${exerciseTarget}</p>
      <div class="d-flex justify-content-center">
        <div class="input-group my-2 self-align-center" style="width: 75%;">
          <span
            class="input-group-text text-light bg-dark">
            Weight in lbs: </span>
            <p class="form-control bg-secondary" id="sidebar-p"> ${exerciseWeight} </p>
        </div>
      </div>
      <div class="d-flex justify-content-center">
        <div class="input-group my-2 self-align-center" style="width: 75%;">
          <span
            class="input-group-text text-light bg-dark">
            Sets: </span>
            <p class="form-control bg-secondary" id="sidebar-p"> ${exerciseSets} </p>
        </div>
      </div>
      <div class="d-flex justify-content-center">
        <div class="input-group my-2 mb-4 self-align-center" style="width: 75%;">
          <span
            class="input-group-text text-light bg-dark">
            Reps: </span>
            <p class="form-control bg-secondary" id="sidebar-p"> ${exerciseReps} </p>
        </div>
      </div>
    </div>`;
    //meh????
    exerciseCards.push(cardContent);

    for (const obj of exerciseCards) {
      const card = document.createElement("div");
      card.innerHTML = obj;
      sidebar.appendChild(card);
    }
  };
  addToRoutine(currentExercise);
};

//function to take new form input data and add to routine via PUT route

const updateRoutineName = async function (event) {
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  event.preventDefault();
  console.log(event);
  const newNameInput = document.getElementById("name-input").value.trim();

  await fetch(`/api/routines/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: newNameInput }),
  })
    .then(function (response) {
      if (response.ok) {
        console.log("added to the data base!", newNameInput);

        return response.json();
      } else {
        console.error(response.statusText);
        return null;
      }
    })
    .then(
      (data) =>
        (document.querySelector(
          "#new-name"
        ).innerHTML = `successfully renamed to: ${data.name}`)
    );
};

//function to update day of week

const updateRoutineDay = async function (event) {
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  event.preventDefault();
  console.log(event);
  const newDayInput = document.getElementById("dropdown-day-input").value;

  await fetch(`/api/routines/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ day_of_week: newDayInput }),
  }).then(function (response) {
    if (response.ok) {
      console.log("added to the data base!", newDayInput);
      return response.json();
    } else {
      console.error(response.statusText);
      return null;
    }
  });
  // .then((data) => document.querySelector("#new-name").innerHTML = `successfully renamed to: ${data.name}` );
};

const addRoutinetodb = async function (event) {
  for (const obj of addedExercises) {
    try {
      const response = await fetch("/api/routineExercises", {
        method: "POST",
        body: JSON.stringify(obj),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        alert("New routine-exercise added!");
      } else {
        alert("Incorrect inputs, try again.");
      }
    } catch (err) {
      alert(err);
    }
  }
};

//   fetch("/api/exercises/search", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(preparedBody),
//   })
//     .then(function (response) {
//       if (response.ok) {
//         return response.json();
//       } else {
//         console.error(response.statusText);
//         return null;
//       }
//     })
//     .then((data) => loadExercises(data));

//USER INTERACTIONS
searchButton.addEventListener("click", getExercises);
updateNameButton.addEventListener("click", updateRoutineName);
updateDayButton.addEventListener("click", updateRoutineDay);
addRoutineButton.addEventListener("click", addRoutinetodb);

// exerciseButton.addEventListener("click", addExercise);

for (let i = 0; i < exerciseButton.length; i++) {
  const element = exerciseButton[i];
  element.addEventListener("click", addExercise);
}
