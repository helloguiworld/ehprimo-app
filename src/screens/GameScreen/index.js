import React from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';

export default function GameScreen() {
    return(
        <View style={styles.container}>
            <Text>EM BREVE! 👀</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
});