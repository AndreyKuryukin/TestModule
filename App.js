
import React, {Component} from 'react';
import { Button, StyleSheet, Text, View, NativeModules } from 'react-native';

const HelloManager = NativeModules.HelloManager;

export default class App extends React.Component {

    state = {
        text: 'Open up App.js to start working on your app!'
    };

    onPress = () => {
        HelloManager.greetUser('User name', true, this.isAdminCallback)
    };

    isAdminCallback = (text) => {
        this.setState({text});
    };

    render() {
        return (
            <View style={styles.container}>
              <Text>{this.state.text}</Text>
              <Button
                  color={'#ff0000'}
                  title={'Press me'}
                  onPress={this.onPress}
                  accessibilityLabel="Learn more about this purple button"
              />
            </View>
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
});
