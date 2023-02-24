import React, { useContext, useState } from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusCodes } from 'http-status-codes';

import UserContext from '../../../contexts/userContext';

import colors from '../../../colors';

import FormInput from '../../../components/FormInput';
import FormMessage from '../../../components/FormMessage';
import Button from '../../../components/Button';
import BlankSpace from '../../../components/BlankSpace';

import playersServices from '../../../services/playersServices';

export default function LoginSession() {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();

    const [user, setUser] = useContext(UserContext);

    const [formData, setFormData] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const [fetching, setFetching] = useState(false);

    async function loginPlayer() {
        setFetching(true);
        const response = await playersServices.loginPlayer(formData);
        setFetching(false);
        if (response.status === StatusCodes.OK) {
            setFormErrors({});
            setUser(response.data);
        } else {
            setFormErrors(response.data);
            console.log("Login errors", response.data);
        }
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.tittle}>Olá!</Text>
                <Text style={styles.subtittle}>Insira abaixo suas informações de cadastro</Text>
            </View>

            <FormInput
                label='Username'
                placeholder='carlos'
                preTextInput='@'

                setFormData={setFormData}
                formErrors={formErrors}
            />
            <FormInput
                label='Senha'
                secureTextEntry

                setFormData={setFormData}
                formErrors={formErrors}
                formFieldName='password'
            />

            <FormMessage message={formErrors['non_field_errors']} error />
            {user['username'] && <FormMessage message={`Logado como @${user['username']}`} success />}

            <Button
                style={{ marginTop: 20, backgroundColor: colors.extraDarkPurple }}
                isWaitingFlag={fetching}
                onPress={loginPlayer}
            >Entrar</Button>

            {
                !user['username'] &&
                <Button
                    style={{ backgroundColor: colors.purple }}
                    onPress={() => {
                        setFormErrors({});
                        navigation.navigate('Registration');
                    }}
                >Cadastro</Button>
            }

            <BlankSpace height={insets.bottom} keyboardSensitive />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        borderWidth: 2,
        borderColor: 'red',
    },
    
    tittle: {
        textAlign: 'center',
        fontSize: 36,
        color: colors.extraDarkPurple,
        fontWeight: '600',
        marginBottom: 5,
    },
    subtittle: {
        textAlign: 'center',
        color: colors.extraDarkPurple,
        marginHorizontal: 20,
        marginBottom: 30,
    },
});