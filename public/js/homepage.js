const navCreateButton = document.getElementById("nav-create-button");
const createButton = document.getElementById("create-workout-button");

function createNewRoutine() {
  fetch("/api/routines", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (response) {
      if (response.ok) {
        return response.json();
        //
      } else {
        console.error("OMDB Error: " + response.statusText);
        return null;
      }
    })
    .then((data) => document.location.replace(`/make-routine/${data.id}`));
}

//USER INTERACTIONS
navCreateButton.addEventListener("click", createNewRoutine);
createButton.addEventListener("click", createNewRoutine);
