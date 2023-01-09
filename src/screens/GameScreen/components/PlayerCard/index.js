import React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import colors from '../../../../colors';

export default function PlayerCard() {
    const navigation = useNavigation();

    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Registration')}>
            <View style={styles.userImage} />
            <Text style={[styles.welcomeText]}>Login</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'red',

        position: 'absolute',
        top: 20,
        left: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },

    userImage: {
        width: 35,
        height: 35,
        backgroundColor: colors.extraDarkPurple,
        borderRadius: 35 / 2,
    },

    welcomeText: {
        color: colors.extraDarkPurple,
        fontSize: 18,
        marginHorizontal: 10,
    },
});