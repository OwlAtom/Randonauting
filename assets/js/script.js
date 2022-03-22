function getYear() {
  let currentYear = new Date().getFullYear();
  let title = document.getElementById("copyright");
  title.innerHTML = `© ${currentYear} OwlAtom.dev`;
}
let body = document.querySelector("body");
body.addEventListener("keydown", function (event) {
  // console.log(event.key)
});
body.addEventListener("mousedown", function (event) {
  // console.log(event.path[0])
});

let latitude = 0;
let longitude = 0;
getLocation();

function randonaut() {
  let firstDieRoll = fakeDieRoll();
  let secondDieRoll = fakeDieRoll();
  let randomRotation = handleDieRoll(firstDieRoll, secondDieRoll) * 360;

  let thirdDieRoll = fakeDieRoll();
  let fourthDieRoll = fakeDieRoll();
  let maxDistance = range.value * 10;
  let randomDistance =
    Math.sqrt(handleDieRoll(thirdDieRoll, fourthDieRoll)) * maxDistance;

  let xDistance = randomDistance * Math.cos(randomRotation);
  let yDistance = randomDistance * Math.sin(randomRotation);

  let earth = 6378.137, //radius of the earth in kilometer
    pi = Math.PI,
    cos = Math.cos,
    m = 1 / (((2 * pi) / 360) * earth) / 1000; //1 meter in degree

  getLocation();

  let new_latitude = latitude + xDistance * m;
  console.log(new_latitude);

  let new_longitude = longitude + (yDistance * m) / cos(latitude * (pi / 180));
  console.log(new_longitude);
  // let zoom = maxDistance / 1000 * 14;
  let outputUrl = `https://www.google.com/maps/place/${new_latitude},${new_longitude}`;
  document.querySelector("#mapsLink").href = outputUrl;
  console.log(outputUrl);
}

function handleDieRoll(first, second) {
  return "." + first + second;
}

function fakeDieRoll() {
  return Math.floor(Math.random() * 10) + 1;
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    owl.alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
}

getLocation();

let range = document.querySelector("#range");
range.oninput = (v) => {
  document.querySelector("#rangeViz").innerText =
    "Range in meters: " + range.value * 10;
};
