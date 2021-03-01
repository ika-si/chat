var db = firebase.firestore();

function getAll() {
    let collection = db.collection("users").orderBy('createdAt');
    collection.get().then((querySnapshot) => {
        $('#list').text('');
        querySnapshot.forEach((doc) => {
            if(doc.data()['name'] == "yurika") {
                $('#list').append('<li class="my">' + doc.data()['createdAt'].toDate() + '<br>' + doc.data()['name'] + '</li>');
            } else {
                $('#list').append('<li> class="your">' + doc.data()['createdAt'].toDate() + '<br>' + doc.data()['name'] + '</li>');    
            }
        })
    })
}
getAll();

