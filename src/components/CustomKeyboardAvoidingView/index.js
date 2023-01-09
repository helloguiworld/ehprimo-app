import React, { useState } from 'react';
import {
    useWindowDimensions,
    KeyboardAvoidingView,
} from 'react-native';

export default function CustomKeyboardAvoidingView(props) {
    const windowDimensions = useWindowDimensions();

    const [viewHeight, setViewHeight] = useState(0);

    return (
        <KeyboardAvoidingView
            behavior={props.behavior ? props.behavior : Platform.OS === 'ios' ? 'padding' : 'height'}
            style={props.style}
            onLayout={event => setViewHeight(event.nativeEvent.layout.height)}
            keyboardVerticalOffset={props.keyboardVerticalOffset ? props.keyboardVerticalOffset : windowDimensions.height - viewHeight}
        >
            {props.children}
        </KeyboardAvoidingView>
    )
}