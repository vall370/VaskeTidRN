import React, { Component } from 'react';

import { AsyncStorage } from 'react-native';
import { StyleSheet, View, ScrollView, Text, Dimensions } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import axios from 'axios';
import { Card } from 'react-native-paper';
import Paragraph from '../../components/Paragraph';
import { withTheme } from 'react-native-paper';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

class Dashboard extends Component {
  constructor() {
    super();

    this.state = {
      selected: undefined,
      selectedDate: null,
      timeslots: [],
      events: [],
      isLoading: true,
      errors: null,
      currentUser: null,
    };
  }

  onDayPress = day => {
    this.setState({ selected: day.dateString });
  };

  componentDidMount() {
    this.getEvents();
    this.getCurrentUser();
  }

  getCurrentUser = async () => {
    const currentUser = await AsyncStorage.getItem('apartment');
    this.setState({
      currentUser,
    });
  };

  getCardColor = bookedBy => {
    const { theme } = this.props;
    const { currentUser } = this.state;
    if (typeof bookedBy === 'undefined') {
      return {
        textColor: theme.colors.text,
        backgroundColor: 'white',
      };
    }
    if (bookedBy === currentUser) {
      return {
        textColor: 'white',
        backgroundColor: theme.colors.bookedbyme,
      };
    }
    return {
      textColor: 'white',
      backgroundColor: theme.colors.bookedbyanother,
    };
  };

  getEvents() {
    axios
      // This is where the data is hosted
      .get(
        'https://cors-anywhere.herokuapp.com/api.vasketid.se/laundree1/public/bookingavailable?rid=1&date=2019-11-11',
        {
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
          },
        },
      )
      // Once we get a response and store data, let's change the loading state
      .then(response => {
        console.log(response.data.timeslots);
        this.setState({
          events: response.data.timeslots,
          isLoading: false,
        });
      })
      // If we catch any errors connecting, let's update accordingly
      .catch(error => this.setState({ error, isLoading: false }));
  }

  render() {
    const { isLoading, events } = this.state;
    const { theme } = this.props;
    console.log({ theme });
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <CalendarList
          theme={{
            calendarBackground: '#333248',
            textSectionTitleColor: 'white',
            dayTextColor: 'red',
            todayTextColor: 'white',
            selectedDayTextColor: 'white',
            monthTextColor: 'white',
            indicatorColor: 'white',
            selectedDayBackgroundColor: '#333248',
            arrowColor: 'white',
          }}
          style={styles.calendar}
          onDayPress={this.onDayPress}
          horizontal={true}
          // Enable paging on horizontal, default = false
          pagingEnabled={true}
          markedDates={{
            [this.state.selected]: {
              selected: true,
              selectedDotColor: 'orange',
            },
          }}
        />
        <Text>{this.state.selected}</Text>
        <View style={styles.container}>
          {!isLoading ? (
            <View style={styles.cardsContainer}>
              {events.map(timeslots => {
                const { tid, bookedBy, timeslot } = timeslots;
                const { textColor, backgroundColor } = this.getCardColor(
                  bookedBy,
                );
                return (
                  <Card key={tid} style={[styles.card, { backgroundColor }]}>
                    <Paragraph style={{ color: textColor, fontSize: 14}}>
                      {timeslot} <br></br>{bookedBy}

                    </Paragraph>

                  </Card>
                );
              })}
            </View>
          ) : (
            <Paragraph>Loading...</Paragraph>
          )}
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    paddingVertical: 20,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  card: {
    margin: 5,
    width: SCREEN_WIDTH / 3 - 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2
  },
  calendar: {
    marginBottom: 10,
  },
  text: {
    textAlign: 'center',
    padding: 2,
    margin: 2,
    backgroundColor: 'lightgrey',
    fontSize: 10,
  },
});

export default withTheme(Dashboard);
