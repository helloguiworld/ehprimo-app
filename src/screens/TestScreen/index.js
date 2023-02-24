import React, { useState } from 'react';
import {
    StatusBar,
    StyleSheet,
    KeyboardAvoidingView,
    View,
    Text,
    TextInput,
    Alert,
    Keyboard,
    Vibration,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Entypo } from '@expo/vector-icons';

import colors from '../../colors';
import ehPrimo from '../../functions/ehPrimo';
import factorization from '../../functions/factorization';

import CustomKeyboardAvoidingView from '../../components/CustomKeyboardAvoidingView';
import Button from '../../components/Button';

export default function TestScreen() {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();

    const [number, setNumber] = useState('');
    const [numberFactorization, setNumberFactorization] = useState([]);
    const [testedNumber, setTestedNumber] = useState(null);
    const [title, setTitle] = useState('Eh Primo?');
    const [newNumberToTest, setNewNumberToTest] = useState(false);
    const [mainColor, setMainColor] = useState(colors.purple);
    const [contrastColor, setContrastColor] = useState(colors.darkPurple);
    const [lightColor, setLightColor] = useState(colors.lightPurple);

    function openGameScreen() {
        navigation.navigate('Game');
    }

    function verify(number) {
        Keyboard.dismiss();
        setNewNumberToTest(false);
        if (!number) {
            Alert.alert(
                "Número inválido",
                "Você precisa digitar um número antes de efetuar a verificação!"
            );
        } else {
            setTestedNumber(Number(number));
            if (ehPrimo(number)) {
                setTitle(' eh primo!');
                setNumberFactorization([]);
                setMainColor(colors.green);
                setContrastColor(colors.darkGreen);
                setLightColor(colors.lightGreen);
                Vibration.vibrate();
            } else {
                setTitle(' não eh :/');
                setNumberFactorization(factorization(Number(number), false, true));
                setMainColor(colors.red);
                setContrastColor(colors.darkRed);
                setLightColor(colors.lightRed);
            }
        }
    }

    return (
        <CustomKeyboardAvoidingView
            dismissKeybord
            style={{ flex: 1, backgroundColor: contrastColor }}
        >
            <StatusBar backgroundColor="#61dafb" barStyle="light-content" />
            <SafeAreaView style={[styles.container, { backgroundColor: mainColor, marginTop: insets.top }]}>
                <TouchableOpacity style={styles.gameButton} onPress={openGameScreen}>
                    <Entypo name="game-controller" size={20} color={contrastColor} />
                </TouchableOpacity>

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
                        value={number}
                        placeholder='Digite um número'
                        placeholderTextColor={colors.darkGrey}
                        style={styles.cardInput}
                        keyboardType='numeric'
                        keyboardAppearance='dark'
                        clearButtonMode='always'
                        selectionColor={Platform.OS === 'ios' ? mainColor : lightColor}
                        maxLength={13}
                        onChangeText={text => {
                            if (text == '') {
                                setNewNumberToTest(false);
                                setNumber('');
                                setTestedNumber(null);
                                setNumberFactorization([]);
                                setTitle('Eh Primo?');
                                setMainColor(colors.purple);
                                setContrastColor(colors.darkPurple);
                                setLightColor(colors.lightPurple);
                            } else {
                                setNumber(text.replace(/[^\d]+/g, ''));
                                if (!newNumberToTest) setNewNumberToTest(true);
                            }
                        }}
                    />

                    <Button
                        style={{ backgroundColor: contrastColor }}
                        onPress={() => verify(number)}
                        delayLongPress={2000}
                    >
                        Verificar
                    </Button>
                </View>
            </SafeAreaView>
        </CustomKeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'stretch',
    },

    card: {
        backgroundColor: colors.white,
        marginHorizontal: 20,
        marginBottom: 20,
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
        backgroundColor: colors.lightGrey,
        color: colors.black,
        fontSize: 20,
        marginTop: 10,
        borderRadius: 4,
        padding: 10,
    },


    gameButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        width: 35,
        height: 35,
        backgroundColor: colors.white,
        borderRadius: 35 / 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
});