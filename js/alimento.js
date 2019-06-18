function save_alimento(){
    let id_empleado=document.getElementById('empleado').value;
    let id_animal=document.getElementById('animal').value;
    let fecha=document.getElementById('fecha').value;
    let descripcion=document.getElementById('descripcion').value;
    let tomas=document.getElementById('tomas').value;

    if(id_empleado&& id_animal && fecha){
        let cuidador;
        let animal;
        let especie;
        let empleado;
        var nombre_cuidador = db.collection("empleados").doc(id_empleado);
        nombre_cuidador.get().then(function (doc) {
            if (doc.exists) {
                let mounstruo = doc.data();
                empleado = mounstruo.nombre;

                var nombre_animal = db.collection('animal').doc(id_animal);
                nombre_animal.get().then(function (doc) {
                    if (doc.exists) {
                        let vipers = doc.data();
                        animal = vipers.nombre_comun;
                        especie = vipers.especie;
                        //Registrar nuevo animal wey
                        db.collection("historial_alimenticio").add({
                            empleado,
                            id_empleado,
                            animal,
                            id_animal,
                            especie,
                            fecha,
                            descripcion,
                            tomas
                        }).then(function (docRef) {
                            console.log("Document written with ID: ", docRef.id);
                            alert("Mantenimiento de zonas registrado")
                            document.getElementById('descripcion').value = "";

                        }).catch(function (error) {
                            console.error("Error adding document: ", error);
                        });
                    }//fin doc exist
                });

            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    }
}
function update_alimento(){
    if(document.getElementById('claven').value){
        let id_empleado=document.getElementById('empleado').value;
        let id_animal=document.getElementById('animal').value;
        let fecha=document.getElementById('fecha').value;
        let descripcion=document.getElementById('descripcion').value;
        let tomas=document.getElementById('tomas').value;
        let clave =document.getElementById('claven').value;
        if(id_empleado&& id_animal && fecha){
            let cuidador;
            let animal;
            let especie;
            let empleado;
            var nombre_cuidador = db.collection("empleados").doc(id_empleado);
            nombre_cuidador.get().then(function (doc) {
                if (doc.exists) {
                    let mounstruo = doc.data();
                    empleado = mounstruo.nombre;
    
                    var nombre_animal = db.collection('animal').doc(id_animal);
                    nombre_animal.get().then(function (doc) {
                        if (doc.exists) {
                            let vipers = doc.data();
                            animal = vipers.nombre_comun;
                            especie = vipers.especie;
                                //actualizamos el registro......................
                                var washingtonRef = db.collection("historial_alimenticio").doc(clave);
                                return washingtonRef.update({
                                    empleado,
                                    id_empleado,
                                    animal,
                                    id_animal,
                                    especie,
                                    fecha,
                                    descripcion,
                                    tomas
                                }).then(function () {
                                    console.log("Document successfully updated!");
                                    alert("Historial actualizado")
                            
                                    
                                }).catch(function (error) {
                                    // The document probably doesn't exist.
                                    console.error("Error updating document: ", error);
                                });
                        }//fin doc exist
                    });
    
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch(function (error) {
                console.log("Error getting document:", error);
            });
        }
    }else{
        alert("Ingresa una claveeeee");
    }
   
}

function delete_alimento(){
    if (document.getElementById('claven').value) {
        var myclave = document.getElementById('claven').value;

        db.collection("historial_alimenticio").doc(myclave).delete().then(function () {
            alert("El registro de historial ha sido eliminado, refresca la pagina");
            console.log("Document successfully deleted!");
        }).catch(function (error) {
            console.error("Error removing document: ", error);
        });
    } else {
        alert("Ingrese clave para eliminar registro")
    }
}
function llenar_formulario(){
    var selectobject = document.getElementById("empleado");
    for (var i = 0; i < selectobject.length; i++) {
        selectobject.remove(i);
    }
    selectobject.innerHTML = '';
    var op = document.createElement("option");
    op.text = "Seleccione opcion";
    op.value = 'Ninguno';
    selectobject.add(op);
    let firestore = firebase.firestore();
    firestore.collection('empleados').get().then(data => {
        data.docs.forEach(function (doc, index) {
            let especie = doc.data();
            //console.log(user);
            if(especie.puesto === 'Cuidador'){
                var option = document.createElement("option");
                option.text = especie.nombre;
                option.value = doc.id;
                selectobject.add(option);
            }
          

        });
    })
    //llenando los animales----------------------
    var selectobject2 = document.getElementById("animal");
    for (var i = 0; i < selectobject2.length; i++) {
        selectobject2.remove(i);
    }
    selectobject2.innerHTML = '';
    var op2 = document.createElement("option");
    op2.text = "Seleccione opcion";
    op2.value = 'Ninguno';
    selectobject2.add(op2);
    let firestore2 = firebase.firestore();
    firestore2.collection('animal').get().then(data => {
        data.docs.forEach(function (doc, index) {
            let especie = doc.data();
            //console.log(user);
            var option = document.createElement("option");
            option.text = especie.nombre_comun;
            option.value = doc.id;
            selectobject2.add(option);
        

        });
    })
}
function refreshTable() {
    var table = document.getElementById('alimento_table').getElementsByTagName('tbody')[0] // Tabla de datos
    let firestore = firebase.firestore();
    firestore.collection('historial_alimenticio').get().then(data => {
        data.docs.forEach(function (doc, index) {
            let limpieza = doc.data();
            var row = table.insertRow();
            row.key = doc.id;
            // console.log(row.key);
            add_cell(row, doc.id);
            add_cell(row, limpieza.empleado);
            add_cell(row, limpieza.animal);
            add_cell(row, limpieza.especie);
            add_cell(row, limpieza.fecha);
            add_cell(row, limpieza.descripcion);
            add_cell(row, limpieza.tomas);



        });
    })
    function add_cell(tr, text) {
        var td = tr.insertCell();
        td.textContent = text;
        return td;
    }
}

refreshTable();