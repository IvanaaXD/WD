let firebaseUrl = "https://wd-sv-23-2022-default-rtdb.firebaseio.com";


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
let deletepopupA = document.getElementById("deleteA-popup")
let popupe = document.getElementById('loginerror-popup');

var    matrica = []
var duzina = 0;

let grupicaajdi;
let ajdi;
let dictionaryy = []
let rjecnik = []
let dictionary = [];
var listaDestinacija = []

let broj = 0
let red = 0

let global = 0;

getDestinacija()
//getAgencije();


function getDestinacija() {

  let request = new XMLHttpRequest();

  request.onreadystatechange = function() {
    if (this.readyState == 4) {
      if (this.status == 200) {
        let destinacijeGrupe = JSON.parse(this.responseText);
        let dict = {};
        var duz = 0
        for (let i in destinacijeGrupe) {
          let destinacije = destinacijeGrupe[i];

          for (let id in destinacije) {
            let destinacija = destinacije[id];
            let values = Object.values(dict);
            if (values.includes(dict[id])) {
              continue;
            } else {
              dict[id] = destinacija;
              matrica.push({
                naziv: destinacija.naziv,
                w: id,
                grupaId: i
              });
              duz += 1

            }
          }
        }

        duzina = duz
        getAgencije()
      } else {
        //alert("Greska prilikom ucitavanja destinacija.");
      window.location.href = "error.html";
      }
    }
  };

  request.open('GET', firebaseUrl.concat('/destinacije.json'));
  request.send();
}

function getAgencije() {
let getRequest = new XMLHttpRequest();

getRequest.onreadystatechange = function(){

    if (this.readyState == 4) {
      if (this.status == 200) {

        removeTableRows('sveAgencije');

        let agencije = JSON.parse(this.responseText);

        for (let id in agencije) {
          let agencija = agencije[id];
          appendAgencijaRow('sveAgencije', id, agencija);
        }
        };

      } else {
        //console.log("Greska prilikom ucitavanja agencija.");
        window.location.herf = "error.html"
      }
      };

  getRequest.open('GET', firebaseUrl.concat('/agencije.json'));
  getRequest.send();
}

