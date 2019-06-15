firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    console.log(firebase);
    // firebase.collection('users').where('id', '==', user.uid).get().then(data => {
    //   let user = data.data();
    //   console.log(user);
    // })
  } else {
    location.href = "index.html";
  }
});
