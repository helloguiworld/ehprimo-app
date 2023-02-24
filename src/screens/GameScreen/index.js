import React, { useContext, useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Alert,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Entypo } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import UserContext from '../../contexts/userContext';

import ehPrimo from '../../functions/ehPrimo';
import factorization from '../../functions/factorization';
import colors from '../../colors';

import Button from '../../components/Button';
import PlayerCard from './components/PlayerCard';

export default function GameScreen() {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    
    const [user, setUser] = useContext(UserContext);
    
    const [gameOn, setGameOn] = useState(false);
    const [number, setNumber] = useState(0);
    const [numberHistory, setNumberHistory] = useState(new Set());
    const [result, setResult] = useState(false);
    const [points, setPoints] = useState(0);
    const [record, setRecord] = useState(0);

    function generateNewNum(min = 10, max = 200) {
        let num;
        if (min < 0) min = 0;

        do {
            num = Math.floor(Math.random() * (Number(max) + 1 - Number(min)) + Number(min));
        } while (num % 2 == 0 || num % 5 == 0 || numberHistory.has(num));

        setNumber(num);
        setNumberHistory(numberHistory => numberHistory.add(num));
        if (ehPrimo(num)) setResult(true);
        else setResult(false);
    }

    function verify(answer) {
        if (answer == result) {
            let newPoints = points + 1;
            setPoints(newPoints);

            if (newPoints < 13)
                generateNewNum();
            else if (newPoints < 23)
                generateNewNum(100, 500);
            else if (newPoints < 43)
                generateNewNum(100, 1000);
            else
                generateNewNum(1000, 10000);
        } else {
            if (points > record) {
                Alert.alert(
                    "Parabéns! 🤩",
                    "Você tem um novo recorde."
                );
                updateRecord(points);
            } else {
                Alert.alert(
                    "Você errou 🥺",
                    "Tente novamente!"
                );
            }
            setPoints(0);
            setNumberHistory(new Set());
            setGameOn(false);
        }
    }

    function resetRecord() {
        Alert.alert(
            'Reset',
            'Deseja apagar seu recorde atual?',
            [
                {
                    text: 'Sim',
                    onPress: () => {
                        updateRecord(0);
                        console.log('Recorde resetado');
                        Alert.alert(
                            "Reset executado",
                            "Você zerou seu recorde."
                        );
                    },
                    style: 'destructive'
                },
                {
                    text: 'Não',
                    onPress: () => console.log('Reset cancelado'),
                },
            ]
        );
    }

    function showFactorization() {
        let numberFactorization = factorization(number)
        console.log(numberFactorization);
        Alert.alert(
            `Você errou o número ${number}`,
            result == true ?
                "Ele é primo!" :
                `Ele não é primo e tem a fatoração:\n${numberFactorization.map(item => item[1]).join('*')}`,
        );
    }

    async function updateRecord(newRecord) {
        try {
            await AsyncStorage.setItem('@Game_Record', newRecord.toString());
        } catch (error) {
            console.log("Erro ao salvar recorde em AsyncStorage");
        }
        setRecord(newRecord);
    }

    async function readRecord() {
        try {
            let item = await AsyncStorage.getItem('@Game_Record');
            if (item == null) item = 0;
            setRecord(Number(item));
        } catch (error) {
            console.log("Erro ao obter recorde em AsyncStorage");
        }
    }

    useEffect(() => {
        readRecord();
    }, []);

    return (
        <View style={[styles.mainView, { marginTop: Platform.OS === 'ios' ? 0 : insets.top }]}>
            {
                gameOn ?
                    <>
                        <Text style={styles.text}>
                            {points == 0 ? "Você ainda não fez pontos" : `Você fez ${points} ${points == 1 ? "ponto" : "pontos"}`}
                        </Text>
                        <Text style={[styles.text, { fontSize: 40 }]}>{number} eh primo?</Text>

                        <View style={styles.answerGroup}>
                            <Button
                                style={[styles.answerButton, { backgroundColor: colors.red }]}
                                textStyle={{ color: colors.white }}
                                onPressOut={() => verify(false)}
                            >Não</Button>

                            <Button
                                style={[styles.answerButton, { backgroundColor: colors.darkGreen }]}
                                textStyle={{ color: colors.white }}
                                onPressOut={() => verify(true)}
                            >Sim</Button>
                        </View>
                    </>
                    :
                    <>
                        <PlayerCard />

                        {
                            number != 0 &&
                            <TouchableOpacity style={styles.helpButton} onPress={showFactorization}>
                                <Entypo name="help" size={18} color={styles.helpButton.color} />
                            </TouchableOpacity>
                        }

                        {
                            record == 0 ?
                                <Text style={[styles.text, { fontSize: 40, fontWeight: '500' }]}>
                                    EhPrimo Play
                                </Text>
                                :
                                <>
                                    <Text style={styles.text}>Seu record atual é de</Text>
                                    <Text style={[styles.text, { fontSize: 40, fontWeight: '500' }]}>{record} {record == 1 ? "ponto" : "pontos"}</Text>
                                </>
                        }
                        <Text style={[styles.text, { fontSize: 16, marginTop: 5, marginBottom: 20, color: colors.darkPurple }]}>
                            👇 Clique para jogar 👇
                        </Text>

                        <Button
                            style={{ marginTop: 10 }}
                            onLongPress={resetRecord}
                            delayLongPress={4000}
                            onPress={() => {
                                generateNewNum(10, 200);
                                setGameOn(true);
                            }}
                        >Jogar</Button>

                        <Button
                            style={{ marginTop: 10, backgroundColor: colors.extraLightGrey }}
                            textStyle={{ color: colors.darkPurple }}
                            onPressOut={() => navigation.goBack()}
                        >Sair</Button>
                    </>
            }
        </View >
    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: colors.white,
        padding: 20,
        justifyContent: 'center',
    },

    text: {
        color: colors.extraDarkPurple,
        fontSize: 20,
        textAlign: 'center',
    },

    answerGroup: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    answerButton: {
        width: '48%',
    },

    helpButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        width: 35,
        height: 35,
        backgroundColor: colors.lightPurple,
        color: colors.darkPurple,
        borderRadius: 35 / 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
});