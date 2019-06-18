
function save_subespecie() {
    
    let subespecie = document.getElementById('subespecie').value;
    let id_especie = document.getElementById('especie').value;
    let especie;
    if(id_especie==='Ninguno'){
        alert("Debe seleccionar una especie");
    }else{
        if(subespecie){
        
            var nombre_especie = db.collection("especie").doc(id_especie);
            nombre_especie.get().then(function(doc) {
                if (doc.exists) {
                    alert("Doc existe");
                    let especie2=doc.data();
                    especie=especie2.especie;
                    //Registra nueva subespecie
                    db.collection("subespecie").add({
                        subespecie,
                        especie,
                        id_especie
                    }).then(function (docRef) {
                
                        console.log("Document written with ID: ", docRef.id);
                        alert("Sub-especie registrada")
                        document.getElementById('subespecie').value = "";
                       
                    }).catch(function (error) {
                        console.error("Error adding document: ", error);
                    });
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
           
        }else{
            alert("Debe llenar los campos y seleccionar una especie");
        }
    }
    

}
function update_subespecie() {
    if (document.getElementById('claven').value) {
        let subespecie = document.getElementById('subespecie').value;
        let clave = document.getElementById('claven').value;
        let id_especie = document.getElementById('especie').value;
        let especie;
        if(id_especie==='Ninguno'){
            alert("Debe seleccionar una especie");
        }else{
            if(subespecie){
                var nombre_especie = db.collection("especie").doc(id_especie);
                nombre_especie.get().then(function(doc) {
                    if (doc.exists) {
                        let mounstruo=doc.data();
                        especie=mounstruo.especie;

                        //actualizamos el registro......................
                        var washingtonRef = db.collection("subespecie").doc(clave);

                        // Set the "especie" field of the city 'DC'
                        return washingtonRef.update({
                            subespecie,
                            especie,
                            id_especie
                        }).then(function () {
                            console.log("Document successfully updated!");
                            alert("Subespecie actualizada")
                            document.getElementById('claven').value = "";
                            document.getElementById('especie').value = "";
                            
                        }).catch(function (error) {
                            // The document probably doesn't exist.
                            console.error("Error updating document: ", error);
                        });
                    } else {
                        // doc.data() will be undefined in this case
                        console.log("No such document!");
                    }
                }).catch(function(error) {
                    console.log("Error getting document:", error);
                });
            }
        }
        
    } else {
        alert("Ingrese clave para modificar wey")
    }
}
function delete_subespecie() {
    if (document.getElementById('claven').value) {
        var myclave = document.getElementById('claven').value;

        db.collection("subespecie").doc(myclave).delete().then(function () {
            alert("El registro de subespecie ha sido eliminado, refresca la pagina");
            console.log("Document successfully deleted!");
        }).catch(function (error) {
            console.error("Error removing document: ", error);
        });
    } else {
        alert("Ingrese clave para eliminar wey")
    }
}
function llenar_especies(){
    let firestore = firebase.firestore();
    firestore.collection('especie').get().then(data => {
        data.docs.forEach(function (doc, index) {
            let especie = doc.data();
            //console.log(user);
            var x = document.getElementById("especie");
            var option = document.createElement("option");
            option.text = especie.especie;
            option.value = doc.id;
            x.add(option);
        });
    })
}

function rellenar() {
    if (document.getElementById('claven').value) {
        var myclave = document.getElementById('claven').value;
        var docRef = db.collection("subespecie").doc(myclave);
        docRef.get().then(function (doc) {
            if (doc.exists) {
                let subespecie = doc.data();
                document.getElementById('subespecie').value = subespecie.subespecie;
                document.getElementById('especie').value = subespecie.especie;
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

function refreshTable(){
    var table = document.getElementById('subespecie_table').getElementsByTagName('tbody')[0] // Tabla de datos
    let firestore = firebase.firestore();
    firestore.collection('subespecie').get().then(data => {
        data.docs.forEach(function (doc, index) {
            let subespecie = doc.data();
            //console.log(user);
            var row = table.insertRow();
            row.key = doc.id;
            // console.log(row.key);
            add_cell(row, doc.id);
            add_cell(row, subespecie.subespecie);
            add_cell(row, subespecie.especie);
        });
    })
    function add_cell(tr, text) {
        var td = tr.insertCell();
        td.textContent = text;
        return td;
    } 
}

refreshTable();