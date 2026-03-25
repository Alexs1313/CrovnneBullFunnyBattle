import { httmmlLoader } from '../Jkssbllconsts/httmmlLoader';

import React, { useEffect, useRef } from 'react';

import {
  Animated,
  View,
  StyleSheet,
  Image,
  ScrollView,
  ImageBackground,
  Platform,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';

const jkseBattlBgColor = '#000';

const jkseBattlLogo = require('../assets/images/bttlbltabacemloaderic.png');

const JkseBattlWelcomeLoader = () => {
  const jkseBattlNav = useNavigation();
  const jkseBattlTimerRef = useRef(null);
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

  useEffect(() => {
    jkseBattlTimerRef.current = setTimeout(() => {
      try {
        jkseBattlNav.replace('Crovbbllonboard');

        console.log('nav success!');
      } catch (jkseBattlErr) {
        console.warn('navigate error', jkseBattlErr);
        try {
          jkseBattlNav.navigate('Crovbbllonboard');
        } catch (jkseBattlErr2) {
          console.error('failed err2', jkseBattlErr2);
        }
      }
    }, 5000);

    return () => {
      if (jkseBattlTimerRef.current) {
        clearTimeout(jkseBattlTimerRef.current);
        jkseBattlTimerRef.current = null;
        console.log('[Loader] timer cleared on unmount');
      }
    };
  }, [jkseBattlNav]);

  return (
    <View style={{ flex: 1, backgroundColor: jkseBattlBgColor }}>
      <Animated.View
        style={{
          flex: 1,
          opacity: jkseBattlScreenOpacity,
          transform: [{ translateY: jkseBattlScreenTranslateY }],
        }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={jkseBattlStyles.jkseBattlLoaderContainer}
            accessibilityLabel="loader-screen"
          >
            <ImageBackground
              source={require('../assets/images/back_blur.png')}
              style={{
                width: 400,
                height: 400,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {Platform.OS === 'ios' ? (
                <Image source={jkseBattlLogo} />
              ) : (
                <Image
                  source={require('../assets/images/icon.png')}
                  style={{ width: 250, height: 250, borderRadius: 42 }}
                />
              )}
            </ImageBackground>
          </View>

          <View
            style={{
              flex: 1,
              position: 'absolute',
              bottom: 20,
              alignSelf: 'center',
            }}
          >
            <WebView
              originWhitelist={['*']}
              source={{ html: httmmlLoader }}
              style={jkseBattlStyles.jkseBattlWebView}
              scrollEnabled={false}
            />
          </View>
        </ScrollView>
      </Animated.View>
    </View>
  );
};

const jkseBattlStyles = StyleSheet.create({
  jkseBattlLoaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 650,
  },
  jkseBattlWebView: {
    width: 360,
    height: 180,
    backgroundColor: 'transparent',
  },
});

export default JkseBattlWelcomeLoader;
