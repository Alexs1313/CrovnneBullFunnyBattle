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
  ScrollView,
  Share,
  useWindowDimensions,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { jokesCategories } from '../../jokesCategories';

const regFont = 'OrelegaOne-Regular';
const bgColor = '#000';
const goldGradient = ['#E1C352', '#FFF9CC', '#E6CE67', '#EDE5BC', '#E2C23B'];
const startPosition = { x: 0, y: 2 };
const endPosition = { x: 1, y: 0 };
const borderColor = '#E6CE67';

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
      Animated.timing(shakeX, {
        toValue: -6,
        duration: 35,
        useNativeDriver: true,
      }),
      Animated.timing(shakeX, {
        toValue: 6,
        duration: 35,
        useNativeDriver: true,
      }),
      Animated.timing(shakeX, {
        toValue: -4,
        duration: 30,
        useNativeDriver: true,
      }),
      Animated.timing(shakeX, {
        toValue: 4,
        duration: 30,
        useNativeDriver: true,
      }),
      Animated.timing(shakeX, {
        toValue: 0,
        duration: 25,
        useNativeDriver: true,
      }),
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

const SelectionOfJokesScreen = () => {
  const navigation = useNavigation();
  const [isSaved, setIsSaved] = useState(false);
  const [index, setIndex] = useState(0);
  const [selectedJoke, setSelectedJoke] = useState(null);
  const { height } = useWindowDimensions();
  const screenOpacity = useRef(new Animated.Value(0)).current;
  const screenTranslateY = useRef(new Animated.Value(12)).current;

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
    ]).start();
  }, [screenOpacity, screenTranslateY]);

  const category = jokesCategories[index];

  const chooseCategory = async () => {
    try {
      const randomJoke =
        category.jokes[Math.floor(Math.random() * category.jokes.length)];

      setSelectedJoke(randomJoke);

      const stored = await AsyncStorage.getItem('saved_jokes');
      const savedJokes = stored ? JSON.parse(stored) : [];

      const jokeExists = savedJokes.some(item => item.joke === randomJoke);
      setIsSaved(jokeExists);

      console.log('selected');
    } catch (error) {
      console.error('category error', error);
    }
  };

  const toggleSaveJoke = async () => {
    try {
      const storedJokes = await AsyncStorage.getItem('saved_jokes');
      const savedJokes = storedJokes ? JSON.parse(storedJokes) : [];

      const jokeExists = savedJokes.some(item => item.joke === selectedJoke);

      if (jokeExists) {
        const updatedJokes = savedJokes.filter(
          item => item.joke !== selectedJoke,
        );
        await AsyncStorage.setItem('saved_jokes', JSON.stringify(updatedJokes));
        setIsSaved(false);

        console.log('deleted');
      } else {
        const newJoke = {
          joke: selectedJoke,
          category: category.id,
          date: Date.now(),
        };
        const updatedJokes = [...savedJokes, newJoke];
        await AsyncStorage.setItem('saved_jokes', JSON.stringify(updatedJokes));
        setIsSaved(true);

        console.log('saved');
      }
    } catch (error) {
      console.error('Error toggling joke:', error);
    }
  };

  const nextJoke = () => setIndex((index + 1) % jokesCategories.length);
  const prevJoke = () =>
    setIndex((index - 1 + jokesCategories.length) % jokesCategories.length);

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          flex: 1,
          opacity: screenOpacity,
          transform: [{ translateY: screenTranslateY }],
        }}
      >
        <ScrollView
          contentContainerStyle={[styles.scroll, { paddingTop: height * 0.07 }]}
        >
          <View style={styles.header}>
            <ScaleTouchable
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Image source={require('../assets/icons/back_arrow.png')} />
            </ScaleTouchable>

            <Text style={styles.headerTitle}>Selection of jokes</Text>

            {Platform.OS === 'ios' ? (
              <Image
                source={require('../assets/images/about_logo.png')}
                style={[
                  styles.appIcon,
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
                  styles.appIcon,
                  {
                    borderRadius: 12,
                    borderWidth: 0.8,
                    borderColor: '#E6CE67',
                  },
                ]}
              />
            )}
          </View>

          {!selectedJoke ? (
            <>
              <Text style={[styles.topTitle, { marginTop: height * 0.04 }]}>
                Choose a category
              </Text>

              <ImageBackground
                source={require('../assets/images/back_blur.png')}
                style={[styles.bullWrapper, { marginTop: height * 0.1 }]}
              >
                <Image source={category.image} />
              </ImageBackground>

              <Image source={category.title} style={{ marginTop: 20 }} />
              <Text style={styles.description}>{category.description}</Text>

              <View style={styles.bottomButtonsWrap}>
                <ScaleTouchable style={styles.arrowButton} onPress={prevJoke}>
                  <Image source={require('../assets/icons/back_arrow.png')} />
                </ScaleTouchable>

                <ScaleTouchable
                  activeOpacity={0.7}
                  onPress={chooseCategory}
                  style={{ flex: 1 }}
                >
                  <LinearGradient
                    colors={goldGradient}
                    start={startPosition}
                    end={endPosition}
                    style={styles.chooseButton}
                  >
                    <Text style={styles.chooseText} onPress={chooseCategory}>
                      Choose
                    </Text>
                  </LinearGradient>
                </ScaleTouchable>

                <ScaleTouchable style={styles.arrowButton} onPress={nextJoke}>
                  <Image source={require('../assets/icons/arr_right.png')} />
                </ScaleTouchable>
              </View>
            </>
          ) : (
            <>
              <ImageBackground
                source={require('../assets/images/back_blur.png')}
                style={[styles.bullWrapper, { marginTop: height * 0.1 }]}
              >
                <Image source={category.image} />
              </ImageBackground>

              <Image source={category.title} style={{ marginTop: 30 }} />
              <Text style={styles.jokeText}>{selectedJoke}</Text>

              <View style={styles.bottomRow}>
                <ScaleTouchable
                  activeOpacity={0.7}
                  style={{ width: '60%' }}
                  onPress={() => Share.share({ message: selectedJoke })}
                >
                  <LinearGradient
                    colors={goldGradient}
                    start={startPosition}
                    end={endPosition}
                    style={styles.shareButton}
                  >
                    <Text style={styles.chooseText}>Share</Text>
                  </LinearGradient>
                </ScaleTouchable>

                <ScaleTouchable
                  style={styles.saveIconButton}
                  onPress={toggleSaveJoke}
                  activeOpacity={0.7}
                >
                  {isSaved ? (
                    <Image
                      source={require('../assets/icons/bookmark_saved.png')}
                    />
                  ) : (
                    <Image source={require('../assets/icons/bookmark.png')} />
                  )}
                </ScaleTouchable>
              </View>
            </>
          )}
        </ScrollView>
      </Animated.View>
    </View>
  );
};

