
function save_animal() {
    alert("entro");
    let nombre_comun = document.getElementById('nombre').value;
    let nombre_cientifico = document.getElementById('nombre_cientifico').value;
    let pais = document.getElementById('pais').value;
    let edad = document.getElementById('edad').value;
    let peso = document.getElementById('peso').value;
    let continente = document.getElementById('continente').value;
    let cautividad = document.getElementById('cautiverio').value;
    let db = firebase().firestore();
    db.collection("animal").add({
        nombre_comun,
        nombre_cientifico,
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

function update_animal() {
    if (document.getElementById('claven').value) {
        let nombre_comun = document.getElementById('nombre').value;
        let nombre_cientifico = document.getElementById('nombre_cientifico').value;
        let pais = document.getElementById('pais').value;
        let edad = document.getElementById('edad').value;
        let peso = document.getElementById('peso').value;
        let especie = document.getElementById('especie').value;
        let sub_especie = document.getElementById('subespecie').value;
        let continente = document.getElementById('continente').value;
        let cautividad = document.getElementById('cautiverio').value;
        let clave = document.getElementById('claven').value;

        var washingtonRef = db.collection("animal").doc(clave);

        // Set the "animal" field of the city 'DC'
        return washingtonRef.update({
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
            .then(function () {
                console.log("Document successfully updated!");
                alert("Animal actualizado")
                document.getElementById('nombre').value = "";
                document.getElementById('nombre_cientifico').value = "";
                document.getElementById('pais').value = "";
                document.getElementById('edad').value = "";
                document.getElementById('peso').value = "";
                document.getElementById('continente').value = "";
                document.getElementById('cautiverio').value = "";
            })
            .catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
    } else {
        alert("Ingrese clave para modificar wey")
    }

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
        alert("Ingrese clave para eliminar wey")
    }
}