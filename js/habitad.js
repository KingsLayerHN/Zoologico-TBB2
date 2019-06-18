
function save_habitad() {
    let clima = document.getElementById('clima').value;
    let nombre = document.getElementById('nombre').value;
    let vegetacion = document.getElementById('vegetacion').value;
    let id_zona= document.getElementById("select_zona").value;
    let zona;
    if(id_zona==='Ninguno'){
        alert("Debe seleccionar una zona o crear una para seleccionar");
    }else{
        if(nombre && clima && vegetacion){
            var nombre_zona = db.collection("zona").doc(id_zona);
            nombre_zona.get().then(function(doc) {
                if (doc.exists) {
                    let area=doc.data();
                    zona=area.nombre
                    //registro de del habitad
                    db.collection("habitad").add({
                        clima,
                        nombre,
                        vegetacion,
                        zona,
                        id_zona,
                        especie: 'Ninguno',
                        id_especie: 'Ninguno',
                        subespecie:'Ninguno',
                        id_subespecie: 'Ninguno'
                    }).then(function (docRef) {
                
                        console.log("Document written with ID: ", docRef.id);
                        alert("Habitad registrado registrado");
                        document.getElementById('clima').value = "";
                        document.getElementById('nombre').value = "";
                        document.getElementById('vegetacion').value = "";
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
            alert("Debe llenar todos los campos y seleccionar una zona")
        }
       
        
    }

 
}

function delete_habitad() {
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

function udpate_habitad(){
    //actualiza datos generales de la tabla
    var clave=document.getElementById("claven").value;
    if(clave){
        let nombre=document.getElementById("nombre").value;
        let vegetacion=document.getElementById("vegetacion").value;
        let clima=document.getElementById("clima").value;
        let id_zona=document.getElementById("select_zona").value;
        let zona;
        if(nombre && vegetacion && clima ){
            if(id_zona==='Ninguno'){
                alert("Debe llenar todos los campos y seleccionar una zona");
            }else{
                //se busca el nombre de la zona mediante el id
                var nombre_zona = db.collection("zona").doc(id_zona);
                nombre_zona.get().then(function(doc) {
                    if (doc.exists) {
                        let area=doc.data();
                        zona=area.nombre

                         //se actualiza el habitad
                        var washingtonRef = db.collection("habitad").doc(clave);
                        return washingtonRef.update({
                            nombre,
                            clima,
                            vegetacion,
                            zona,
                            id_zona
                        }).then(function() {
                            alert("Habitad actualizado");
                            console.log("Document successfully updated!");
                        }).catch(function(error) {
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
    }else{
        alert("Debe ingresar una clave y llenar todos los campos")
    }
}

function update_habitad_especies(){
    //actualiza la especie y subespecie en el habitad
    var clave=document.getElementById("id_habitad").value;
    if(clave){
        
        var id_especie=document.getElementById("select_especie").value;
        var id_subespecie= document.getElementById("select_subespecie").value;
        if(id_especie ==='Ninguno'){
            alert("Debes seleccionar una especie (subespecie es opcional)")
        }else{
            let especie;
            let subespecie;
            var nombre_especie = db.collection("especie").doc(id_especie);
            nombre_especie.get().then(function(doc) {
                if (doc.exists) {
                    let mounstruo=doc.data();
                    especie=mounstruo.especie;
    
                        //si subespecie es distinto de ninguno
                    if(id_subespecie ==='Ninguno'){
                            //actualizamos el registro......................
                        var washingtonRef = db.collection("habitad").doc(clave);
                        // Set the "especie" field of the city 'DC'
                        return washingtonRef.update({
                            especie,
                            id_especie,
                            subespecie,
                            id_subespecie
                        }).then(function () {
                            console.log("Document successfully updated!");
                            alert("habitad actualizada");
                        }).catch(function (error) {
                            // The document probably doesn't exist.
                            console.error("Error updating document: ", error);
                        });
                    }else{
                        var nombre_subespecie = db.collection("subespecie").doc(id_subespecie);
                        nombre_subespecie.get().then(function(doc) {
                            if (doc.exists) {
                                let mounstruo=doc.data();
                                subespecie=mounstruo.subespecie;
                                    //actualizamos el registro......................
                                var washingtonRef = db.collection("habitad").doc(clave);
                                // Set the "especie" field of the city 'DC'
                                return washingtonRef.update({
                                    especie,
                                    id_especie,
                                    subespecie,
                                    id_subespecie
                                }).then(function () {
                                    console.log("Document successfully updated!");
                                    alert("Subespecie actualizada");
                                    
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
        }
    }else{
        alert("Debe ingresar una clave y llenar todos los campos")
    }
       
}
function llenar_subespecies(value){
    if(value==='Ninguno'){
        //aqui no debe hacer nada.....
    }else{
        var selectobject=document.getElementById("select_subespecie");
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
function llenar_especies(){
    let firestore = firebase.firestore();
    firestore.collection('especie').get().then(data => {
        data.docs.forEach(function (doc, index) {
            let especie = doc.data();
            //console.log(user);
            var x = document.getElementById("select_especie");
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

function cargar_zonas(){
    var x = document.getElementById("select_zona");
    var option = document.createElement("option");
    let firestore = firebase.firestore();
    
    firestore.collection('zona').get().then(data => {
        data.docs.forEach(function (doc, index) {
            let zona = doc.data();
            option.text = zona.nombre;
            option.value=doc.id;
            x.add(option);
        });
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
            add_cell(row, habitad.vegetacion);
            add_cell(row, habitad.clima);
            add_cell(row, habitad.zona);
            add_cell(row, habitad.especie);
            add_cell(row, habitad.subespecie);

        });
    })
    function add_cell(tr, text) {
        var td = tr.insertCell();
        td.textContent = text;
        return td;
    }
}

refreshTable();