function appendAgencijaRow(tbodyId,agencijaId,agencija){

  let agencijaTr = document.createElement('tr');
  agencijaTr.classList.add("container")
  agencijaTr.id = global;
  agencijaTr.setAttribute('data-id', agencijaTr.id);

  let editBtn = document.createElement('button');
  editBtn.type = 'button';
  editBtn.innerText = 'IZMIJENI';
  editBtn.onclick = showEditPage;
  editBtn.classList.add("btn")
  editBtn.classList.add("edit")
  editBtn.setAttribute('data-carId',agencijaId);

  let deleteBtn = document.createElement('button');
  deleteBtn.type='button';
  deleteBtn.innerText = 'IZBRISI';
  deleteBtn.setAttribute('data-carId',agencijaId);
  deleteBtn.onclick = function() {

  showdelete();

  let confirmButton = document.getElementById('confirm-btn');
  confirmButton.addEventListener('click', async function() {
    
      event.preventDefault()
      closedelete();
      deleteAgencija(agencijaId);

  
  });

  let cancelButton = document.getElementById('cancel-btn');
  cancelButton.addEventListener('click', function() {
    closedelete();
    event.preventDefault();
  });
  };
  deleteBtn.classList.add("btn")
  deleteBtn.classList.add("delete")

  console.log(matrica)
  listaDestinacija = [];
  console.log(duzina)
  for (let i = 0; i < duzina; i++){
    console.log("jyqefbil")
    if (matrica[i].grupaId == agencija.destinacije){
      console.log("ivqfbca")
      listaDestinacija.push(matrica[i]["naziv"])
    }
  }

  console.log(listaDestinacija)
  dictionary.push([agencijaId,agencija.naziv,agencija.logo,agencija.adresa,agencija.godina,agencija.brojTelefona,agencija.email, listaDestinacija,agencija.destinacije]);

  let nazivTd = document.createElement('td');
  nazivTd.innerText = dictionary[global][1];
  nazivTd.id = agencija.naziv + agencijaId;
  nazivTd.classList.add("nazivv")
  agencijaTr.appendChild(nazivTd);

  let logoTd = document.createElement('td');
  var imgElement = document.createElement('img');
  imgElement.src = agencija["logo"];
  imgElement.classList.add("slicica")
  imgElement.classList.add("logoo")
  imgElement.innerText = dictionary[global][2];
  logoTd.id = agencija.logo + agencijaId;
  logoTd.appendChild(imgElement);
  agencijaTr.appendChild(logoTd);

  let adresaTd = document.createElement('td');
  adresaTd.innerText = dictionary[global][3];
  adresaTd.id = agencija.adresa + agencijaId;
  adresaTd.classList.add("adresaa")
  agencijaTr.appendChild(adresaTd);

  let godinaTd = document.createElement('td');
  godinaTd.innerText = dictionary[global][4];
  godinaTd.id = agencija.godina + agencijaId;
  godinaTd.classList.add("godinaa")
  agencijaTr.appendChild(godinaTd);

  let brojTelefonaTd = document.createElement('td');
  brojTelefonaTd.innerText = dictionary[global][5];
  brojTelefonaTd.id = agencija.brojTelefona + agencijaId;
  brojTelefonaTd.classList.add("brojj")
  agencijaTr.appendChild(brojTelefonaTd);

  let emailTd = document.createElement('td');
  emailTd.innerText = dictionary[global][6];
  emailTd.id = agencija.email + agencijaId;
  emailTd.classList.add("emaill")
  agencijaTr.appendChild(emailTd);

  let destinacijeTd = document.createElement("td")
  destinacijeTd.id = agencija.destinacije + agencijaId;
  destinacijeTd.classList.add("destinacijee")
  destinacijeTd.innerText = listaDestinacija;
  agencijaTr.appendChild(destinacijeTd);

  let editTd = document.createElement('td');
  editTd.appendChild(editBtn);
  agencijaTr.appendChild(editTd);

  let deleteTd = document.createElement('td');
  deleteTd.appendChild(deleteBtn);
  agencijaTr.appendChild(deleteTd);

  let tbody = document.getElementById(tbodyId);
  tbody.appendChild(agencijaTr);
  
  global = global + 1;
}

const editButtons = document.querySelectorAll('.edit-button');
editButtons.forEach((button) => {
  button.addEventListener('click', showEditPopup);
});

function showEditPage() {
  let clickedBtn = this;

  let agencijaId = clickedBtn.getAttribute('data-carId');
  ajdi = agencijaId

  let popup = document.getElementById('change-popup');

  over.style.display = "block";
  document.body.style.overflow = "hidden";

  change.style.opacity = "1";
  change.style.transition = "scale(1)";
  change.style.display = "block";

  let tableRow = clickedBtn.closest('tr');

  let obj = [];

  for (let i = 0; i < global; i++) {
    obj = dictionary[i];
    if (obj[0] === agencijaId) {
      row = i;
      nameTd = obj[1];
      logoTd = obj[2];
      adressTd = obj[3];
      yearTd = obj[4];
      phoneTd = obj[5];
      emailTd = obj[6];
      destinationTd = obj[7];
      grupaId = obj[8];
      grupicaajdi = grupaId
    }
  }

  document.getElementById('Naziv').value = nameTd;
  document.getElementById('Logo').value = logoTd;
  document.getElementById('Adresa').value = adressTd;
  document.getElementById('Godina').value = yearTd;
  document.getElementById('Broj').value = phoneTd;
  document.getElementById('Gmail').value = emailTd;

  let destinations = []

    for (let i = 0; i < matrica.length; i++) {
      if (matrica[i].grupaId == grupicaajdi) {
        destinations.push([matrica[i].naziv,matrica[i].w
        ]);
      }
    }

    generateButtons(destinations,grupaId);
}

  function generateButtons(destinations,grupa) {
    const buttonWrapper = document.querySelector('.button-wrapper');
    buttonWrapper.innerHTML = '';


    destinations.forEach(destination => {
      const button = document.createElement('button');
      button.textContent = destination[0];

      button.addEventListener('click', function() {

        showdeleteA();

        const confirmButton = document.getElementById('confirm-button');
        confirmButton.addEventListener('click', function() {
            buttonWrapper.removeChild(button)
            deleteDestinacijaA(destination[1],grupa);
            closedeleteA();

        });

        const cancelButton = document.getElementById('cancel-button');
        cancelButton.addEventListener('click', function() {
          event.preventDefault()
          closedeleteA();
        });
      });
      buttonWrapper.appendChild(button);
    });

  }

  const submitButtons = document.querySelectorAll('.submitBtn');

  submitButtons.forEach((button, index) => {
    button.setAttribute('data-row-id', index);
  });


