import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';

import Colors from '../../../constants/Colors';
import styles from './styles/CreateMeetupScreen';

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
    descriptionHeight: 40
  }

  render() {
    return (
      <View style={styles.root}>
        <View style={styles.container}>
          <View style={styles.item}>
            <FormLabel fontFamily="montserrat">Title</FormLabel>
            <FormInput
              selectionColor={Colors.redColor}
            />
          </View>
          <View style={styles.item}>
            <FormLabel fontFamily="montserrat">Description</FormLabel>
            <FormInput
              multiline
              selectionColor={Colors.redColor}
            />
          </View>
          <View style={styles.buttonCreate}>
            <Button
              backgroundColor={Colors.blackBlueColor}
              title="Create Meetup"
              raised
              fontFamily="montserrat"
            />
          </View>
        </View>
      </View>
    );
  }
}

export default CreateMeetupScreen;
