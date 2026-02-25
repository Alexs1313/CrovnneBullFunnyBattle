import { useNavigation, useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
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
import LinearGradient from 'react-native-linear-gradient';
import { useStorage } from '../Storage/bullBattleContext';

const regFont = 'OrelegaOne-Regular';
const bgColor = '#000';
const goldGradient = ['#E1C352', '#FFF9CC', '#E6CE67', '#EDE5BC', '#E2C23B'];
const startPosition = { x: 0, y: 2 };
const endPosition = { x: 1, y: 0 };

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const ScaleTouchable = ({ children, style, disabled, onPress, onPressIn, onPressOut, ...props }) => {
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

const CATEGORY_META = {
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

const SavedJokesScreen = () => {
  const navigation = useNavigation();
  const { height } = useWindowDimensions();
  const { saved, loadSavedJokes, removeSavedJoke } = useStorage();
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

  useFocusEffect(
    useCallback(() => {
      loadSavedJokes();
    }, []),
  );

  if (!saved.length) {
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
            showsVerticalScrollIndicator={false}
          >
            <View style={[styles.header]}>
            <ScaleTouchable
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Image source={require('../assets/icons/back_arrow.png')} />
            </ScaleTouchable>

            <Text style={styles.headerTitle}>Saved</Text>

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

            <View style={styles.emptyWrap}>
              <Text style={styles.emptyText}>
                You don't have any saved jokes yet...
              </Text>
            </View>
          </ScrollView>
        </Animated.View>
      </View>
    );
  }

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
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
          <ScaleTouchable
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Image source={require('../assets/icons/back_arrow.png')} />
          </ScaleTouchable>

          <Text style={styles.headerTitle}>Saved</Text>

          <Image
            source={require('../assets/images/app_icon.png')}
            style={styles.appIcon}
          />
        </View>

          {saved.map((item, idx) => {
          const meta = CATEGORY_META[item.category];

          return (
            <View key={idx} style={styles.card}>
              <Image source={meta.image} style={styles.cardBull} />

              <View style={styles.cardContent}>
                <Image
                  source={meta.title}
                  style={{ width: 160, height: 35, resizeMode: 'contain' }}
                />

                <Text style={styles.cardText}>{item.joke}</Text>

                <View style={styles.cardActions}>
                  <ScaleTouchable
                    activeOpacity={0.7}
                    onPress={() => Share.share({ message: item.joke })}
                    style={{ flex: 1 }}
                  >
                    <LinearGradient
                      colors={goldGradient}
                      style={styles.shareButton}
                      start={startPosition}
                      end={endPosition}
                    >
                      <Text style={styles.shareText}>Share</Text>
                    </LinearGradient>
                  </ScaleTouchable>

                  <ScaleTouchable
                    style={styles.trashButton}
                    onPress={() => removeSavedJoke(item.joke)}
                  >
                    <Image source={require('../assets/icons/trash.png')} />
                  </ScaleTouchable>
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

export default SavedJokesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bgColor,
  },
  scroll: {
    alignItems: 'center',
    padding: 20,
    flexGrow: 1,
  },
  header: {
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
  backButton: {
    width: 56,
    height: 56,
    borderRadius: 12,
    borderWidth: 0.8,
    borderColor: '#E6CE67',
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
  emptyWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#fff',
    fontFamily: regFont,
    fontSize: 20,
  },
  card: {
    width: '100%',
    borderWidth: 0.8,
    borderColor: '#E6CE67',
    borderRadius: 18,
    padding: 12,
    flexDirection: 'row',
    marginBottom: 20,
  },
  cardBull: {
    width: 133,
    height: 215,
    resizeMode: 'contain',
  },
  cardContent: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'center',
  },
  cardText: {
    marginTop: 10,
    color: '#fff',
    fontFamily: regFont,
    fontSize: 24,
  },
  cardActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
    gap: 10,
  },
  shareButton: {
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareText: {
    color: '#000',
    fontFamily: regFont,
    fontSize: 16,
  },
  trashButton: {
    width: 48,
    height: 48,
    borderRadius: 14,
    borderWidth: 0.8,
    borderColor: '#E6CE67',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
