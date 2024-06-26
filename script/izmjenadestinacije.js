let firebaseUrl ="https://wd-sv-23-2022-default-rtdb.firebaseio.com";

  getDestinacije();

let change = document.getElementById('change-popup')
let confirm = document.getElementById('confirm-popup')
let row = 0;
let over = document.getElementById('overlayy');
let add = document.getElementById('add-popup')
let overr = document.getElementById("overlayyy")
let popups = document.getElementById('loginS-popup');
let popup = document.getElementById('login-popup');
let popupsign = document.getElementById('register-popup');
let deletepopup = document.getElementById("delete-popup")
let popupe = document.getElementById('loginerror-popup');


let dictionaryy = []

let dictionary = [];

let global = 0;

function getDestinacije() {

  let request = new XMLHttpRequest();

  request.onreadystatechange = function(){

    if(this.readyState==4){
      if(this.status==200){

        removeTableRows('sveDestinacije');

        let destinacijeGrupe = JSON.parse(this.responseText);

        let dict = {};

        for(let i in destinacijeGrupe){
          let destinacije = destinacijeGrupe[i];

          for(let id in destinacije){
            let destinacija = destinacije[id];

            let values = Object.values(dict);
            if (values.includes(dict[id])){
              continue;
            } else {
              dict[id] = destinacija;
              appendDestinacijaRow("sveDestinacije",id,destinacija,i);
            }
          }

        }

      }else{
        alert("Greska prilikom ucitavanja automobila");
      window.location.href = "error.html";
      }
    }

  }

  request.open('GET',firebaseUrl.concat('/destinacije.json'));
  request.send();

}

function appendDestinacijaRow(tbodyId,destinacijaId,destinacija,grupaDestinacijaId){

  let destinacijaTr = document.createElement('tr');
  destinacijaTr.classList.add("container")
  destinacijaTr.classList.add("table-hover")
  destinacijaTr.classList.add("table-striped")
  destinacijaTr.id = global;
  destinacijaTr.setAttribute('data-id', destinacijaTr.id);

  let editBtn = document.createElement('button');
  editBtn.type = 'button';
  editBtn.innerText = 'IZMIJENI';
  editBtn.onclick = showEditPage;
  editBtn.classList.add("btn")
  editBtn.classList.add("edit")
  editBtn.setAttribute('data-carId',destinacijaId);

  let deleteBtn = document.createElement('button');
  deleteBtn.type='button';
  deleteBtn.innerText = 'IZBRISI';
  deleteBtn.setAttribute('data-carId',destinacijaId);
  deleteBtn.onclick = function() {

  showdelete();
  event.preventDefault()
  const confirmButton = document.getElementById('confirm-btn');
  confirmButton.addEventListener('click', async function() {
    try {
      event.preventDefault()
      closedelete();
      deleteDestinacija(destinacijaId, grupaDestinacijaId);

    } catch (error) {
      //alert('Try again: ' + error);
      window.location.href = "error.html";
    }
  });

  const cancelButton = document.getElementById('cancel-btn');
  cancelButton.addEventListener('click', function() {
    closedelete();
    event.preventDefault();
  });
  };
  deleteBtn.classList.add("btn")
  deleteBtn.classList.add("delete")

  dictionary.push([destinacijaId,destinacija.naziv,destinacija.opis,destinacija.slike,destinacija.tip,destinacija.prevoz,destinacija.cena, destinacija.maxOsoba,grupaDestinacijaId]);

  let nazivTd = document.createElement('td');
  nazivTd.innerText = dictionary[global][1];
  nazivTd.classList.add("imee")
  destinacijaTr.appendChild(nazivTd);

  //let logoTd = document.createElement('td');
  //var imgElement = document.createElement('img');
  //imgElement.src = agencija["logo"];
  //imgElement.classList.add("slicica")
  //imgElement.innerText = agencija.logo;
  //logoTd.appendChild(imgElement);
  //destinacijaTr.appendChild(logoTd);

  let opisTd = document.createElement('td');
  opisTd.innerText = dictionary[global][2];
  opisTd.classList.add("opiss")
  destinacijaTr.appendChild(opisTd);

  let slikeTd = document.createElement('td');
  slikeTd.innerText = dictionary[global][3];
  slikeTd.classList.add("slikee")
  destinacijaTr.appendChild(slikeTd);

  let tipTd = document.createElement('td');
  tipTd.innerText = dictionary[global][4];
  tipTd.classList.add("tipp")
  destinacijaTr.appendChild(tipTd);

  let prevozTd = document.createElement('td');
  prevozTd.innerText = dictionary[global][5];
  prevozTd.classList.add("prevozz")
  destinacijaTr.appendChild(prevozTd);

  let cijenaTd = document.createElement('td');
  cijenaTd.innerText = dictionary[global][6];
  cijenaTd.classList.add("cijenaa")
  destinacijaTr.appendChild(cijenaTd);

  let maxOsobaTd = document.createElement('td');
  maxOsobaTd.innerText = dictionary[global][7];
  maxOsobaTd.classList.add("osobee")
  destinacijaTr.appendChild(maxOsobaTd);

  let editTd = document.createElement('td');
  editTd.appendChild(editBtn);
  editTd.id = global;
  editTd.setAttribute('data-row-id', editTd.id);
  destinacijaTr.appendChild(editTd);

  let deleteTd = document.createElement('td');
  deleteTd.appendChild(deleteBtn);
  destinacijaTr.appendChild(deleteTd);

  let tbody = document.getElementById(tbodyId);
  tbody.appendChild(destinacijaTr);

  global = global + 1;
  
}

