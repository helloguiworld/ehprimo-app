import React, { useContext, useState } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Text
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusCodes } from 'http-status-codes';

import UserContext from '../../contexts/userContext';

import colors from '../../colors';

import CustomKeyboardAvoidingView from '../../components/CustomKeyboardAvoidingView';
import BackPageButton from '../../components/BackPageButton';
import FormInput from '../../components/FormInput';
import FormMessage from '../../components/FormMessage';
import Button from '../../components/Button';
import BlankSpace from '../../components/BlankSpace';

import timer from '../../functions/timer';

import playersServices from '../../services/playersServices';

export default function RegistrationScreen() {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();

    const [user, setUser] = useContext(UserContext);

    const [formData, setFormData] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const [fetching, setFetching] = useState(false);

    async function registerPlayer() {
        console.log({ username: formData.username, password: formData.password });
        if (formData['password_confirmation'] == formData['password']) {
            setFetching(true);
            var response = await playersServices.registerPlayer(formData);
            if (response.status === StatusCodes.CREATED) {
                const newUser = { username: formData.username, password: formData.password };
                response = await playersServices.loginPlayer(newUser);
                if (response.status === StatusCodes.OK) {
                    setFormErrors({});
                    setUser(response.data);
                    await timer(2000);
                    navigation.goBack();
                    return;
                } else {
                    setFormErrors(response.data);
                    console.log("Login errors", response.data);
                }
            } else {
                setFormErrors(response.data);
                console.log("Register errors", response.data);
            }
            setFetching(false);
        } else
            setFormErrors({ ...formErrors, 'password_confirmation': "password and password confirmation are not equal." });
    }

    return (

        <ScrollView>
            <CustomKeyboardAvoidingView
                style={[styles.mainView]}
                dismissKeybord
            >
                <BackPageButton right />

                <Text style={styles.tittle}>Cadastro</Text>
                <Text style={styles.subtittle}>Insira suas informações abaixo</Text>

                <FormInput
                    label='Nome de usuário'
                    placeholder='carlos'
                    preTextInput='@'
                    required

                    setFormData={setFormData}
                    formErrors={formErrors}
                    formFieldName='username'
                />
                <FormInput
                    label='Email'
                    placeholder='carlos@exemplo.com'
                    keyboardType='email-address'
                    required

                    setFormData={setFormData}
                    formErrors={formErrors}
                />
                <FormInput
                    label='Nome'
                    placeholder='Carlos'
                    required

                    setFormData={setFormData}
                    formErrors={formErrors}
                    formFieldName='first_name'
                />
                <FormInput
                    label='Sobrenome'
                    placeholder='da Silva'
                    required

                    setFormData={setFormData}
                    formErrors={formErrors}
                    formFieldName='surname'
                />
                <FormInput
                    label='Senha'
                    required
                    secureTextEntry

                    setFormData={setFormData}
                    formErrors={formErrors}
                    formFieldName='password'
                />
                <FormInput
                    label='Confirmação de senha'
                    required
                    secureTextEntry

                    setFormData={setFormData}
                    formErrors={formErrors}
                    formFieldName='password_confirmation'
                />

                <FormMessage error={formErrors['non_field_errors']} />
                {user['username'] && <FormMessage message={`Novo Jogador @${user['username']} criado!`} success />}

                <Button
                    style={{ marginTop: 20 }}
                    isWaitingFlag={fetching}
                    onPress={registerPlayer}
                >Cadastrar</Button>

                {/* safe area bottom */}
                <BlankSpace height={insets.bottom} keyboardSensitive />
            </CustomKeyboardAvoidingView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    mainView: {
        padding: 20
    },

    tittle: {
        fontSize: 28,
        color: colors.extraDarkPurple,
        fontWeight: '500',
    },
    subtittle: {
        color: colors.extraDarkPurple,
        marginBottom: 10,
    },

    container: {
        flex: 1,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
    },
});