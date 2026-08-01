import React, { memo, useEffect, useMemo, useRef } from 'react';
import {
  Animated,
  Modal,
  PanResponder,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';

interface BottomSheetProps {
  visible: boolean;
  onDismiss: () => void;
  children: React.ReactNode;
  backgroundColor?: string;
  handleColor?: string;
  testID?: string;
}

const BottomSheet = ({
  visible,
  onDismiss,
  children,
  backgroundColor = '#ffffff',
  handleColor = '#999999',
  testID,
}: BottomSheetProps) => {
  const { height: screenHeight } = useWindowDimensions();
  const sheetHeight = screenHeight * 0.7;

  const translateY = useRef(new Animated.Value(sheetHeight)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const animationRef = useRef<{ stop: () => void } | null>(null);

  useEffect(() => {
    if (!visible) {
      translateY.setValue(sheetHeight);
    }
  }, [sheetHeight, visible, translateY]);

  useEffect(() => {
    if (animationRef.current) {
      animationRef.current.stop();
    }

    const animations = visible
      ? [
          Animated.timing(backdropOpacity, {
            toValue: 0.5,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]
      : [
          Animated.timing(backdropOpacity, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: sheetHeight,
            duration: 250,
            useNativeDriver: true,
          }),
        ];

    const anim = Animated.parallel(animations);
    animationRef.current = anim;
    anim.start();

    return () => {
      if (animationRef.current) {
        animationRef.current.stop();
      }
    };
  }, [visible, backdropOpacity, translateY, sheetHeight]);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, gestureState) => gestureState.dy > 5,
        onPanResponderMove: (_, gestureState) => {
          if (gestureState.dy > 0) {
            translateY.setValue(gestureState.dy);
          }
        },
        onPanResponderRelease: (_, gestureState) => {
          if (gestureState.dy > 100 || gestureState.vy > 0.5) {
            onDismiss();
          } else {
            Animated.spring(translateY, {
              toValue: 0,
              useNativeDriver: true,
            }).start();
          }
        },
      }),
    [onDismiss, translateY]
  );

  return (
    <Modal
      transparent
      animationType="none"
      visible={visible}
      onRequestClose={onDismiss}
      testID={testID}
    >
      <View style={styles.container}>
        <Pressable style={styles.backdrop} onPress={onDismiss}>
          <Animated.View
            style={[styles.backdropOverlay, { opacity: backdropOpacity }]}
          />
        </Pressable>
        <Animated.View
          style={[
            styles.sheet,
            {
              backgroundColor,
              height: sheetHeight,
              transform: [{ translateY }],
            },
          ]}
        >
          <View style={styles.handleContainer} {...panResponder.panHandlers}>
            <View style={[styles.handle, { backgroundColor: handleColor }]} />
          </View>
          <View style={styles.content}>{children}</View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  backdropOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000000',
  },
  sheet: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  handleContainer: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
  },
  content: {
    flex: 1,
  },
});

export default memo(BottomSheet);
