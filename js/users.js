function logginAuth(){
    var email = document.getElementById('userAddNew').value;
    var pass = document.getElementById('passAddUser').value;
    

    firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function(error) {
        // Handle Errors here.
        
        document.getElementById('userAddNew').value = ""; 
        document.getElementById('passAddUser').value = "";
        alert('Usuario o contraseña incorrecta');
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error)
        // ...
      });
    
}