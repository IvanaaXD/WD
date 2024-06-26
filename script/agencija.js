function getQueryParamValue(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

const idParam = getQueryParamValue('id')

let agencija = [];
var data = []
var destinacijeId = ""


getAgencije();

function getAgencije() {
  let request = new XMLHttpRequest();

  request.onreadystatechange = function() {
    if (this.readyState === 4) {
      if (this.status === 200) {

        let agencije = JSON.parse(this.responseText);
          
          createpage(agencije[idParam])

      } else {
        //alert("Greska prilikom ucitavanja agencija.");
      window.location.href = "error.html";
      }
    }
  };

  request.open('GET', firebaseUrl.concat('/agencije.json'));
  request.send();
}

function getDestinacija(destinacije){
  let request = new XMLHttpRequest();

  request.onreadystatechange = function(){

    if(this.readyState==4){
      if(this.status==200){

        const grupeDestinacija = JSON.parse(this.responseText);

        for ( key in grupeDestinacija) {
          if (key === destinacije){
            let destinacije = grupeDestinacija[key];
            for( id in grupeDestinacija[key]){
              let destinacija = grupeDestinacija[key][id];
              data.push([id,destinacija.naziv,destinacija.opis,destinacija.slike,destinacija.tip,destinacija.prevoz, destinacija.cena,destinacija.maxOsoba, key])
              console.log(data)
              console.log(destinacija)
              destinacijeId = key
              appendDestinacija("sveDestinacije",id,destinacija);
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

function createpage(agencija){

let h1 = document.getElementById("naziv");
h1.textContent = agencija.naziv

let image = document.createElement("img");
image.src = agencija.logo;
image.akt = agencija.naziv;
image.classList.add("slikaagencije");

let tabela = document.createElement("table");
tabela.classList.add("tabela")

let tr1 = document.createElement("tr");
let tr2 = document.createElement("tr");
let tr3 = document.createElement("tr");
let tr4 = document.createElement("tr");

let th1 = document.createElement("th")
th1.innerText = "ADRESA:";
th1.classList.add("th")

let th2 = document.createElement("th")
th2.innerText = "GODINA:";
th2.classList.add("th")

let th3 = document.createElement("th")
th3.innerText = "BROJ TELEFONA:";
th3.classList.add("th")

let th4 = document.createElement("th")
th4.innerText = "E-MAIL:";
th4.classList.add("th")

let td1 = document.createElement("td")
td1.innerText = agencija.adresa;
td1.classList.add("td")

let td2 = document.createElement("td")
td2.innerText = agencija.godina
td2.classList.add("td")

let td3 = document.createElement("td")
td3.innerText = agencija.brojTelefona
td3.classList.add("td")

let td4 = document.createElement("td")
td4.innerText = agencija.email
td4.classList.add("td")

let tag = document.createElement("a")
tag.hreh = "mailto:" + agencija.email

var sekcija = document.getElementById("informacije")

sekcija.appendChild(image)
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
td4.appendChild(tag)
tr4.appendChild(th4)
tr4.appendChild(td4)

let grupaDestinacija = getDestinacija(agencija.destinacije);

}

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


function appendDestinacija(sekcija,destinacijaId,destinacija){

  let naziv = document.createElement('h3');
  naziv.classList.add("h3");
  naziv.innerText = destinacija.naziv;

  let destinacijaName = destinacija["naziv"];

  let tag = document.createElement("a");
  tag.href = 'destinacija.html?id='+ destinacijaId;
  tag.target = "_blank";

  let div = document.createElement("div");
  div.classList.add("destinacija")

  let image = document.createElement('img');

  const numbers = [0, 1, 2];
  const randomIndex = Math.floor(Math.random() * numbers.length);
  const randomNumber = numbers[randomIndex];

  //const slike = destinacija.slike;
  image.alt = destinacija["naziv"];
  console.log(destinacija.naziv)
  image.src = destinacija["slike"][0];
  image.classList.add("slika");

  let divEffect = document.createElement("div");
  divEffect.classList.add("overlay"); 
  divEffect.classList.add("overlayeffect");

  let br1 = document.createElement("br");
  let br2 = document.createElement("br");

  tag.appendChild(div);
  div.appendChild(image);
  div.appendChild(divEffect);
  div.appendChild(br1);
  div.appendChild(naziv);
  div.appendChild(br2);

  let sekcijaa = document.getElementById(sekcija);
  sekcijaa.classList.add("svedestinacija");
  sekcijaa.appendChild(tag);
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
    var lettersPattern = /^[a-zA-Z\s]+$/;
    var numbersPattern = /^\d+$/;

    var errorMessages = document.getElementsByClassName("error-message");
    for (var i = 0; i < errorMessages.length; i++) {
        errorMessages[i].textContent = "";
    }

    var isValid = true;

    if (!lettersOnlyPattern.test(name)) {
        document.getElementById("name-error").textContent = "Name should contain only letters (no numbers or special characters).";
        isValid = false;
    }

    if (!lettersOnlyPattern.test(surname)) {
        document.getElementById("surname-error").textContent = "Surname should contain only letters (no numbers or special characters).";
        isValid = false;
    }

    if (!alphanumericPattern.test(username)) {
        document.getElementById("username-error").textContent = "Username should contain only letters and numbers (no special characters).";
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

    if (!lettersPattern.test(city)) {
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

const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const form1 = document.querySelector('.forma1');
const form2 = document.querySelector('.forma2');

function search() {
  event.preventDefault()
  const sekcijaa = document.getElementById('sveDestinacije'); 

  const inputValue = searchInput.value.toLowerCase();

  const form1Value = form1.querySelector('input[name="vacation"]:checked').value;
  const form2Value = form2.querySelector('input[name="transport"]:checked').value;

  console.log(form1Value)
  
  console.log(form2Value)
  var filteredData = [];

  for (let i = 0; i < data.length; i++){
    console.log(data[i][1] == inputValue)
    console.log(data[i][1])
    console.log(inputValue)
  
  
    if ((data[i][1].toLowerCase().includes(inputValue) || inputValue == "") && (data[i][4] == form1Value || form1Value == "bilo_sta") && (data[i][5] == form2Value || form2Value == "bilo_sta")){
      filteredData.push(data[i]);
    }

  }

  // Save the matching destinations in a separate list or perform further actions
  // For now, let's log the matching destinations to the console
  //console.log(matchingDestinations);



      //console.log(matchingDestinations)
    createDestinationCard(filteredData)
    console.log(filteredData)
  // }
  searchResults.innerHTML = '';
}

function createDestinationCard(filteredData) {
  const sekcijaa = document.getElementById('sveDestinacije'); 

  sekcijaa.innerHTML = ''; 


  filteredData.forEach((destinacija) => {


    const naziv = destinacija[1].toLowerCase();
    const tip = destinacija[4]
    const prevoz = destinacija[5]
    const foundDestination = data.find(item => item[1].toLowerCase() === naziv);
      if (foundDestination){
          let destinacijaId = foundDestination[0]
          let destination = {
            naziv: foundDestination[1],
            opis: foundDestination[2],
            slike: foundDestination[3],
            tip: foundDestination[4],
            prevoz: foundDestination[5],
            cena: foundDestination[6],
            maxOsoba: foundDestination[7],
          } 

      appendDestinacija("sveDestinacije", destinacijaId, destination);

      }

  });

}

function highlightSearchText() {
  const searchText = searchInput.value.toLowerCase();
  const cards = document.querySelectorAll('.destinacija');

  cards.forEach(card => {
    const titleElement = card.querySelector('h3');
    const titleText = titleElement.textContent.toLowerCase();
    
    if (titleText.includes(searchText)) {
      const startIndex = titleText.indexOf(searchText);
      const endIndex = startIndex + searchText.length;
      const highlightedText =
        titleText.substring(0, startIndex) +
        `<span class="highlight">${titleText.substring(startIndex, endIndex)}</span>` +
        titleText.substring(endIndex);
      titleElement.innerHTML = highlightedText;
      card.style.display = 'block'; // Show the card if the text matches
    } else {
      card.style.display = 'none'; // Hide the card if the text doesn't match
    }
  });
}


searchInput.addEventListener('input', search);
searchInput.addEventListener('input', highlightSearchText);
form1.addEventListener('change', search);
form2.addEventListener('change', search);


