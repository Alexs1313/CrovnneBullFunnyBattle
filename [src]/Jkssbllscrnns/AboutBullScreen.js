import LinearGradient from 'react-native-linear-gradient';

import { useNavigation } from '@react-navigation/native';

import React, { useEffect, useRef } from 'react';

import {
  Animated,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Share,
  useWindowDimensions,
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
const jkseBattlStartPosition = { x: 0, y: 0 };
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
        { alignSelf: 'center' },
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

const JkseBattlAboutBullScreen = () => {
  const jkseBattlNavigation = useNavigation();
  const { height: jkseBattlHeight } = useWindowDimensions();
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

  const jkseBattlOnShare = async () => {
    try {
      await Share.share({
        message:
          'Crovvn Bull: Joke Battle is a fun social app for humorous competitions between friends. Write or voice your jokes, vote for the best ones, and find out the verdict of the charismatic Bull. Collect your favorite jokes, open categories, and prove that your humor is worthy of the crown.',
      });
    } catch (error) {
      console.error('Share Error', error);
    }
  };

  return (
    <View style={jkseBattlStyles.jkseBattlContainer}>
      <ScrollView
        contentContainerStyle={[
          jkseBattlStyles.jkseBattlScroll,
          { paddingTop: jkseBattlHeight * 0.07 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={{
            width: '100%',
            opacity: jkseBattlScreenOpacity,
            transform: [{ translateY: jkseBattlScreenTranslateY }],
          }}
        >
          <View style={jkseBattlStyles.jkseBattlHeader}>
            <JkseBattlScaleTouchable
              style={jkseBattlStyles.jkseBattlBackButton}
              onPress={() => jkseBattlNavigation.goBack()}
            >
              <Image source={require('../assets/icons/back_arrow.png')} />
            </JkseBattlScaleTouchable>

            <Text style={jkseBattlStyles.jkseBattlHeaderTitle}>About</Text>

            {Platform.OS === 'ios' ? (
              <Image
                source={require('../assets/images/about_logo.png')}
                style={[
                  jkseBattlStyles.jkseBattlAppIcon,
                  {
                    borderRadius: 12,
                    borderWidth: 0.8,
                    borderColor: '#E6CE67',
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
                    borderColor: '#E6CE67',
                  },
                ]}
              />
            )}
          </View>

          <View style={jkseBattlStyles.jkseBattlLogoCard}>
            {Platform.OS === 'ios' ? (
              <Image
                source={require('../assets/images/about_logo.png')}
                style={{
                  width: 320,
                  height: 320,
                  borderRadius: 22,
                  borderWidth: 0.8,
                  alignSelf: 'center',
                  borderColor: '#E6CE67',
                }}
              />
            ) : (
              <Image
                source={require('../assets/images/icon.png')}
                style={[
                  {
                    width: 320,
                    height: 320,
                    borderRadius: 22,
                    borderWidth: 0.8,
                    alignSelf: 'center',
                    borderColor: '#E6CE67',
                  },
                ]}
              />
            )}
          </View>

          <Text style={jkseBattlStyles.jkseBattlDescription}>
            Crovvn Bull: Joke Battle is a fun social app for humorous
            competitions between friends. Write or voice your jokes, vote for
            the best ones and find out the verdict of the charismatic Bull.
            Collect your favorite jokes, open categories and prove that your
            humor is worthy of the crown.
          </Text>

          <JkseBattlScaleTouchable
            activeOpacity={0.7}
            onPress={jkseBattlOnShare}
          >
            <LinearGradient
              colors={jkseBattlGoldGradient}
              start={jkseBattlStartPosition}
              end={jkseBattlEndPosition}
              style={jkseBattlStyles.jkseBattlShareButton}
            >
              <Text style={jkseBattlStyles.jkseBattlShareText}>Share</Text>
            </LinearGradient>
          </JkseBattlScaleTouchable>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const jkseBattlStyles = StyleSheet.create({
  jkseBattlContainer: {
    flex: 1,
    backgroundColor: jkseBattlBgColor,
  },
  jkseBattlScroll: {
    alignItems: 'center',
    padding: 20,
    flexGrow: 1,
  },
  jkseBattlHeader: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 0.8,
    borderColor: '#E6CE67',
    borderRadius: 16,
    padding: 10,
    marginBottom: 40,
  },
  jkseBattlBackButton: {
    width: 56,
    height: 56,
    borderRadius: 12,
    borderWidth: 0.8,
    borderColor: '#E6CE67',
    justifyContent: 'center',
    alignItems: 'center',
  },
  jkseBattlHeaderTitle: {
    color: '#fff',
    fontFamily: jkseBattlRegFont,
    fontSize: 20,
  },
  jkseBattlAppIcon: {
    width: 56,
    height: 56,
  },
  jkseBattlLogoCard: {
    marginBottom: 30,
  },
  jkseBattlLogoImage: {
    resizeMode: 'cover',
  },
  jkseBattlDescription: {
    color: '#fff',
    fontFamily: jkseBattlRegFont,
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  jkseBattlShareButton: {
    width: 260,
    height: 64,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  jkseBattlShareText: {
    color: '#000',
    fontFamily: jkseBattlRegFont,
    fontSize: 20,
  },
});

export default JkseBattlAboutBullScreen;
