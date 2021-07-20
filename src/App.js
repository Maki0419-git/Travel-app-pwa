import React from 'react';
import firebase from 'firebase/app';
import "firebase/storage";
import { firebaseConfig } from "./firebase";
import './App.css';

function App() {
  let file = null;


  if (!firebase.apps.length) {

    firebase.initializeApp(firebaseConfig);

  }

  const storage = firebase.storage();


  const handleUpload = function (e) {

    console.log(e.target.files[0]);

    file = e.target.files[0];

  }


  const handleSubmit = async function () {



    if (file) {

      try {

        const imageRef = storage.ref().child(file.name);

        await imageRef.put(file);

        alert("上傳成功");

        const url = await imageRef.getDownloadURL();

        console.log(url);

      }

      catch (e) {

        if (e.code === "storage/unauthorized") {

          alert("尚未登入");

        }

        else {

          console.log(e.message);

        }



      }

    }

  }


  return (
    <div>

      <input type="file" accept="image/x-png,image/jpeg" onChange={handleUpload} />

      <button onClick={handleSubmit}>上傳</button>

    </div>
  );
}

export default App;
