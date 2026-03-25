import LinearGradient from 'react-native-linear-gradient';

import { useNavigation } from '@react-navigation/native';

import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  useWindowDimensions,
  ScrollView,
  Share,
  Platform,
} from 'react-native';

const jkseBattlRegFont = 'OrelegaOne-Regular';
const jkseBattlBgColor = '#000';
const jkseBattlGoldGradient = [
  '#E1C352',
  '#FFF9CC',
  '#E6CE67',
  '#EDE5BC',
  '#E2C23B',
];
const jkseBattlStartPosition = { x: 0, y: 2 };
const jkseBattlEndPosition = { x: 1, y: 0 };
const jkseBattlBorderColor = '#E6CE67';

const JkseBattlAnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const JkseBattlScaleTouchable = ({
  children,
  style,
  disabled,
  onPress,
  onPressIn,
  onPressOut,
  ...props
}) => {
  const jkseBattlScale = useRef(new Animated.Value(1)).current;
  const jkseBattlShakeX = useRef(new Animated.Value(0)).current;

  const jkseBattlRunDisabledShake = () => {
    Animated.sequence([
      Animated.timing(jkseBattlShakeX, {
        toValue: -6,
        duration: 35,
        useNativeDriver: true,
      }),
      Animated.timing(jkseBattlShakeX, {
        toValue: 6,
        duration: 35,
        useNativeDriver: true,
      }),
      Animated.timing(jkseBattlShakeX, {
        toValue: -4,
        duration: 30,
        useNativeDriver: true,
      }),
      Animated.timing(jkseBattlShakeX, {
        toValue: 4,
        duration: 30,
        useNativeDriver: true,
      }),
      Animated.timing(jkseBattlShakeX, {
        toValue: 0,
        duration: 25,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const jkseBattlHandlePressIn = event => {
    if (disabled) {
      jkseBattlRunDisabledShake();
    } else {
      Animated.spring(jkseBattlScale, {
        toValue: 0.96,
        useNativeDriver: true,
        speed: 40,
        bounciness: 0,
      }).start();
    }

    onPressIn?.(event);
  };

  const jkseBattlHandlePressOut = event => {
    Animated.spring(jkseBattlScale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 30,
      bounciness: 6,
    }).start();

    onPressOut?.(event);
  };

  const jkseBattlHandlePress = event => {
    if (disabled) {
      jkseBattlRunDisabledShake();
      return;
    }

    onPress?.(event);
  };

  return (
    <JkseBattlAnimatedTouchableOpacity
      {...props}
      style={[
        style,
        {
          transform: [
            { translateX: jkseBattlShakeX },
            { scale: jkseBattlScale },
          ],
        },
      ]}
      activeOpacity={1}
      onPress={jkseBattlHandlePress}
      onPressIn={jkseBattlHandlePressIn}
      onPressOut={jkseBattlHandlePressOut}
    >
      {children}
    </JkseBattlAnimatedTouchableOpacity>
  );
};

const jkseBattlStates = {
  IDLE: 'idle',
  RECORDING: 'recording',
  RESULT_BAD: 'result_bad',
  RESULT_GOOD: 'result_good',
};

const JkseBattlTellBullJokeScreen = () => {
  const [jkseBattlState, setJkseBattlState] = useState(jkseBattlStates.IDLE);
  const [jkseBattlSecondsLeft, setJkseBattlSecondsLeft] = useState(15);
  const [jkseBattlTimerId, setJkseBattlTimerId] = useState(null);
  const { height: jkseBattlHeight } = useWindowDimensions();
  const jkseBattlNavigation = useNavigation();
  const jkseBattlScreenOpacity = useRef(new Animated.Value(0)).current;
  const jkseBattlScreenTranslateY = useRef(new Animated.Value(12)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(jkseBattlScreenOpacity, {
        toValue: 1,
        duration: 320,
        useNativeDriver: true,
      }),
      Animated.timing(jkseBattlScreenTranslateY, {
        toValue: 0,
        duration: 320,
        useNativeDriver: true,
      }),
    ]).start();
  }, [jkseBattlScreenOpacity, jkseBattlScreenTranslateY]);

  const jkseBattlStartRecording = () => {
    setJkseBattlState(jkseBattlStates.RECORDING);
    setJkseBattlSecondsLeft(15);

    const jkseBattlTimerID = setInterval(() => {
      setJkseBattlSecondsLeft(jkseBattlPrevSeconds => {
        if (jkseBattlPrevSeconds <= 1) {
          clearInterval(jkseBattlTimerID);
          setJkseBattlState(jkseBattlStates.RESULT_GOOD);
          return 0;
        }

        return jkseBattlPrevSeconds - 1;
      });
    }, 1000);

    setJkseBattlTimerId(jkseBattlTimerID);
  };

  useEffect(() => {
    if (jkseBattlState !== jkseBattlStates.RECORDING && jkseBattlTimerId) {
      clearInterval(jkseBattlTimerId);
      setJkseBattlTimerId(null);
    }
  }, [jkseBattlState, jkseBattlTimerId]);

  const jkseBattlSelectedBull = () => {
    switch (jkseBattlState) {
      case jkseBattlStates.RECORDING:
        return require('../assets/images/thinking_bull.png');
      case jkseBattlStates.RESULT_BAD:
        return require('../assets/images/bad_bull.png');
      case jkseBattlStates.RESULT_GOOD:
        return require('../assets/images/good_bull.png');
      default:
        return require('../assets/images/reg_bull.png');
    }
  };

  const jkseBattlShareResult = async jkseBattlRes => {
    try {
      const jkseBattlMessage =
        jkseBattlRes === jkseBattlStates.RESULT_GOOD
          ? 'This is a very great joke, I expect more such jokes from you!'
          : `You could have joked better. I hope you'll succeed next time!`;

      await Share.share({ message: jkseBattlMessage });
    } catch (jkseBattlError) {
      console.error('sharing error', jkseBattlError);
    }
  };

  const jkseBattlBottomButton = () => {
    if (jkseBattlState === jkseBattlStates.IDLE) {
      return (
        <JkseBattlPrimaryButton
          text="Start recording"
          onPress={jkseBattlStartRecording}
        />
      );
    }

    if (jkseBattlState === jkseBattlStates.RECORDING) {
      return (
        <JkseBattlPrimaryButton
          text="Recording in progress..."
          onPress={() => setJkseBattlState(jkseBattlStates.RESULT_GOOD)}
          disabled
          pulse
        />
      );
    }

    return (
      <JkseBattlPrimaryButton
        text="Share"
        onPress={() => {
          jkseBattlShareResult(jkseBattlState);
        }}
      />
    );
  };

  const jkseBattlResultText = () => {
    switch (jkseBattlState) {
      case jkseBattlStates.RESULT_BAD:
        return "You could have joked better. I hope you'll succeed next time!";
      case jkseBattlStates.RESULT_GOOD:
        return 'This is a very great joke, I expect more such jokes from you!';
      default:
        return '';
    }
  };

  return (
    <View style={jkseBattlStyles.jkseBattlMainContainer}>
      <Animated.View
        style={{
          flex: 1,
          width: '100%',
          opacity: jkseBattlScreenOpacity,
          transform: [{ translateY: jkseBattlScreenTranslateY }],
        }}
      >
        <ScrollView
          contentContainerStyle={{
            alignItems: 'center',
            flexGrow: 1,
            paddingTop: jkseBattlHeight * 0.07,
            paddingBottom: 130,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              gap: 10,
              marginBottom: 30,
            }}
          >
            <View
              style={{
                flex: 1,
                height: 77,
                borderWidth: 0.8,
                borderColor: jkseBattlBorderColor,
                borderRadius: 16,
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={jkseBattlStyles.jkseBattlHeaderTitle}>
                Tell a jokes
              </Text>
            </View>

            {Platform.OS === 'ios' ? (
              <Image
                source={require('../assets/images/about_logo.png')}
                style={[
                  jkseBattlStyles.jkseBattlAppIcon,
                  {
                    borderRadius: 12,
                    borderWidth: 0.8,
                    borderColor: '#E6CE67',
                    height: 77,
                    width: 77,
                  },
                ]}
              />
            ) : (
              <Image
                source={require('../assets/images/icon.png')}
                style={[
                  jkseBattlStyles.jkseBattlAppIcon,
                  {
                    borderRadius: 12,
                    borderWidth: 0.8,
                    borderColor: jkseBattlBorderColor,
                  },
                ]}
              />
            )}
          </View>
          {jkseBattlState !== jkseBattlStates.RECORDING && (
            <Text
              style={[
                jkseBattlStyles.jkseBattlTitle,
                {
                  marginTop: jkseBattlHeight * 0.05,
                  marginBottom: jkseBattlHeight * 0.02,
                },
              ]}
            >
              {jkseBattlState.includes('result')
                ? 'Result'
                : 'Tell a joke to the bull'}
            </Text>
          )}

          {jkseBattlState === jkseBattlStates.RECORDING && (
            <View
              style={[
                jkseBattlStyles.jkseBattlTimerBox,
                { marginTop: jkseBattlHeight * 0.05 },
              ]}
            >
              <Image source={require('../assets/icons/clock.png')} />
              <Text style={jkseBattlStyles.jkseBattlTimerText}>
                00:{jkseBattlSecondsLeft.toString().padStart(2, '0')}
              </Text>
            </View>
          )}

          <ImageBackground
            source={require('../assets/images/back_blur.png')}
            style={jkseBattlStyles.jkseBattlBullWrapper}
          >
            <Image
              source={jkseBattlSelectedBull()}
              style={jkseBattlStyles.jkseBattlBull}
            />
          </ImageBackground>

          <Text
            style={[
              jkseBattlStyles.jkseBattlResultText,
              { marginBottom: jkseBattlHeight * 0.04 },
            ]}
          >
            {jkseBattlResultText()}
          </Text>

          {jkseBattlBottomButton()}
        </ScrollView>
      </Animated.View>
    </View>
  );
};

const JkseBattlPrimaryButton = ({ text, onPress, disabled, pulse = false }) => {
  const jkseBattlPulseScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!pulse) {
      jkseBattlPulseScale.setValue(1);
      return undefined;
    }

    const jkseBattlPulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(jkseBattlPulseScale, {
          toValue: 0.96,
          duration: 450,
          useNativeDriver: true,
        }),
        Animated.timing(jkseBattlPulseScale, {
          toValue: 1,
          duration: 450,
          useNativeDriver: true,
        }),
      ]),
    );

    jkseBattlPulseLoop.start();

    return () => {
      jkseBattlPulseLoop.stop();
      jkseBattlPulseScale.setValue(1);
    };
  }, [pulse, jkseBattlPulseScale]);

  return (
    <JkseBattlScaleTouchable
      activeOpacity={disabled ? 1 : 0.7}
      onPress={disabled ? null : onPress}
      disabled={disabled}
      style={{ marginTop: 30 }}
    >
      <Animated.View style={{ transform: [{ scale: jkseBattlPulseScale }] }}>
        <LinearGradient
          colors={jkseBattlGoldGradient}
          style={jkseBattlStyles.jkseBattlButton}
          start={jkseBattlStartPosition}
          end={jkseBattlEndPosition}
        >
          {text !== 'Share' && (
            <Image source={require('../assets/icons/microphone.png')} />
          )}

          <Text style={jkseBattlStyles.jkseBattlButtonText}>{text}</Text>
        </LinearGradient>
      </Animated.View>
    </JkseBattlScaleTouchable>
  );
};

