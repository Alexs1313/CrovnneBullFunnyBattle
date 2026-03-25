import LinearGradient from 'react-native-linear-gradient';

import { useStorage } from '../Jkssbllstorage/bullBattleContext';

import { useNavigation, useFocusEffect } from '@react-navigation/native';

import React, { useCallback, useEffect, useRef } from 'react';
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

const jkseBattlCategoryMeta = {
  friendly: {
    title: require('../assets/images/FriendlyBull.png'),
    image: require('../assets/images/friendly_bull.png'),
  },
  smart: {
    title: require('../assets/images/SmartBull.png'),
    image: require('../assets/images/smart_bull.png'),
  },
  savage: {
    title: require('../assets/images/SavageBull.png'),
    image: require('../assets/images/savage_bull.png'),
  },
};

const JkseBattlSavedJokesScreen = () => {
  const jkseBattlNavigation = useNavigation();
  const { height: jkseBattlHeight } = useWindowDimensions();
  const {
    saved: jkseBattlSaved,
    loadSavedJokes: jkseBattlLoadSavedJokes,
    removeSavedJoke: jkseBattlRemoveSavedJoke,
  } = useStorage();
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

  useFocusEffect(
    useCallback(() => {
      jkseBattlLoadSavedJokes();
    }, [jkseBattlLoadSavedJokes]),
  );

  const jkseBattlHandleGoToJokes = () => {
    jkseBattlNavigation.navigate('BottomTabs', {
      screen: 'SelectionOfJokesScreen',
    });
  };

  if (!jkseBattlSaved.length) {
    return (
      <View style={jkseBattlStyles.jkseBattlContainer}>
        <Animated.View
          style={{
            flex: 1,
            opacity: jkseBattlScreenOpacity,
            transform: [{ translateY: jkseBattlScreenTranslateY }],
          }}
        >
          <ScrollView
            contentContainerStyle={[
              jkseBattlStyles.jkseBattlScroll,
              { paddingTop: jkseBattlHeight * 0.07, paddingBottom: 130 },
            ]}
            showsVerticalScrollIndicator={false}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                gap: 10,
                marginBottom: 20,
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
                  Play together
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

            <View style={jkseBattlStyles.jkseBattlEmptyWrap}>
              <Image
                source={require('../assets/images/bttlbltabacemptsv.png')}
                style={jkseBattlStyles.jkseBattlEmptyBull}
              />
              <Text style={jkseBattlStyles.jkseBattlEmptyText}>
                You don't have any saved jokes yet...
              </Text>
              <JkseBattlScaleTouchable
                activeOpacity={0.7}
                style={jkseBattlStyles.jkseBattlEmptyActionWrap}
                onPress={jkseBattlHandleGoToJokes}
              >
                <LinearGradient
                  colors={jkseBattlGoldGradient}
                  style={jkseBattlStyles.jkseBattlEmptyActionButton}
                  start={jkseBattlStartPosition}
                  end={jkseBattlEndPosition}
                >
                  <Text style={jkseBattlStyles.jkseBattlEmptyActionText}>
                    Go to jokes
                  </Text>
                </LinearGradient>
              </JkseBattlScaleTouchable>
            </View>
          </ScrollView>
        </Animated.View>
      </View>
    );
  }

  return (
    <View style={jkseBattlStyles.jkseBattlContainer}>
      <Animated.View
        style={{
          flex: 1,
          opacity: jkseBattlScreenOpacity,
          transform: [{ translateY: jkseBattlScreenTranslateY }],
        }}
      >
        <ScrollView
          contentContainerStyle={[
            jkseBattlStyles.jkseBattlScroll,
            { paddingTop: jkseBattlHeight * 0.07 },
          ]}
          showsVerticalScrollIndicator={false}
        >
          <View style={jkseBattlStyles.jkseBattlHeader}>
            <JkseBattlScaleTouchable
              style={jkseBattlStyles.jkseBattlBackButton}
              onPress={() => jkseBattlNavigation.goBack()}
            >
              <Image source={require('../assets/icons/back_arrow.png')} />
            </JkseBattlScaleTouchable>

            <Text style={jkseBattlStyles.jkseBattlHeaderTitle}>Saved</Text>

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
          </View>

          {jkseBattlSaved.map((jkseBattlItem, jkseBattlIdx) => {
            const jkseBattlMeta = jkseBattlCategoryMeta[jkseBattlItem.category];

            return (
              <View key={jkseBattlIdx} style={jkseBattlStyles.jkseBattlCard}>
                <Image
                  source={jkseBattlMeta.image}
                  style={jkseBattlStyles.jkseBattlCardBull}
                />

                <View style={jkseBattlStyles.jkseBattlCardContent}>
                  <Image
                    source={jkseBattlMeta.title}
                    style={{ width: 160, height: 35, resizeMode: 'contain' }}
                  />

                  <Text style={jkseBattlStyles.jkseBattlCardText}>
                    {jkseBattlItem.joke}
                  </Text>

                  <View style={jkseBattlStyles.jkseBattlCardActions}>
                    <JkseBattlScaleTouchable
                      activeOpacity={0.7}
                      onPress={() =>
                        Share.share({ message: jkseBattlItem.joke })
                      }
                      style={{ flex: 1 }}
                    >
                      <LinearGradient
                        colors={jkseBattlGoldGradient}
                        style={jkseBattlStyles.jkseBattlShareButton}
                        start={jkseBattlStartPosition}
                        end={jkseBattlEndPosition}
                      >
                        <Text style={jkseBattlStyles.jkseBattlShareText}>
                          Share
                        </Text>
                      </LinearGradient>
                    </JkseBattlScaleTouchable>

                    <JkseBattlScaleTouchable
                      style={jkseBattlStyles.jkseBattlTrashButton}
                      onPress={() =>
                        jkseBattlRemoveSavedJoke(jkseBattlItem.joke)
                      }
                    >
                      <Image source={require('../assets/icons/trash.png')} />
                    </JkseBattlScaleTouchable>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </Animated.View>
    </View>
  );
};

export default JkseBattlSavedJokesScreen;

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
    marginBottom: 30,
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
  jkseBattlBackButtonPlaceholder: {
    width: 56,
    height: 56,
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
  jkseBattlEmptyWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingBottom: 34,
  },
  jkseBattlEmptyBull: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 24,
  },
  jkseBattlEmptyText: {
    color: '#fff',
    fontFamily: jkseBattlRegFont,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 36,
  },
  jkseBattlEmptyActionWrap: {
    width: '86%',
  },
  jkseBattlEmptyActionButton: {
    height: 64,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  jkseBattlEmptyActionText: {
    color: '#000',
    fontFamily: jkseBattlRegFont,
    fontSize: 20,
  },
  jkseBattlCard: {
    width: '100%',
    borderWidth: 0.8,
    borderColor: '#E6CE67',
    borderRadius: 18,
    padding: 12,
    flexDirection: 'row',
    marginBottom: 20,
  },
  jkseBattlCardBull: {
    width: 133,
    height: 215,
    resizeMode: 'contain',
  },
  jkseBattlCardContent: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'center',
  },
  jkseBattlCardText: {
    marginTop: 10,
    color: '#fff',
    fontFamily: jkseBattlRegFont,
    fontSize: 24,
  },
  jkseBattlCardActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
    gap: 10,
  },
  jkseBattlShareButton: {
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  jkseBattlShareText: {
    color: '#000',
    fontFamily: jkseBattlRegFont,
    fontSize: 16,
  },
  jkseBattlTrashButton: {
    width: 48,
    height: 48,
    borderRadius: 14,
    borderWidth: 0.8,
    borderColor: '#E6CE67',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
