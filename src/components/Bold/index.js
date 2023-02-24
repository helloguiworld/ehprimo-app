import React from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';

export default function Bold(props) {
    return (
        <Text style={[{ fontWeight: props.weight ? weight : '500' }, props.style]}>{props.children}</Text>
    )
}