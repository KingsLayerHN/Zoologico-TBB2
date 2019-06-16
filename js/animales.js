
function save_animal() {
    let nombre_comun = document.getElementById('nombre').value;
    let nombre_cientifico = document.getElementById('nombre_cientifico').value;
    let especie = document.getElementById('especie').value;
    let sub_especie = document.getElementById('subespecie').value;
    let pais = document.getElementById('pais').value;
    let edad = document.getElementById('edad').value;
    let peso = document.getElementById('peso').value;
    let continente = document.getElementById('continente').value;
    let cautividad = document.getElementById('cautiverio').value;
    db.collection("animal").add({
        nombre_comun,
        nombre_cientifico,
        especie,
        sub_especie,
        cautividad,
        edad,
        peso,
        pais,
        continente
    })
        .then(function (docRef) {

            console.log("Document written with ID: ", docRef.id);
            alert("Animal registrado")
            document.getElementById('nombre').value = "";
            document.getElementById('nombre_cientifico').value = "";
            document.getElementById('pais').value = "";
            document.getElementById('edad').value = "";
            document.getElementById('peso').value = "";
            document.getElementById('continente').value = "";
            document.getElementById('cautiverio').value = "";

        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });
}

function eliminate_animal() {
    if (document.getElementById('claven').value) {
        var myclave = document.getElementById('claven').value;

        db.collection("animal").doc(myclave).delete().then(function () {
            alert("El registro de animal ha sido eliminado, refresca la pagina");
            console.log("Document successfully deleted!");
        }).catch(function (error) {
            console.error("Error removing document: ", error);
        });
    } else {
        alert("Ingrese clave para eliminar registro")
    }
}

function rellenar() {
    if (document.getElementById('claven').value) {
        var myclave = document.getElementById('claven').value;
        var docRef = db.collection("animal").doc(myclave);
        docRef.get().then(function (doc) {
            if (doc.exists) {
                let animal = doc.data();
                document.getElementById('nombre').value = animal.nombre_comun;
                document.getElementById('nombre_cientifico').value = animal.nombre_cientifico;
                document.getElementById('pais').value = animal.pais;
                document.getElementById('edad').value = animal.edad;
                document.getElementById('peso').value = animal.peso;
                document.getElementById('continente').value = animal.continente;
                document.getElementById('cautiverio').value = animal.cautividad;
                console.log("Document data:", doc.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    } else {
        alert("Debe porporcionar una clave valida para rellenar los campos");
    }
}

//mostrar datos en tabla
function refreshTable() {
    var table = document.getElementById('animal_table').getElementsByTagName('tbody')[0] // Tabla de datos
    let firestore = firebase.firestore();
    firestore.collection('animal').get().then(data => {
        data.docs.forEach(function (doc, index) {
            let animal = doc.data();

            //console.log(user);
            var row = table.insertRow();
            row.key = doc.id;
            // console.log(row.key);
            add_cell(row, doc.id);
            add_cell(row, animal.nombre_comun);
            add_cell(row, animal.nombre_cientifico);
            add_cell(row, animal.pais);
            add_cell(row, animal.edad);
            add_cell(row, animal.peso);
            add_cell(row, animal.continente);
            add_cell(row, animal.cautividad);
            add_cell(row, animal.especie);
            add_cell(row, animal.sub_especie);

        });
    })
    firestore.collection('especie').get().then(data => {
        data.docs.forEach(function (doc, index) {
            let especie = doc.data();
            //console.log(user);
            var x = document.getElementById("especie");
            var option = document.createElement("option");
            option.text = especie.especie;
            option.value = especie.especie;
            x.add(option);

        });
    })
    firestore.collection('subespecie').get().then(data => {
        data.docs.forEach(function (doc, index) {
            let subespecie = doc.data();
            //console.log(user);
            var y = document.getElementById("subespecie");
            var option2 = document.createElement("option");
            option2.text = subespecie.subespecie;
            option2.value = subespecie.subespecie;
            y.add(option2);

        });
    })
    function add_cell(tr, text) {
        var td = tr.insertCell();
        td.textContent = text;
        return td;
    }
}

refreshTable();
