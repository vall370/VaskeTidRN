import React, { memo, Component } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import Chip from '../components/ChipButton';

import Paragraph from '../components/Paragraph';
import { StyleSheet, AsyncStorage, Text } from 'react-native';

export default class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      data: null,
      loaded: true,
      error: null,
    };
  }
  isSignedIn = () => {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem('apartment')
        .then(res => {
          if (res !== null) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch(err => reject(err));
    });
  };
  proxy = 'https://cors-anywhere.herokuapp.com/';
  baseURL = 'api.vasketid.se/laundree1/public';

  getData = () => {
    this.setState({ loaded: false, error: null });
    let url = this.proxy + this.baseURL + '/allcompanies';

    let req = new Request(url, {
      method: 'GET',
    });

    fetch(req)
      .then(response => response.json())
      .then(this.showData)
      .catch(this.badStuff);
  };
  showData = data => {
    this.setState({ loaded: true, data });
    console.log(data);
  };
  badStuff = err => {
    this.setState({ loaded: true, error: err.message });
  };
  componentDidMount() {
    this.getData();
    //geolocation -> fetch
  }
  showApartment = async () => {
    try {
      let apartment = await AsyncStorage.getItem('apartment');
      console.log(apartment);
      alert(apartment);
    } catch (error) {
      alert(error);
    }
  };
  render() {
    const { navigation } = this.props;
    return (
      /* const HomeScreen = ({ navigation }) => (
       */ <Background>
        <Logo />

        <Header>Login Template</Header>
        {!this.state.loaded && <Text>LOADING</Text>}
        <Text style={styles.txt}>Gimme some data!</Text>
        <Button mode="contained" onPress={this.getData}>
          Choose Company
        </Button>
        {this.state.error && <Text style={styles.err}>{this.state.error}</Text>}
        {this.state.data &&
          this.state.data.map(comment => (
            <Button
              mode="contained"
              key={comment.company}
              onPress={() =>
                this.props.navigation.navigate('LoginScreen') &&
                console.log(comment.company)
              }>
              {comment.company}
            </Button>
          ))}
        <Paragraph>
          The easiest way to start with your amazing application.
        </Paragraph>
        <Button mode="contained" onPress={this.showApartment}>
          Show Saved Company
        </Button>

        <Button
          mode="contained"
          onPress={() => navigation.navigate('LoginScreen')}>
          Login
        </Button>
        <Button
          mode="outlined"
          onPress={() => navigation.navigate('RegisterScreen')}>
          Sign Up
        </Button>
      </Background>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    fontSize: 24,
    color: '#333',
  },
  err: {
    color: 'red',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
