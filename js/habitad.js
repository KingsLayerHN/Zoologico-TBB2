
function save_habitad() {
    let clima = document.getElementById('clima').value;
    let nombre = document.getElementById('nombre').value;
    let vegetacion = document.getElementById('vegetacion').value;

    db.collection("habitad").add({
        clima,
        nombre,
        vegetacion,
        
    })
        .then(function (docRef) {

            console.log("Document written with ID: ", docRef.id);
            alert("Habitad registrado registrado");
            document.getElementById('clima').value = "";
            document.getElementById('nombre').value = "";
            document.getElementById('vegetacion').value = "";
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });
}

function deleteHabitad() {
    if (document.getElementById('claven').value) {
        var myclave = document.getElementById('claven').value;

        db.collection("habitad").doc(myclave).delete().then(function () {
            alert("El registro de habitad ha sido eliminado, refresca la pagina");
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
        var docRef = db.collection("habitad").doc(myclave);
        docRef.get().then(function (doc) {
            if (doc.exists) {
                let habitad = doc.data();
                document.getElementById('clima').value = habitad.clima;
                document.getElementById('nombre').value = habitad.nombre;
                document.getElementById('vegetacion').value = habitad.vegetacion;
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

function fill_habitad_list () {
    let firestore = firebase.firestore();
    firestore.collection('especie_habitad').get().then(docs => {
        docs.forEach((doc) => {
            let eh = doc.data();
            if (eh) {
                eh.id = doc.id;
                firestore.collection('especie').doc(eh.id_especie).get().then(doc => {
                    let especie = doc.data();
                    if (especie) {
                        firestore.collection('habitad').doc(eh.id_habitad).get().then(doc_habitad => {
                            let habitad = doc_habitad.data();
                            // Llena la tabla con especie y habitad
                        });
                    }
                })
            }
        })
    })
}

//mostrar datos en tabla
function refreshTable() {
    var table = document.getElementById('habitad_table').getElementsByTagName('tbody')[0] // Tabla de datos
    let firestore = firebase.firestore();
    firestore.collection('habitad').get().then(data => {
        data.docs.forEach(function (doc, index) {
            let habitad = doc.data();

            //console.log(user);
            var row = table.insertRow();
            row.key = doc.id;
            // console.log(row.key);
            add_cell(row, doc.id);
            add_cell(row, habitad.nombre);
            add_cell(row, habitad.clima);
            add_cell(row, habitad.vegetacion);

        });
    })
    function add_cell(tr, text) {
        var td = tr.insertCell();
        td.textContent = text;
        return td;
    }
}

refreshTable();
