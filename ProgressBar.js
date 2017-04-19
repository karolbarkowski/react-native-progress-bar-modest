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
                duration: 300,
            }).start();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.value != prevProps.value) {
            this.setValue(this.props.value);
        }
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
                        height: this.props.reachedBarHeight,
                        backgroundColor: this.props.reachedBarColor,
                        borderTopLeftRadius: this.props.borderRadius,
                        borderBottomLeftRadius: this.props.borderRadius
                    }]}>
                </Animated.View>
                <Text style={[styles.value, { color: this.props.reachedBarColor }]}>
                    {this.state.value}
                </Text>
                <View style={[styles.unreached, {
                    backgroundColor: this.props.unreachedBarColor,
                    height: this.props.unreachedBarHeight,
                    borderTopRightRadius: this.props.borderRadius,
                    borderBottomRightRadius: this.props.borderRadius
                }]}>

                </View>
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
    borderRadius: React.PropTypes.number,
    reachedBarHeight: React.PropTypes.number,
    unreachedBarHeight: React.PropTypes.number,
    reachedBarColor: React.PropTypes.string,
    unreachedBarColor: React.PropTypes.string,
}

ProgressBarMini.defaultProps = {
    value: 0,
    borderRadius: 0,
    reachedBarColor: '#5E8CAD',
    reachedBarHeight: 2,
    unreachedBarColor: '#CFCFCF',
    unreachedBarHeight: 1,
};