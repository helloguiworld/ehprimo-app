import React, { useContext, useEffect, useState } from 'react';
import {
    StyleSheet,
    Alert,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import UserContext from '../../contexts/userContext';

import colors from '../../colors';

import api from '../../services';

export default function LogoutButton(props) {
    const [user, setUser] = useContext(UserContext);

    const [logouting, setLogouting] = useState(false);

    function logout() {
        console.log('LOGOUT');
        setLogouting(true);
        // if (props.onPress) props.onPress();
        // delete api.defaults.headers.common["Authorization"];
        // AsyncStorage.multiRemove(['@User', '@Token']);
        // if (user.username) setUser({});
        // setLogouting(false);
    }

    function logoutConfirmation() {
        Alert.alert(
            'Logout',
            'Deseja sair?',
            [
                {
                    text: 'Sim',
                    onPress: logout,
                    style: 'destructive'
                },
                {
                    text: 'Não',
                    onPress: () => console.log('Logout cancelado'),
                },
            ]
        );
    }

    return ((Boolean(props.forceDisplay) || Boolean(user.username)) &&
        <TouchableOpacity
            style={[
                styles.logoutButton,
                props.left ? styles.topLeft : styles.topRight,
                user.username ? styles.logged : undefined,
                props.style
            ]}
            onPress={logouting ? undefined : logoutConfirmation}
        >
            {
                logouting ?
                    <ActivityIndicator color={colors.red} /> :
                    <Entypo
                        name="log-out"
                        size={16}
                        color={props.style?.color ? props.style.color : user.username ? styles.logged.color : styles.logoutButton.color}
                        style={{ marginLeft: 3 }}
                    />
            }
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    logoutButton: {
        zIndex: 1, // works on ios
        elevation: 1, // works on android

        position: 'absolute',
        width: 35,
        height: 35,
        backgroundColor: colors.lightGrey,
        color: colors.extraLightGrey,
        borderRadius: 35 / 2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    logged: {
        backgroundColor: colors.extraLightRed,
        color: colors.red,
    },

    topLeft: {
        top: 20,
        left: 20,
    },
    topRight: {
        top: 20,
        right: 20,
    },
});