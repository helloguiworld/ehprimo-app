import React, { useState, useEffect } from 'react';
import { Animated } from 'react-native';

import useKeyboardVisible from '../../hooks/useKeyboardVisible';

export default function BlankSpace(props) {
    const isKeyboardVisible = useKeyboardVisible();

    const startingHeight = props.height ? props.height : 20;
    const [height] = useState(new Animated.Value(startingHeight));

    useEffect(() => {
        if (props.keyboardSensitive)
            if (isKeyboardVisible)
                Animated.timing(height, {
                    toValue: 0,
                    duration: 100,
                    useNativeDriver: false
                }).start();
            else
                Animated.timing(height, {
                    toValue: startingHeight,
                    duration: 100,
                    useNativeDriver: false
                }).start();
    }, [isKeyboardVisible]);

    return (
        <Animated.View
            style={[props.style, { height: height }]}
        />
    );
}