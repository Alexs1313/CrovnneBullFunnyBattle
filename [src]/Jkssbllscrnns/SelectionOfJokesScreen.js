import { jokesCategories } from '../../jokesCategories';

import { useNavigation, useRoute } from '@react-navigation/native';

import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Share,
  useWindowDimensions,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import AsyncStorage from '@react-native-async-storage/async-storage';

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

const JkseBattlSelectionOfJokesScreen = () => {
  const jkseBattlNavigation = useNavigation();
  const jkseBattlRoute = useRoute();
  const jkseBattlSelectedJoke = jkseBattlRoute.params?.selectedJoke ?? null;
  const jkseBattlSelectedCategoryIndex = jkseBattlRoute.params?.categoryIndex;
  const jkseBattlIsResultMode =
    jkseBattlRoute.name === 'SelectionOfJokesResultScreen' &&
    jkseBattlSelectedJoke !== null;
  const [jkseBattlIsSaved, setJkseBattlIsSaved] = useState(false);
  const [jkseBattlIndex, setJkseBattlIndex] = useState(0);
  const [jkseBattlChosenCategoryIndex, setJkseBattlChosenCategoryIndex] =
    useState(null);
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

  const jkseBattlCategory = jokesCategories[jkseBattlIndex];
  const jkseBattlIsCurrentCategoryChosen =
    jkseBattlChosenCategoryIndex === jkseBattlIndex;
  const jkseBattlResultCategory =
    typeof jkseBattlSelectedCategoryIndex === 'number'
      ? jokesCategories[jkseBattlSelectedCategoryIndex]
      : jkseBattlCategory;

  const jkseBattlOpenResultScreen = (jkseBattlCategoryIndex, jkseBattlJoke) => {
    jkseBattlNavigation.navigate('SelectionOfJokesResultScreen', {
      categoryIndex: jkseBattlCategoryIndex,
      selectedJoke: jkseBattlJoke,
    });
  };

  const jkseBattlChooseCategory = () => {
    setJkseBattlChosenCategoryIndex(jkseBattlIndex);
  };

  const jkseBattlOpenRandomJoke = () => {
    try {
      const jkseBattlRandomCategoryIndex =
        jkseBattlChosenCategoryIndex === null
          ? jkseBattlIndex
          : jkseBattlChosenCategoryIndex;
      const jkseBattlRandomCategory =
        jokesCategories[jkseBattlRandomCategoryIndex];
      const jkseBattlRandomJoke =
        jkseBattlRandomCategory.jokes[
          Math.floor(Math.random() * jkseBattlRandomCategory.jokes.length)
        ];

      jkseBattlOpenResultScreen(
        jkseBattlRandomCategoryIndex,
        jkseBattlRandomJoke,
      );
    } catch (jkseBattlError) {
      console.error('random joke error', jkseBattlError);
    }
  };

  useEffect(() => {
    let jkseBattlIsMounted = true;

    const jkseBattlSyncSavedState = async () => {
      if (!jkseBattlIsResultMode) {
        if (jkseBattlIsMounted) setJkseBattlIsSaved(false);
        return;
      }

      try {
        const jkseBattlStored = await AsyncStorage.getItem('saved_jokes');
        const jkseBattlSavedJokes = jkseBattlStored
          ? JSON.parse(jkseBattlStored)
          : [];
        const jkseBattlJokeExists = jkseBattlSavedJokes.some(
          jkseBattlItem => jkseBattlItem.joke === jkseBattlSelectedJoke,
        );

        if (jkseBattlIsMounted) setJkseBattlIsSaved(jkseBattlJokeExists);
      } catch (jkseBattlError) {
        console.error('saved joke state error', jkseBattlError);
      }
    };

    jkseBattlSyncSavedState();

    return () => {
      jkseBattlIsMounted = false;
    };
  }, [jkseBattlIsResultMode, jkseBattlSelectedJoke]);

  const jkseBattlToggleSaveJoke = async () => {
    try {
      const jkseBattlStoredJokes = await AsyncStorage.getItem('saved_jokes');
      const jkseBattlSavedJokes = jkseBattlStoredJokes
        ? JSON.parse(jkseBattlStoredJokes)
        : [];

      const jkseBattlJokeExists = jkseBattlSavedJokes.some(
        jkseBattlItem => jkseBattlItem.joke === jkseBattlSelectedJoke,
      );

      if (jkseBattlJokeExists) {
        const jkseBattlUpdatedJokes = jkseBattlSavedJokes.filter(
          jkseBattlItem => jkseBattlItem.joke !== jkseBattlSelectedJoke,
        );
        await AsyncStorage.setItem(
          'saved_jokes',
          JSON.stringify(jkseBattlUpdatedJokes),
        );
        setJkseBattlIsSaved(false);

        console.log('deleted');
      } else {
        const jkseBattlNewJoke = {
          joke: jkseBattlSelectedJoke,
          category: jkseBattlResultCategory.id,
          date: Date.now(),
        };
        const jkseBattlUpdatedJokes = [
          ...jkseBattlSavedJokes,
          jkseBattlNewJoke,
        ];
        await AsyncStorage.setItem(
          'saved_jokes',
          JSON.stringify(jkseBattlUpdatedJokes),
        );
        setJkseBattlIsSaved(true);

        console.log('saved');
      }
    } catch (jkseBattlError) {
      console.error('Error toggling joke:', jkseBattlError);
    }
  };

  const jkseBattlNextJoke = () =>
    setJkseBattlIndex((jkseBattlIndex + 1) % jokesCategories.length);
  const jkseBattlPrevJoke = () =>
    setJkseBattlIndex(
      (jkseBattlIndex - 1 + jokesCategories.length) % jokesCategories.length,
    );

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
        >
          {jkseBattlIsResultMode ? (
            <View style={jkseBattlStyles.jkseBattlHeader}>
              {jkseBattlIsResultMode ? (
                <JkseBattlScaleTouchable
                  style={jkseBattlStyles.jkseBattlBackButton}
                  onPress={() => jkseBattlNavigation.goBack()}
                >
                  <Image source={require('../assets/icons/back_arrow.png')} />
                </JkseBattlScaleTouchable>
              ) : (
                <View style={jkseBattlStyles.jkseBattlBackButtonPlaceholder} />
              )}

              <Text style={jkseBattlStyles.jkseBattlHeaderTitle}>
                Selection of jokes
              </Text>

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
          ) : (
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
                  Selection of jokes
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
          )}

          {!jkseBattlIsResultMode ? (
            <>
              <Text
                style={[
                  jkseBattlStyles.jkseBattlTopTitle,
                  { marginTop: jkseBattlHeight * 0.04 },
                ]}
              >
                Choose a category
              </Text>

              <ImageBackground
                source={require('../assets/images/back_blur.png')}
                style={[
                  jkseBattlStyles.jkseBattlBullWrapper,
                  { marginTop: jkseBattlHeight * 0.002 },
                ]}
              >
                <Image
                  source={jkseBattlCategory.image}
                  style={{ width: 120, height: 220 }}
                />
              </ImageBackground>

              <Image
                source={jkseBattlCategory.title}
                style={{ marginTop: 30 }}
              />
              <Text style={jkseBattlStyles.jkseBattlDescription}>
                {jkseBattlCategory.description}
              </Text>

              <View style={jkseBattlStyles.jkseBattlBottomButtonsWrap}>
                <JkseBattlScaleTouchable
                  style={jkseBattlStyles.jkseBattlArrowButton}
                  onPress={jkseBattlPrevJoke}
                >
                  <Image source={require('../assets/icons/back_arrow.png')} />
                </JkseBattlScaleTouchable>

                <JkseBattlScaleTouchable
                  activeOpacity={0.7}
                  onPress={jkseBattlChooseCategory}
                  style={{ flex: 1 }}
                >
                  <LinearGradient
                    colors={jkseBattlGoldGradient}
                    start={jkseBattlStartPosition}
                    end={jkseBattlEndPosition}
                    style={jkseBattlStyles.jkseBattlChooseButton}
                  >
                    <Text
                      style={jkseBattlStyles.jkseBattlChooseText}
                      onPress={jkseBattlChooseCategory}
                    >
                      {jkseBattlIsCurrentCategoryChosen ? 'Choosen' : 'Choose'}
                    </Text>
                  </LinearGradient>
                </JkseBattlScaleTouchable>

                <JkseBattlScaleTouchable
                  style={jkseBattlStyles.jkseBattlArrowButton}
                  onPress={jkseBattlNextJoke}
                >
                  <Image source={require('../assets/icons/arr_right.png')} />
                </JkseBattlScaleTouchable>
              </View>
              <JkseBattlScaleTouchable
                activeOpacity={0.7}
                onPress={jkseBattlOpenRandomJoke}
                disabled={jkseBattlChosenCategoryIndex === null}
                style={jkseBattlStyles.jkseBattlRandomJokeButtonWrap}
              >
                <LinearGradient
                  colors={jkseBattlGoldGradient}
                  start={jkseBattlStartPosition}
                  end={jkseBattlEndPosition}
                  style={jkseBattlStyles.jkseBattlRandomJokeButton}
                >
                  <Image
                    source={require('../assets/images/bttlbltabacrand.png')}
                  />
                  <Text style={jkseBattlStyles.jkseBattlRandomJokeText}>
                    Random joke
                  </Text>
                </LinearGradient>
              </JkseBattlScaleTouchable>
            </>
          ) : (
            <>
              <ImageBackground
                source={require('../assets/images/back_blur.png')}
                style={[
                  jkseBattlStyles.jkseBattlBullWrapper,
                  { marginTop: jkseBattlHeight * 0.1 },
                ]}
              >
                <Image source={jkseBattlResultCategory.image} />
              </ImageBackground>

              <Image
                source={jkseBattlResultCategory.title}
                style={{ marginTop: 30 }}
              />
              <Text style={jkseBattlStyles.jkseBattlJokeText}>
                {jkseBattlSelectedJoke}
              </Text>

              <View style={jkseBattlStyles.jkseBattlBottomRow}>
                <JkseBattlScaleTouchable
                  activeOpacity={0.7}
                  style={{ width: '60%' }}
                  onPress={() =>
                    Share.share({ message: jkseBattlSelectedJoke })
                  }
                >
                  <LinearGradient
                    colors={jkseBattlGoldGradient}
                    start={jkseBattlStartPosition}
                    end={jkseBattlEndPosition}
                    style={jkseBattlStyles.jkseBattlShareButton}
                  >
                    <Text style={jkseBattlStyles.jkseBattlChooseText}>
                      Share
                    </Text>
                  </LinearGradient>
                </JkseBattlScaleTouchable>

                <JkseBattlScaleTouchable
                  style={jkseBattlStyles.jkseBattlSaveIconButton}
                  onPress={jkseBattlToggleSaveJoke}
                  activeOpacity={0.7}
                >
                  {jkseBattlIsSaved ? (
                    <Image
                      source={require('../assets/icons/bookmark_saved.png')}
                    />
                  ) : (
                    <Image source={require('../assets/icons/bookmark.png')} />
                  )}
                </JkseBattlScaleTouchable>
              </View>
            </>
          )}
        </ScrollView>
      </Animated.View>
    </View>
  );
};

