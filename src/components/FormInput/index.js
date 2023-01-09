import React, { useRef, useState, useEffect } from 'react';
import {
    StyleSheet,
    TouchableWithoutFeedback,
    View,
    TextInput,
    Text
} from 'react-native';

import colors from '../../colors';

export default function FormInput(props) {
    const refTextInput = useRef(null);

    const [inputValue, setInputValue] = useState("");

    const fieldName = props.fieldName ?
        props.fieldName :
        props.label ?
            props.label.toLowerCase().replaceAll(' ', '_') :
            'data';

    useEffect(() => {
        if (props.setDataValue)
            props.setDataValue(data => {
                data[fieldName] = inputValue;
                return data;
            });
    }, [inputValue]);

    return (
        <TouchableWithoutFeedback onPress={() => refTextInput.current.focus()}>
            <View style={styles.container}>
                <Text style={styles.text}>{props.label ? props.label : 'Input'}</Text>

                <View style={[styles.textInputView, { borderColor: props.errorMessage ? colors.red : colors.grey }]}>
                    {props.preTextInput ? <Text style={styles.preTextInput}>{props.preTextInput}</Text> : null}
                    <TextInput
                        ref={refTextInput}
                        selectionColor={colors.extraDarkPurple}
                        placeholder={props.placeholder ? props.placeholder : ''}
                        keyboardType={props.keyboardType}
                        {...props.textInputProps}
                        style={[styles.textInput, { paddingLeft: props.preTextInput ? 0 : 10 }]}
                        value={inputValue}
                        onChangeText={text => setInputValue(text)}
                        clearButtonMode='while-editing'
                    />
                </View>
                {
                    props.errorMessage &&
                    <Text style={styles.errorMessage}>{props.errorMessage}</Text>
                }
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'green',
        marginTop: 15,
    },

    text: {
        fontSize: 20,
        color: colors.extraDarkPurple,
        marginBottom: 5,
    },

    textInputView: {
        backgroundColor: colors.white,
        borderWidth: 1,
        borderRadius: 4,
        // borderColor: colors.grey,
        backgroundColor: colors.lightGrey,

        flexDirection: 'row',
        alignItems: 'center',
    },
    preTextInput: {
        color: colors.darkGrey,
        borderColor: colors.grey,
        fontSize: 16,
        marginLeft: 10,
    },
    textInput: {
        flex: 1,
        fontSize: 16,
        color: colors.extraDarkGrey,
        padding: 10,
        borderRadius: 4,
    },

    errorMessage: {
        fontSize: 14,
        color: colors.red,
        paddingTop: 2,
        paddingLeft: 4
    },
});