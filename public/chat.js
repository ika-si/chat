// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyBLmn5pEFk35attCQKK66zwZNUaQC_hohE",
    authDomain: "chat-66c0f.firebaseapp.com",
    projectId: "chat-66c0f",
    storageBucket: "chat-66c0f.appspot.com",
    messagingSenderId: "311775757285",
    appId: "1:311775757285:web:c0d4999a644904789fa50c",
    measurementId: "G-CE6LBSNCH8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();

function getAll() {
    let collection = db.collection("chat").orderBy('createdAt', 'asc');
    collection.get().then((querySnapshot) => {
        $("msg").text('')
        querySnapshot.forEach((doc) => {
            $('#board').append(
                '<li>'+doc.data()['message']+'</li>'
            )
        });
    });
}
getAll();

function add() {
    let msg = $("#msg").val();
    if (msg = "") return;

    db.collection("chat").add({
        message: msg, 
        createdAt: new Date()
    }).then(function(docRef) {
        getAll();
        const message = document.getElementById("msg");
        $("msg").val('');
    }).catch(function(error) {
        console.error("Error", error);
    });
}