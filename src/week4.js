let dateTimeDisplay = document.querySelector("#datetime");

function formatDate() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth();
  let day = now.getDate();
  let hours = now.getHours();
  let minutes = now.getMinutes();

  let formattedDateTime = `${days[now.getDay()]}, ${
    months[month]
  } ${day}, ${year} ${hours}:${minutes}`;

  return formattedDateTime;
}

function updateDateTime() {
  dateTimeDisplay.innerHTML = formatDate();
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector(".form-control");
  let h2 = document.querySelector("h2");
  if (searchInput.value) {
    h2.innerHTML = `Weather in ${searchInput.value} looks like`;
    let city = searchInput.value;
    let apiKey = "4b3503b2f08a729413c4d33ef1186004";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    axios.get(apiUrl).then((response) => {
      showTemperature(response);
    });
  }
}

function showTemperature(response) {
  if (response) {
    let temp = Math.round(response.data.main.temp);
    let city = response.data.name;
    let temperatureElement = document.querySelector(".temp");
    temperatureElement.innerHTML = `${temp}°F in ${city}`;
  }
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function changeTheme() {
  let body = document.querySelector("body");
  body.classList.toggle("dark");
}

let themeButton = document.querySelector(".form-check-input");
themeButton.addEventListener("click", changeTheme);
updateDateTime();
