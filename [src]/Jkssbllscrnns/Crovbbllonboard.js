import LinearGradient from 'react-native-linear-gradient';

import { useNavigation } from '@react-navigation/native';

import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

const jkseBattlOnboardImages = [
  require('../assets/images/onboard_1.png'),
  require('../assets/images/onboard_2.png'),
  require('../assets/images/onboard_3.png'),
];

const jkseBattlOnboardTitles = [
  require('../assets/images/onboard_title_1.png'),
  require('../assets/images/onboard_title_2.png'),
  require('../assets/images/onboard_title_3.png'),
];

const jkseBattlBgColor = '#000';
const jkseBattlRegFont = 'OrelegaOne-Regular';
const jkseBattlGoldGradient = [
  '#E1C352',
  '#FFF9CC',
  '#E6CE67',
  '#EDE5BC',
  '#E2C23B',
];
const jkseBattlStartPosition = { x: 0, y: 2 };
const jkseBattlEndPosition = { x: 1, y: 0 };
const jkseBattlOnboardingDescriptions = [
  'Create a private room and invite friends.Each round everyone writes a joke, then votes for the funniest one.Win the round and prove your comedy power.',
  'Record your joke using voice.The bull listens and reacts with a simple verdict: funny or not.Practice your humor and improve every round.',
  'After every game you receive hooves.Use them as in-game currency to unlock exclusive wallpapers.Build your collection and show your progress.',
];
const JkseBattlAnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const Crovbbllonboard = () => {
  const { height: jkseBattlHeight } = useWindowDimensions();
  const [jkseBattlOnboardingStep, setJkseBattlOnboardingStep] = useState(0);
  const [jkseBattlTypedIntroText, setJkseBattlTypedIntroText] = useState('');
  const jkseBattlButtonScale = useRef(new Animated.Value(1)).current;
  const jkseBattlLogoOpacity = useRef(new Animated.Value(1)).current;
  const jkseBattlScreenOpacity = useRef(new Animated.Value(0)).current;
  const jkseBattlScreenTranslateY = useRef(new Animated.Value(12)).current;
  const jkseBattlNavigation = useNavigation();
  const jkseBattlFullIntroText =
    jkseBattlOnboardingDescriptions[jkseBattlOnboardingStep];

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

  useEffect(() => {
    setJkseBattlTypedIntroText('');
    let jkseBattlCharIndex = 0;

    const jkseBattlTypingInterval = setInterval(() => {
      jkseBattlCharIndex += 1;
      setJkseBattlTypedIntroText(
        jkseBattlFullIntroText.slice(0, jkseBattlCharIndex),
      );

      if (jkseBattlCharIndex >= jkseBattlFullIntroText.length) {
        clearInterval(jkseBattlTypingInterval);
      }
    }, 18);

    return () => clearInterval(jkseBattlTypingInterval);
  }, [jkseBattlFullIntroText]);

  useEffect(() => {
    jkseBattlLogoOpacity.setValue(0);
    Animated.timing(jkseBattlLogoOpacity, {
      toValue: 1,
      duration: 350,
      useNativeDriver: true,
    }).start();
  }, [jkseBattlOnboardingStep, jkseBattlLogoOpacity]);

  const jkseBattlHandleNextStep = () => {
    if (jkseBattlOnboardingStep < 2) {
      setJkseBattlOnboardingStep(jkseBattlOnboardingStep + 1);

      console.log('+ 1 step');
    } else {
      jkseBattlNavigation.replace('BottomTabs');
    }
  };

  const jkseBattlHandleButtonPressIn = () => {
    Animated.spring(jkseBattlButtonScale, {
      toValue: 0.96,
      useNativeDriver: true,
      speed: 40,
      bounciness: 0,
    }).start();
  };

  const jkseBattlHandleButtonPressOut = () => {
    Animated.spring(jkseBattlButtonScale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 30,
      bounciness: 6,
    }).start();
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: jkseBattlBgColor,
      }}
    >
      <Animated.View
        style={{
          flex: 1,
          opacity: jkseBattlScreenOpacity,
          transform: [{ translateY: jkseBattlScreenTranslateY }],
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={{
            flexGrow: 1,
            alignItems: 'center',
            paddingTop: jkseBattlHeight * 0.06,
            paddingBottom: 30,
          }}
        >
          <ImageBackground
            source={require('../assets/images/back_blur.png')}
            style={jkseBattlStyles.jkseBattlBgBlur}
          >
            {Platform.OS === 'ios' ? (
              <Image
                source={require('../assets/images/about_logo.png')}
                style={{ width: 70, height: 70, borderRadius: 12 }}
              />
            ) : (
              <Image
                source={require('../assets/images/icon.png')}
                style={{ width: 80, height: 80, borderRadius: 8 }}
              />
            )}
          </ImageBackground>

          <View style={jkseBattlStyles.jkseBattlPagination}>
            {[1, 2, 3].map((_, jkseBattlIdx) => (
              <Image
                key={jkseBattlIdx}
                source={
                  jkseBattlIdx <= jkseBattlOnboardingStep
                    ? require('../assets/images/active_pagination.png')
                    : require('../assets/images/inactive_pagination.png')
                }
              />
            ))}
          </View>

          <Image
            source={jkseBattlOnboardTitles[jkseBattlOnboardingStep]}
            style={{
              resizeMode: 'cover',
              marginBottom: jkseBattlHeight * 0.05,
            }}
          />

          <Animated.View style={{ opacity: jkseBattlLogoOpacity }}>
            <ImageBackground
              source={require('../assets/images/back_blur.png')}
              style={jkseBattlStyles.jkseBattlLogoBgBlur}
            >
              <Image
                source={jkseBattlOnboardImages[jkseBattlOnboardingStep]}
                style={{
                  resizeMode: 'cover',
                }}
              />
            </ImageBackground>
          </Animated.View>

          <View style={jkseBattlStyles.jkseBattlBottomContent}>
            <Text style={jkseBattlStyles.jkseBattlIntroSecondText}>
              {jkseBattlTypedIntroText}
            </Text>

            <JkseBattlAnimatedTouchableOpacity
              onPress={jkseBattlHandleNextStep}
              onPressIn={jkseBattlHandleButtonPressIn}
              onPressOut={jkseBattlHandleButtonPressOut}
              activeOpacity={1}
              style={{
                width: '100%',
                transform: [{ scale: jkseBattlButtonScale }],
              }}
            >
              <LinearGradient
                colors={jkseBattlGoldGradient}
                style={jkseBattlStyles.jkseBattlButton}
                start={jkseBattlStartPosition}
                end={jkseBattlEndPosition}
              >
                <Text style={jkseBattlStyles.jkseBattlButtonText}>
                  {jkseBattlOnboardingStep === 0
                    ? 'Next'
                    : jkseBattlOnboardingStep === 1
                    ? 'Continue'
                    : 'Start'}
                </Text>
              </LinearGradient>
            </JkseBattlAnimatedTouchableOpacity>
          </View>
        </ScrollView>
      </Animated.View>
    </View>
  );
};

const jkseBattlStyles = StyleSheet.create({
  jkseBattlBottomSheet: {
    backgroundColor: '#151225',
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    padding: 16,
    paddingTop: 30,
    width: '100%',
    borderWidth: 2,
    borderColor: '#3D375D',
    flex: 1,
    paddingBottom: 30,
    borderBottomColor: 'transparent',
  },
  jkseBattlBgBlur: {
    width: 110,
    height: 110,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  jkseBattlIntroSecondText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 33,
    fontFamily: jkseBattlRegFont,
    paddingHorizontal: 30,
    minHeight: 45,
  },
  jkseBattlBottomContent: {
    width: '100%',
    alignItems: 'center',
  },
  jkseBattlButton: {
    borderRadius: 15,
    height: 64,
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    alignSelf: 'center',
  },
  jkseBattlButtonText: {
    color: '#000',
    fontSize: 20,
    fontFamily: jkseBattlRegFont,
  },
  jkseBattlPagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
    gap: 5,
  },
  jkseBattlLogoBgBlur: {
    width: 310,
    height: 310,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Crovbbllonboard;
