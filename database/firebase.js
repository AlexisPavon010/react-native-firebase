import firebase from 'firebase'
import 'firebase/firestore'




  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyChp16S7Y5L5MrCq0rgNEThYsLXjDS80gM",
    authDomain: "react-native-firebase-d76f4.firebaseapp.com",
    projectId: "react-native-firebase-d76f4",
    storageBucket: "react-native-firebase-d76f4.appspot.com",
    messagingSenderId: "173331904260",
    appId: "1:173331904260:web:a8daee3f388eae1ba70251"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  const auth = firebase.auth()


  export default  {
    firebase,
    db,
    auth
  }