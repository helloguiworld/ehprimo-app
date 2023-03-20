import React, { useContext, useState, useEffect } from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusCodes } from 'http-status-codes';

import UserContext from '../../contexts/userContext';

import colors from '../../colors';

import CustomKeyboardAvoidingView from '../../components/CustomKeyboardAvoidingView';
import BackPageButton from '../../components/BackPageButton';
import LogoutButton from '../../components/LogoutButton';
import LoginSession from './LoginSession';
import ProfileSession from './ProfileSession';

import playersServices from '../../services/playersServices';

export default function PlayerScreen() {
    const [user, setUser] = useContext(UserContext);

    useEffect(() => {
        console.log("Monitoramento:", user);
    }, [user]);

    return (
        <>
            <BackPageButton />
            {user['username'] && <LogoutButton />}
            
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <CustomKeyboardAvoidingView
                    style={[styles.mainView]}
                    dismissKeybord
                >
                    {
                        user['username'] ?
                            <ProfileSession /> :
                            <LoginSession />
                    }
                </CustomKeyboardAvoidingView>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    mainView: {
        padding: 20,
        // borderWidth: 5,
        // borderColor: colors.purple,
        justifyContent: 'center',
    },
});