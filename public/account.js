var uid, userName;
function show() {
    var query = location.search;
    var value = query.split('=');
    uid= value[1];
    console.log(decodeURIComponent(uid));

    var db = firebase.firestore();
    let collection = db.collection("account");
    collection.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if(doc.data()['uid'] == uid) {
                console.log('find');
                // userName = doc.data()['name'];
                userName = "yurika";
                $('#nameAccount').append('<li>' + userName + '</li>');
            }
            // console.log('アカウントがない');
            // window.location.href ='../index.html';
            // console.log(doc.data()['name']);
            // var name = doc.data()['name'];
            // $('#list').append('<li>'+ name + '</li>');
        })
    })
}
show();

function signOut() {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        window.location.href = '../index.html';
    }).catch((error) => {
        // An error happened.
    });
}

function userSend() {
    window.location.href ='../chat.html?name=' + encodeURIComponent(uid);
}