const editButtons = document.querySelectorAll('.edit-button');
editButtons.forEach((button) => {
  button.addEventListener('click', showEditPopup);
});

function showEditPage() {
  let clickedBtn = this;

  let destinacijaId = clickedBtn.getAttribute('data-carId');
  let popup = document.getElementById('change-popup');

  over.style.display = "block";
  document.body.style.overflow = "hidden";

  change.style.opacity = "1";
  change.style.transition = "scale(1)";
  change.style.display = "block";

  let tableRow = clickedBtn.closest('tr');

  let obj = []

  for (let i = 0; i < global; i++){
    obj = dictionary[i];
    if (obj[0] === destinacijaId){

      row = i;
      nameTd = obj[1];
      descriptionTd = obj[2];
      picturesTd = obj[3];
      typeTd = obj[4];
      rideTd = obj[5];
      priceTd = obj[6];
      maxpersonsTd = obj[7];
      grupa = obj[8]
      console.log(grupa)
    }
  }

  document.getElementById('Naziv').value = nameTd;
  document.getElementById('Opis').value = descriptionTd;
  document.getElementById('Slike').value = picturesTd;
  document.getElementById('Tip').value = typeTd;
  document.getElementById('Prevoz').value = rideTd;
  document.getElementById('Cijena').value = priceTd;
  document.getElementById('Osobe').value = maxpersonsTd;

};

const submitButtons = document.querySelectorAll('.submitBtn');

submitButtons.forEach((button, index) => {
  button.setAttribute('data-row-id', index);
});

function updatetablerow(event) {
  event.preventDefault();

  //const rowId = event.target.getAttribute('data-row-id');
  const tableRow = document.querySelector(`tr[data-id="${row}"]`);
  const name = document.getElementById('Naziv').value;
  const description = document.getElementById('Opis').value;
  const pictures = document.getElementById('Slike').value;
  const type = document.getElementById('Tip').value;
  const ride = document.getElementById('Prevoz').value;
  const price = document.getElementById('Cijena').value;
  const people = document.getElementById('Osobe').value;

  let obj = []

  const destinacijaId = dictionary[row][0];
  const grupica = dictionary[row][8]

  const updatedDestination = {
    naziv: document.getElementById('Naziv').value,
    opis: document.getElementById('Opis').value,
    slike: document.getElementById('Slike').value,
    tip: document.getElementById('Tip').value,
    prevoz: document.getElementById('Prevoz').value,
    cena: document.getElementById('Cijena').value,
    maxOsoba: document.getElementById('Osobe').value
  };

  editDestinacija(destinacijaId, updatedDestination, grupica)

  for (let i = 0; i < global; i++){
    obj = dictionary[i];
    if (i === row){
      obj[1] = name;
      obj[2] = description;
      obj[3] = pictures;
      obj[4] = type;
      obj[5] = ride;
      obj[6] = price;
      obj[7] = people;
      dictionary[i] = [obj[1],obj[2],obj[3],obj[4],obj[5],obj[6],obj[7],grupa]
    }
  }

  tableRow.querySelector(".imee").textContent = name;
  tableRow.querySelector(".opiss").textContent = description;
  tableRow.querySelector(".slikee").textContent = pictures;
  tableRow.querySelector(".tipp").textContent = type;
  tableRow.querySelector(".prevozz").textContent = ride;
  tableRow.querySelector(".cijenaa").textContent = price;
  tableRow.querySelector(".osobee").textContent = people;

  change.style.opacity = "0";
  change.style.transition = "scale(0)";
  change.style.display = "none";
  over.style.display = "none";
  document.body.style.overflow = "";

  var destinacija = {
          "naziv": name,
          "opis": description,
          "slike":pictures,
          "tip": type,
          "prevoz": ride,
          "cena": price,
          "maxOsoba": people
  }
  var id = row

}

