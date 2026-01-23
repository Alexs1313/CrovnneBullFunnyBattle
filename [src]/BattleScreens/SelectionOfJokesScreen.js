import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Share,
  useWindowDimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { jokesCategories } from '../BattleData/jokesCategories';

const regFont = 'OrelegaOne-Regular';
const bgColor = '#000';
const goldGradient = ['#E1C352', '#FFF9CC', '#E6CE67', '#EDE5BC', '#E2C23B'];
const startPosition = { x: 0, y: 2 };
const endPosition = { x: 1, y: 0 };
const borderColor = '#E6CE67';

const SelectionOfJokesScreen = () => {
  const navigation = useNavigation();
  const [isSaved, setIsSaved] = useState(false);
  const [index, setIndex] = useState(0);
  const [selectedJoke, setSelectedJoke] = useState(null);
  const { height } = useWindowDimensions();

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
      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingTop: height * 0.07 }]}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Image source={require('../assets/icons/back_arrow.png')} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Selection of jokes</Text>

          <Image
            source={require('../assets/images/app_icon.png')}
            style={styles.appIcon}
          />
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
              <TouchableOpacity style={styles.arrowButton} onPress={prevJoke}>
                <Image source={require('../assets/icons/back_arrow.png')} />
              </TouchableOpacity>

              <TouchableOpacity
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
              </TouchableOpacity>

              <TouchableOpacity style={styles.arrowButton} onPress={nextJoke}>
                <Image source={require('../assets/icons/arr_right.png')} />
              </TouchableOpacity>
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
              <TouchableOpacity
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
              </TouchableOpacity>

              <TouchableOpacity
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
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>
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
