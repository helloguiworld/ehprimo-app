import React from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import colors from '../../colors';

export default function FormMessage(props) {
    const typeStyle = props.error ? styles.error : props.warning ? styles.warning : props.success ? styles.success : styles.info;

    return (
        Boolean(props.message) &&
        <View style={[styles.container, typeStyle, props.style]}>
            {
                (props.error || props.warning) &&
                <FontAwesome5
                    name={props.error ? "exclamation-circle" : "exclamation-triangle"}
                    size={14}
                    color={typeStyle.color}
                    style={{ marginRight: 5 }}
                />
            }
            <Text
                style={[
                    styles.messageText,
                    { color: typeStyle.color }
                ]}
            >
                {props.message}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 8,
        borderWidth: 1,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    messageText: {
        textAlign: 'center',
        fontSize: 13,
    },

    info: {
        backgroundColor: colors.extraLightGrey,
        color: colors.darkGrey,
        borderColor: colors.grey,
    },
    success: {
        backgroundColor: colors.extraLightGreen,
        color: colors.darkGreen,
        borderColor: colors.green,
    },
    error: {
        backgroundColor: colors.extraLightRed,
        color: colors.red,
        borderColor: colors.lightRed,
    },
    warning: {
        backgroundColor: colors.extraLightYellow,
        color: colors.darkYellow,
        borderColor: colors.lightYellow,
    },
});