function uploadAgencija(agencijaId, name, logo, adress, year, phone, email) {
  let request = new XMLHttpRequest();
  let agencija = {};

  request.onreadystatechange = function() {
    if (this.readyState == 4) {
      if (this.status == 200) {
        let agencije = JSON.parse(this.responseText);

        for (let id in agencije) {
          if (id === agencijaId) {
            agencija = agencije[id];
            agencija.naziv = name;
            agencija.logo = logo;
            agencija.adresa = adress;
            agencija.godina = year;
            agencija.brojTelefona = phone;
            agencija.email = email;
          }
          appendAgencijaRow('sveAgencije', id, agencije[id]);
        }

        let updateRequest = new XMLHttpRequest();
        updateRequest.open("PUT", firebaseUrl.concat(`/agencije/${agencijaId}.json`));
        updateRequest.setRequestHeader("Content-Type", "application/json");
        updateRequest.send(JSON.stringify(agencija));

        console.log("Agencija uploaded successfully.");
      } else {
        //alert("Error uploading agencija.");
      window.location.href = "error.html";
      }
    }
  };

  request.open("POST", firebaseUrl.concat("/agencije.json"));
  request.setRequestHeader("Content-Type", "application/json");
  request.send(JSON.stringify(agencija));
}

function updatetablerow(event) {
  event.preventDefault();
  const tableRow = document.querySelector(`tr[data-id="${row}"]`);

  const name = document.getElementById('Naziv').value;
  const logo = document.getElementById('Logo').value;
  const adress = document.getElementById('Adresa').value;;
  const year = document.getElementById('Godina').value;
  const phone = document.getElementById('Broj').value;
  const email = document.getElementById('Gmail').value;
  const newDestination = document.getElementById("NazivD").value
  const newPic = document.getElementById("SlikaD").value

  if ((newDestination !== "" && newPic !== "")) {
    destinacija = {
                "naziv": newDestination,
                "opis": "",
                "slike": newPic,
                "tip": "",
                "prevoz": "",
                "cena": "",
                "maxOsoba": ""
    }

  const randomString = generateRandomString(19);
  let kljuc = "-" + randomString
  let request = new XMLHttpRequest();

  request.onreadystatechange = function() {
    if (this.readyState == 4) {
      if (this.status == 200) {
        console.log("Destinacija added successfully.");

      } else {
        //alert("Error uploading agencija.");
      window.location.href = "error.html";
      }
    }
  };

request.open("POST", firebaseUrl.concat(`/destinacije/${grupicaajdi}.json`));  
request.setRequestHeader("Content-Type", "application/json");
  request.send(JSON.stringify(destinacija));


} else {
  console.log("Please fill in both fields or leave them both empty.");

  const submitButton = document.getElementById("submitButtonAI");
  submitButton.disabled = true;
}

   let obj = []

   for (let i = 0; i < global; i++){
     obj = dictionary[i];
     if (i === row){
       obj[1] = name;
       obj[2] = logo;
       obj[3] = adress;
       obj[4] = year;
       obj[5] = phone;
       obj[6] = email;
       dictionary[i].splice(0,6,obj[1],obj[2],obj[3],obj[4],obj[5],obj[6]);
    }
   }
  
  let agency = {
            naziv: document.getElementById("Naziv").value,
            adresa: document.getElementById('Adresa').value,
            logo: document.getElementById('Logo').value,
            godina: document.getElementById('Godina').value,
            brojTelefona: document.getElementById('Broj').value,
            email:document.getElementById('Gmail').value,
            destinacije: grupicaajdi
   }

   change.style.opacity = "0";
   change.style.transition = "scale(0)";
   change.style.display = "none";
   over.style.display = "none";
   document.body.style.overflow = "";

   editAgencija(ajdi,agency)

}

