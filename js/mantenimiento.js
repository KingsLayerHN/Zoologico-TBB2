function save_mantenimiento() {
    let id_zona = document.getElementById('zona').value;
    let id_habitad = document.getElementById('habitad').value;
    let id_empleado = document.getElementById('empleado').value;
    let descripcion = document.getElementById('descripcion').value;

    if (id_zona !== 'Ninguno' || id_habitad !== 'Ninguno' || id_empleado !== 'Ninguno') {
        if (descripcion) {
            let zona;
            let habitad;
            let empleado;
            var nombre_zona = db.collection("zona").doc(id_zona);
            nombre_zona.get().then(function (doc) {
                if (doc.exists) {
                    let mounstruo = doc.data();
                    zona = mounstruo.nombre;

                    var nombre_habitad = db.collection('habitad').doc(id_habitad);
                    nombre_habitad.get().then(function (doc) {
                        if (doc.exists) {
                            let vipers = doc.data();
                            habitad = vipers.nombre;

                            var nombre_habitad = db.collection('empleados').doc(id_empleado);
                            nombre_habitad.get().then(function (doc) {
                                if (doc.exists) {
                                    let vipers = doc.data();
                                    empleado = vipers.nombre;

                                    //Registrar nuevo animal wey
                                    db.collection("mantenimiento_zonas").add({
                                        zona,
                                        id_zona,
                                        habitad,
                                        id_habitad,
                                        empleado,
                                        id_empleado,
                                        descripcion
                                    }).then(function (docRef) {
                                        console.log("Document written with ID: ", docRef.id);
                                        alert("Mantenimiento de zonas registrado")
                                        document.getElementById('descripcion').value = "";

                                    }).catch(function (error) {
                                        console.error("Error adding document: ", error);
                                    });
                                }//fin doc exist
                            });
                        }
                    });

                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch(function (error) {
                console.log("Error getting document:", error);
            });
        } else {
            alert("Debes llenar la descripcion del trabajo")
        }
    } else {
        alert("Debes llenar los campos y seleccionar las opciones")
    }
}
function update_mantenimiento() {
    if (document.getElementById('claven').value) {
        let clave = document.getElementById('claven').value;
        let id_zona = document.getElementById('zona').value;
        let id_habitad = document.getElementById('habitad').value;
        let id_empleado = document.getElementById('empleado').value;
        let descripcion = document.getElementById('descripcion').value;
        if (id_zona !== 'Ninguno' || id_habitad !== 'Ninguno' || id_empleado !== 'Ninguno') {
            if (descripcion) {
                let zona;
                let habitad;
                let empleado;
                var nombre_zona = db.collection("zona").doc(id_zona);
                nombre_zona.get().then(function (doc) {
                    if (doc.exists) {
                        let mounstruo = doc.data();
                        zona = mounstruo.nombre;

                        var nombre_habitad = db.collection('habitad').doc(id_habitad);
                        nombre_habitad.get().then(function (doc) {
                            if (doc.exists) {
                                let vipers = doc.data();
                                habitad = vipers.nombre;

                                var nombre_habitad = db.collection('empleados').doc(id_empleado);
                                nombre_habitad.get().then(function (doc) {
                                    if (doc.exists) {
                                        let vipers = doc.data();
                                        empleado = vipers.nombre;

                                             //actualizamos el registro......................
                                        var washingtonRef = db.collection("mantenimiento_zonas").doc(clave);
                                        return washingtonRef.update({
                                            zona,
                                            id_zona,
                                            habitad,
                                            id_habitad,
                                            empleado,
                                            id_empleado,
                                            descripcion
                                        }).then(function () {
                                            console.log("Document successfully updated!");
                                            alert("Mantemimiento actualizado")
                                      
                                            
                                        }).catch(function (error) {
                                            // The document probably doesn't exist.
                                            console.error("Error updating document: ", error);
                                        });
                                    }//fin doc exist
                                });
                            }
                        });

                    } else {
                        // doc.data() will be undefined in this case
                        console.log("No such document!");
                    }
                }).catch(function (error) {
                    console.log("Error getting document:", error);
                });
            } else {
                alert("Debes llenar la descripcion del trabajo")
            }
        } else {
            alert("Debes llenar los campos y seleccionar las opciones")
        }
    } else {
        alert("Debe ingresar una clave poderooosaaa")
    }
}

function eliminate_mantenimiento(){
    if (document.getElementById('claven').value) {
        var myclave = document.getElementById('claven').value;

        db.collection("mantenimiento_zonas").doc(myclave).delete().then(function () {
            alert("El registro de mantenimiento ha sido eliminado, refresca la pagina");
            console.log("Document successfully deleted!");
        }).catch(function (error) {
            console.error("Error removing document: ", error);
        });
    } else {
        alert("Ingrese clave para eliminar registro")
    }
}
function llenar_formulario() {
    var selectobject = document.getElementById("zona");
    for (var i = 0; i < selectobject.length; i++) {
        selectobject.remove(i);
    }
    selectobject.innerHTML = '';
    var op = document.createElement("option");
    op.text = "Seleccione opcion";
    op.value = 'Ninguno';
    selectobject.add(op);
    let firestore = firebase.firestore();
    firestore.collection('zona').get().then(data => {
        data.docs.forEach(function (doc, index) {
            let especie = doc.data();
            //console.log(user);
            var option = document.createElement("option");
            option.text = especie.nombre;
            option.value = doc.id;
            selectobject.add(option);

        });
    })
    //llenando los empleados----------------------
    var selectobject2 = document.getElementById("empleado");
    for (var i = 0; i < selectobject2.length; i++) {
        selectobject2.remove(i);
    }
    selectobject2.innerHTML = '';
    var op2 = document.createElement("option");
    op2.text = "Seleccione opcion";
    op2.value = 'Ninguno';
    selectobject2.add(op2);
    let firestore2 = firebase.firestore();
    firestore2.collection('empleados').get().then(data => {
        data.docs.forEach(function (doc, index) {
            let especie = doc.data();
            //console.log(user);
            if (especie.puesto === 'Mantenimiento') {
                var option = document.createElement("option");
                option.text = especie.nombre;
                option.value = doc.id;
                selectobject2.add(option);
            }

        });
    })
}
function llenar_habitad(value) {
    if (value === 'Ninguno') {
        //aqui no debe hacer nada.....
    } else {
        var selectobject = document.getElementById("habitad");
        for (var i = 0; i < selectobject.length; i++) {
            selectobject.remove(i);
        }
        selectobject.innerHTML = '';
        let firestore = firebase.firestore();
        //var xx=document.getElementById('subespecie');
        var op = document.createElement("option");
        op.text = "Seleccione opcion";
        op.value = 'Ninguno';
        selectobject.add(op)
        firestore.collection('habitad').get().then(data => {
            data.docs.forEach(function (doc, index) {
                let especie = doc.data();
                //console.log(user);
                //var y = document.getElementById("subespecie");
                if (value === especie.id_zona) {
                    var option2 = document.createElement("option");
                    option2.text = especie.nombre;
                    option2.value = doc.id;
                    selectobject.add(option2);
                }

            });
        })
    }
}
function refreshTable() {
    var table = document.getElementById('mantenimiento_table').getElementsByTagName('tbody')[0] // Tabla de datos
    let firestore = firebase.firestore();
    firestore.collection('mantenimiento_zonas').get().then(data => {
        data.docs.forEach(function (doc, index) {
            let limpieza = doc.data();
            var row = table.insertRow();
            row.key = doc.id;
            // console.log(row.key);
            add_cell(row, doc.id);
            add_cell(row, limpieza.zona);
            add_cell(row, limpieza.habitad);
            add_cell(row, limpieza.empleado);
            add_cell(row, limpieza.descripcion);



        });
    })
    function add_cell(tr, text) {
        var td = tr.insertCell();
        td.textContent = text;
        return td;
    }
}

refreshTable();