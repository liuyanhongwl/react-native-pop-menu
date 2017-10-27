/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Menu from 'react-native-pop-menu';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
  'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
  'Shake or press menu button for dev menu',
});

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      menuVisible: false,
      arrowPosition: 'topRight',
      left: 12,
      right: undefined,
      color: '#F5FCFF',
      title: 'Welcome to React Native!'
    }
  }

  render() {
    return (
      <View style={[styles.container, { backgroundColor: this.state.color }]}>
        <TouchableOpacity style={{ position: 'absolute', left: 12, top: 32 }}
                          onPress={() => {
                            this.setState({
                              menuVisible: true,
                              arrowPosition: 'topLeft',
                              left: 12,
                              right: undefined,
                            });
                          }}>
          <Text>Menu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ position: 'absolute', left: 150, top: 32 }}
                          onPress={() => {
                            this.setState({
                              menuVisible: true,
                              arrowPosition: 'topCenter',
                              left: 110,
                              right: undefined,
                            });
                          }}>
          <Text>Menu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ position: 'absolute', right: 12, top: 32 }}
                          onPress={() => {
                            this.setState({
                              menuVisible: true,
                              arrowPosition: 'topRight',
                              left: undefined,
                              right: 12,
                            });
                          }}>
          <Text>Menu</Text>
        </TouchableOpacity>
        <Text style={styles.welcome}>
          {this.state.title}
        </Text>
        <Menu visible={this.state.menuVisible}
              onVisible={(isVisible) => {
                this.state.menuVisible = isVisible
              }}
              left={this.state.left}
              right={this.state.right}
              arrowPosition={this.state.arrowPosition}
              data={[
                {
                  title: 'MenuItem 1',
                  onPress: () => {
                    this.setState({
                      color: 'skyblue'
                    });
                  }
                },
                {
                  title: 'MenuItem 2',
                  onPress: () => {
                    this.setState({
                      title: 'Hello react-native-pop-menu!'
                    });
                  }
                },
              ]} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
