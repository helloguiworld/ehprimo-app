import React, { useContext } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';

import UserContext from '../../../../contexts/userContext';

import colors from '../../../../colors';

import Bold from '../../../../components/Bold';

export default function PlayerCard() {
    const navigation = useNavigation();

    const [user, setUser] = useContext(UserContext);

    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Player')}>
            <View style={styles.userImage}>
                <FontAwesome5 name={"user"} solid size={16} color={colors.white} />
            </View>
            <Text style={[styles.userText]}>
                {user.first_name ?
                    <>Olá, <Bold>{user.first_name}</Bold>!</> :
                    "Entrar"}
            </Text>
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
        justifyContent: 'center',
        alignItems: 'center',
    },

    userText: {
        color: colors.extraDarkPurple,
        fontSize: 18,
        marginHorizontal: 10,
    },
});