function editAgencija(id, agency) {
  let editRequest = new XMLHttpRequest();

  editRequest.onreadystatechange = function() {
    if (this.readyState == 4) {
      if (this.status == 200) {
        clearFormica();
      } else {
        //alert('Error while editing destination.');
      window.location.href = "error.html";
     }
    }
  }
  editRequest.open('PATCH', firebaseUrl.concat('/agencije/', id, '.json'));
  editRequest.setRequestHeader('Content-Type', 'application/json');
  editRequest.send(JSON.stringify(agency));

}
function clearFormA(){
    document.getElementById('Naziv').value = "";
  document.getElementById('Logo').value = "";
  document.getElementById('Adresa').value = "";
  document.getElementById('Godina').value = "";
  document.getElementById('Broj').value = "";
  document.getElementById('Gmail').value = "";
  document.getElementById('Destinacije').value = "";
    document.getElementById('NazivD').value = "";
  document.getElementById('SlikaD').value = "";

  closechange()

}

function clearFormica(){
  // document.getElementById('Naziv').value = "";
  // document.getElementById('Logo').value = "";
  // document.getElementById('Adresa').value = "";
  // document.getElementById('Godina').value = "";
  // document.getElementById('Broj').value = "";
  // document.getElementById('Gmail').value = "";
  // document.getElementById('Destinacije').value = "";
  document.getElementById('NazivD').value = "";
  document.getElementById('SlikaD').value = "";
  location.reload()
}

function addAgencija() {
  event.preventDefault()
  let request = new XMLHttpRequest();
  let agencija = {};

  const name = document.getElementById('Nazivv').value;
  const logo = document.getElementById('Logoo').value;
  const address = document.getElementById('Adresaa').value;;
  const year = document.getElementById('Godinaa').value;
  const phone = document.getElementById('Brojj').value;
  const email = document.getElementById('Gmaill').value;
  const destination = document.getElementById('Destinacijee').value;
  
  agencija = {
            "naziv": name,
            "adresa": address,
            "godina": year,
            "logo": logo,
            "brojTelefona": phone,
            "email": email,
            "destinacije": destination
  }
        console.log(agencija)

  request.onreadystatechange = function() {
    if (this.readyState == 4) {
      if (this.status == 200) {
        console.log("Agencija added successfully.");
        clearForm()
        closeadd()
        location.reload()
      } else {
        //alert("Error uploading agencija.");
      window.location.href = "error.html";
      }
    }
  };

  request.open("POST", firebaseUrl.concat("/agencije.json"));
  request.setRequestHeader("Content-Type", "application/json");
  request.send(JSON.stringify(agencija));
}

