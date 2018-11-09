import React, {Component} from 'react';

class User extends Component {
  constructor (props) {
    super(props);
  }

  componentDidMount(){
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
    });
  }

  handleSignIn(e) {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup(provider);
  }

  handleSignOut(e) {
    this.props.firebase.auth().signOut();
  }

  render() {
    return (
      <section>
        { this.props.currentUser ? (<button onClick={(e) => this.handleSignOut(e)}>Sign Out</button>) : (<button onClick={(e) => this.handleSignIn(e)}>Sign In</button>) }
        <p>Logged in as {this.props.currentUser ? this.props.currentUser.displayName : 'Guest'}</p>
      </section>
    );
  }
}
export default User;