export default JkseBattlSelectionOfJokesScreen;

const jkseBattlStyles = StyleSheet.create({
  jkseBattlContainer: {
    flex: 1,
    backgroundColor: jkseBattlBgColor,
  },
  jkseBattlArrowButton: {
    width: 57,
    height: 57,
    borderRadius: 13,
    borderWidth: 0.9,
    borderColor: jkseBattlBorderColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  jkseBattlBottomButtonsWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    gap: 9,
    justifyContent: 'center',
  },
  jkseBattlScroll: {
    alignItems: 'center',
    padding: 20,
  },
  jkseBattlTopTitle: {
    color: '#fff',
    fontFamily: jkseBattlRegFont,
    fontSize: 24,
    marginBottom: 20,
  },
  jkseBattlHeader: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 0.8,
    borderColor: jkseBattlBorderColor,
    borderRadius: 16,
    padding: 10,
  },
  jkseBattlBackButton: {
    width: 56,
    height: 56,
    borderRadius: 12,
    borderWidth: 0.8,
    borderColor: jkseBattlBorderColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  jkseBattlBackButtonPlaceholder: {
    width: 56,
    height: 56,
  },
  jkseBattlSaveIconButton: {
    width: 56,
    height: 56,
    borderRadius: 12,
    borderWidth: 0.8,
    borderColor: jkseBattlBorderColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  jkseBattlBottomRow: {
    flexDirection: 'row',
    marginTop: 50,
    gap: 14,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  jkseBattlShareButton: {
    height: 64,
    borderRadius: 15,
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
  jkseBattlTitle: {
    marginTop: 50,
    marginBottom: 20,
    color: '#fff',
    fontSize: 24,
    fontFamily: jkseBattlRegFont,
  },
  jkseBattlDescription: {
    marginTop: 27,
    color: '#fff',
    fontFamily: jkseBattlRegFont,
    fontSize: 15,
    textAlign: 'center',
    paddingHorizontal: 24,
  },
  jkseBattlChooseButton: {
    height: 64,
    flex: 1,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  jkseBattlChooseText: {
    color: '#000',
    fontFamily: jkseBattlRegFont,
    fontSize: 20,
  },
  jkseBattlRandomJokeButtonWrap: {
    width: '100%',
    marginTop: 30,
  },
  jkseBattlRandomJokeButton: {
    height: 64,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    width: '85%',
    flexDirection: 'row',
    gap: 10,
    alignSelf: 'center',
  },
  jkseBattlRandomJokeText: {
    color: '#000',
    fontFamily: jkseBattlRegFont,
    fontSize: 24,
  },
  jkseBattlBullWrapper: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  jkseBattlCategoryTitle: {
    marginTop: 20,
    borderColor: jkseBattlBorderColor,
    fontFamily: jkseBattlRegFont,
    fontSize: 28,
  },
  jkseBattlJokeText: {
    marginTop: 40,
    color: '#fff',
    fontFamily: jkseBattlRegFont,
    fontSize: 20,
    textAlign: 'center',
    paddingHorizontal: 24,
  },
  jkseBattlMainButton: {
    width: 260,
    height: 64,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  jkseBattlActions: {
    flexDirection: 'row',
    gap: 14,
    marginTop: 20,
  },
  jkseBattlSmallButton: {
    width: 120,
    height: 56,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  jkseBattlButtonText: {
    color: '#000',
    fontFamily: jkseBattlRegFont,
    fontSize: 18,
  },
});
