import React, {Component} from 'react';

class MessageList extends Component {
  constructor (props) {
    super(props);

    this.state = {
      messages: []
    };

    this.messagesRef = this.props.firebase.database().ref('messages');
  }

  //Fetch messages from the database
  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
     const message = snapshot.val();
     message.key = snapshot.key;
     this.setState({ messages: this.state.messages.concat( message ) });
   });
 }


   //Create message table for messages
  //Filter messages using database and UID
  render() {
    return (
      <table id="message-list">
        <colgroup>
          <col id="username-message" />
          <col id="timestamp" />
        </colgroup>
        <thead>
          <tr>
            <th>{this.props.activeRoomName}</th>
          </tr>
        </thead>
          {
            this.state.messages.filter( message => message.roomId === this.props.activeRoomId ).map( (message, index) =>
            <tbody>
              <tr key={index}>
                <td className="username">{message.username}</td>
                <td className="timestamp">{this.props.formatTime(message.sentAt)}</td>
              </tr>
              <tr className="message" key={index}>
                <td>{message.content}</td>
              </tr>
            </tbody>
            )
          }
        </table>
      );
    }
  }

export default MessageList;
