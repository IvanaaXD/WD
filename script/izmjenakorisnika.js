let firebaseUrl =
  "https://wd-sv-23-2022-default-rtdb.firebaseio.com";

  getKorisnici();

let add = document.getElementById('add-popup')

let change = document.getElementById('change-popup')
let global = 0;

let confirm = document.getElementById('confirm-popup')
let row = 0;

let popup = document.getElementById('login-popup');
let over = document.getElementById('overlayy');
let popupsign = document.getElementById('register-popup');
let deletepopup = document.getElementById("delete-popup")
let popupe = document.getElementById('loginerror-popup');


let dictionaryy = [] 

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

let overr = document.getElementById("overlayyy")
let popups = document.getElementById('loginS-popup');


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

let dictionary = [];



function getKorisnici() {

  let request = new XMLHttpRequest();

  request.onreadystatechange = function(){

    if(this.readyState==4){
      if(this.status==200){

        removeTableRows('sviKorisnici');

        let korisnici = JSON.parse(this.responseText);

        for(let id in korisnici){
          let korisnik = korisnici[id];
          appendKorisnikRow('sviKorisnici',id,korisnik);
        }

      }else{
        //alert("Greska prilikom ucitavanja korisnika.");
      window.location.href = "error.html";
      }
    }

  }

  request.open('GET',firebaseUrl.concat('/korisnici.json'));
  request.send();

}

