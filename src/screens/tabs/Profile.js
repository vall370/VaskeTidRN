import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage } from 'react-native';
import Button from '../../components/Button';
import { List, Checkbox, TextInput, TouchableOpacity } from "react-native-paper";
import axios from 'axios';
import { showMessage, hideMessage } from "react-native-flash-message";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});

export default class Profile extends Component {
  state = {
    expanded: true,
    oldpin: '',
    newpin: '',
    repeatnewpin: '',
    currentUser: null,
    currentBuilding: null,

  };
  getCurrentUser = async () => {
    const currentUser = await AsyncStorage.getItem('apartment');
    const currentBuilding = await AsyncStorage.getItem('building');

    this.setState({
      currentUser,
      currentBuilding,
    });
  };

  changePassword = (oldpin, newpin) => {
    console.log(oldpin, newpin);
    let proxy = 'https:cors-anywhere.herokuapp.com/';
    let baseURL = 'api.vasketid.se/laundree1/public';
    let url = proxy + baseURL + '/updatepassword';
    const options = {
      method: 'PUT',
      AllowedHeaders: 'Content-Type and X-Requested-With',
      url: url,
      data: {
        currentpassword: oldpin,
        newpassword: newpin,
        building: this.state.currentBuilding,
        apartment: this.state.currentUser,
      },
      transformResponse: [(data) => {
        return data;
      }]
      
    };

    axios(options)
    .then(function (response) {
      // handle success
      console.log(response.data.message);
      showMessage({
        message: response.data,
        type: "danger",
      })
    })
    .catch(function (error) {
      // handle error
      console.log(error.data);
      showMessage({
        message: error.data,
        type: "danger",
      })
    })
    .then(function () {
      // always executed
    });
  };
  handleNewPin = (text) => {
    this.setState({ newpin: text })
  }
  handleRepeatNewpin = (text) => {
    this.setState({ repeatnewpin: text })
  }
  handleOldPin = (text) => {
    this.setState({ oldpin: text })
    
  }


  logout = () => {
    AsyncStorage.removeItem('apartment');
    AsyncStorage.removeItem('building');

    this.props.navigation.navigate('HomeScreen');
  };

  componentDidMount() {
    this.getCurrentUser();
  }
  render() {
    return (
      <View>
        <List.Section title="Accordions">
          <List.Accordion
            title="Uncontrolled Accordion"
            left={props => <List.Icon {...props} icon="folder" />}
          >
            <TextInput
              label="Old Pin Code"
              keyboardType="numeric"
              onChangeText={this.handleOldPin}
            />
            <TextInput
              label="New Pin Code"
              keyboardType="numeric"
              onChangeText={this.handleNewPin}
            />
            <TextInput
              label="Repeat New Pin Code"
              keyboardType="numeric"
              onChangeText={this.handleRepeatNewpin}

            />
            <Button mode="outlined" onPress={() => this.changePassword(this.state.oldpin, this.state.newpin, this.state.repeatnewpin)}>
              changePassword
            </Button>
          </List.Accordion>

          <List.Accordion
            title="Controlled Accordion"
            left={props => <List.Icon {...props} icon="folder" />}
            expanded={this.state.expanded}
            onPress={this._handlePress}
          >
            <List.Item title="First item" />
            <List.Item title="Second item" />
          </List.Accordion>
        </List.Section>
        <Button mode="outlined" onPress={this.logout}>
          Logout
            </Button>
      </View>
    );
  }
}
