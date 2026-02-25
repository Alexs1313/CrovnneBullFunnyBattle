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
import LinearGradient from 'react-native-linear-gradient';

const regFont = 'OrelegaOne-Regular';
const bgColor = '#000';
const goldGradient = ['#E1C352', '#FFF9CC', '#E6CE67', '#EDE5BC', '#E2C23B'];
const startPosition = { x: 0, y: 0 };
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
      style={[
        style,
        { transform: [{ translateX: shakeX }, { scale }] },
        { alignSelf: 'center' },
      ]}
      activeOpacity={1}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      {children}
    </AnimatedTouchableOpacity>
  );
};

const AboutBullScreen = () => {
  const navigation = useNavigation();
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

  const onShare = async () => {
    try {
      await Share.share({
        message:
          'Crovnne Bull Comedy Battle is a fun social app for humorous competitions between friends. Write or voice your jokes, vote for the best ones, and find out the verdict of the charismatic Bull. Collect your favorite jokes, open categories, and prove that your humor is worthy of the crown.',
      });
    } catch (error) {
      console.error('Share Error', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingTop: height * 0.07 }]}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={{
            width: '100%',
            opacity: screenOpacity,
            transform: [{ translateY: screenTranslateY }],
          }}
        >
          <View style={styles.header}>
            <ScaleTouchable
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Image source={require('../assets/icons/back_arrow.png')} />
            </ScaleTouchable>

            <Text style={styles.headerTitle}>About</Text>

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

          <View style={styles.logoCard}>
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

          <Text style={styles.description}>
            Crovnne Bull Comedy Battle is a fun social app for humorous
            competitions between friends. Write or voice your jokes, vote for
            the best ones and find out the verdict of the charismatic Bull.
            Collect your favorite jokes, open categories and prove that your
            humor is worthy of the crown.
          </Text>

          <ScaleTouchable activeOpacity={0.7} onPress={onShare}>
            <LinearGradient
              colors={goldGradient}
              start={startPosition}
              end={endPosition}
              style={styles.shareButton}
            >
              <Text style={styles.shareText}>Share</Text>
            </LinearGradient>
          </ScaleTouchable>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

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
    marginBottom: 40,
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
  logoCard: {
    marginBottom: 30,
  },
  logoImage: {
    resizeMode: 'cover',
  },
  description: {
    color: '#fff',
    fontFamily: regFont,
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  shareButton: {
    width: 260,
    height: 64,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareText: {
    color: '#000',
    fontFamily: regFont,
    fontSize: 20,
  },
});

export default AboutBullScreen;
