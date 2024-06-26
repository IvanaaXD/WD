let firebaseUrl =
  "https://wd-sv-23-2022-default-rtdb.firebaseio.com";

  getAgencije();

var data = []


function getAgencije() {

  let request = new XMLHttpRequest();

  request.onreadystatechange = function(){

    if(this.readyState==4){
      if(this.status==200){

        removeTableRows('sveAgencije');

        let agencije = JSON.parse(this.responseText);
        for(let id in agencije){
          let agencija = agencije[id];
          data.push([id,agencija.naziv,agencija.adresa,agencija.godina,agencija.logo,agencija.brojTelefona, agencija.email,agencija.destinacije])
          appendAgencija("sveAgencije",id,agencija);
        }

      }else{
        //alert("Greska prilikom ucitavanja agencija.");
      window.location.href = "error.html";
      }
    }

  }

  request.open('GET',firebaseUrl.concat('/agencije.json'));
  request.send();

}

function appendAgencija(sekcija,agencijaId,agencija){

  let naziv = document.createElement('h3');
  naziv.classList.add("h3");
  naziv.innerText = agencija.naziv;

  let agencijaName = agencija["naziv"];

  let hasMinus = agencijaName.includes("-");
  let hasSpace = agencijaName.includes(" ");

  let tag = document.createElement("a");
  tag.href ='agencija.html?id='+ agencijaId
  tag.target = "_blank";

  let div = document.createElement("div");
  div.classList.add("agencija")

  let image = document.createElement('img');
  image.src = agencija["logo"];
  image.alt = agencija["naziv"];
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
  sekcijaa.classList.add("sveagencije");
  sekcijaa.appendChild(tag);
}

function removeTableRows(tBodyId){

    const section = document.querySelector("." + tBodyId);
      if (section) {
        while (section.firstChild) {
          section.firstChild.remove();
        }
      }
}

function showEditPage(){
  let clickedBtn = this;

  let agencijaId = clickedBtn.getAttribute('data-carId');
  window.location.href = 'agencija.html?id='+ agencijaId;
}

let popup = document.getElementById('login-popup');
let popups = document.getElementById('loginS-popup');
let popupe = document.getElementById('loginerror-popup');


let over = document.getElementById('overlayy');
let overr = document.getElementById("overlayyy")

let popupsign = document.getElementById('register-popup');


function showlogine() {
  popup.style.opacity = "1";
  popup.style.transition = "scale(1)";
  popup.style.display = "block";
  over.style.display = "block";
  document.body.style.overflow = "hidden";
}

function closelogin() {
  popup.style.opacity = "0";
  popup.style.transition = "scale(0)";
  popup.style.display = "none";
  over.style.display = "none";
  document.body.style.overflow = "";
}

function showlogineS() {
  event.preventDefault()
  popups.style.opacity = "1";
  popups.style.transition = "scale(1)";
  popups.style.display = "block";
  overr.style.display = "block";
  document.body.style.overflow = "hidden";

}

function closeloginS() {
  popups.style.opacity = "0";
  popups.style.transition = "scale(0)";
  popups.style.display = "none";
  overr.style.display = "none";
  document.body.style.overflow = "";

  closelogin()
}

function showlogineerror() {
  event.preventDefault()
  popupe.style.opacity = "1";
  popupe.style.transition = "scale(1)";
  popupe.style.display = "block";
  overr.style.display = "block";
  document.body.style.overflow = "hidden";

}

function closeloginerror() {
  popupe.style.opacity = "0";
  popupe.style.transition = "scale(0)";
  popupe.style.display = "none";
  overr.style.display = "none";
  document.body.style.overflow = "";

}

function showsignup() {
  popup.style.opacity = "0";
  popup.style.transition = "scale(0)";
  popup.style.display = "none";
  over.style.display = "block";
  document.body.style.overflow = "hidden";

  popupsign.style.opacity = "1";
  popupsign.style.transition = "scale(1)";
  popupsign.style.display = "block";
}

