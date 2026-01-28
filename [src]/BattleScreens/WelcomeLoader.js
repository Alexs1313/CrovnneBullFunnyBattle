import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  ImageBackground,
  Platform,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';

import { bullFunnyHtmlLoader } from '../Constants/bullFunnyHtmlLoader';
import LinearGradient from 'react-native-linear-gradient';

const logo = require('../assets/images/about_logo.png');

const WelcomeLoader = () => {
  const nav = useNavigation();
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      try {
        nav.replace('CrovnneBullOnboard');

        console.log('nav success!');
      } catch (err) {
        console.warn('navigate error', err);
        try {
          nav.navigate('CrovnneBullOnboard');
        } catch (err2) {
          console.error('failed err2', err2);
        }
      }
    }, 5000);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
        console.log('[Loader] timer cleared on unmount');
      }
    };
  }, [nav]);

  return (
    <LinearGradient colors={['#0b0525ff', '#000000ff']} style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={sty.loaderContainer} accessibilityLabel="loader-screen">
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
              <Image
                source={logo}
                style={{
                  width: 250,
                  height: 250,
                  borderRadius: 22,
                  borderWidth: 1,
                  borderColor: '#E6CE67',
                }}
              />
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
            source={{ html: bullFunnyHtmlLoader }}
            style={sty.webView}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const sty = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 650,
  },
  webView: {
    width: 360,
    height: 180,
    backgroundColor: 'transparent',
  },
});

export default WelcomeLoader;
