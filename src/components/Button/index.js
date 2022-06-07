import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
} from 'react-native';

import colors from '../../colors';

export default function Button(props) {
    return (
        <TouchableOpacity
            {...props}
            style={[styles.button, props.style]}
        >
            <Text style={[styles.buttonText, props.textStyle]}>{props.children}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.darkPurple,
        borderRadius: 4,
        padding: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: colors.white,
        fontSize: 18,
    },
});