function deleteAgencija(agencijaId) {


  for(let i = 0; i < dictionary.length; i++){
    if(dictionary[i][0] == agencijaId){
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

  request1.open("DELETE", "https://wd-sv-23-2022-default-rtdb.firebaseio.com/agencije/" + agencijaId + ".json");
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

  event.preventDefault()

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

  clearFormA()
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

function showdeleteA() {
    event.preventDefault();

  overr.style.display = "block";
  document.body.style.overflow = "hidden";

  deletepopupA.style.opacity = "1";
  deletepopupA.style.transition = "scale(1)";
  deletepopupA.style.display = "block";
}

function closedeleteA() {
  event.preventDefault();

  deletepopupA.style.opacity = "0";
  deletepopupA.style.transition = "scale(0)";
  deletepopupA.style.display = "none";
  overr.style.display = "none";
  document.body.style.overflow = "";
}

function clearForm() {
  document.getElementById('Nazivv').value = '';
  document.getElementById('Logoo').value = '';
  document.getElementById('Adresaa').value = '';
  document.getElementById('Godinaa').value = '';
  document.getElementById('Brojj').value = '';
  document.getElementById('Gmaill').value = '';
  document.getElementById('Destinacijee').value = '';

  resetErrorMessagesA()
  closeadd()

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

function clearFormK() {
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


function deleteDestinacijaA(destinacijaId, grupa) {


  console.log(destinacijaId)
  console.log(grupa)
  let request1 = new XMLHttpRequest();

  request1.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {

      } else {
        //alert("Greška prilikom brisanja.");
      window.location.href = "error.html";
      }
    }
  };

  request1.open("DELETE", "https://wd-sv-23-2022-default-rtdb.firebaseio.com/destinacije/" + grupa + "/" + destinacijaId + ".json");
  request1.send();

}



function deleteDestinacija(destinacijaId, grupa) {

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

function addDestinacija(grupica) {
  event.preventDefault()
  let request = new XMLHttpRequest();
  let destinacija = {};

  const name = document.getElementById('NazivD').value;
  const picture = document.getElementById('SlikaD').value;

  destinacija = {
                "naziv": name,
                "opis": "",
                "slike": picture,
                "tip": "",
                "prevoz": "",
                "cena": "",
                "maxOsoba": ""
  }

  request.onreadystatechange = function() {
    if (this.readyState == 4) {
      if (this.status == 200) {
        console.log("Destinacija added successfully.");
        clearForm()
        closeadd()
        location.reload()
      } else {
        //alert("Error uploading agencija.");
      window.location.href = "error.html";
      }
    }
  };

  console.log(grupica)

request.open("POST", firebaseUrl.concat(`/destinacije/${grupica}.json`));  
request.setRequestHeader("Content-Type", "application/json");
  request.send(JSON.stringify(destinacija));
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

  clearForm()
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
  console.log(usernameInput)

  // Check if the username and password exist in the dictionary
  let foundUser = false;
  for (let i = 0; i < dictionaryy.length; i++) {
    let storedUsername = dictionaryy[i][0];
    console.log(storedUsername)
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
    var lettersOnlyPattern = /^[a-zA-ZčćšđžČĆŠĐŽ]+$/;
    var alphanumericPattern = /^[a-zA-Z0-9]+$/;
    var passwordPattern = /^(?=.*[A-Z].*[A-Z])(?=.*\d.*\d)(?=.*[!@#$%^&*()]).{8,}$/;
    var emailPattern = /^[a-z0-9]+@[a-z]+\.[a-z]+$/;
    var lettersAndNumbersPattern = /^[a-zA-Zčćšđž0-9]+$/;
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

function resetErrorMessages() {
    var errorMessages = document.getElementsByClassName("error-message");
    for (var i = 0; i < errorMessages.length; i++) {
        errorMessages[i].textContent = "";
    }
}

// document.addEventListener("DOMContentLoaded", resetErrorMessages);
// document.getElementById("signup-form").addEventListener("reset", resetErrorMessages);

function validateFormAI(event) {
    event.preventDefault()
    var form = document.getElementById("changeagencija-form");

    var name = form.elements["namee"].value;
    var address = form.elements["addresss"].value;
    var year = form.elements["yearr"].value;
    var phone = form.elements["phonee"].value;
    var email = form.elements["emaill"].value;
    var nazivD = form.elements["NazivD"].value;

    var lettersOnlyPattern = /^[a-zA-ZčćšđžČĆŠĐŽ\s]+$/;
    var alphanumericPattern = /^[a-zA-Z0-9]+$/;
    var emailPattern = /^[a-z0-9]+@[a-z]+\.[a-z]+$/;
    var lettersAndNumbersPattern = /^[a-zA-ZčćšđžČĆŠĐŽ0-9\s]+$/;
    var numbersPattern = /^\d+$/;
    var phoneNumberPattern = /^\d{3}\/\d{4}-\d{5,}$/;


    var errorMessages = document.getElementsByClassName("errorr-message");
    for (var i = 0; i < errorMessages.length; i++) {
        errorMessages[i].textContent = "";
    }

    var isValid = true;

    if (!lettersOnlyPattern.test(name)) {
        document.getElementById("name-errorr").textContent = "Name should contain only letters.";
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

    if (!numbersPattern.test(year)) {
        document.getElementById("year-errorr").textContent = "Phone number should contain only numbers.";
        isValid = false;
    }

    if (!phoneNumberPattern.test(phone)) {
        document.getElementById("phone-errorr").textContent = "Phone number should contain only numbers and be in format 000/0000-00000.";
        isValid = false;
    }

    if (!emailPattern.test(email)) {
        document.getElementById("email-errorr").textContent = "Please enter a valid email address.";
        isValid = false;
    }

    if (nazivD != ""){
          if (!lettersAndNumbersPattern.test(nazivD)) {
        document.getElementById("naziv-errorr").textContent = "Name should contain letters and numbers.";
        isValid = false;
    }
    }



    if (isValid) {
        submitButtonAI.removeAttribute("disabled");
        updatetablerow(event);
    } else {
        submitButtonAI.setAttribute("disabled", "disabled");

}
}

function validateFormA(event) {
    event.preventDefault()
    var form = document.getElementById("addagencija-form");

    var name = form.elements["nameee"].value;
    var address = form.elements["address"].value;
    var year = form.elements["year"].value;
    var phone = form.elements["phone"].value;
    var email = form.elements["email"].value;

    var lettersOnlyPattern = /^[a-zA-ZčćšđžČĆŠĐŽ\s]+$/;
    var alphanumericPattern = /^[a-zA-Z0-9]+$/;
    var emailPattern = /^[a-z0-9]+@[a-z]+\.[a-z]+$/;
    var lettersAndNumbersPattern = /^[a-zA-ZčćšđžČĆŠĐŽ0-9\s]+$/;
    var numbersPattern = /^\d+$/;
    var phoneNumberPattern = /^\d{3}\/\d{4}-\d{5,}$/;


    var errorMessages = document.getElementsByClassName("errorrr-message");
    for (var i = 0; i < errorMessages.length; i++) {
        errorMessages[i].textContent = "";
    }

    var isValid = true;

    if (!lettersOnlyPattern.test(name)) {
        document.getElementById("name-errorrr").textContent = "Name should contain only letters.";
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

    if (!numbersPattern.test(year)) {
        document.getElementById("year-errorrr").textContent = "Year number should contain only numbers.";
        isValid = false;
    }

    if (!phoneNumberPattern.test(phone)) {
        document.getElementById("phone-errorrr").textContent = "Phone number should contain only numbers and be in format 000/0000-00000.";
        isValid = false;
    }

    if (!emailPattern.test(email)) {
        document.getElementById("email-errorrr").textContent = "Please enter a valid email address.";
        isValid = false;
    }

    if (isValid) {
        submitButtonA.removeAttribute("disabled");
        addAgencija();
    } else {
        submitButtonA.setAttribute("disabled", "disabled");

}
}


function enableSubmitButton() {
    submitButton.removeAttribute("disabled");
}

var inputFields = document.querySelectorAll("#signup-form input");
inputFields.forEach(function(input) {
    input.addEventListener("input", enableSubmitButton);
});

function enableSubmitButtonAI() {
    submitButtonAI.removeAttribute("disabled");
}

var inputFieldsAI = document.querySelectorAll("#changeagencija-form input");
inputFieldsAI.forEach(function(input) {
    input.addEventListener("input", enableSubmitButtonAI);
});

function enableSubmitButtonA() {
    submitButtonA.removeAttribute("disabled");
}

var inputFieldsA = document.querySelectorAll("#addagencija-form input");
inputFieldsA.forEach(function(input) {
    input.addEventListener("input", enableSubmitButtonA);
});


getKorisnici();

function resetErrorMessages() {
    var errorMessages = document.getElementsByClassName("error-message");
    for (var i = 0; i < errorMessages.length; i++) {
        errorMessages[i].textContent = "";
    }
}

function resetErrorMessagesA() {
    var errorrrMessages = document.getElementsByClassName("errorrr-message");
    for (var i = 0; i < errorrrMessages.length; i++) {
        errorrrMessages[i].textContent = "";
    }
}