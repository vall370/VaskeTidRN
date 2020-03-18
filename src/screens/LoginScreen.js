import React, { Component } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Keyboard,
  AsyncStorage,
} from 'react-native';
export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      building: 'Demovägen 1',
      apartment: '1001',
      password: '12345',
    };
  }

  login = () => {
    const { building, apartment, password } = this.state;
    if (building === '') {
      //alert("Please enter Email address");
      this.setState({ building: 'Please enter building address' });
    }
    if (apartment === '') {
      //alert("Please enter Email address");
      this.setState({ apartment: 'Please enter apartment address' });
    } else if (password === '') {
      this.setState({ building: 'Please enter password' });
    } else {
      let proxy = 'https://cors-anywhere.herokuapp.com/';
      let baseURL = 'api.vasketid.se/laundree1/public';
      let url = proxy + baseURL + '/userlogin';
      fetch(url, {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify({
          building,
          apartment,
          password,
        }),
      })
        .then(response => {
          console.log(response);
          return response.json();
        })
        .then(responseJson => {
          if (responseJson.message === 'Login Successful') {
            try {
              let saved = AsyncStorage.setItem('apartment', apartment) && AsyncStorage.setItem('building', building);
              
              alert(`Saved apartment ${apartment} & Saved building ${building}`);

              // redirect to profile page
              this.props.navigation.navigate('Dashboard');
            } catch (error) {
              alert(error);
            }
          } else {
            alert(
              `building=${building}&apartment=${apartment}&password=${password}`,
            );
          }
        })
        .catch(error => {
          console.error(error);
        });
    }

    Keyboard.dismiss();
  };

  render() {
    const { building, apartment, password } = this.state;
    const { navigation } = this.props;
    return (
      <Background>
        <BackButton goBack={() => navigation.navigate('HomeScreen')} />

        <Logo />

        <Header>Welcome back.</Header>
        <TextInput
          label="Building"
          defaultValue={building}
          returnKeyType="next"
          onChangeText={building => this.setState({ building })}
          autoCapitalize="none"
          autoCompleteType="building"
          textContentType="buildingAddress"
          keyboardType="default"
        />
        <TextInput
          label="Apartment"
          returnKeyType="next"
          defaultValue={apartment}
          onChangeText={apartment => this.setState({ apartment })}
          autoCapitalize="none"
          autoCompleteType="apartment"
          textContentType="apartmentAddress"
          keyboardType="default"
        />

        <TextInput
          label="Password"
          defaultValue={password}
          returnKeyType="done"
          onChangeText={password => this.setState({ password })}
          secureTextEntry
        />

        <View style={styles.forgotPassword}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPasswordScreen')}>
            <Text style={styles.label}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>

        <Button mode="contained" onPress={this.login}>
          Login
        </Button>

        <View style={styles.row}>
          <Text style={styles.label}>Don’t have an account? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('RegisterScreen')}>
            <Text style={styles.link}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </Background>
    );
  }
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});
