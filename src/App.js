import React, { Component } from 'react';
import './App.css';
import RoomList from './components/RoomList.js';
import * as firebase from 'firebase';

  // Initialize Firebase
  var config = {
  apiKey: "AIzaSyBWd5rIS3Vv0LWOfqJTFI-r-zSXV6VtepA",
  authDomain: "bloc-chat-4585a.firebaseapp.com",
  databaseURL: "https://bloc-chat-4585a.firebaseio.com",
  projectId: "bloc-chat-4585a",
  storageBucket: "bloc-chat-4585a.appspot.com",
  messagingSenderId: "601830402702"
};
firebase.initializeApp(config);


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Bloc Chat React</h1>
        </header>
        <section>
        <RoomList
          firebase={firebase}
        />
        </section>
      </div>
    );
  }
}

export default App;