function closesignup() {
  popupsign.style.opacity = "0";
  popupsign.style.transition = "scale(0)";
  popupsign.style.display = "none";
  over.style.display = "none";
  document.body.style.overflow = "";

}

function clearForm() {
  document.getElementById('name').value = '';
  document.getElementById('surname').value = '';
  document.getElementById('username').value = '';
  document.getElementById('password').value = '';
  document.getElementById('email').value = '';
  document.getElementById('dateofbirth').value = '';
  document.getElementById('address').value = '';
  document.getElementById('phone').value = '';

  resetErrorMessages()

  closesignup()

}

let dictionary = []

function getKorisnici() {
  let request = new XMLHttpRequest();

  request.onreadystatechange = function() {
    if (this.readyState === 4) {
      if (this.status === 200) {
        let korisnici = JSON.parse(this.responseText);
        let row = 0;

        for (let id in korisnici) {
          let korisnik = korisnici[id];
          let korisnickoIme = korisnik.korisnickoIme;
          let lozinka = korisnik.lozinka;
          dictionary[row] = [korisnickoIme, lozinka];
          row += 1;
        }

        let submitButton = document.querySelector('button[type="submit"]');
        submitButton.addEventListener('click', checkuser);
      } else {
        //alert("Greska prilikom ucitavanja korisnika.");
        window.location.href = "error.html";
      }
    }
  };

  request.open('GET', firebaseUrl.concat('/korisnici.json'));
  request.send();
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

function checkuser(event) {

  let usernameInput = document.querySelector('input[name="username"]');
  let passwordInput = document.querySelector('input[name="password"]');
  let username = usernameInput.value;
  let password = passwordInput.value;

  let foundUser = false;
  for (let i = 0; i < dictionary.length; i++) {
    let storedUsername = dictionary[i][0];
    let storedPassword = dictionary[i][1];
    if (storedUsername === username && storedPassword === password) {
      foundUser = true;
      break;
    }
  }

  if (foundUser) {
    showlogineS();
  } 
  if (!foundUser) {
    showlogineerror();
  }

  usernameInput.value = '';
  passwordInput.value = '';
}

var submitButton = document.getElementById("submitButton");

function resetErrorMessages() {
    var errorMessages = document.getElementsByClassName("error-message");
    for (var i = 0; i < errorMessages.length; i++) {
        errorMessages[i].textContent = "";
    }
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
    var lettersAndNumbersPattern = /^[a-zA-Zčćšđž0-9\s]+$/;
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

const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');


function search() {
  const searchText = searchInput.value.toLowerCase();
  const sekcijaa = document.getElementById('sveAgencije'); 
    sekcijaa.innerHTML = ''; 


  if (searchText === '') {

    sekcijaa.innerHTML = ''; 
    data = []
    console.log("aaa")
    getAgencije()
  } else {
    sekcijaa.innerHTML = ""

    const filteredData = data.filter(item => item[1].toLowerCase().includes(searchText));
    createAgencyCards(filteredData)
  }
  console.log(data)
  searchResults.innerHTML = '';
}

function createAgencyCards(filteredData) {
  const sekcijaa = document.getElementById('sveAgencije'); 

  sekcijaa.innerHTML = ''; 


  filteredData.forEach((agencija) => {


    const naziv = agencija[1].toLowerCase();
    const foundAgency = data.find(item => item[1].toLowerCase() === naziv);
      if (foundAgency){
          let agencijaId = foundAgency[0]
          let agency = {
            naziv: foundAgency[1],
            adresa: foundAgency[2],
            godina: foundAgency[3],
            logo: foundAgency[4],
            brojTelefona: foundAgency[5],
            email: foundAgency[6],
            destinacije: foundAgency[7],
          } 

      appendAgencija("sveAgencije", agencijaId, agency);

      }

  });

}

function highlightSearchText() {
  const searchText = searchInput.value.toLowerCase();
  const cards = document.querySelectorAll('.agencija');

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



getKorisnici();
