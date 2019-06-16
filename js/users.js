firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    var table = document.getElementById('UsersTable').getElementsByTagName('tbody')[0] // Tabla de datos
    let firestore = firebase.firestore();
    firestore.collection('users').get().then(data => {
      data.docs.forEach(function (doc, index) {
        let user = doc.data();
        if (user) {
          user.id = doc.id;
          console.log(user);
          var row = table.insertRow();
          add_cell(row, ++index);
          add_cell(row, user.nickname);
          add_cell(row, user.level);
        }
      });
    })
  } else {
    location.href = "index.html";
  }
});

function add_cell(tr, text) {
  var td = tr.insertCell();
  td.textContent = text;
  return td;
}

function update_user() {
  let email = document.getElementById('email').value;
  let pwd = document.getElementById('pwd').value;
  let nickname = document.getElementById('nickname').value;
  let level = parseInt(document.getElementById('level').value);

  let db = firebase().firestore();
  var washingtonRef = db.collection("users").doc(clave);

  return washingtonRef.update({
    email,
    pwd,
    nickname,
    level,

  })
    .then(function () {
      console.log("Document successfully updated!");
    })
    .catch(function (error) {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
    });

  function save_user() {
    let email = document.getElementById('email').value;
    let pwd = document.getElementById('pwd').value;
    let nickname = document.getElementById('nickname').value;
    let level = parseInt(document.getElementById('level').value);

    if ((email !== '') && (pwd !== '') && (nickname !== '') && (level !== '')) {
      axios.get('https://us-central1-users-7557f.cloudfunctions.net/signupUsers', {
        params: {
          email,
          nickname,
          level,
          pwd
        }
      })
        .then((data) => {
          console.log(data);
          if (data.status === 200) {
            document.getElementById('email').value = "";
            document.getElementById('pwd').value = "";
            document.getElementById('nickname').value = "";
            document.getElementById('level').value = "";
          } else if (data.status === 202) {
            if (data.data.code === "auth/invalid-password") {
              alert("Contraseña insegura");
            } else if (data.data.code === "auth/email-already-in-use") {
              alert("Este correo ya está registrado");
            } else if (data.data.code === "auth/invalid-email") {
              alert("Correo inválido");
            } else {
              alert("Error inesperado");
            }
          }
        })
    } else {
      alert("Debe llenar el formulario");
    }

  }
}

function logout() {
  firebase.auth().signOut();

}