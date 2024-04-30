// változók a jelszó módosításához
const myInput = document.getElementById('editPassword');
const letter = document.getElementById('letter');
const capital = document.getElementById('capital');
const number = document.getElementById('number');
const length = document.getElementById('length');

// oldalról beúszó profil menü megjelenítése
const profile = document.getElementById('profile');
const offcanvas = new bootstrap.Offcanvas(document.getElementById('editProfile'));

profile.addEventListener('click', function () {
    offcanvas.show();
});

// felhasználó email címének kinyerése cookieból:
async function getUserEmail() {
    const res = await fetch('/getUserEmail');
    const data = await res.json();
    const email = data.userEmail;

    getUser(email);
}

// a felhasználó adatainak lekérdezése és oldalsó menübe írása valamint a felhasználó id-ja
async function getUser(emailFromCookie) {
    const res = await fetch(`/getUser/${emailFromCookie}`);
    const data = await res.json();

    const userid = data[0].userid;
    const email = data[0].email;
    const username = data[0].nick_name;
    const image = data[0].userImage;
    const role = data[0].role;
    const birthday = data[0].formattedBirthday ? data[0].formattedBirthday : "nincs megadva";
    document.getElementById('userID').value = userid;
    fetchProduct();

    let offcanvasBody = `
        <div class="col-sm-12 position-relative"> <!-- profil kép -->
            <img src="../images/${image}" alt="${username}" title="${username}" class="img-fluid mx-auto d-block" style="border-radius: 50%;" id="userImage">
            <button type="button" class="btn btn-secondary border-0 position-absolute" style="right: 30%; bottom: 20%; max-height: 200px;" onclick="editProfileImageModal('${email}')">
                <i class="fa-solid fa-pen"></i>
            </button>
        </div>

        <div class="row"> <!-- username -->
            <div class="col-3">
                <i class="fa-solid fa-user mt-3"></i>
            </div>

            <div class="col-6 p-0">
                <h5>Felhasználó</h5><br class="d-none">
                <h6 class="text-secondary" id="username">${username}</h6>
            </div>

            <div class="col-3">
                <button type="button" class="btn btn-secondary border-0 mt-2" onclick="editProfileUsernameModal('${email}')">
                    <i class="fa-solid fa-pen"></i>
                </button>
            </div>
        </div>

        <div class="row"> <!-- email -->
            <div class="col-3">
                <i class="fa-solid fa-envelope mt-3"></i>
            </div>

            <div class="col-6 p-0">
                <h5>E-mail</h5><br class="d-none">
                <h6 class="text-secondary" id="email">${email}</h6>
            </div>
        </div>

        <div class="row"> <!-- bithday -->
            <div class="col-3">
                <i class="fa-solid fa-cake-candles mt-3"></i>
            </div>

            <div class="col-6 p-0">
                <h5>Születési dátum</h5><br class="d-none">
                <h6 class="text-secondary" id="birthday">${birthday}</h6>

            </div>

            <div class="col-3">
                <button type="button" class="btn btn-dark border-0 mt-2" onclick="editProfileBirthdayModal('${email}')">
                    <i class="fa-solid fa-pen"></i>
                </button>
            </div>
        </div>

        <div class="row"> <!-- password -->
            <div class="col-3">
                <i class="fa-solid fa-lock mt-3"></i>
            </div>

            <div class="col-6 p-0">
                <h5>Jelszó</h5><br class="d-none">
                <h6 class="text-secondary" id="password">**********</h6>
            </div>

            <div class="col-3">
                <button type="button" class="btn btn-secondary border-0 mt-2" onclick="editProfilePasswordModal('${email}')">
                    <i class="fa-solid fa-pen"></i>
                </button>
            </div>
        </div>

        <div class="row"> <!-- role -->
            <div class="col-3">
                <i class="fa-solid fa-person mt-3"></i>
            </div>

            <div class="col-6 p-0">
                <h5>Szerepkör</h5><br class="d-none">
                <h6 class="text-secondary" id="role">${role === 0 ? "user" : "admin"}</h6>
            </div>
        </div>
    `;

    document.getElementById('offcanvasBody').innerHTML = offcanvasBody;
}

