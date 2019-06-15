const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({
    origin: true
});

const serviceAccount = require('./users-7557f-firebase-adminsdk-zjv48-fecf9b4594.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://users-7557f.firebaseio.com'
});

const db = admin.firestore();
db.settings({
    timestampsInSnapshots: true
});


exports.signupUsers = functions.https.onRequest((req, res) => {
    return cors(req, res, async () => {
        try {
            console.dir(req.query);
            let user = await admin.auth().createUser({
                email: req.query.email,
                password: req.query.pwd
            });

            if (user) {
                await db.collection('users').doc(user.uid).set({
                    email: req.query.email,
                    nickname: req.query.nickname,
                    level: req.query.level
                })

                return res.status(200).jsonp({
                    msg: 'success'
                });
            } else {
                return res.status(202).jsonp({
                    msg: 'User already exist'
                });
            }
        } catch (error) {
            console.log(error);
            return res.status(202).jsonp({
                msg: 'error during register user',
                code: error.code
            });
        }
    });
})

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
