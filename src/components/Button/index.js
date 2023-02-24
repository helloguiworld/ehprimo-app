import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Text,
} from 'react-native';

import colors from '../../colors';

export default function Button(props) {
    return (
        <TouchableOpacity
            {...props}
            onPress={props.isWaitingFlag == true ? undefined : props.onPress}
            style={[styles.button, props.style]}
        >
            {
                props.isWaitingFlag == true ?
                    <ActivityIndicator color={colors.white} /> :
                    <Text
                        style={[
                            styles.buttonText,
                            { color: props.style?.color ? props.style.color : colors.white },
                            props.textStyle
                        ]}
                    >{props.children}</Text>
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.darkPurple,
        minHeight: 42,
        borderRadius: 4,
        padding: 10,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',

        shadowColor: colors.grey,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 5,
        shadowOpacity: 0.25,
        elevation: 1,
    },
    buttonText: {
        fontSize: 18,
    },
});