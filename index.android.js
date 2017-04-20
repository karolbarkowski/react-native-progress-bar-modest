import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View } from 'react-native';
import ProgressBar from './src/ProgressBar';

export default class ReactNativeProgressBarModest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      val1: 0,
      val2: 0,
      val3: 0,
    };

    const _self = this;

    setInterval(() => {
      _self.setState({
        val1: Math.floor(Math.random() * 100)
      });
    }, 1000);

    setInterval(() => {
      _self.setState({
        val2: Math.floor(Math.random() * 100)
      });
    }, 1200);

    setInterval(() => {
      _self.setState({
        val3: Math.floor(Math.random() * 100)
      });
    }, 1400);
  }

  render() {
    return (
      <View style={styles.container}>
        <ProgressBar reachedBarColor='#5E8AAD' style={{ margin: 20 }} value={this.state.val1} />
        <ProgressBar reachedBarColor='#769F1B' style={{ margin: 20 }} value={this.state.val2} reachedBarHeight={5} unreachedBarHeight={5} />
        <ProgressBar reachedBarColor='#EA7444' style={{ margin: 20 }} value={this.state.val3} reachedBarHeight={20} unreachedBarHeight={20} borderRadius={10} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('ReactNativeProgressBarModest', () => ReactNativeProgressBarModest);
