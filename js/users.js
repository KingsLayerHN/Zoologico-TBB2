function registrarUsuarios(){
    var email = document.getElementById('userAddNew').value;
    var pass = document.getElementById('passAddUser').value;
    

    firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error)
        // ...
      });
    
}