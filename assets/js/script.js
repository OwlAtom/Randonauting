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
getLocation()

function randonaut() {
    let firstDieRoll = fakeDieRoll();
    let secondDieRoll = fakeDieRoll();
    let randomRotation = handleDieRoll(firstDieRoll, secondDieRoll) * 360;

    let thirdDieRoll = fakeDieRoll();
    let fourthDieRoll = fakeDieRoll();
    let maxDistance = 1000;
    let randomDistance = Math.sqrt(handleDieRoll(thirdDieRoll, fourthDieRoll)) * maxDistance;

    let xDistance = randomDistance * Math.cos(randomRotation);
    let yDistance = randomDistance * Math.sin(randomRotation);

    let earth = 6378.137, //radius of the earth in kilometer
        pi = Math.PI,
        m = (1 / ((2 * pi / 360) * earth)) / 1000; //1 meter in degree

    getLocation()

    let new_latitude = latitude + (xDistance * m);
    console.log(new_latitude);
    var cos = Math.cos;
    m = (1 / ((2 * pi / 360) * earth)) / 1000; //1 meter in degree

    var new_longitude = longitude + (yDistance * m) / cos(latitude * (pi / 180));
    console.log(new_longitude)
    // let zoom = maxDistance / 1000 * 14;
    let outputUrl = `https://www.google.com/maps/place/${new_latitude},${new_longitude}`
    console.log(outputUrl);
}

function handleDieRoll(first, second) {
    return "." + first + second;
}

function fakeDieRoll() {
    return Math.floor(Math.random() * 10) + 1
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

var slider = document.getElementById("myRange");
slider.oninput = function () {
    console.warn(this.value * 10)
}
let blockerElement = document.createElement("div");
blockerElement.classList.add("pageBlocker");
blockerElement.id = "pageBlocker";
let confirmResponseValue = false;
let promptResponseValue = "";

let owl = {
    alert: function (message) {
        owl.blockPage();
        //must have ok button and nothing else.
        blockerElement.innerHTML = `<div class="modalBox">
        <p class="modalTitle">Alert</p>
        <p >${message}</p>
        <button onclick="owl.unblockPage();">OK</button>
        </div>`;
        body.addEventListener("keyup", owl.eventListener.alert(event));
    },
    customAlert: function (title, message) {
        owl.blockPage();
        //alerts the user with a custom message and title
        blockerElement.innerHTML = `<div class="modalBox">
        <p class="modalTitle">${title}</p>
        <p >${message}</p>
        <button onclick="owl.unblockPage();">OK</button>
        </div>`;
        body.addEventListener("keyup", owl.eventListener.alert(event));
    },
    confirm: function (message) {
        owl.blockPage();
        // Works like connfirm();
        // except the return value is stored in "confirmResponseValue"
        blockerElement.innerHTML = `<div class="modalBox">
        <p class="modalTitle">Confirm</p>
        <p >${message}</p>
        <button onclick="owl.confirmResponse(true);">OK</button>
        <button onclick="owl.confirmResponse(false);">Cancel</button>
        </div>`
        body.addEventListener("keyup", owl.eventListener.confirm(event));
    },
    customConfirm: function (title, message) {
        owl.blockPage();
        //The same as the other confirm, but with custom title
        blockerElement.innerHTML = `<div class="modalBox">
        <p class="modalTitle">${title}</p>
        <p >${message}</p>
        <button onclick="owl.confirmResponse(true);">OK</button>
        <button onclick="owl.confirmResponse(false);">Cancel</button>
       </div>`
        // body.addEventListener("keyup", owl.eventListener.confirm(event));

    },
    fullCustomConfirm: function (title, message, trueFunction, falseFunction) {
        owl.blockPage();
        //The same as the other confirm, but with custom title and custom functions
        blockerElement.innerHTML = `<div class="modalBox">
        <p class="modalTitle">${title}</p>
        <p >${message}</p>
        <button onclick="${trueFunction}">OK</button>
        <button onclick="${falseFunction}">Cancel</button>
        </div>`
    },
    confirmResponse: function (value) {
        owl.unblockPage()
        confirmResponseValue = value;
        return value;
    },
    prompt: function (message, placeholder) {
        owl.blockPage();
        //text input
        //returns input as string
        blockerElement.innerHTML = `<div class="modalBox">
        <p class="modalTitle">Attention</p>
        <p>${message}</p>
        <input type="text" id="promptTextBox" placeholder="${placeholder}">
        <button onclick="owl.promptResponse(this);">OK</button>
        </div>`
        let textBox = document.querySelector("#promptTextBox")
        textBox.focus();
        textBox.addEventListener("keyup", function (event) {
            if (event.keyCode === 13) {
                owl.promptResponse(this);
            }
        });

    },
    promptResponse: function (value) {
        value = document.querySelector("#promptTextBox").value;
        owl.unblockPage()
        promptResponseValue = value;
        console.log(promptResponseValue);
        return value;
    },
    /* listen for y/enter or n/ESC clicks on keyboard
        eventListener: {
            alert: function (event) {
                if (event.keyCode === 13) {
                    owl.unblockPage();
                }
            },
            confirm: function (event) {
                if (event.keyCode === 13 || event.keyCode === 89) {
                    //accept
                    owl.confirmResponse(true)
                } else if (event.keyCode === 78 || event.keyCode === 27) { 
                    //cancel
                    owl.confirmResponse(false)
                }
            },
            prompt: function (event) {

            }
        },*/
    blockPage: function () {
        let body = document.querySelector("body");
        body.append(blockerElement);
    },
    unblockPage: function (value) {
        owl.removeElement(blockerElement);
        blockerElement.innerHTML = "";
        return value;
    },
    removeElement: function (element) {
        element.parentNode.removeChild(element);

    }
}