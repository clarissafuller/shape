// initialize your calendar, once the page's DOM is ready

// Initialize evo-calendar in your script file or an inline <script> tag
$(document).ready(function () {
  $("#calendar").evoCalendar({
    theme: "Midnight Blue",
    eventDisplayDefault: false,
  });
});

//adds bootstrap classes to elements once loaded
$(document).ready(function () {
  $(".calendar-events").addClass("mr-5");
});

$(document).ready(function () {
  $(".calendar-inner").addClass("mr-5");
});
