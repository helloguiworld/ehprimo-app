import React, { useState, useRef } from 'react';
import {
    useWindowDimensions,
    KeyboardAvoidingView,
    View,
} from 'react-native';

import DismissKeybordView from '../DismissKeybordView';

export default function CustomKeyboardAvoidingView(props) {
    const windowDimensions = useWindowDimensions();

    const [viewHeight, setViewHeight] = useState(0);

    return (
        <KeyboardAvoidingView
            behavior={props.behavior ? props.behavior : Platform.OS === 'ios' ? 'padding' : 'height'}
            style={props.dismissKeybord ? { flex: 1, backgroundColor: props.style?.backgroundColor } : props.style}
            onLayout={event => {
                event.persist();
                setTimeout(() => {
                    event.target.measure((a, b, width, height, px, py) => {
                        // console.log(height);
                        setViewHeight(height);
                    });
                }, 100);
            }}
            keyboardVerticalOffset={props.keyboardVerticalOffset ? props.keyboardVerticalOffset : windowDimensions.height - viewHeight}
        >
            {
                props.dismissKeybord ?
                    <DismissKeybordView style={props.style}>
                        {props.children}
                    </DismissKeybordView> :
                    props.children
            }

        </KeyboardAvoidingView>
    )
}