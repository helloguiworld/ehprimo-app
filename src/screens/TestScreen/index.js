import React, { useState } from 'react';
import {
    StyleSheet,
    KeyboardAvoidingView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    Keyboard,
    Vibration,
} from 'react-native';

import colors from '../../colors';
import ehPrimo from '../../functions/ehPrimo';

import DismissKeybordView from '../../components/DismissKeybordView';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TestScreen() {
    const [title, setTitle] = useState('Eh Primo?');
    const [number, setNumber] = useState(0);
    const [newNumberToTest, setNewNumberToTest] = useState(false);
    const [mainColor, setMainColor] = useState(colors.purple);
    const [contrastColor, setContrastColor] = useState(colors.darkPurple);

    function easterEgg() {
        Alert.alert(
            "Easter Egg 🥚",
            "Digite os 6 primeiros números da Sequência de Fibonacci para acessar um jogo!"
        );
    }

    function verify(number) {
        Keyboard.dismiss();
        setNewNumberToTest(false);
        if (!number) {
            Alert.alert(
                "Número inválido",
                "Você precisa digitar um número antes de efetuar a verificação!"
            );
        } else if (number == 112358) {
            setTitle('Eh Primo?');
            // navigation.navigate('Game');
        } else {
            if (ehPrimo(number)) {
                setTitle(number + ' eh primo!');
                setMainColor(colors.green);
                setContrastColor(colors.darkGreen);
                Vibration.vibrate();
            } else {
                setTitle(number + ' não eh :/');
                setMainColor(colors.red);
                setContrastColor(colors.darkRed);
            }
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1, backgroundColor: contrastColor }}
        >
            <DismissKeybordView>
                <SafeAreaView style={[styles.container, { backgroundColor: mainColor }]}>
                    <View style={styles.card}>
                        <Text style={styles.tittle}>{title}</Text>
                        <TextInput
                            placeholder='Digite um número'
                            placeholderTextColor={colors.darkGrey}
                            style={styles.cardInput}
                            keyboardType='number-pad'
                            keyboardAppearance='dark'
                            clearButtonMode='always'
                            selectionColor={contrastColor}
                            maxLength={13}
                            onChangeText={text => {
                                setNumber(Number(text));
                                if (!newNumberToTest) {
                                    setNewNumberToTest(true);
                                    setMainColor(colors.purple);
                                    setContrastColor(colors.darkPurple);
                                }
                            }}
                        />
                        <TouchableOpacity
                            style={[styles.cardButton, { backgroundColor: contrastColor }]}
                            onLongPress={easterEgg}
                            delayLongPress={2000}
                            onPress={() => {
                                verify(number);
                            }}
                        >
                            <Text style={styles.cardButtonText}>Verificar</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </DismissKeybordView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.purple,
        justifyContent: 'center',
        alignItems: 'stretch',
    },

    card: {
        backgroundColor: colors.white,
        margin: 40,
        borderRadius: 4,
        padding: 20,
    },

    tittle: {
        color: colors.black,
        fontSize: 32,
        fontWeight: '600',
        textAlign: 'center',
    },

    cardInput: {
        backgroundColor: colors.grey,
        color: colors.black,
        fontSize: 20,
        marginTop: 10,
        borderRadius: 4,
        padding: 10,
    },

    cardButton: {
        marginTop: 10,
        borderRadius: 4,
        padding: 10,
        alignItems: 'center'
    },
    cardButtonText: {
        color: colors.white,
        fontSize: 20,
    },
});