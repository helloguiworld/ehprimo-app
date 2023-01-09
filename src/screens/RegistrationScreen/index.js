import React, { useState } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Text
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import colors from '../../colors';

import CustomKeyboardAvoidingView from '../../components/CustomKeyboardAvoidingView';
import FormInput from '../../components/FormInput';
import Button from '../../components/Button';
import BlankSpace from '../../components/BlankSpace';

export default function RegistrationScreen() {
    const insets = useSafeAreaInsets();

    const [formData, setFormData] = useState({});

    return (
        <CustomKeyboardAvoidingView>
            <ScrollView contentContainerStyle={[styles.mainView]}>
                <Text style={styles.tittle}>Cadastro</Text>
                <Text style={styles.subtittle}>Insira suas informações abaixo</Text>

                <FormInput
                    label='Username'
                    placeholder='carlos'
                    preTextInput='@'
                    errorMessage='user with this username already exists.'
                    
                    setDataValue={setFormData}
                    // fieldName='username'
                />
                <FormInput
                    label='Email'
                    placeholder='carlos@exemplo.com'
                    keyboardType='email-address'
                    
                    setDataValue={setFormData}
                />
                <FormInput
                    label='Nome'
                    placeholder='Carlos'
                    
                    setDataValue={setFormData}
                    fieldName='first_name'
                />
                <FormInput
                    label='Sobrenome'
                    placeholder='da Silva'
                    
                    setDataValue={setFormData}
                    fieldName='surname'
                />
                <FormInput
                    label='Senha'
                    textInputProps={{
                        secureTextEntry: true
                    }}
                    
                    setDataValue={setFormData}
                    fieldName='password'
                />
                <FormInput
                    label='Confirmação de senha'
                    textInputProps={{
                        secureTextEntry: true
                    }}

                    setDataValue={setFormData}
                    fieldName='password_confirmation'
                />

                <Button style={{ marginTop: 20 }} onPress={() => console.log(formData)}>Cadastrar</Button>

                {/* safe area bottom */}
                <BlankSpace height={insets.bottom} keyboardSensitive />
            </ScrollView>
        </CustomKeyboardAvoidingView>
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
        marginBottom: 20,
    },

    container: {
        flex: 1,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
    },
});