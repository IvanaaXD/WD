function getQueryParamValue(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

const idParam = getQueryParamValue('id')

let destinacija = [];


getDestinacije();

function getDestinacije() {

  let request = new XMLHttpRequest();

  request.onreadystatechange = function(){

    if(this.readyState==4){
      if(this.status==200){

        const grupeDestinacija = JSON.parse(this.responseText);

        for (key in grupeDestinacija) {
          let destinacije = grupeDestinacija[key];
          for( id in grupeDestinacija[key]){
            if (id === idParam){
              let destinacija = grupeDestinacija[key][id];
              console.log(destinacija)
              createpage(destinacija)
            }
          }
        }

      }else{
        //alert("Greska prilikom ucitavanja agencija.");
      window.location.href = "error.html";
      }
    }

  }

  request.open('GET',firebaseUrl.concat('/destinacije.json'));
  request.send();

}

function createpage(destinacija){

var h1 = document.getElementById("naziv");
h1.innerText = destinacija.naziv

let tabela = document.createElement("table");
tabela.classList.add("tabela")
tabela.classList.add("table")

let tr1 = document.createElement("tr");
let tr2 = document.createElement("tr");
let tr3 = document.createElement("tr");
let tr4 = document.createElement("tr");

let th1 = document.createElement("th")
th1.innerText = "TIP:";
th1.classList.add("th")

let th2 = document.createElement("th")
th2.innerText = "PREVOZ:";
th2.classList.add("th")

let th3 = document.createElement("th")
th3.innerText = "CIJENA:";
th3.classList.add("th")

let th4 = document.createElement("th")
th4.innerText = "MAX OSOBA:";
th4.classList.add("th")

let td1 = document.createElement("td")
td1.innerText = destinacija.tip;
td1.classList.add("td")

let td2 = document.createElement("td")
td2.innerText = destinacija.prevoz
td2.classList.add("td")

let td3 = document.createElement("td")
td3.innerText = destinacija.cena
td3.classList.add("td")

let td4 = document.createElement("td")
td4.innerText = destinacija.maxOsoba
td4.classList.add("td")

let div = document.createElement("div")
div.classList.add("vl")

let p = document.createElement("p")
p.innerText = destinacija.opis
p.classList.add("opisdestinacije")

var sekcija = document.getElementById("container")

sekcija.appendChild(tabela)

tabela.appendChild(tr1)
tr1.appendChild(th1)
tr1.appendChild(td1)

tabela.appendChild(tr2)
tr2.appendChild(th2)
tr2.appendChild(td2)

tabela.appendChild(tr3)
tr3.appendChild(th3)
tr3.appendChild(td3)

tabela.appendChild(tr4)
tr4.appendChild(th4)
tr4.appendChild(td4)

sekcija.appendChild(div)
sekcija.appendChild(p)

const carouselContainer = document.getElementById("demo");

let duzina = destinacija.slike;
const imageSources = [];
for (let i = 0; i < duzina.length; i++){
  imageSources.push(destinacija["slike"][i]);
};

const carouselIndicators = document.createElement("div");
carouselIndicators.classList.add("carousel-indicators");

for (let i = 0; i < imageSources.length; i++) {
  const indicatorButton = document.createElement("button");
  indicatorButton.setAttribute("type", "button");
  indicatorButton.setAttribute("data-bs-target", "#demo");
  indicatorButton.setAttribute("data-bs-slide-to", i.toString());

  if (i === 0) {
    indicatorButton.classList.add("active");
  }
  carouselIndicators.appendChild(indicatorButton);
}

const carouselItems = document.createElement("div");
carouselItems.classList.add("carousel-inner")

for (let i = 0; i < imageSources.length; i++) {
  const carouselItem = document.createElement("div");
  carouselItem.classList.add("carousel-item");

  if (i === 0) {
    carouselItem.classList.add("active");
  }

  const image = document.createElement("img");
  image.src = imageSources[i];
  image.alt = "Image " + (i + 1);
  image.classList.add("d-block");
  image.style.width = "100%";

  carouselItem.appendChild(image);
  carouselItems.appendChild(carouselItem);
}

carouselContainer.appendChild(carouselIndicators);
carouselContainer.appendChild(carouselItems);
}

var nav = document.getElementById('navlink');
var navToggle = document.getElementById('nav-toggle');

function toggleNavbar() {
  nav.classList.toggle('show');
}

navToggle.addEventListener('click', toggleNavbar);

function addKorisnikR() {
  event.preventDefault()
  let request = new XMLHttpRequest();
  let korisnik = {};

  const name = document.getElementById('name').value;
  const surname = document.getElementById('surname').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;;
  const email = document.getElementById('email').value;
  const date = document.getElementById('dateofbirth').value;
  const adress = document.getElementById('address').value;
  const phone = document.getElementById('phone').value;
  
  korisnik = {
            "korisnickoIme": username,
            "lozinka": password,
            "ime": name,
            "prezime": surname,
            "email": email,
            "datumRodjenja": date,
            "adresa": adress,
            "telefon": phone
  }

  request.onreadystatechange = function() {
    if (this.readyState == 4) {
      if (this.status == 200) {
        console.log("Korisnik added successfully.");
        clearForm()
        closeadd()
        location.reload()
      } else {
        //alert("Error uploading agencija.");
      window.location.href = "error.html";
      }
    }
  };

  request.open("POST", firebaseUrl.concat("/korisnici.json"));
  request.setRequestHeader("Content-Type", "application/json");
  request.send(JSON.stringify(korisnik));
}

function validateForm(event) {
    event.preventDefault()
    var form = document.getElementById("signup-form");

    var name = form.elements["name"].value;
    var surname = form.elements["surname"].value;
    var username = form.elements["username"].value;
    var password = form.elements["password"].value;
    var email = form.elements["email"].value;
    var address = form.elements["address"].value;
    var phone = form.elements["phone"].value;
    var lettersOnlyPattern = /^[a-zA-ZčćšđžČĆŠĐŽ\s]+$/;
    var alphanumericPattern = /^[a-zA-Z0-9]+$/;
    var passwordPattern = /^(?=.*[A-Z].*[A-Z])(?=.*\d.*\d)(?=.*[!@#$%^&*()]).{8,}$/;
    var emailPattern = /^[a-z0-9]+@[a-z]+\.[a-z]+$/;
    var lettersAndNumbersPattern = /^[a-zA-ZčćšđžČĆŠĐŽ0-9\s]+$/;
    var numbersPattern = /^\d+$/;

    var errorMessages = document.getElementsByClassName("error-message");
    for (var i = 0; i < errorMessages.length; i++) {
        errorMessages[i].textContent = "";
    }

    var isValid = true;

    if (!lettersOnlyPattern.test(name)) {
        document.getElementById("name-error").textContent = "Name should contain only letters.";
        isValid = false;
    }

    if (!lettersOnlyPattern.test(surname)) {
        document.getElementById("surname-error").textContent = "Surname should contain only letters.";
        isValid = false;
    }

    if (!alphanumericPattern.test(username)) {
        document.getElementById("username-error").textContent = "Username should contain only letters and numbers.";
        isValid = false;
    }

    if (!passwordPattern.test(password)) {
        document.getElementById("password-error").textContent = "Password must contain at least 8 characters with 2 uppercase letters, 2 numbers, and 1 special character.";
        isValid = false;
    }

    if (!emailPattern.test(email)) {
        document.getElementById("email-error").textContent = "Please enter a valid email address.";
        isValid = false;
    }

    var addressParts = address.split(",");

    if (addressParts.length == 0 || addressParts.length == 1){
        document.getElementById("address-error").textContent = "Address should contain street, city and post numbers.";
        isValid = false;
    } else {
      var street = addressParts[0].trim();
      var city = addressParts[1].trim();
      var postNumber = addressParts[2].trim();

    if (!lettersAndNumbersPattern.test(street)) {
        document.getElementById("address-error").textContent = "Street should contain only letters and numbers.";
        isValid = false;
    }

    if (!lettersOnlyPattern.test(city)) {
        document.getElementById("address-error").textContent = "City should contain only letters.";
        isValid = false;
    }

    if (!numbersPattern.test(postNumber)) {
        document.getElementById("address-error").textContent = "Post number should contain only numbers.";
        isValid = false;
    }
    }

    if (!numbersPattern.test(phone)) {
        document.getElementById("phone-error").textContent = "Phone number should contain only numbers.";
        isValid = false;
    }

    if (isValid) {
        submitButton.removeAttribute("disabled");
        addKorisnikR();
    } else {
        submitButton.setAttribute("disabled", "disabled");

}
}
function enableSubmitButton() {
    submitButton.removeAttribute("disabled");
}

var inputFields = document.querySelectorAll("#signup-form input");
inputFields.forEach(function(input) {
    input.addEventListener("input", enableSubmitButton);
});
