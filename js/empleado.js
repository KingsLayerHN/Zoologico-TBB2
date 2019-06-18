
function save_empleado(){
    let nombre= document.getElementById('nombre').value;
    let edad = document.getElementById('edad').value;
    let genero = document.getElementById('genero').value;
    let direccion= document.getElementById("direccion").value;
    let fecha_contrato = document.getElementById('fecha').value;
    let puesto = document.getElementById('puesto').value;

    if(nombre && edad && genero && direccion && fecha_contrato && puesto){
        db.collection("empleados").add({
            nombre,
            edad,
            genero,
            direccion,
            fecha_contrato,
            puesto,
            especie:'Ninguno',
            id_especie:'Ninguno'
        }).then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
            alert("Empleado registrado")
            document.getElementById('nombre').value = "";
            document.getElementById('edad').value = "";
            document.getElementById('direccion').value = "";
    
        }).catch(function (error) {
                console.error("Error adding document: ", error);
        });
    }else{
        alert("Debe llenar todos los campos");
    }

}
 function udpate_empleado(){
    if(document.getElementById('claven').value){
        let nombre= document.getElementById('nombre').value;
        let edad = document.getElementById('edad').value;
        let genero = document.getElementById('genero').value;
        let direccion= document.getElementById("direccion").value;
        let fecha_contrato = document.getElementById('fecha').value;
        let puesto = document.getElementById('puesto').value;
        let clave = document.getElementById('claven').value;
        if(nombre && edad  && direccion && fecha_contrato ){
            if(genero === 'Ninguno'){
                alert("Seleccione genero");
            }else{
                if(puesto === 'Ninguno'){
                    alert("Seleccione un puesto de trabajo");
                }else{
                    var washingtonRef = db.collection("empleados").doc(clave);
                         
                            // Set the "especie" field of the city 'DC'
                            return washingtonRef.update({
                                nombre,
                                edad,
                                genero,
                                direccion,
                                fecha_contrato,
                                puesto
                            }).then(function () {
                                console.log("Document successfully updated!");
                                alert("Empleado actualizado")
                                document.getElementById('nombre').value = "";
                                document.getElementById('edad').value = "";
                                document.getElementById('direccion').value = "";
                            }).catch(function (error) {
                                // The document probably doesn't exist.
                                console.error("Error updating document: ", error);
                            });
                }
            }
            
    }else{
        alert("Debe llenar todos los campos");
    }

    }else{
        alert("Debe ingresar la clave")
    }
 }

 function eliminate_empleado(){
    if (document.getElementById('claven').value) {
        var myclave = document.getElementById('claven').value;

        db.collection("empleados").doc(myclave).delete().then(function () {
            alert("El registro de empleado ha sido eliminado, refresca la pagina");
            console.log("Document successfully deleted!");
        }).catch(function (error) {
            console.error("Error removing document: ", error);
        });
    } else {
        alert("Ingrese clave para eliminar registro")
    }
 }

function rellenar(){
    if (document.getElementById('claven').value) {
        var myclave = document.getElementById('claven').value;
        var docRef = db.collection("empleados").doc(myclave);
        docRef.get().then(function (doc) {
            if (doc.exists) {
                let empleado = doc.data();
                document.getElementById('nombre').value=empleado.nombre;
                document.getElementById('edad').value=empleado.edad;
                document.getElementById('genero').value=empleado.genero;
                document.getElementById('direccion').value=empleado.fech_contrato;
                document.getElementById('puesto').value=empleado.puesto;
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

function refreshTable() {
    var table = document.getElementById('empleados_table').getElementsByTagName('tbody')[0] // Tabla de datos
    let firestore = firebase.firestore();
    firestore.collection('empleados').get().then(data => {
        data.docs.forEach(function (doc, index) {
            let empleado = doc.data();

            //console.log(user);
            var row = table.insertRow();
            row.key = doc.id;
            // console.log(row.key);
            add_cell(row, doc.id);
            add_cell(row, empleado.nombre);
            add_cell(row, empleado.edad);
            add_cell(row, empleado.genero);
            add_cell(row, empleado.direccion);
            add_cell(row, empleado.fecha_contrato);
            add_cell(row, empleado.puesto);

        });
    })
    function add_cell(tr, text) {
        var td = tr.insertCell();
        td.textContent = text;
        return td;
    }
}

refreshTable();