import React, { Component } from 'react';
import './App.css';
import RoomList from './components/RoomList.js';
import MessageList from './components/MessageList.js';
import User from './components/User.js'
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
  constructor (props){
    super(props);

    this.state = {
      activeRoomName: "",
      activeRoomId: "",
      username: 'Guest',
      isLoggedIn: false
    };
  }

   activeRoomView = (newActiveRoomId, newActiveRoomName) => {
     this.setState({
       activeRoomId: newActiveRoomId,
       activeRoomName: newActiveRoomName
     });
   }

   //Format the time
   formatTime(time) {
     let date = new Date(time);
     let hours = date.getHours();
     let minutes = "0" + date.getMinutes();
     let seconds = "0" + date.getSeconds();
     let formattedTime1 = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
     let formattedTime2 = hours + ':' + minutes.substr(-2);
     let h = hours % 12 || 12;
     let ampm = (hours < 12 || hours === 24) ? " AM" : " PM";
     let formattedTime3 = h + ':' + minutes.substr(-2) + ampm;
     return formattedTime3;
   }

   setUser = (user) => {
       const isLoggedIn = this.state.isLoggedIn;
       if ( isLoggedIn === true) {
         this.setState({
           isLoggedIn: false,
           username: 'Guest'
         });
       } else {
         this.setState({
           isLoggedIn: true,
           username: user.displayName
         });
       }
     }

     //Render RoomList
     //Render MessageList
     //Render User
     render() {
       return (
         <div className="app">
           <sidebar className="sidebar">
             <header className="header">
               <h1 className="title">Bloc Chat</h1>
             </header>
             <RoomList
               firebase={firebase}
               className="roomList"
               activeRoomName={this.state.activeRoomName}
               activeRoomId={this.state.activeRoomId}
               activeRoomView={this.activeRoomView}
             />
           </sidebar>
           <section className="messageList">
             <User
               firebase={firebase}
               setUser={this.setUser}
               username={this.state.username}
             />
             <MessageList
               firebase={firebase}
               activeRoomName={this.state.activeRoomName}
               activeRoomId={this.state.activeRoomId}
               activeRoomView={this.activeRoomView}
               formatTime={this.formatTime}
             />
           </section>
         </div>
       );
     }
   }

   export default App;
