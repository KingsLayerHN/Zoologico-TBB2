
function save_animal() {
    let nombre_comun = document.getElementById('nombre').value;
    let nombre_cientifico = document.getElementById('nombre_cientifico').value;
    let id_especie = document.getElementById('especie').value;
    let id_sub_especie = document.getElementById('subespecie').value;
    let pais = document.getElementById('pais').value;
    let edad = document.getElementById('edad').value;
    let peso = document.getElementById('peso').value;
    let continente = document.getElementById('continente').value;
    let cautividad = document.getElementById('cautiverio').value;
    if(id_especie==='Ninguno'){
        alert("Debe seleccionar una especie(subespecie es opcional)")
    }else{
        if(nombre_comun && nombre_cientifico && pais && edad && peso && continente && cautividad){
            let especie;
            let sub_especie="Ninguno";
            var nombre_especie = db.collection("especie").doc(id_especie);
            nombre_especie.get().then(function(doc) {
                if (doc.exists) {
                    let mounstruo=doc.data();
                    especie=mounstruo.especie;

                    //si subespecie es distinto de ninguno
                    if(id_sub_especie==='Ninguno'){
                     
                    }else{
                        var nombre_subespecie = db.collection("subespecie").doc(id_sub_especie);
                        nombre_subespecie.get().then(function(doc) {
                            if (doc.exists) {
                                let mounstruo=doc.data();
                                sub_especie=mounstruo.subespecie;
                            } else {
                                // doc.data() will be undefined in this case
                                console.log("No such document!");
                            }
                        }).catch(function(error) {
                            console.log("Error getting document:", error);
                        });
                    }
                    //Registrar nuevo animal wey
                    db.collection("animal").add({
                        nombre_comun,
                        nombre_cientifico,
                        especie,
                        id_especie,
                        sub_especie,
                        id_sub_especie,
                        cautividad,
                        edad,
                        peso,
                        pais,
                        continente
                    }).then(function (docRef) {
                        console.log("Document written with ID: ", docRef.id);
                        alert("Animal registrado")
                        document.getElementById('nombre').value = "";
                        document.getElementById('nombre_cientifico').value = "";
                        document.getElementById('pais').value = "";
                        document.getElementById('edad').value = "";
                        document.getElementById('peso').value = "";
                        document.getElementById('continente').value = "";
                        document.getElementById('cautiverio').value = "";
                
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
            alert("Debe llenar todos los campos y seleccionar una especie (subespecie es opcional)");
        }
    }
   
}
function update_animal(){
    if(document.getElementById('claven').value){
        let clave = document.getElementById('claven').value;
        let nombre_comun = document.getElementById('nombre').value;
        let nombre_cientifico = document.getElementById('nombre_cientifico').value;
        let id_especie = document.getElementById('especie').value;
        let id_sub_especie = document.getElementById('subespecie').value;
        let pais = document.getElementById('pais').value;
        let edad = document.getElementById('edad').value;
        let peso = document.getElementById('peso').value;
        let continente = document.getElementById('continente').value;
        let cautividad = document.getElementById('cautiverio').value;
        if(id_especie==='Ninguno'){
            alert("Debe seleccionar una especie(subespecie es opcional)");
        }else{
            if(nombre_comun && nombre_cientifico && pais && edad && peso && continente && cautividad){
                let especie;
                let sub_especie;
                var nombre_especie = db.collection("especie").doc(id_especie);
                nombre_especie.get().then(function(doc) {
                    if (doc.exists) {
                            let mounstruo=doc.data();
                            especie=mounstruo.especie;
        
                            //si subespecie es distinto de ninguno
                            alert(id_sub_especie)
                        if(id_sub_especie==='Ninguno'){
                                //actualizamos el registro......................
                            var washingtonRef = db.collection("animal").doc(clave);
                            alert(sub_especie);
                            // Set the "especie" field of the city 'DC'
                            return washingtonRef.update({
                                nombre_comun,
                                nombre_cientifico,
                                especie,
                                id_especie,
                                sub_especie,
                                id_sub_especie,
                                cautividad,
                                edad,
                                peso,
                                pais,
                                continente
                            }).then(function () {
                                console.log("Document successfully updated!");
                                alert("Subespecie actualizada")
                                document.getElementById('claven').value = "";
                                document.getElementById('especie').value = "";
                                
                            }).catch(function (error) {
                                // The document probably doesn't exist.
                                console.error("Error updating document: ", error);
                            });
                        }else{
                            alert("entra aqui");
                            var nombre_subespecie = db.collection("subespecie").doc(id_sub_especie);
                            nombre_subespecie.get().then(function(doc) {
                                if (doc.exists) {
                                    let mounstruo=doc.data();
                                    sub_especie=mounstruo.subespecie;
                                      //actualizamos el registro......................
                                    var washingtonRef = db.collection("animal").doc(clave);
                                    alert(sub_especie);
                                    // Set the "especie" field of the city 'DC'
                                    return washingtonRef.update({
                                        nombre_comun,
                                        nombre_cientifico,
                                        especie,
                                        id_especie,
                                        sub_especie,
                                        id_sub_especie,
                                        cautividad,
                                        edad,
                                        peso,
                                        pais,
                                        continente
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
                      
                    } else {
                        // doc.data() will be undefined in this case
                        console.log("No such document!");
                    }
                }).catch(function(error) {
                    console.log("Error getting document:", error);
                });
            }else{
                alert("Debe llenar todos los campos y seleccionar una especie (subespecie es opcional)");
            }
        }
    }else{
        alert("Debes ingresar clave o id para poder editar")
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
        alert("Ingrese clave para eliminar registro")
    }
}

function llenar_subespecies(value){
    if(value==='Ninguno'){
        //aqui no debe hacer nada.....
    }else{
        var selectobject=document.getElementById("subespecie");
        for (var i=0; i<selectobject.length; i++){
           selectobject.remove(i);
        }
        selectobject.innerHTML='';
        let firestore = firebase.firestore();
        //var xx=document.getElementById('subespecie');
        var op=document.createElement("option");
        op.text= "Seleccione opcion";
        op.value='Ninguno';
        selectobject.add(op)
        firestore.collection('subespecie').get().then(data => {
            data.docs.forEach(function (doc, index) {
                let subespecie = doc.data();
                //console.log(user);
                //var y = document.getElementById("subespecie");
                if(value === subespecie.id_especie){
                    var option2 = document.createElement("option");
                    option2.text = subespecie.subespecie;
                    option2.value = doc.id;
                    selectobject.add(option2);
                }
                
    
            });
        })
    }
    
}
function rellenar(){
    if (document.getElementById('claven').value) {
        var myclave = document.getElementById('claven').value;
        var docRef = db.collection("animal").doc(myclave);
        docRef.get().then(function (doc) {
            if (doc.exists) {
                let animal = doc.data();
                
                document.getElementById('nombre').value=animal.nombre_comun;
                document.getElementById('nombre_cientifico').value=animal.nombre_cientifico;
                document.getElementById('especie').value=animal.especie;
                document.getElementById('subespecie').value=animal.sub_especie;
                document.getElementById('pais').value=animal.pais;
                document.getElementById('edad').value=animal.edad;
                document.getElementById('peso').value=animal.peso;
                document.getElementById('continente').value=animal.continente;
                document.getElementById('cautiverio').value=animal.cautividad;
                
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
            option.value = doc.id;
            x.add(option);

        });
    })
    function add_cell(tr, text) {
        var td = tr.insertCell();
        td.textContent = text;
        return td;
    }
    
}

refreshTable();
