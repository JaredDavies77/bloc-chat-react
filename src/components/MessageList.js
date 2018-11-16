import React, {Component} from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      createMessageText: ''
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

 //Keep the React state as single source of truth
 handleChange(event) {
   this.setState({createMessageText: event.target.value});
 }

 //Create message
 newMessage(event) {
   event.preventDefault();
   if (!this.state.createMessageText) { return }
   this.messagesRef.push({ content: this.state.createMessageText, roomId: this.props.activeRoomId, username: this.props.username, sentAt: this.props.firebase.database.ServerValue.TIMESTAMP });
   this.setState({ createMessageText: '' });
 }


   //Create message table for messages
  //Filter messages using database and UID
  render() {
    return (
      <div id="message-list">
        <header>
            <h1>{this.props.activeRoomName}</h1>
        </header>
          { this.state.messages.filter( message => message.roomId === this.props.activeRoomId ).map( (message, index) =>
            <section key={"Message-"+index}>
                <p id="username-timestamp" > {message.username} &emsp; {this.props.formatTime(message.sentAt)}</p>
                <p id="message" > {message.content}</p>
            </section>
            )
          }
            <footer>
                <form onSubmit={ (e) => this.newMessage(e)}>
                  <input type="textarea" placeholder="Type Message Here" value={this.state.createMessageText} onChange={ (e) => this.handleChange(e) } />
                  <input type="submit" value="Send" />
                </form>
          </footer>
      </div>
    );
  }
}

export default MessageList;