export default SelectionOfJokesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bgColor,
  },
  arrowButton: {
    width: 57,
    height: 57,
    borderRadius: 13,
    borderWidth: 0.9,
    borderColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomButtonsWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    gap: 9,
    justifyContent: 'center',
  },
  scroll: {
    alignItems: 'center',
    padding: 20,
  },
  topTitle: {
    color: '#fff',
    fontFamily: regFont,
    fontSize: 24,
    marginBottom: 20,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 0.8,
    borderColor,
    borderRadius: 16,
    padding: 10,
  },
  backButton: {
    width: 56,
    height: 56,
    borderRadius: 12,
    borderWidth: 0.8,
    borderColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveIconButton: {
    width: 56,
    height: 56,
    borderRadius: 12,
    borderWidth: 0.8,
    borderColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomRow: {
    flexDirection: 'row',
    marginTop: 50,
    gap: 14,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  shareButton: {
    height: 64,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontFamily: regFont,
    fontSize: 20,
  },
  appIcon: {
    width: 56,
    height: 56,
  },
  title: {
    marginTop: 50,
    marginBottom: 20,
    color: '#fff',
    fontSize: 24,
    fontFamily: regFont,
  },
  description: {
    marginTop: 27,
    color: '#fff',
    fontFamily: regFont,
    fontSize: 15,
    textAlign: 'center',
    paddingHorizontal: 24,
  },
  chooseButton: {
    height: 64,
    flex: 1,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chooseText: {
    color: '#000',
    fontFamily: regFont,
    fontSize: 20,
  },
  bullWrapper: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryTitle: {
    marginTop: 20,
    borderColor,
    fontFamily: regFont,
    fontSize: 28,
  },
  jokeText: {
    marginTop: 40,
    color: '#fff',
    fontFamily: regFont,
    fontSize: 20,
    textAlign: 'center',
    paddingHorizontal: 24,
  },
  mainButton: {
    width: 260,
    height: 64,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  actions: {
    flexDirection: 'row',
    gap: 14,
    marginTop: 20,
  },
  smallButton: {
    width: 120,
    height: 56,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontFamily: regFont,
    fontSize: 18,
  },
});
