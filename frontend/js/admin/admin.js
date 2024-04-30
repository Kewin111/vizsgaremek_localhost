// Termékek lekérdezése
async function fetchProduct() {
    const response = await fetch('/oltony');
    const termekek = await response.json();

    drawing(termekek);
}

// Termékek felvétele
document.getElementById('create-oltony').onsubmit = async function (event) {
    event.preventDefault();

    const brand = event.target.elements.brand.value;
    const model = event.target.elements.model.value;
    const ar = event.target.elements.ar.value;
    const db = event.target.elements.db.value;
    const image = event.target.elements.image.files[0]
    console.log(brand, model, ar, db);
    const formData = new FormData();
    formData.append('brand', brand);
    formData.append('model', model);
    formData.append('ar', ar);
    formData.append('db', db);
    formData.append('image', image);

    const res = await fetch('/ujOltony', {
        method: "POST",
        body: formData
    });

    if (res.ok) {
        alert("Sikeres felvétel!");
        event.target.elements.brand.value = null;
        event.target.elements.model.value = null;
        event.target.elements.ar.value = null;
        event.target.elements.db.value = null;
        fetchProduct();
    } else {
        alert("Hiba a felvétel során!");
    }
}

// Termékek törlése
async function deleteProduct(id) {
    const confirmed = confirm("Biztosan törölni szeretnéd?");

    if (!confirmed) {       
        return;
    }

    const res = await fetch(`/oltony/${id}`, {
        method: "DELETE"
    });

    if (res.ok) {
        alert("Sikeres törlés!");
        fetchProduct();
    } else {
        alert("Hiba a törlés során!");
    }
}



// modal ablak mutatása, és a megfelelő id eltárolása a modal-on belül
async function editProduct(id) {
    console.log(id);
    const res = await (fetch(`/oltony/${id}`));
    const dataFromFetch = await res.json();

    const brand = dataFromFetch[0].brand;
    const model = dataFromFetch[0].model;
    const price = dataFromFetch[0].price;
    const stock = dataFromFetch[0].stock;

    document.getElementById('editBrand').value = brand;
    document.getElementById('editModel').value = model;
    document.getElementById('editAr').value = price;
    document.getElementById('editDb').value = stock;

    // ---
    // itt hozzáadjuk a sorozat id-ját a modal ablak attribútumaihoz
    // ---
    const modal = new bootstrap.Modal(document.getElementById('updateProductModal'));
    const productID = document.getElementById('updateProductModal');
    productID.setAttribute('data-productID', id);
    modal.show();
}

// a backend-el való kapcsolatfelvétel
async function updateProductData() {
    const modalElements = document.getElementById('updateProductModal');
    const id = modalElements.getAttribute('data-productID');
    const modal = bootstrap.Modal.getInstance(modalElements);

    const brand = document.getElementById('editBrand').value;
    const model = document.getElementById('editModel').value;
    const price = document.getElementById('editAr').value;
    const stock = document.getElementById('editDb').value;
    const image = document.getElementById('editProductImage').files[0];

    const formData = new FormData();
    formData.append('brand', brand);
    formData.append('model', model);
    formData.append('price', price);
    formData.append('stock', stock);
    formData.append('image', image);

    const res = await fetch(`/oltony/${id}`, {
        method: "PUT",
        body: formData
    });

    if (res.ok) {
        modal.hide();
        alert("Sikeres módosítás!");
        fetchProduct();
        resetInput();
    }
    else {
        alert("Hiba a szerkesztés során!");
    }
}

// modal ablak beviteli mezőinek kiürítése
function resetInput() {
    document.getElementById('editBrand').value = null;
    document.getElementById('editModel').value = null;
    document.getElementById('editAr').value = null;
    document.getElementById('editDb').value = null;
}

// keresés a termekek között
document.getElementById('searchingForm').onsubmit = async function (event) {
    event.preventDefault();

    const searching = event.target.elements.searching.value;

    const res = await fetch('/searching', {
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

// termekek kirajzoltatása
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
                        <button class="btn btn-outline-danger me-2" onclick="deleteProduct(${termek.productid})"><i class="fa-solid fa-trash fa-fade"></i></button>
                        <button class="btn btn-outline-danger me-2" onclick="editProduct(${termek.productid})"><i class="fa-solid fa-pen fa-fade" style="color: #0f66c2;"></i></button>
                    </div>
                </div>
            </div>
        `
    }

    document.getElementById('product-list').innerHTML = seriesHTML;
}