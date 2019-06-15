function logginAuth() {
    var email = document.getElementById('userAddNew').value;
    var pass = document.getElementById('passAddUser').value;

    firebase.auth().signInWithEmailAndPassword(email, pass).then(function (user) {
        if (user) {
            window.location.href = "usuarios.html";
        }
    }).catch(function (error) {
        document.getElementById('userAddNew').value = "";
        document.getElementById('passAddUser').value = "";
        alert('Usuario o contraseña incorrecta');
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error)

    });

}