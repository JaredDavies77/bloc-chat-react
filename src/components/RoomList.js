import React, { Component } from 'react';


 class RoomList extends Component {
  constructor (props) {
    super(props);
     this.state = {
      rooms: []
    };
     this.roomsRef = this.props.firebase.database().ref('rooms');
  }
   componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) });
    });
  }
   render() {
    return(
      <table id="room-list">
        <colgroup>
          <col id="room-name"/>
        </colgroup>
        <tbody>
          {
            this.state.rooms.map( (room, index) =>
              <tr className="room" key={index}>
                <td>{room.name}</td>
              </tr>
            )
          }
        </tbody>
      </table>
    );
  }
}
 export default RoomList;
