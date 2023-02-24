import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import colors from '../../colors';

export default function BackPageButton(props) {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={[styles.backPageButton, props.right ? styles.topRight : styles.topLeft, props.style]}
            onPress={() => navigation.goBack()}
        >
            <FontAwesome5
                name="chevron-down"
                size={13}
                color={props.style?.color ? props.style.color : colors.darkPurple}
            />
            <Text style={[styles.backPageText, { marginLeft: 4 }]}>Voltar</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    backPageButton: {
        zIndex: 1, // works on ios
        elevation: 1, // works on android
        
        position: 'absolute',
        paddingHorizontal: 10,
        minHeight: 35,
        backgroundColor: `${colors.extraLightGrey}E0`,
        borderRadius: 35 / 2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    topLeft: {
        top: 20,
        left: 20,
    },
    topRight: {
        top: 20,
        right: 20,
    },

    backPageText: {
        fontSize: 13,
        marginLeft: 2,
        color: colors.darkPurple,
    },
});