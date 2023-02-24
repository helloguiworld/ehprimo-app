import React from 'react';
import {
    TouchableWithoutFeedback,
    Keyboard,
    View,
} from 'react-native';

export default function DismissKeybordView(props) {
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={[{ flex: 1 }, props.style]}>
                {props.children}
            </View>
        </TouchableWithoutFeedback>
    );
}