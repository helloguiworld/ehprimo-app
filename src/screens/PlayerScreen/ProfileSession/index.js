import React, { useContext } from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import UserContext from '../../../contexts/userContext';

import Button from '../../../components/Button';
import BlankSpace from '../../../components/BlankSpace';

import colors from '../../../colors';

export default function ProfileSession() {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();

    const [user, setUser] = useContext(UserContext);

    return (
        <View style={styles.container}>
            <View style={styles.userImage} />

            <Text style={styles.tittle}>{`${user['first_name']} ${user['surname']}`}</Text>
            <Text style={styles.subtittle}>{`@${user['username']}`}</Text>

            <Button
                style={{ backgroundColor: colors.extraDarkPurple }}
            // onPress={loginPlayer}
            >Editar perfil</Button>
            <Button
                style={{ backgroundColor: colors.grey, color: colors.extraLightGrey }}
            // onPress={loginPlayer}
            >Configurações</Button>

            <BlankSpace height={2 * insets.bottom} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // borderWidth: 2,
        // borderColor: 'red',
        // alignItems: 'center',
    },

    userImage: {
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        marginBottom: 10,
        backgroundColor: colors.purple,
        alignSelf: 'center',
    },

    tittle: {
        textAlign: 'center',
        fontSize: 28,
        color: colors.extraDarkPurple,
        fontWeight: '600',
    },
    subtittle: {
        textAlign: 'center',
        fontSize: 16,
        color: colors.darkPurple,
        marginHorizontal: 20,
        marginBottom: 40,
    },
});