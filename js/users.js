function logginAuth() {
  var email = document.getElementById('userAddNew').value;
  var pass = document.getElementById('passAddUser').value;

  firebase.auth().signInWithEmailAndPassword(email, pass).then(function (user) {
    if (user) {
      window.location.href("./home.html");

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

function watcher() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      //user is signed in
      alert('huy papa le huyo a mi tio frijol');
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
    } else {

    }
  });
}
