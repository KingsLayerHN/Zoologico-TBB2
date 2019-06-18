function save_zona() {
    let nombre = document.getElementById('nombre').value;
    let extension = document.getElementById('extension').value;
    if(nombre && extension){
        db.collection("zona").add({
            nombre,
            extension
        }).then(function (docRef) {
    
            console.log("Document written with ID: ", docRef.id);
            alert("zona registrada")
            document.getElementById('nombre').value = "";
            document.getElementById('extension').value = "";

        }).catch(function (error) {
            console.error("Error adding document: ", error);
        });
    }else{
        alert("Debes llenar todos los campos");
    }
    
}

function eliminate_zona() {
    if (document.getElementById('claven').value) {
        var myclave = document.getElementById('claven').value;

        db.collection("zona").doc(myclave).delete().then(function () {
            alert("El registro de zona ha sido eliminado, refresca la pagina");
            console.log("Document successfully deleted!");
        }).catch(function (error) {
            console.error("Error removing document: ", error);
        });
    } else {
        alert("Ingrese clave para eliminar registro")
    }
}
function update_zona(){
    var clave=document.getElementById("claven").value;
    if(clave){
        
        var nombre=document.getElementById("nombre").value;
        var extension= document.getElementById("extension").value;
        if(nombre && extension){
            var washingtonRef = db.collection("zona").doc(clave);
            return washingtonRef.update({
                nombre,
                extension
            }).then(function() {
                alert("Actualizacion de zona exitosa")
                console.log("Document successfully updated!");
            }).catch(function(error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
        }else{
            alert("Debes llenar los campos ")
        }
        
    }else{
        alert("Debe ingresar una clave y llenar todos los campos")
    }
    
}

function rellenar() {
    if (document.getElementById('claven').value) {
        var myclave = document.getElementById('claven').value;
        var docRef = db.collection("zona").doc(myclave);
        docRef.get().then(function (doc) {
            if (doc.exists) {
                let zona = doc.data();
                document.getElementById('nombre').value = zona.nombre;
                document.getElementById('extension').value = zona.extension;
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
    var table = document.getElementById('zona_table').getElementsByTagName('tbody')[0] // Tabla de datos
    let firestore = firebase.firestore();
    firestore.collection('zona').get().then(data => {
        data.docs.forEach(function (doc, index) {
            let zona = doc.data();

            //console.log(user);
            var row = table.insertRow();
            row.key = doc.id;
            // console.log(row.key);
            add_cell(row, doc.id);
            add_cell(row, zona.extension);
            add_cell(row, zona.nombre);
            

        });
    })
    function add_cell(tr, text) {
        var td = tr.insertCell();
        td.textContent = text;
        return td;
    }
}

refreshTable();