function editDestinacija(destinacijaId, destinacijaData, grupa) {
  let editRequest = new XMLHttpRequest();

  editRequest.onreadystatechange = function() {
    if (this.readyState == 4) {
      if (this.status == 200) {
        getDestinacije();
      } else {
        //alert('Error while editing destination.');
      window.location.href = "error.html";
      }
    }
  }

editRequest.open('PATCH', `${firebaseUrl}/destinacije/${grupa}/${destinacijaId}.json`);
  editRequest.setRequestHeader('Content-Type', 'application/json');
  editRequest.send(JSON.stringify(destinacijaData));
}

function deleteDestinacija(destinacijaId, grupa) {

  for(let i = 0; i < dictionary.length; i++){
    if(dictionary[i][0] == destinacijaId){
      dictionary.splice(i, 1);
    }
  }

  let request1 = new XMLHttpRequest();

  request1.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
         location.reload()

      } else {
        //alert("Greška prilikom brisanja.");
      window.location.href = "error.html";
      }
    }
  };

  request1.open("DELETE", "https://wd-sv-23-2022-default-rtdb.firebaseio.com/destinacije/" + grupa + "/" + destinacijaId + ".json");
  request1.send();

}

function addDestinacija() {
  event.preventDefault()
  let request = new XMLHttpRequest();
  let destinacija = {};

  const name = document.getElementById('Nazivv').value;
  const description = document.getElementById('Opiss').value;
  const pictures = document.getElementById('Slikee').value;
  const type = document.getElementById('Tipp').value;
  const ride = document.getElementById('Prevozz').value;
  const price = document.getElementById('Cijenaa').value;
  const people = document.getElementById('Osobee').value;

  let picture = []
  for (let i =0; i <pictures.length; i++){
    picture.push(pictures[i])
  }
  
  destinacija = {
                "naziv": name,
                "opis": description,
                "slike": pictures,
                "tip": type,
                "prevoz": ride,
                "cena": price,
                "maxOsoba": people
  }
  console.log(destinacija)

const randomString = generateRandomString(19);
let kljuc = "-" + randomString

  request.onreadystatechange = function() {
    if (this.readyState == 4) {
      if (this.status == 200) {
        console.log("Destinacija added successfully.");
        clearFormD()
        closeadd()
        location.reload()
      } else {
        //alert("Error uploading agencija.");
      window.location.href = "error.html";
      }
    }
  };

request.open("POST", firebaseUrl.concat(`/destinacije/${kljuc}.json`));  
request.setRequestHeader("Content-Type", "application/json");
  request.send(JSON.stringify(destinacija));
}

function generateRandomString(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;

  const cryptoObj = window.crypto;
  const randomValues = new Uint32Array(length);
  
  cryptoObj.getRandomValues(randomValues);

  for (let i = 0; i < length; i++) {
    result += characters.charAt(randomValues[i] % charactersLength);
  }

  return result;
}

function removeTableRows(tBodyId){
    let tBody = document.getElementById(tBodyId);

    while(tBody.firstChild){
        tBody.removeChild(tBody.lastChild);
    }
}

var nav = document.getElementById('navlink');
var navToggle = document.getElementById('nav-toggle');