function appendKorisnikRow(tbodyId,korisnikId,korisnik){

  let korisnikTr = document.createElement('tr');
  korisnikTr.classList.add("container")
  korisnikTr.id = global;
  korisnikTr.setAttribute('data-id', korisnikTr.id);

  let editBtn = document.createElement('button');
  editBtn.type = 'button';
  editBtn.innerText = 'IZMIJENI';
  editBtn.onclick = showEditPage;
  editBtn.classList.add("btn")
  editBtn.classList.add("edit")
  editBtn.setAttribute('data-carId',korisnikId);

  let deleteBtn = document.createElement('button');
  deleteBtn.type='button';
  deleteBtn.innerText = 'IZBRISI';
  deleteBtn.setAttribute('data-carId',korisnikId);
  deleteBtn.onclick = function() {

  showdelete();

  const confirmButton = document.getElementById('confirm-btn');
  confirmButton.addEventListener('click', async function() {
    try {
      event.preventDefault()
      closedelete();
      deleteKorisnik(korisnikId);

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

  dictionary.push([korisnikId,korisnik.korisnickoIme,korisnik.lozinka,korisnik.ime,korisnik.prezime,korisnik.email,korisnik.datumRodjenja, korisnik.adresa,korisnik.telefon]);

  let korisnickoImeTd = document.createElement('td');
  korisnickoImeTd.classList.add("kime");
  korisnickoImeTd.id = korisnik.korisnickoIme + korisnikId;
  korisnickoImeTd.innerText = dictionary[global][1];
  korisnikTr.appendChild(korisnickoImeTd);

  let lozinkaTd = document.createElement('td');
  lozinkaTd.id = korisnik.lozinka + korisnikId;
  lozinkaTd.innerText = dictionary[global][2];
  lozinkaTd.classList.add("lozinkaa")
  korisnikTr.appendChild(lozinkaTd);

  let imeTd = document.createElement('td');
  imeTd.classList.add("imee");
  imeTd.id = korisnik.ime + korisnikId;
  imeTd.innerText = dictionary[global][3];
  korisnikTr.appendChild(imeTd);

  let prezimeTd = document.createElement('td');
  prezimeTd.classList.add("prezimee");
  prezimeTd.id = korisnik.prezime + korisnikId;
  prezimeTd.innerText = dictionary[global][4];
  korisnikTr.appendChild(prezimeTd);

  let emailTd = document.createElement('td');
  emailTd.classList.add("emaill");
  emailTd.id = korisnik.email + korisnikId;
  emailTd.innerText = dictionary[global][5];
  korisnikTr.appendChild(emailTd);

  let datumRodjenjaTd = document.createElement('td');
  datumRodjenjaTd.classList.add("datumm");
  datumRodjenjaTd.id = korisnik.datumRodjenja + korisnikId;
  datumRodjenjaTd.innerText = dictionary[global][6];
  korisnikTr.appendChild(datumRodjenjaTd);

  let adresaTd = document.createElement('td');
  adresaTd.classList.add("adresaa");
  adresaTd.id = korisnik.adresa + korisnikId;
  adresaTd.innerText =dictionary[global][7];
  korisnikTr.appendChild(adresaTd);

  let brojTelefonaTd = document.createElement('td');
  brojTelefonaTd.classList.add("telefonn");
  brojTelefonaTd.id = korisnik.telefon + korisnikId;
  brojTelefonaTd.innerText = dictionary[global][8];
  korisnikTr.appendChild(brojTelefonaTd);

  let editTd = document.createElement('td');
  editTd.appendChild(editBtn);
  korisnikTr.appendChild(editTd);

  let deleteTd = document.createElement('td');
  deleteTd.appendChild(deleteBtn);
  korisnikTr.appendChild(deleteTd);

  let tbody = document.getElementById(tbodyId);
  tbody.appendChild(korisnikTr);

  global = global + 1;  
}

/*function showEditPage(){
  let clickedBtn = this;

  let korisnikId = clickedBtn.getAttribute('data-carId');
  window.location.href = 'edit.html?id='+ korisnikId;
}*/

const editButtons = document.querySelectorAll('.edit-button');

editButtons.forEach((button) => {
  button.addEventListener('click', showEditPopup);
});


function showEditPage() {
  let clickedBtn = this;

  let korisnikId = clickedBtn.getAttribute('data-carId');
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
    console.log(obj)
    if (obj[0] === korisnikId){
      row = i;
      usernameTd = obj[1];
      passwordTd = obj[2];
      nameTd = obj[3];
      surnameTd = obj[4];
      emailTd = obj[5];
      dateofbirthTd = obj[6];
      adressTd = obj[7];
      phoneTd = obj[8];
    }
  }

  document.getElementById('KorisnickoIme').value = usernameTd;
  document.getElementById('Lozinka').value = passwordTd;
  document.getElementById('Ime').value = nameTd;
  document.getElementById('Prezime').value = surnameTd;
  document.getElementById('Gmail').value = emailTd;
  document.getElementById('DatumRodjenja').value = dateofbirthTd;
  document.getElementById('Adresa').value = adressTd;
  document.getElementById('Broj').value = phoneTd;
};

const submitButtons = document.querySelectorAll('.submitBtn');

submitButtons.forEach((button, index) => {
  button.setAttribute('data-row-id', index);
});

function updatetablerow(event) {
  event.preventDefault();

  //const rowId = event.target.getAttribute('data-row-id');
  const tableRow = document.querySelector(`tr[data-id="${row}"]`);

  const name = document.getElementById('Ime').value;
  const surname = document.getElementById('Prezime').value;
  const username = document.getElementById('KorisnickoIme').value;
  const password = document.getElementById('Lozinka').value;;
  const email = document.getElementById('Gmail').value;
  const date = document.getElementById('DatumRodjenja').value;
  const adress = document.getElementById('Adresa').value;
  const phone = document.getElementById('Broj').value;

  // Get the user ID and updated values
  const korisnikId = dictionary[row][0];
  const updatedKorisnik = {
    korisnickoIme: document.getElementById('KorisnickoIme').value,
    lozinka: document.getElementById('Lozinka').value,
    ime: document.getElementById('Ime').value,
    prezime: document.getElementById('Prezime').value,
    email: document.getElementById('Gmail').value,
    datumRodjenja: document.getElementById('DatumRodjenja').value,
    adresa: document.getElementById('Adresa').value,
    telefon: document.getElementById('Broj').value
  };

  editKorisnik(korisnikId, updatedKorisnik);

  let obj = []

  for (let i = 0; i < global; i++){
    obj = dictionary[i];
    console.log(obj)
    if (i === row){
      console.log("idegas")
      obj[1] = username;
      obj[2] = password;
      obj[3] = name;
      obj[4] = surname;
      obj[5] = email;
      obj[6] = date;
      obj[7] = adress;
      obj[8] = phone;
      dictionary[i] = [obj[1],obj[2],obj[3],obj[4],obj[5],obj[6],obj[7],obj[8]]
    }
  }

  tableRow.querySelector(".imee").textContent = name;
  tableRow.querySelector(".prezimee").textContent = surname;
  tableRow.querySelector(".kime").textContent = username;
  tableRow.querySelector(".emaill").textContent = email;
  tableRow.querySelector(".adresaa").textContent = adress;
  tableRow.querySelector(".telefonn").textContent = phone;
  tableRow.querySelector(".datumm").textContent = date;

  change.style.opacity = "0";
  change.style.transition = "scale(0)";
  change.style.display = "none";
  over.style.display = "none";
  document.body.style.overflow = "";
}

function editKorisnik(korisnikId, updatedKorisnik) {
  let updateRequest = new XMLHttpRequest();

  updateRequest.onreadystatechange = function() {
    if (this.readyState === 4) {
      if (this.status === 200) {
        // User updated successfully
        // You can perform additional actions here if needed
      } else {
        //alert('Greska prilikom izmjene korisnika.');
      window.location.href = "error.html";
      }
    }
  };

  updateRequest.open('PATCH', firebaseUrl.concat('/korisnici/', korisnikId, '.json'));
  updateRequest.setRequestHeader('Content-Type', 'application/json');
  updateRequest.send(JSON.stringify(updatedKorisnik));
}

function addKorisnik() {
  event.preventDefault()
  let request = new XMLHttpRequest();
  let korisnik = {};

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
        clearFormK()
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

function addKorisnikR() {
  event.preventDefault()
  let request = new XMLHttpRequest();
  let korisnik = {};

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
        clearFormK()
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

function deleteKorisnik(korisnikId) {


  for(let i = 0; i < dictionary.length; i++){
    if(dictionary[i][0] == korisnikId){
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

  request1.open("DELETE", "https://wd-sv-23-2022-default-rtdb.firebaseio.com/korisnici/" + korisnikId + ".json");
  request1.send();

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

function clearFormK() {
  document.getElementById('Imeee').value = '';
  document.getElementById('Prezimeee').value = '';
  document.getElementById('KorisnickoImeee').value = '';
  document.getElementById('Lozinkaaa').value = '';
  document.getElementById('Gmailll').value = '';
  document.getElementById('DatumRodjenjaaa').value = '';
  document.getElementById('Adresaaa').value = '';
  document.getElementById('Brojjj').value = '';

  resetErrorMessagesK()
  closeadd()
}


//DRAMA

function getKorisnik() {
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

function validateFormK(event) {
    event.preventDefault()
    var form = document.getElementById("addkorisnik-form");
    console.log(form)

    var name = form.elements["namee"].value;
    var surname = form.elements["surnamee"].value;
    var username = form.elements["usernamee"].value;
    var password = form.elements["passwordd"].value;
    var email = form.elements["emaill"].value;
    var address = form.elements["addresss"].value;
    var phone = form.elements["phonee"].value;
    var lettersOnlyPattern = /^[a-zA-ZčćšđžČĆŠĐŽ\s]+$/;
    var alphanumericPattern = /^[a-zA-Z0-9]+$/;
    var passwordPattern = /^(?=.*[A-Z].*[A-Z])(?=.*\d.*\d)(?=.*[!@#$%^&*()]).{8,}$/;
    var emailPattern = /^[a-z0-9]+@[a-z]+\.[a-z]+$/;
    var lettersAndNumbersPattern = /^[a-zA-ZčćšđžČĆŠĐŽ0-9\s]+$/;
    var numbersPattern = /^\d+$/;

    var errorMessages = document.getElementsByClassName("errorr-message");
    for (var i = 0; i < errorMessages.length; i++) {
        errorMessages[i].textContent = "";
    }

    var isValid = true;

    if (!lettersOnlyPattern.test(name)) {
        document.getElementById("name-errorr").textContent = "Name should contain only letters (no numbers or special characters).";
        isValid = false;
    }

    if (!lettersOnlyPattern.test(surname)) {
        document.getElementById("surname-errorr").textContent = "Surname should contain only letters (no numbers or special characters).";
        isValid = false;
    }

    if (!alphanumericPattern.test(username)) {
        document.getElementById("username-errorr").textContent = "Username should contain only letters and numbers (no special characters).";
        isValid = false;
    }

    if (!passwordPattern.test(password)) {
        document.getElementById("password-errorr").textContent = "Password must contain at least 8 characters with 2 uppercase letters, 2 numbers, and 1 special character.";
        isValid = false;
    }

    if (!emailPattern.test(email)) {
        document.getElementById("email-errorr").textContent = "Please enter a valid email address.";
        isValid = false;
    }

    var addressParts = address.split(",");

    if (addressParts.length == 0 || addressParts.length == 1){
        document.getElementById("address-errorr").textContent = "Address should contain street, city and post numbers.";
        isValid = false;
    } else {
      var street = addressParts[0].trim();
      var city = addressParts[1].trim();
      var postNumber = addressParts[2].trim();

    if (!lettersAndNumbersPattern.test(street)) {
        document.getElementById("address-errorr").textContent = "Street should contain only letters and numbers.";
        isValid = false;
    }

    if (!lettersOnlyPattern.test(city)) {
        document.getElementById("address-errorr").textContent = "City should contain only letters.";
        isValid = false;
    }

    if (!numbersPattern.test(postNumber)) {
        document.getElementById("address-errorr").textContent = "Post number should contain only numbers.";
        isValid = false;
    }
    }

    if (!numbersPattern.test(phone)) {
        document.getElementById("phone-errorr").textContent = "Phone number should contain only numbers.";
        isValid = false;
    }

    if (isValid) {
        submitButtonK.removeAttribute("disabled");
        addKorisnik();

    } else {
        submitButtonK.setAttribute("disabled", "disabled");

}
}

function validateFormKI(event,row) {
    event.preventDefault()
    var form = document.getElementById("changekorisnik-form");

    var name = form.elements["nameee"].value;
    var surname = form.elements["surnameee"].value;
    var username = form.elements["usernameee"].value;
    var password = form.elements["passworddd"].value;
    var email = form.elements["emailll"].value;
    var address = form.elements["addressss"].value;
    var phone = form.elements["phoneee"].value;
    var lettersOnlyPattern = /^[a-zA-ZčćšđžČĆŠĐŽ]+$/;
    var alphanumericPattern = /^[a-zA-Z0-9]+$/;
    var passwordPattern = /^(?=.*[A-Z].*[A-Z])(?=.*\d.*\d)(?=.*[!@#$%^&*()]).{8,}$/;
    var emailPattern = /^[a-z0-9]+@[a-z]+\.[a-z]+$/;
    var lettersAndNumbersPattern = /^[a-zA-ZčćšđžČĆŠĐŽ0-9]+$/;
    var numbersPattern = /^\d+$/;

    var errorMessages = document.getElementsByClassName("errorrr-message");
    for (var i = 0; i < errorMessages.length; i++) {
        errorMessages[i].textContent = "";
    }

    var isValid = true;

    if (!lettersOnlyPattern.test(name)) {
        document.getElementById("name-errorrr").textContent = "Name should contain only letters (no numbers or special characters).";
        isValid = false;
    }

    if (!lettersOnlyPattern.test(surname)) {
        document.getElementById("surname-errorrr").textContent = "Surname should contain only letters (no numbers or special characters).";
        isValid = false;
    }

    if (!alphanumericPattern.test(username)) {
        document.getElementById("username-errorrr").textContent = "Username should contain only letters and numbers (no special characters).";
        isValid = false;
    }

    if (!passwordPattern.test(password)) {
        document.getElementById("password-errorrr").textContent = "Password must contain at least 8 characters with 2 uppercase letters, 2 numbers, and 1 special character.";
        isValid = false;
    }

    if (!emailPattern.test(email)) {
        document.getElementById("email-errorrr").textContent = "Please enter a valid email address.";
        isValid = false;
    }

    var addressParts = address.split(",");

    if (addressParts.length == 0 || addressParts.length == 1){
        document.getElementById("address-errorrr").textContent = "Address should contain street, city and post numbers.";
        isValid = false;
    } else {
      var street = addressParts[0].trim();
      var city = addressParts[1].trim();
      var postNumber = addressParts[2].trim();

    if (!lettersAndNumbersPattern.test(street)) {
        document.getElementById("address-errorrr").textContent = "Street should contain only letters and numbers.";
        isValid = false;
    }

    if (!lettersOnlyPattern.test(city)) {
        document.getElementById("address-errorrr").textContent = "City should contain only letters.";
        isValid = false;
    }

    if (!numbersPattern.test(postNumber)) {
        document.getElementById("address-errorrr").textContent = "Post number should contain only numbers.";
        isValid = false;
    }
    }

    if (!numbersPattern.test(phone)) {
        document.getElementById("phone-errorrr").textContent = "Phone number should contain only numbers.";
        isValid = false;
    }

    if (isValid) {
        submitButtonKI.removeAttribute("disabled");
        updatetablerow(row);

    } else {
        submitButtonKI.setAttribute("disabled", "disabled");

}
}


function enableSubmitButton() {
    submitButton.removeAttribute("disabled");
}

var inputFields = document.querySelectorAll("#signup-form input");
inputFields.forEach(function(input) {
    input.addEventListener("input", enableSubmitButton);
});

var submitButtonK = document.getElementById("submitButtonK");

function enableSubmitButtonK() {
    submitButtonK.removeAttribute("disabled");
}

var inputFieldsK = document.querySelectorAll("#addkorisnik-form input");
inputFieldsK.forEach(function(input) {
    input.addEventListener("input", enableSubmitButtonK);
});

function enableSubmitButtonKI() {
    submitButtonKI.removeAttribute("disabled");
}

var inputFieldsKI = document.querySelectorAll("#changekorisnik-form input");
inputFieldsKI.forEach(function(input) {
    input.addEventListener("input", enableSubmitButtonKI);
});

function resetErrorMessages() {
    var errorMessages = document.getElementsByClassName("error-message");
    for (var i = 0; i < errorMessages.length; i++) {
        errorMessages[i].textContent = "";
    }
}

function resetErrorMessagesK() {
    var errorrMessages = document.getElementsByClassName("errorr-message");
    for (var i = 0; i < errorrMessages.length; i++) {
        errorrMessages[i].textContent = "";
    }
}