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
import factorization from '../../functions/factorization';

import DismissKeybordView from '../../components/DismissKeybordView';
import Button from '../../components/Button';

export default function TestScreen() {
    const navigation = useNavigation();

    const [number, setNumber] = useState(0);
    const [numberFactorization, setNumberFactorization] = useState([]);
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
            setNumberFactorization([]);
            setTitle('Eh Primo?');
            navigation.navigate('Game');
        } else {
            setTestedNumber(number);
            if (ehPrimo(number)) {
                setTitle(' eh primo!');
                setNumberFactorization([]);
                setMainColor(colors.green);
                setContrastColor(colors.darkGreen);
                Vibration.vibrate();
            } else {
                setTitle(' não eh :/');
                setNumberFactorization(factorization(number, false, true));
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
                        <View style={styles.cardGroup}>
                            <Text style={styles.cardTittle}>{testedNumber}</Text>
                            <Text style={styles.cardTittle}>{title}</Text>
                        </View>
                        {
                            numberFactorization.length ?
                                <View style={styles.factorizationView}>
                                    <Text style={styles.text}>Fatoração: </Text>
                                    {
                                        numberFactorization
                                            .flatMap((item, index) =>
                                                <View key={index} style={styles.exponentialView}>
                                                    {
                                                        index == 0 ? null :
                                                        <Text style={styles.text}>*</Text>
                                                    }
                                                    <Text style={styles.text}>{item[0]}</Text>
                                                    {
                                                        item[1] == 1 ? null :
                                                            <Text style={styles.exponentialText}>{item[1]}</Text>
                                                    }
                                                </View>
                                            )
                                    }
                                </View>
                                : null
                        }

                        <TextInput
                            placeholder='Digite um número'
                            placeholderTextColor={colors.darkGrey}
                            style={styles.cardInput}
                            keyboardType='numeric'
                            keyboardAppearance='dark'
                            clearButtonMode='always'
                            selectionColor={mainColor}
                            maxLength={13}
                            onChangeText={text => {
                                setNumber(Number(text.replace(/[^\d]+/g, '')));
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

    cardGroup: {
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
    text: {
        color: colors.black,
        fontSize: 16,
        textAlign: 'center',
    },
    factorizationView: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    exponentialView: {
        flexDirection: 'row',
    },
    exponentialText: {
        fontSize: 10,
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