# react-native-progress-bar-modest

Simple, animated progress bar for React Native.

![](https://i.imgur.com/VE5eXNt.gif)

## Installation
`npm install react-native-progress-bar-modest`


## Example usage
```javascript
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View
} from 'react-native';
import ProgressBar from 'react-native-progress-bar-modest';

export default class ProgressBarMinimal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      val: 0,
    };

    const _self = this;

    setInterval(() => {
      _self.setState({
        val: Math.floor(Math.random() * 100)
      });
    }, 1000);
  }

  render() {
    return (
      <View style={styles.container}>
        <ProgressBar reachedBarColor='#5E8AAD' value={this.state.val} />
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

AppRegistry.registerComponent('ProgressBarMinimal', () => ProgressBarMinimal);
```


## Properties
| Prop | Description | Default |
|---|---|---|
|**`value`**|Current progress value. Ranges from `0..100`.|0|
|**`showValue`**|Shows numeric progress value if set to true.|true|
|**`borderRadius`**|Border radius of progress bar.|0|
|**`reachedBarColor`**|Color of the left side of progress bar. Must be a valid React Native color string.|`#5E8CAD`|
|**`reachedBarHeight`**|Height of the left side of progress bar.|`2`|
|**`unreachedBarColor`**|Color of the right side of progress bar. Must be a valid React Native color string.|`#CFCFCF`|
|**`unreachedBarHeight`**|Height of the right side of progress bar.|`1`|

## Component methods
| Method | Description |
|---|---|
| **`setValue(value)`** | The recommended way to update the progress of the progress bar is to use the `value` property. If you prefer, you can use this `setValue` method to update the progress directly. To access this method, set the `ref` property on the `<ProgressBar>` and call `this.refs.progressBarName.setValue(50)` |
