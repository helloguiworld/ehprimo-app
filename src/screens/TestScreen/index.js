import React, { useState } from 'react';
import {
    StyleSheet,
    KeyboardAvoidingView,
    View,
    Text,
    TextInput,
    Alert,
    Keyboard,
    Vibration,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import colors from '../../colors';
import ehPrimo from '../../functions/ehPrimo';

import DismissKeybordView from '../../components/DismissKeybordView';
import Button from '../../components/Button';

export default function TestScreen() {
    const navigation = useNavigation();

    const [number, setNumber] = useState(0);
    const [testedNumber, setTestedNumber] = useState(null);
    const [title, setTitle] = useState('Eh Primo?');
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
            setTestedNumber(null);
            setTitle('Eh Primo?');
            navigation.navigate('Game');
        } else {
            setTestedNumber(number);
            if (ehPrimo(number)) {
                setTitle(' eh primo!');
                setMainColor(colors.green);
                setContrastColor(colors.darkGreen);
                Vibration.vibrate();
            } else {
                setTitle(' não eh :/');
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
                        <View style={styles.cardTittleGroup}>
                            <Text style={styles.cardTittle}>{testedNumber}</Text>
                            <Text style={styles.cardTittle}>{title}</Text>
                        </View>

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

                        <Button
                            style={{ backgroundColor: contrastColor, marginTop: 10 }}
                            onPress={() => verify(number)}
                            onLongPress={easterEgg}
                            delayLongPress={2000}
                        >
                            Verificar
                        </Button>
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
        borderRadius: 8,
        padding: 20,
    },

    cardTittleGroup: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    cardTittle: {
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
});