import React, { useRef, useState, useEffect } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    TextInput,
    Text
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import colors from '../../colors';

export default function FormInput(props) {
    const refTextInput = useRef(null);

    const [inputValue, setInputValue] = useState("");
    const [inputError, setInputError] = useState("");

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const formFieldName = props.formFieldName ?
        props.formFieldName :
        props.label ?
            props.label.toLowerCase().replaceAll(' ', '_') :
            'data';

    useEffect(() => {
        if (props.setFormData)
            props.setFormData(data => {
                data[formFieldName] = inputValue;
                return data;
            });
    }, [inputValue]);

    useEffect(() => {
        if (props.formErrors)
            if (props.formErrors[formFieldName])
                setInputError(props.formErrors[formFieldName]);
            else
                setInputError("");
    }, [props.formErrors]);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                {props.label ? props.label : 'Input'}
                {props.required && <Text style={{ color: colors.darkYellow }}>*</Text>}
            </Text>

            <View
                style={[
                    styles.textInputView,
                    {
                        borderColor: inputError ?
                            inputError.includes("This field may not be blank.") ?
                                colors.darkYellow : colors.red :
                            colors.lightGrey
                    }
                ]}
            >
                {props.preTextInput && <Text style={styles.preTextInput}>{props.preTextInput}</Text>}
                <TextInput
                    ref={refTextInput}
                    selectionColor={colors.extraDarkPurple}
                    placeholder={props.placeholder ? props.placeholder : ''}
                    keyboardType={props.keyboardType}
                    secureTextEntry={props.secureTextEntry && !isPasswordVisible}
                    {...props.textInputProps}
                    style={[
                        styles.textInput,
                        { paddingLeft: props.preTextInput ? 0 : 10 }
                    ]}
                    value={inputValue}
                    onChangeText={text => setInputValue(text)}
                    clearButtonMode='while-editing'
                />

                {
                    props.secureTextEntry &&
                    <TouchableOpacity style={styles.showPasswordButton} onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                        <FontAwesome5 name={isPasswordVisible ? "eye-slash" : "eye"} size={18} color={colors.darkGrey} />
                    </TouchableOpacity>
                }
            </View>

            <Text
                style={[
                    styles.errorMessage,
                    {
                        color: inputError.includes("This field may not be blank.") ?
                            colors.darkYellow :
                            colors.red
                    }
                ]}
            >
                {inputError}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
    },
    
    text: {
        fontSize: 20,
        color: colors.extraDarkPurple,
        marginBottom: 5,
    },
    
    textInputView: {
        backgroundColor: colors.extraLightGrey,
        borderWidth: 1,
        borderRadius: 4,

        flexDirection: 'row',
        alignItems: 'center',
    },
    preTextInput: {
        color: colors.darkGrey,
        fontSize: 16,
        marginLeft: 10,
    },
    textInput: {
        flex: 1,
        fontSize: 16,
        color: colors.extraDarkGrey,
        padding: 10,
        borderRadius: 3,
    },
    showPasswordButton: {
        width: 40,
        borderTopRightRadius: 3,
        borderBottomRightRadius: 3,
        backgroundColor: colors.lightGrey,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    errorMessage: {
        fontSize: 12,
        color: colors.red,
        minHeight: 20,
        paddingTop: 2,
        paddingLeft: 4
    },
});