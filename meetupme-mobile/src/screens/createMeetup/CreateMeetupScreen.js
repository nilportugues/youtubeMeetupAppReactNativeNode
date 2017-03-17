import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

import { MeetupApi } from '../../../constants/api';
import Colors from '../../../constants/Colors';
import styles from './styles/CreateMeetupScreen';

const meetupApi = new MeetupApi();

class CreateMeetupScreen extends Component {
  static navigationOptions = {
    title: 'Create a new Meetup',
    header: ({ goBack }) => {
      const style = { backgroundColor: Colors.redColor };

      const titleStyle = { color: Colors.whiteColor };

      const left = (
        <TouchableOpacity style={styles.iconClose} onPress={() => goBack()}>
          <MaterialIcons
            size={30}
            name="close"
            color="#fff"
          />
        </TouchableOpacity>
      );

      return { style, titleStyle, left };
    }
  }

  state = {
    date: new Date(),
    isDateTimePickerVisible: false,
    title: '',
    description: ''
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = date => {
    this.setState({ date });
    this._hideDateTimePicker();
  };

  _checkTitle() {
    if (this.state.date > moment()) {
      return moment(this.state.date).format('MMMM Do YYYY, h:mm:ss a');
    }
    return 'Pick a meetup date';
  }

  _checkIfButtonSubmitDisabled() {
    const { title, description, date } = this.state;
    if (title.length > 5 && description.length > 5 && date > moment()) {
      return false;
    }
    return true;
  }

  _changeTitle = title => this.setState({ title })

  _changeDescription = description => this.setState({ description })

  _createMeetup = async () => {
    const { date, title, description } = this.state;

    const res = await meetupApi.createGroupMeetup({
      title,
      description,
      date
    });

    console.log(res);
  }

  render() {
    return (
      <View style={styles.root}>
        <View style={styles.container}>
          <View style={styles.item}>
            <FormLabel fontFamily="montserrat">Title</FormLabel>
            <FormInput
              selectionColor={Colors.redColor}
              onChangeText={this._changeTitle}
              value={this.state.title}
            />
          </View>
          <View style={styles.item}>
            <FormLabel fontFamily="montserrat">Description</FormLabel>
            <FormInput
              multiline
              selectionColor={Colors.redColor}
              onChangeText={this._changeDescription}
              value={this.state.description}
            />
          </View>
          <View style={styles.item}>
            <Button
              onPress={this._showDateTimePicker}
              title={this._checkTitle()}
              raised
              fontFamily="montserrat"
            />
          </View>
          <View style={styles.buttonCreate}>
            <Button
              backgroundColor={Colors.blackBlueColor}
              title="Create Meetup"
              raised
              fontFamily="montserrat"
              disabled={this._checkIfButtonSubmitDisabled()}
              onPress={this._createMeetup}
            />
          </View>
        </View>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
          mode="datetime"
        />
      </View>
    );
  }
}

export default CreateMeetupScreen;
