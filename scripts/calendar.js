let events = [
  { date: "2024-06-28", description: "17h30", id: 0, title: "Fechamento de notas" },
  { date: "2024-06-18", description: "17h30", id: 0, title: "Reunião de Pais" },
  { date: "2024-06-15", description: "18h30", id: 0, title: "Reunião de Professores" },
];

const eventDateInput = document.getElementById("eventDate");
const eventTitleInput = document.getElementById("eventTitle");
const eventDescriptionInput = document.getElementById("eventDescription");
const reminderList = document.getElementById("eventsList");
const addEventButton = document.getElementById("addEvent");

let eventIdCounter = 0;

function addEvent() {
  let date = eventDateInput.value;
  let title = eventTitleInput.value;
  let description = eventDescriptionInput.value;

  if (date && title) {
    let eventId = eventIdCounter++;

    events.push({
      id: eventId,
      date: date,
      title: title,
      description: description,
    });
    showCalendar(currentMonth, currentYear);
    eventDateInput.value = "";
    eventTitleInput.value = "";
    eventDescriptionInput.value = "";
    displayReminders();
  }
}

addEventButton.addEventListener("click", (event) => {
  event.preventDefault();
  addEvent();
  console.log(events);
});

function deleteEvent(eventId) {
  let eventIndex = events.findIndex((event) => event.id === eventId);

  if (eventIndex !== -1) {
    events.splice(eventIndex, 1);
    showCalendar(currentMonth, currentYear);
    displayReminders();
  }
}

function displayReminders() {
  events.sort((a, b) => {
    let d1 = new Date(a.date);
    let d2 = new Date(b.date);

    if (d1 > d2) {
      return -1;
    }

    if (d2 < d1) {
      return 1;
    }
  });

  eventsList.innerHTML = "";

  for (let i = 0; i < events.length; i++) {
    let event = events[i];
    let eventDate = new Date(event.date.replace(/-/g, "/").replace(/T.+/, ""));

    if (
      eventDate.getMonth() === currentMonth &&
      eventDate.getFullYear() === currentYear
    ) {
      let listItem = document.createElement("li");
      let deleteButton = document.createElement("button");
      let deleteIcon = document.createElement("img");

      listItem.classList.add("eventListItem");
      listItem.innerHTML = `${eventDate.toLocaleDateString("pt-br")} - ${
        event.title
      } - ${event.description}`;

      deleteButton.classList.add("deleteEventButton", "delete-event");
      deleteIcon.src = "./../assets/icons/trash-solid.svg";

      deleteButton.onclick = function () {
        deleteEvent(event.id);
      };

      deleteButton.append(deleteIcon);
      listItem.appendChild(deleteButton);
      reminderList.appendChild(listItem);
    }
  }
}

const generateYearRange = (start, end) => {
  let years = "";
  for (let year = start; year <= end; year++) {
    years += "<option value='" + year + "'>" + year + "</option>";
  }
  return years;
};

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectYear = document.getElementById("year");
let selectMonth = document.getElementById("month");

let createYear = generateYearRange(1980, 2050);

document.getElementById("year").innerHTML = createYear;

let calendar = document.getElementById("calendar");

let months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];
let days = ["D", "S", "T", "Q", "Q", "S", "S"];

let dataHead = "<tr>";
for (let dhead in days) {
  dataHead += "<th data-days='" + days[dhead] + "'>" + days[dhead] + "</th>";
}
dataHead += "</tr>";

document.getElementById("theadMonth").innerHTML = dataHead;

let monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);

function next() {
  currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
  currentMonth = (currentMonth + 1) % 12;
  showCalendar(currentMonth, currentYear);
}

function previous() {
  currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  showCalendar(currentMonth, currentYear);
}

let previousButton = document.getElementById("previous");
let nextMonthButton = document.getElementById("next");

previousButton.addEventListener("click", () => {
  previous();
});

nextMonthButton.addEventListener("click", () => {
  next();
});

function jump() {
  currentYear = parseInt(selectYear.value);
  currentMonth = parseInt(selectMonth.value);
  showCalendar(currentMonth, currentYear);
}

let jumpToYear = document.getElementById("year");
jumpToYear.addEventListener("change", () => {
  jump();
});

let jumpToMonth = document.getElementById("month");
jumpToMonth.addEventListener("change", () => {
  jump();
});

function showCalendar(month, year) {
  let firstDay = new Date(year, month, 1).getDay();
  let tbl = document.getElementById("calendarBody");
  tbl.innerHTML = "";
  monthAndYear.innerHTML = months[month] + " " + year;
  selectYear.value = year;
  selectMonth.value = month;

  let date = 1;
  for (let i = 0; i < 6; i++) {
    let row = document.createElement("tr");
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        let cell = document.createElement("td");
        let cellText = document.createTextNode("");
        cell.appendChild(cellText);
        row.appendChild(cell);
      } else if (date > daysInMonth(month, year)) {
        break;
      } else {
        let cell = document.createElement("td");
        cell.setAttribute("data-date", date);
        cell.setAttribute("data-month", month + 1);
        cell.setAttribute("data-year", year);
        cell.setAttribute("data-month_name", months[month]);
        cell.className = "date-picker";
        cell.innerHTML = "<span>" + date + "</span";

        if (
          date === today.getDate() &&
          year === today.getFullYear() &&
          month === today.getMonth()
        ) {
          cell.className = "date-picker selected";
        }

        if (hasEventOnDate(date, month, year)) {
          cell.classList.add("event-marker");
          cell.appendChild(createEventTooltip(date, month, year));
        }

        row.appendChild(cell);
        date++;
      }
    }
    tbl.appendChild(row);
  }

  displayReminders();
}

function createEventTooltip(date, month, year) {
  let tooltip = document.createElement("div");
  tooltip.className = "event-tooltip";
  let eventsOnDate = getEventsOnDate(date, month, year);
  for (let i = 0; i < eventsOnDate.length; i++) {
    let event = eventsOnDate[i];
    let eventDate = new Date(event.date.replace(/-/g, "/").replace(/T.+/, ""));
    let eventText = `${event.title} - ${event.description}`;
    let eventElement = document.createElement("p");
    eventElement.innerHTML = eventText;
    tooltip.appendChild(eventElement);
  }
  return tooltip;
}

function getEventsOnDate(date, month, year) {
  return events.filter(function (event) {
    let eventDate = new Date(event.date.replace(/-/g, "/").replace(/T.+/, ""));
    return (
      eventDate.getDate() === date &&
      eventDate.getMonth() === month &&
      eventDate.getFullYear() === year
    );
  });
}

function hasEventOnDate(date, month, year) {
  return getEventsOnDate(date, month, year).length > 0;
}

function daysInMonth(iMonth, iYear) {
  return 32 - new Date(iYear, iMonth, 32).getDate();
}

showCalendar(currentMonth, currentYear);
