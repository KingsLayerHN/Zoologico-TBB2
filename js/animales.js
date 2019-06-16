
function save_animal(){
    alert("entro");
    let nombre_comun=document.getElementById('nombre').value;
    let nombre_cientifico=document.getElementById('nombre_cientifico').value;
    let pais=document.getElementById('pais').value;
    let edad=document.getElementById('edad').value;
    let peso=document.getElementById('peso').value;
    let continente=document.getElementById('continente').value;
    let cautividad=document.getElementById('cautiverio').value;
    let db=firebase().firestore();
    db.collection("animal").add({
        nombre_comun,
        nombre_cientifico,
        cautividad,
        edad,
        peso,
        pais,
        continente
    })
    .then(function(docRef) {
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
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

function update_animal(){
    let nombre_comun=document.getElementById('nombre').value;
    let nombre_cientifico=document.getElementById('nombre_cientifico').value;
    let pais=document.getElementById('pais').value;
    let edad=document.getElementById('edad').value;
    let peso=document.getElementById('peso').value;
    let continente=document.getElementById('continente').value;
    let cautividad=document.getElementById('cautiverio').value;
    let clave=document.getElementById('id_animal').value;
    let db=firebase().firestore();
    var washingtonRef = db.collection("animal").doc(clave);

    // Set the "animal" field of the city 'DC'
    return washingtonRef.update({
        nombre_comun,
        nombre_cientifico,
        cautividad,
        edad,
        peso,
        pais,
        continente
    })
    .then(function() {
        console.log("Document successfully updated!");
    })
    .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
}