// a profilkép szerkesztésének modal ablakának megjelenítése
function editProfileImageModal(email) {
    const modal = new bootstrap.Modal(document.getElementById('editProfileImageModal'));
    const profilEmail = document.getElementById('editProfileImageModal');
    profilEmail.setAttribute('data-profilEmail', email);
    modal.show();
}

// a profilkép módosítása
async function editImage() {
    const modalElements = document.getElementById('editProfileImageModal');
    const modal = bootstrap.Modal.getInstance(modalElements);
    const email = modalElements.getAttribute('data-profilEmail');

    const image = document.getElementById('editImage').files[0];
    const formData = new FormData();
    formData.append('image', image);

    const res = await fetch(`/editUserImage/${email}`, {
        method: "PUT",
        body: formData
    });

    if (res.ok) {
        modal.hide();
        alert('Sikeres módosítás!');
        getUserEmail();
    }
}

// a username szerkesztésének modal ablakának megjelenítése
function editProfileUsernameModal(email) {
    const modal = new bootstrap.Modal(document.getElementById('editProfileUsernameModal'));
    const profilEmail = document.getElementById('editProfileUsernameModal');
    profilEmail.setAttribute('data-profilEmail', email);
    modal.show();
}

// a username módosítása
async function editUsername() {
    const modalElements = document.getElementById('editProfileUsernameModal');
    const modal = bootstrap.Modal.getInstance(modalElements);
    const email = modalElements.getAttribute('data-profilEmail');

    const username = document.getElementById('editUsername').value;

    const res = await fetch(`/editUsername/${email}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ username })
    });

    if (res.ok) {
        modal.hide();
        alert('Sikeres módosítás!');
        getUserEmail();
    }
}

// a születési dátum szerkesztésének modal ablakának megjelenítése
function editProfileBirthdayModal(email) {
    const modal = new bootstrap.Modal(document.getElementById('editProfileBirthdayModal'));
    const profilEmail = document.getElementById('editProfileBirthdayModal');
    profilEmail.setAttribute('data-profilEmail', email);
    modal.show();
}

// a születési dátum módosítása
async function editBirthday() {
    const modalElements = document.getElementById('editProfileBirthdayModal');
    const modal = bootstrap.Modal.getInstance(modalElements);
    const email = modalElements.getAttribute('data-profilEmail');

    const birthday = document.getElementById('editBirthday').value;

    const res = await fetch(`/editBirthday/${email}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ birthday })
    });

    if (res.ok) {
        modal.hide();
        alert('Sikeres módosítás!');
        getUserEmail();

    }
}

// a jelszó módosításának modal ablakának megjelenítése
function editProfilePasswordModal(email) {
    const modal = new bootstrap.Modal(document.getElementById('editProfilePasswordModal'));
    const profilEmail = document.getElementById('editProfilePasswordModal');
    profilEmail.setAttribute('data-profilEmail', email);
    modal.show();

    // Amikor beleklikkelünk a jelszó mezőbe, akkor megjelenik a message id-jű div
    myInput.onfocus = function () {
        document.getElementById("message").style.display = "block";
    }

    // Amikor nem vagyunk a jelszó mezőben, akkor eltűnik a message id-jű div
    myInput.onblur = function () {
        document.getElementById("message").style.display = "none";
    }

    myInput.onkeyup = function () {
        // Validate lowercase letters
        var lowerCaseLetters = /[a-z]/g;
        if (myInput.value.match(lowerCaseLetters)) {
            letter.classList.remove("invalid");
            letter.classList.add("valid");
        } else {
            letter.classList.remove("valid");
            letter.classList.add("invalid");
        }

        // Validate capital letters
        var upperCaseLetters = /[A-Z]/g;
        if (myInput.value.match(upperCaseLetters)) {
            capital.classList.remove("invalid");
            capital.classList.add("valid");
        } else {
            capital.classList.remove("valid");
            capital.classList.add("invalid");
        }

        // Validate numbers
        var numbers = /[0-9]/g;
        if (myInput.value.match(numbers)) {
            number.classList.remove("invalid");
            number.classList.add("valid");
        } else {
            number.classList.remove("valid");
            number.classList.add("invalid");
        }

        // Validate length
        if (myInput.value.length >= 8) {
            length.classList.remove("invalid");
            length.classList.add("valid");
        } else {
            length.classList.remove("valid");
            length.classList.add("invalid");
        }
    }
}

