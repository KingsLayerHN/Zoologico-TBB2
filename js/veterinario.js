
function update_veterinario(){
    if(document.getElementById('claven').value){
        let clave=document.getElementById('claven').value;
        let id_especie = document.getElementById('especie').value;
        var docRef = db.collection("especie").doc(id_especie);
        docRef.get().then(function (doc) {
            if (doc.exists) {
                let animal = doc.data();
                let especie = animal.especie;
                var washingtonRef = db.collection("empleados").doc(clave);
                return washingtonRef.update({
                    id_especie,
                    especie
                }).then(function () {
                    console.log("Document successfully updated!");
                    alert("Se actualizo la especie asignada");
                    
                }).catch(function (error) {
                    // The document probably doesn't exist.
                    console.error("Error updating document: ", error);
                });
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    }else{
        alert("Debe ingresar una clave poderooosaaa")
    }
}
function llenar_especies(){
    var selectobject=document.getElementById("especie");
    for (var i=0; i<selectobject.length; i++){
        selectobject.remove(i);
    }
    selectobject.innerHTML='';
    var op=document.createElement("option");
    op.text= "Seleccione opcion";
    op.value='Ninguno';
    selectobject.add(op);
    let firestore = firebase.firestore();
    firestore.collection('especie').get().then(data => {
        data.docs.forEach(function (doc, index) {
            let especie = doc.data();
            //console.log(user);
            var option = document.createElement("option");
            option.text = especie.especie;
            option.value = doc.id;
            selectobject.add(option);

        });
    })
}
function refreshTable() {
    var table = document.getElementById('veterinario_table').getElementsByTagName('tbody')[0] // Tabla de datos
    let firestore = firebase.firestore();
    firestore.collection('empleados').get().then(data => {
        data.docs.forEach(function (doc, index) {
            let empleado = doc.data();

            if(empleado.puesto === 'Veterinario'){
                var row = table.insertRow();
                row.key = doc.id;
                // console.log(row.key);
                add_cell(row, doc.id);
                add_cell(row, empleado.nombre);
                add_cell(row, empleado.puesto);
                add_cell(row, empleado.especie);
            }
            

        });
    })
    function add_cell(tr, text) {
        var td = tr.insertCell();
        td.textContent = text;
        return td;
    }
}

refreshTable();