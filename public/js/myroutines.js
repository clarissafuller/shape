// Event listener for the delete button click
document.querySelectorAll(".delete-routine-button").forEach((button) => {
  button.addEventListener("click", async function () {
    const routineId = this.getAttribute("data-id");
    try {
      const response = await fetch(`/api/routines/${routineId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("The routine has been deleted successfully");
        // Remove the closest item with class routine container
        this.closest(".routine-container").remove();
      } else {
        console.error("Error deleting routine:", response.status);
      }
    } catch (err) {
      console.error("Error deleting routine:", err);
    }
  });
});