const jkseBattlStyles = StyleSheet.create({
  jkseBattlMainContainer: {
    flex: 1,
    backgroundColor: jkseBattlBgColor,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  jkseBattlHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderWidth: 0.9,
    borderColor: jkseBattlBorderColor,
    padding: 10,
    borderRadius: 15,
  },
  jkseBattlBackButton: {
    height: 58,
    width: 58,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 11,
    borderWidth: 0.9,
    borderColor: jkseBattlBorderColor,
  },
  jkseBattlTimerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 11,
    borderWidth: 0.6,
    borderColor: jkseBattlBorderColor,
  },
  jkseBattlTimerText: {
    color: '#E1C352',
    fontFamily: jkseBattlRegFont,
    fontSize: 16,
  },
  jkseBattlHeaderTitle: {
    color: '#fff',
    fontFamily: jkseBattlRegFont,
    fontSize: 20,
  },
  jkseBattlAppIcon: {
    width: 58,
    height: 58,
  },
  jkseBattlTitle: {
    color: '#fff',
    fontSize: 24,
    fontFamily: jkseBattlRegFont,
  },
  jkseBattlBullWrapper: {
    width: 290,
    height: 290,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  jkseBattlBull: {
    resizeMode: 'contain',
  },
  jkseBattlResultText: {
    color: '#fff',
    fontFamily: jkseBattlRegFont,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 30,
    paddingHorizontal: 20,
  },
  jkseBattlButton: {
    width: 268,
    height: 67,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  jkseBattlButtonText: {
    fontFamily: jkseBattlRegFont,
    fontSize: 17,
    color: '#000',
  },
});

export default JkseBattlTellBullJokeScreen;
