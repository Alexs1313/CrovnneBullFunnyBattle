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

const primaryFont = 'OrelegaOne-Regular';
const bgColor = '#000';
const bordersColor = '#E6CE67';
const goldGradient = ['#E1C352', '#FFF9CC', '#E6CE67', '#EDE5BC', '#E2C23B'];
const startPosition = { x: 0, y: 2 };
const endPosition = { x: 1, y: 0 };

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const ScaleTouchable = ({
  children,
  style,
  disabled,
  onPress,
  onPressIn,
  onPressOut,
  ...props
}) => {
  const scale = useRef(new Animated.Value(1)).current;
  const shakeX = useRef(new Animated.Value(0)).current;

  const runDisabledShake = () => {
    Animated.sequence([
      Animated.timing(shakeX, { toValue: -6, duration: 35, useNativeDriver: true }),
      Animated.timing(shakeX, { toValue: 6, duration: 35, useNativeDriver: true }),
      Animated.timing(shakeX, { toValue: -4, duration: 30, useNativeDriver: true }),
      Animated.timing(shakeX, { toValue: 4, duration: 30, useNativeDriver: true }),
      Animated.timing(shakeX, { toValue: 0, duration: 25, useNativeDriver: true }),
    ]).start();
  };

  const handlePressIn = event => {
    if (disabled) {
      runDisabledShake();
    } else {
      Animated.spring(scale, {
        toValue: 0.96,
        useNativeDriver: true,
        speed: 40,
        bounciness: 0,
      }).start();
    }

    onPressIn?.(event);
  };

  const handlePressOut = event => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 30,
      bounciness: 6,
    }).start();

    onPressOut?.(event);
  };

  const handlePress = event => {
    if (disabled) {
      runDisabledShake();
      return;
    }

    onPress?.(event);
  };

  return (
    <AnimatedTouchableOpacity
      {...props}
      style={[style, { transform: [{ translateX: shakeX }, { scale }] }]}
      activeOpacity={1}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      {children}
    </AnimatedTouchableOpacity>
  );
};

const FunnyBattleMenu = () => {
  const navigation = useNavigation();
  const screenOpacity = useRef(new Animated.Value(0)).current;
  const screenTranslateY = useRef(new Animated.Value(12)).current;
  const iconOpacity = useRef(new Animated.Value(0)).current;
  const iconScale = useRef(new Animated.Value(0.92)).current;
  const iconTranslateY = useRef(new Animated.Value(10)).current;
  const buttonsOpacity = useRef(new Animated.Value(0)).current;
  const buttonsTranslateY = useRef(new Animated.Value(14)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(screenOpacity, {
        toValue: 1,
        duration: 320,
        useNativeDriver: true,
      }),
      Animated.timing(screenTranslateY, {
        toValue: 0,
        duration: 320,
        useNativeDriver: true,
      }),
      Animated.timing(iconOpacity, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.spring(iconScale, {
        toValue: 1,
        useNativeDriver: true,
        speed: 14,
        bounciness: 7,
      }),
      Animated.timing(iconTranslateY, {
        toValue: 0,
        duration: 360,
        useNativeDriver: true,
      }),
      Animated.timing(buttonsOpacity, {
        toValue: 1,
        duration: 350,
        delay: 120,
        useNativeDriver: true,
      }),
      Animated.timing(buttonsTranslateY, {
        toValue: 0,
        duration: 350,
        delay: 120,
        useNativeDriver: true,
      }),
    ]).start();
  }, [
    buttonsOpacity,
    buttonsTranslateY,
    iconOpacity,
    iconScale,
    iconTranslateY,
    screenOpacity,
    screenTranslateY,
  ]);

  const handleNavigateTo = selectedScreen => {
    navigation.navigate(selectedScreen);
  };

  return (
    <View style={[s.mainContainer]}>
      <Animated.View
        style={{
          flex: 1,
          opacity: screenOpacity,
          transform: [{ translateY: screenTranslateY }],
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={s.scrollContainer}
        >
        <Animated.View
          style={{
            opacity: iconOpacity,
            transform: [{ translateY: iconTranslateY }, { scale: iconScale }],
          }}
        >
          <ImageBackground
            source={require('../assets/images/back_blur.png')}
            style={s.backgroundBlur}
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
            opacity: buttonsOpacity,
            transform: [{ translateY: buttonsTranslateY }],
            width: '100%',
            alignItems: 'center',
          }}
        >
          <ScaleTouchable
            activeOpacity={0.6}
            style={{ width: '90%' }}
            onPress={() => handleNavigateTo('PlayTogetherScreen')}
          >
            <LinearGradient
              colors={goldGradient}
              style={s.primaryButton}
              start={startPosition}
              end={endPosition}
            >
              <Text style={s.buttonText}>Play together</Text>
            </LinearGradient>
          </ScaleTouchable>

          <ScaleTouchable
            style={s.secondaryButton}
            onPress={() => handleNavigateTo('TellBullJokeScreen')}
            activeOpacity={0.6}
          >
            <Text style={s.challengeButtonText}>Tell a joke</Text>
          </ScaleTouchable>
          <ScaleTouchable
            style={s.secondaryButton}
            onPress={() => handleNavigateTo('SelectionOfJokesScreen')}
            activeOpacity={0.6}
          >
            <Text style={s.challengeButtonText}>Selection of jokes</Text>
          </ScaleTouchable>

          <View style={{ flexDirection: 'row', gap: 20 }}>
            <ScaleTouchable
              style={s.detailsButton}
              onPress={() => handleNavigateTo('SavedJokesScreen')}
              activeOpacity={0.6}
            >
              <Image source={require('../assets/icons/stash_save-ribbon.png')} />
            </ScaleTouchable>
            <ScaleTouchable
              style={s.detailsButton}
              onPress={() => handleNavigateTo('AboutBullScreen')}
              activeOpacity={0.6}
            >
              <Image source={require('../assets/icons/m_about.png')} />
            </ScaleTouchable>
          </View>
        </Animated.View>
        </ScrollView>
      </Animated.View>
    </View>
  );
};

const s = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: bgColor,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  primaryButton: {
    borderRadius: 15,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    alignSelf: 'center',
  },
  backgroundBlur: {
    width: 340,
    height: 340,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  secondaryButton: {
    borderWidth: 0.9,
    borderColor: bordersColor,
    borderRadius: 15,
    paddingVertical: 14,
    height: 56,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '55%',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#000',
    fontSize: 20,
    fontFamily: primaryFont,
  },
  challengeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: primaryFont,
  },
  detailsButton: {
    borderWidth: 0.9,
    borderColor: bordersColor,
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

export default FunnyBattleMenu;
