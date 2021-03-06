//firestoreからデータ取得
var db = firebase.firestore();

var messagesRef = db.collection("users");

/**
 * 同期処理
 **/
messagesRef.orderBy("createdAt").limit(20).onSnapshot( (snapshot) => {
    // $('#list').text('');
    snapshot.docChanges().forEach((change) => {
        // 追加
        if ( change.type === 'added' ) {
            addLog(change.doc.id, change.doc.data());
        }
        // 更新
        else if( change.type === 'modified' ){
            modLog(change.doc.id, change.doc.data());
        }
        // 削除
        else if ( change.type === 'removed' ) {
            removeLog(change.doc.id);
        }
    });
});



function addLog(id, data){
    // 追加するHTMLを作成
    // let log = `${data.name}: ${data.msg} ${data.date}`;
    // let li  = document.createElement('li');
    // li.id   = id;
    // li.appendChild(document.createTextNode(log));

    if(data.name == "yurika") {
        $('#list').append('<li class="my">' + data.createdAt.toDate() + '<br>' + data.name + '<br>' + data.msg + '</li>');
    } else {
        $('#list').append('<li class="your">' + data.createdAt.toDate() + '<br>' + data.name + '<br>' + data.msg + '</li>');
    }

    // 表示エリアへ追加
    // let chatlog = document.getElementById("list");
    // chatlog.insertBefore(li, chatlog.firstChild);
}

/**
 * ログを更新
 */
function modLog(id, data){
    let log = document.getElementById(id);
    if( log !== null ){
          log.innerText = `${data.name}: ${data.msg} ${data.date}`;
    }
}
  
/**
 * ログを削除
 **/
function removeLog(id){
    let log = document.getElementById(id);
    if( log !== null ){
        log.parentNode.removeChild(log);
    }
}

// function getAll() {
//   let collection = db.collection("users").orderBy('createdAt');
//   collection.get().then((querySnapshot) => {
//     $('#list').text('');
//     querySnapshot.forEach((doc) => {
//       if(doc.data()['name'] == "yurika") {
//         $('#list').append('<li class="my">' + doc.data()['createdAt'].toDate() + '<br>' + doc.data()['name'] + '<br>' + doc.data()['msg'] + '</li>');
//       } else {
//         $('#list').append('<li class="your">' + doc.data()['createdAt'].toDate() + '<br>' + doc.data()['name'] + '<br>' + doc.data()['msg'] + '</li>');
//       }
//     })
//   })
// }
// getAll();

// firestoreにデータを送信
function add(){
  // let nameAdd = $("#nameAdd").val();
  // if (nameAdd == "") return;

  let msgAdd = $("#msgAdd").val();
  if (msgAdd == "") return;

  db.collection("users").add({
    createdAt: new Date(),
    msg: msgAdd,
    // name: "yurika"
    name: "hoge"
  })
  .then(() => {
    // getAll();
    
    $("#nameAdd").val('');
    $("#msgAdd").val('');
    console.log("Document written with ID: ");
  })
  .catch((error) => {
    console.error("Error writing document: ", error);
  });
}

let msg_form = document.getElementById('msgAdd');
msg_form.addEventListener('keypress', test_ivent);

function test_ivent(e) {
  if (e.keyCode === 13) {
    add();
  }
  return false;
}
// ２秒に１回リロード
// setTimeout(function () {
//     location.reload();
// }, 2000);



//room.jsのコピペ
//スクロールする
(function () {
  var sendMessage = function () {
    var $messages = $('.messages');
    return $messages.animate({ scrollTop: $messages.prop('scrollHeight') }, 300);
  };

  setTimeout(function () {
    return sendMessage();
  }, 1000);

}.call(this));
