import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const VALUE_SIZE = 25;

export default class ProgressBarMini extends React.Component {
    constructor(props) {
        super(props);
        this.onLayout = this.onLayout.bind(this);
        this.setValue = this.setValue.bind(this);

        let _value = this.props.value;
        if (_value < 0) _value = 0;
        if (_value > 100) _value = 100;

        this.state = {
            value: _value
        };
    }

    getValue() {
        return this.state.value;
    }

    setValue(_value) {
        if (_value < 0) _value = 0;
        if (_value > 100) _value = 100;

        const _reachedWidth = ((this.width - VALUE_SIZE) * _value) / 100;

        this.setState({
            value: _value
        });

        const _self = this;
        Animated.timing(
            _self.reachedWidth,
            {
                toValue: _reachedWidth,
                duration: 150
            }).start();
    }

    onLayout(event) {
        const _width = event.nativeEvent.layout.width;
        const _reachedWidth = ((_width - VALUE_SIZE) * this.state.value) / 100;

        this.width = _width;
        this.reachedWidth = new Animated.Value(_reachedWidth)
    }

    render() {
        return (
            <View onLayout={this.onLayout} style={[styles.container, this.props.style]}>
                <Animated.View
                    style={[styles.reached, {
                        width: this.reachedWidth,
                        backgroundColor: this.props.reachedColor
                    }]}>
                </Animated.View>
                    <Text style={[styles.value, { color: this.props.reachedColor }]}>
                        {this.state.value}
                    </Text>
                <View style={[styles.unreached, { backgroundColor: this.props.unreachedColor }]}></View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    reached: {
        height: 2,
    },
    unreached: {
        flex: 1,
        height: 1,
    },
    value: {
        fontSize: 11,
        width: VALUE_SIZE,
        textAlign: 'center'
    }
})

ProgressBarMini.propTypes = {
    value: React.PropTypes.number,
    reachedColor: React.PropTypes.string,
    unreachedColor: React.PropTypes.string,
}

ProgressBarMini.defaultProps = {
    value: 0,
    reachedColor: '#5E8CAD',
    unreachedColor: '#CFCFCF'
};