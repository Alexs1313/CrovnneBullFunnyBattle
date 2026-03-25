import { useNavigation } from '@react-navigation/native';

import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const jkseBattlPrimaryFont = 'OrelegaOne-Regular';
const jkseBattlBgColor = '#000';
const jkseBattlBordersColor = '#E6CE67';
const jkseBattlGoldGradient = [
  '#E1C352',
  '#FFF9CC',
  '#E6CE67',
  '#EDE5BC',
  '#E2C23B',
];
const jkseBattlStartPosition = { x: 0, y: 2 };
const jkseBattlEndPosition = { x: 1, y: 0 };

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

const JkseBattlFunnyBattleMenu = () => {
  const jkseBattlNavigation = useNavigation();
  const jkseBattlScreenOpacity = useRef(new Animated.Value(0)).current;
  const jkseBattlScreenTranslateY = useRef(new Animated.Value(12)).current;
  const jkseBattlIconOpacity = useRef(new Animated.Value(0)).current;
  const jkseBattlIconScale = useRef(new Animated.Value(0.92)).current;
  const jkseBattlIconTranslateY = useRef(new Animated.Value(10)).current;
  const jkseBattlButtonsOpacity = useRef(new Animated.Value(0)).current;
  const jkseBattlButtonsTranslateY = useRef(new Animated.Value(14)).current;

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
      Animated.timing(jkseBattlIconOpacity, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.spring(jkseBattlIconScale, {
        toValue: 1,
        useNativeDriver: true,
        speed: 14,
        bounciness: 7,
      }),
      Animated.timing(jkseBattlIconTranslateY, {
        toValue: 0,
        duration: 360,
        useNativeDriver: true,
      }),
      Animated.timing(jkseBattlButtonsOpacity, {
        toValue: 1,
        duration: 350,
        delay: 120,
        useNativeDriver: true,
      }),
      Animated.timing(jkseBattlButtonsTranslateY, {
        toValue: 0,
        duration: 350,
        delay: 120,
        useNativeDriver: true,
      }),
    ]).start();
  }, [
    jkseBattlButtonsOpacity,
    jkseBattlButtonsTranslateY,
    jkseBattlIconOpacity,
    jkseBattlIconScale,
    jkseBattlIconTranslateY,
    jkseBattlScreenOpacity,
    jkseBattlScreenTranslateY,
  ]);

  const jkseBattlHandleNavigateTo = selectedScreen => {
    jkseBattlNavigation.navigate(selectedScreen);
  };

  return (
    <View style={[jkseBattlStyles.jkseBattlMainContainer]}>
      <Animated.View
        style={{
          flex: 1,
          opacity: jkseBattlScreenOpacity,
          transform: [{ translateY: jkseBattlScreenTranslateY }],
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={jkseBattlStyles.jkseBattlScrollContainer}
        >
          <Animated.View
            style={{
              opacity: jkseBattlIconOpacity,
              transform: [
                { translateY: jkseBattlIconTranslateY },
                { scale: jkseBattlIconScale },
              ],
            }}
          >
            <ImageBackground
              source={require('../assets/images/back_blur.png')}
              style={jkseBattlStyles.jkseBattlBackgroundBlur}
            >
              {Platform.OS === 'ios' ? (
                <Image
                  source={require('../assets/images/about_logo.png')}
                  style={{ width: 230, height: 230, borderRadius: 42 }}
                />
              ) : (
                <Image
                  source={require('../assets/images/icon.png')}
                  style={{ width: 230, height: 230, borderRadius: 22 }}
                />
              )}
            </ImageBackground>
          </Animated.View>

          <Animated.View
            style={{
              opacity: jkseBattlButtonsOpacity,
              transform: [{ translateY: jkseBattlButtonsTranslateY }],
              width: '100%',
              alignItems: 'center',
            }}
          >
            <JkseBattlScaleTouchable
              activeOpacity={0.6}
              style={{ width: '90%' }}
              onPress={() => jkseBattlHandleNavigateTo('PlayTogetherScreen')}
            >
              <LinearGradient
                colors={jkseBattlGoldGradient}
                style={jkseBattlStyles.jkseBattlPrimaryButton}
                start={jkseBattlStartPosition}
                end={jkseBattlEndPosition}
              >
                <Text style={jkseBattlStyles.jkseBattlButtonText}>
                  Play together
                </Text>
              </LinearGradient>
            </JkseBattlScaleTouchable>

            <JkseBattlScaleTouchable
              style={jkseBattlStyles.jkseBattlSecondaryButton}
              onPress={() => jkseBattlHandleNavigateTo('TellBullJokeScreen')}
              activeOpacity={0.6}
            >
              <Text style={jkseBattlStyles.jkseBattlChallengeButtonText}>
                Tell a joke
              </Text>
            </JkseBattlScaleTouchable>

            <JkseBattlScaleTouchable
              style={jkseBattlStyles.jkseBattlSecondaryButton}
              onPress={() =>
                jkseBattlHandleNavigateTo('SelectionOfJokesScreen')
              }
              activeOpacity={0.6}
            >
              <Text style={jkseBattlStyles.jkseBattlChallengeButtonText}>
                Selection of jokes
              </Text>
            </JkseBattlScaleTouchable>

            <View style={{ flexDirection: 'row', gap: 20 }}>
              <JkseBattlScaleTouchable
                style={jkseBattlStyles.jkseBattlDetailsButton}
                onPress={() => jkseBattlHandleNavigateTo('SavedJokesScreen')}
                activeOpacity={0.6}
              >
                <Image
                  source={require('../assets/icons/stash_save-ribbon.png')}
                />
              </JkseBattlScaleTouchable>

              <JkseBattlScaleTouchable
                style={jkseBattlStyles.jkseBattlDetailsButton}
                onPress={() => jkseBattlHandleNavigateTo('AboutBullScreen')}
                activeOpacity={0.6}
              >
                <Image source={require('../assets/icons/m_about.png')} />
              </JkseBattlScaleTouchable>
            </View>
          </Animated.View>
        </ScrollView>
      </Animated.View>
    </View>
  );
};

const jkseBattlStyles = StyleSheet.create({
  jkseBattlMainContainer: {
    flex: 1,
    backgroundColor: jkseBattlBgColor,
  },
  jkseBattlScrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  jkseBattlPrimaryButton: {
    borderRadius: 15,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    alignSelf: 'center',
  },
  jkseBattlBackgroundBlur: {
    width: 340,
    height: 340,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  jkseBattlSecondaryButton: {
    borderWidth: 0.9,
    borderColor: jkseBattlBordersColor,
    borderRadius: 15,
    paddingVertical: 14,
    height: 56,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '55%',
    alignSelf: 'center',
  },
  jkseBattlButtonText: {
    color: '#000',
    fontSize: 20,
    fontFamily: jkseBattlPrimaryFont,
  },
  jkseBattlChallengeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: jkseBattlPrimaryFont,
  },
  jkseBattlDetailsButton: {
    borderWidth: 0.9,
    borderColor: jkseBattlBordersColor,
    borderRadius: 13,
    paddingVertical: 14,
    height: 51,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 51,
    alignSelf: 'center',
  },
});

export default JkseBattlFunnyBattleMenu;