function toggleNavbar() {
  nav.classList.toggle('show');
  console.log(nav)
}

navToggle.addEventListener('click', toggleNavbar);

function showchange(){

  over.style.display = "block";
  document.body.style.overflow = "hidden";

  change.style.opacity = "1";
  change.style.transition = "scale(1)";
  change.style.display = "block";
}


function closechange(){
  event.preventDefault();

  change.style.opacity = "0";
  change.style.transition = "scale(0)";
  change.style.display = "none";
  over.style.display = "none";
  document.body.style.overflow = "";
}

function showconfirm(){
  event.preventDefault();

  over.style.display = "block";
  document.body.style.overflow = "hidden";

  confirm.style.opacity = "1";
  confirm.style.transition = "scale(1)";
  confirm.style.display = "block";
}


function closeconfirm(){
  event.preventDefault();

  confirm.style.opacity = "0";
  confirm.style.transition = "scale(0)";
  confirm.style.display = "none";
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

function showadd(){

  over.style.display = "block";
  document.body.style.overflow = "hidden";

  add.style.opacity = "1";
  add.style.transition = "scale(1)";
  add.style.display = "block";
}


function closeadd(){

  add.style.opacity = "0";
  add.style.transition = "scale(0)";
  add.style.display = "none";
  over.style.display = "none";
  document.body.style.overflow = "";

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

function showdelete() {
  deletepopup.style.opacity = "0";
  deletepopup.style.transition = "scale(0)";
  deletepopup.style.display = "none";
  over.style.display = "block";
  document.body.style.overflow = "hidden";

  deletepopup.style.opacity = "1";
  deletepopup.style.transition = "scale(1)";
  deletepopup.style.display = "block";
}

function closedelete() {
  deletepopup.style.opacity = "0";
  deletepopup.style.transition = "scale(0)";
  deletepopup.style.display = "none";
  over.style.display = "none";
  document.body.style.overflow = "";
}


//DRAMA

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

function showsignup() {
  event.preventDefault()
  popup.style.opacity = "0";
  popup.style.transition = "scale(0)";
  popup.style.display = "none";
  over.style.display = "block";
  document.body.style.overflow = "hidden";

  popupsign.style.opacity = "1";
  popupsign.style.transition = "scale(1)";
  popupsign.style.display = "block";

  //addKorisnikR();
}

function closesignup() {
  popupsign.style.opacity = "0";
  popupsign.style.transition = "scale(0)";
  popupsign.style.display = "none";
  over.style.display = "none";
  document.body.style.overflow = "";
}

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
          dictionaryy[row] = [korisnickoIme, lozinka];
          row += 1;
        }

        // User data is fetched successfully, now bind the checkuser function to the submit button
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

function checkuser(event) {
  // Get the input values
  let usernameInput = document.querySelector('input[name="username"]');
  let passwordInput = document.querySelector('input[name="password"]');
  let username = usernameInput.value;
  let password = passwordInput.value;

  // Check if the username and password exist in the dictionary
  let foundUser = false;
  for (let i = 0; i < dictionaryy.length; i++) {
    let storedUsername = dictionaryy[i][0];
    let storedPassword = dictionaryy[i][1];
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

  // Clear the input fields
  usernameInput.value = '';
  passwordInput.value = '';
}

function addKorisnikR(){
 event.preventDefault()
  let request = new XMLHttpRequest();
  let korisnik = {};

  showsignup()

  const name = document.getElementById('Imeee').value;
  const surname = document.getElementById('Prezimeee').value;
  const username = document.getElementById('KorisnickoImeee').value;
  const password = document.getElementById('Lozinkaaa').value;;
  const email = document.getElementById('Gmailll').value;
  const date = document.getElementById('DatumRodjenjaaa').value;
  const adress = document.getElementById('Adresaaa').value;
  const phone = document.getElementById('Brojjj').value;
  
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
        clearFormR()
        closesignup()
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

function clearFormR() {
  document.getElementById('Imeee').value = '';
  document.getElementById('Prezimeee').value = '';
  document.getElementById('KorisnickoImeee').value = '';
  document.getElementById('Lozinkaaa').value = '';
  document.getElementById('Gmailll').value = '';
  document.getElementById('DatumRodjenjaaa').value = '';
  document.getElementById('Adresaaa').value = '';
  document.getElementById('Brojjj').value = '';

}

function clearFormD() {
  document.getElementById('Nazivv').value = '';
  document.getElementById('Opiss').value = '';
  document.getElementById('Slikee').value = '';
  document.getElementById('Tipp').value = '';
  document.getElementById('Prevozz').value = '';
  document.getElementById('Cijenaa').value = '';
  document.getElementById('Osobee').value = '';

  resetErrorMessagesD()
  closeadd()

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


function validateD(event) {
  event.preventDefault(); 

  var form = document.getElementById("adddestinacija-form");

  var name = form.elements["namee"].value;
  var price = form.elements["price"].value;
  var people = form.elements["people"].value;

  var lettersOnlyPattern = /^[a-zA-ZčćšđžČĆŠĐŽ0-9]+$/;
  var numberPattern = /^[\d.,]+$/;

  var errorMessages = document.getElementsByClassName("errorr-message");
  for (var i = 0; i < errorMessages.length; i++) {
      errorMessages[i].textContent = "";
  }

  var isValid = true;
  console.log(isValid)

  if (!lettersOnlyPattern.test(name)) {
    document.getElementById("name-errorr").textContent = "Name should contain only letters.";
    isValid = false;
  }

  if (!numberPattern.test(price)) {
    document.getElementById("price-errorr").textContent = "Price should contain only numbers.";
    isValid = false;
  }

  if (!numberPattern.test(people)) {
    document.getElementById("people-errorr").textContent = "People should contain only numbers.";
    isValid = false;
}

  if (isValid) {
    submitButtonD.removeAttribute("disabled");
    console.log("wuhu")
    addDestinacija();
  } else {
    submitButtonD.setAttribute("disabled", "disabled");
  }
}

function enableSubmitButtonD() {
    submitButtonD.removeAttribute("disabled");
}

var inputFieldsD = document.querySelectorAll("#adddestinacija-form input");
inputFieldsD.forEach(function(input) {
    input.addEventListener("input", enableSubmitButtonD);
});

function validateDI(event) {
  event.preventDefault(); 

  var form = document.getElementById("changedestinacija-form");

  var name = form.elements["nameee"].value;
  var price = form.elements["pricee"].value;
  var people = form.elements["peoplee"].value;

  var lettersOnlyPattern = /^[a-zA-ZčćšđžČĆŠĐŽ0-9]+$/;
  var numberPattern = /^[\d.,]+$/;

  var errorMessages = document.getElementsByClassName("errorrr-message");
  for (var i = 0; i < errorMessages.length; i++) {
      errorMessages[i].textContent = "";
  }

  var isValid = true;
  console.log(isValid)

  if (!lettersOnlyPattern.test(name)) {
    document.getElementById("name-errorrr").textContent = "Name should contain only letters.";
    isValid = false;
  }

  if (!numberPattern.test(price)) {
    document.getElementById("price-errorrr").textContent = "Price should contain only numbers.";
    isValid = false;
  }

  if (!numberPattern.test(people)) {
    document.getElementById("people-errorrr").textContent = "People should contain only numbers.";
    isValid = false;
}

  if (isValid) {
    submitButtonDI.removeAttribute("disabled");
    console.log("wuhu")
    updatetablerow(event);
  } else {
    submitButtonDI.setAttribute("disabled", "disabled");
  }
}

function enableSubmitButtonDI() {
    submitButtonDI.removeAttribute("disabled");
}

var inputFieldsDI = document.querySelectorAll("#changedestinacija-form input");
inputFieldsDI.forEach(function(input) {
    input.addEventListener("input", enableSubmitButtonDI);
});

getKorisnici();

function resetErrorMessages() {
    var errorMessages = document.getElementsByClassName("error-message");
    for (var i = 0; i < errorMessages.length; i++) {
        errorMessages[i].textContent = "";
    }
}

function resetErrorMessagesD() {
    var errorrMessages = document.getElementsByClassName("errorr-message");
    for (var i = 0; i < errorrMessages.length; i++) {
        errorrMessages[i].textContent = "";
    }
}