// a jelszó módosítása
async function editPassword() {
    const modalElements = document.getElementById('editProfilePasswordModal');
    const modal = bootstrap.Modal.getInstance(modalElements);
    const email = modalElements.getAttribute('data-profilEmail');

    const password = document.getElementById('editPassword').value;
    const password2 = document.getElementById('editPassword2').value;

    if (!password || !password2) {
        alert("Minden mezőt ki kell tölteni te balga!");
        return;
    }

    if (password.length < 8) {
        alert('A jelszónak legalább 8 karakter hosszúnak kell lenni te csacsi!');
        return;
    }

    if (password !== password2) {
        alert('A két jelszó nem egyezik meg te butus!');
        return;
    }

    const res = await fetch(`/editPassword/${email}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ password })
    });

    if (res.ok) {
        alert('Sikeres módosítás!');
        getUserEmail();
        modal.hide();
    }
}

// termékek lekérdezése
async function fetchProduct() {

    const response = await fetch('oltony');
    const termekek = await response.json();

    drawing(termekek);
}

// keresés a termekek között
document.getElementById('searchingForm').onsubmit = async function (event) {
    event.preventDefault();

    const searching = event.target.elements.searching.value;

    const res = await fetch('/searching/', {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ searching })
    });

    const sorozatok = await res.json();

    if (sorozatok.length === 0) {
        document.getElementById('product-list').innerHTML = '<h3 class="text-center m-4">Nincs találat</h3>';
    } else {
        drawing(sorozatok);
    }
}

// termékek kirajzoltatása
function drawing(termekek) {
    let seriesHTML = '<h1 class="mt-2 mb-2">Termékek</h1>';
    for (let termek of termekek) {
        seriesHTML += `
            <div class="col-xl-3 col-md-4 col-sm-6 my-2">
                <div class="card bg-dark text-white my-2 h-100">
                    <div class="card-header">
                        <img src="/images/${termek.image}" alt="${termek.brand}" title="${termek.name}" class="img img-fluid img-thumbnail mx-auto d-block">
                    </div>
                    <div class="card-body">
                        <h3>${termek.model}</h3>
                        <h5>${termek.brand}</h5>
                        <h3>${termek.price} Ft</h3>
                        <h5>${termek.stock} db</h5>
                    </div>
                    <div class="card-footer">
                    <button type="button" class="btn btn-outline-light border-0" onclick="cart(${termek.productid})">
                    <i class="fa-sharp fa-solid fa-basket-shopping fa-fade btn btn-outline-light" style="color: #ffffff;"></i>
                    </div>
                </div>
            </div>
        `
    }

    document.getElementById('product-list').innerHTML = seriesHTML;
}
// a kosár modal ablak megjelenítése
function cart(productid) {
    const modal = new bootstrap.Modal(document.getElementById('cartModal'));
    const id = document.getElementById('cartModal');
    id.setAttribute('data-productID', productid);
    modal.show();
}

// a rendelés elküldése
async function ordering() {
    const modalElements = document.getElementById('cartModal');
    const modal = bootstrap.Modal.getInstance(modalElements);
    const productid = modalElements.getAttribute('data-productID');

    const stock = document.getElementById('stock').value;
    console.log(productid, stock);
    const res = await fetch(`/ordering/${productid}`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ stock })
    })

    const data = await res.json();

    if (data.success) {
        modal.hide();
        buy(data.price, productid)
    } else {
        alert(`Csak ${data.available} db elérhető!`);
    }
}

async function buy(price, productid) {
    const modal = new bootstrap.Modal(document.getElementById('paymentModal'));
    const modalElement = document.getElementById('paymentModal');

    modalElement.setAttribute('data-price', price);
    modalElement.setAttribute('data-productID', productid);

    document.getElementById('amount').innerHTML = `${price} Ft`;
    modal.show();
}

async function payment() {
    const modalElements = document.getElementById('paymentModal');
    const modal = bootstrap.Modal.getInstance(modalElements);
    const price = modalElements.getAttribute('data-price');
    const productid = modalElements.getAttribute('data-productID');

    const userid = document.getElementById('userID').value;

    const res = await fetch('/payment', {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ price, productid, userid })
    });

    const data = await res.json();



    if (data.success) {
        modal.hide();
        alert("Sikeres vásárlás!");
        fetchProduct();
    }
}