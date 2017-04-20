import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const VALUE_SIZE = 25;

export default class ProgressBarMini extends React.Component {
    static propTypes = {
        value: React.PropTypes.number,
        borderRadius: React.PropTypes.number,
        reachedBarHeight: React.PropTypes.number,
        unreachedBarHeight: React.PropTypes.number,
        reachedBarColor: React.PropTypes.string,
        unreachedBarColor: React.PropTypes.string,
        showValue: React.PropTypes.bool
    }

    static defaultProps = {
        value: 0,
        borderRadius: 0,
        reachedBarColor: '#5E8CAD',
        reachedBarHeight: 2,
        unreachedBarColor: '#CFCFCF',
        unreachedBarHeight: 1,
        showValue: true
    };

    constructor(props) {
        super(props);
        this.onLayout = this.onLayout.bind(this);
        this.setValue = this.setValue.bind(this);

        this.reachedWidth = new Animated.Value(0);

        this.state = {
            value: 0
        };
    }

    setValue(_value) {
        if (_value < 0) _value = 0;
        if (_value > 100) _value = 100;

        this.setState({
            value: _value
        });

        const _reachedWidth = ((this.width - VALUE_SIZE) * _value) / 100;

        const _self = this;
        Animated.timing(
            _self.reachedWidth,
            {
                toValue: _reachedWidth,
                duration: 300,
            }).start();
    }

    componentDidMount() {
        this.reachedWidth.addListener(({ value }) => {
            const w = this.reachedWidth.__getValue();
            this.refReachedBarView.setNativeProps({ style: { width: w } });
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.value != prevProps.value) {
            this.setValue(this.props.value);
        }
    }

    onLayout(event) {
        console.log("ON LAYOUT");

        this.width = event.nativeEvent.layout.width;
        this.setValue(this.props.value);
    }

    render() {
        console.log("RENDER");
        const valueText = this.props.showValue
            ? (<Text style={[styles.value, { color: this.props.reachedBarColor }]}>
                {this.state.value}
            </Text>)
            : null;

        return (
            <View onLayout={this.onLayout} style={[styles.container, this.props.style]}>
                <View
                    ref={component => this.refReachedBarView = component}
                    style={{
                        height: this.props.reachedBarHeight,
                        backgroundColor: this.props.reachedBarColor,
                        borderTopLeftRadius: this.props.borderRadius,
                        borderBottomLeftRadius: this.props.borderRadius
                    }}>
                </View>
                {valueText}
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
    unreached: {
        flex: 1,
    },
    value: {
        fontSize: 11,
        width: VALUE_SIZE,
        textAlign: 'center'
    }
})