import BeastsAdviceScreen from './Toteminstinctguide/[Toteminstinctscrns]/BeastsAdviceScreen';
import RiddlesScreen from './Toteminstinctguide/[Toteminstinctscrns]/RiddlesScreen';
import CollectionScreen from './Toteminstinctguide/[Toteminstinctscrns]/CollectionScreen';
import PhotoModeIntro from './Toteminstinctguide/[Toteminstinctscrns]/PhotoModeIntro';
import AttentionIntroScreen from './Toteminstinctguide/[Toteminstinctscrns]/AttentionIntroScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useRef } from 'react';
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  View,
  type ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import ChooseModeScreen from './Toteminstinctguide/[Toteminstinctscrns]/ChooseModeScreen';
import PlayTogetherScreen from './[src]/Jkssbllscrnns/PlayTogetherScreen';
import TellBullJokeScreen from './[src]/Jkssbllscrnns/JkseBattlTellBullJokeScreen';
import SelectionOfJokesScreen from './[src]/Jkssbllscrnns/SelectionOfJokesScreen';
import SavedJokesScreen from './[src]/Jkssbllscrnns/SavedJokesScreen';
import FunnyBattleMenu from './[src]/Jkssbllscrnns/JkseBattlFunnyBattleMenu';
import Collectionscrn from './[src]/Jkssbllscrnns/Collectionscrn';
import JkseBattlTellBullJokeScreen from './[src]/Jkssbllscrnns/JkseBattlTellBullJokeScreen';

const Tab = createBottomTabNavigator();

const AnimatedTabButton = (props: Record<string, unknown>) => {
  const { children, style, onPress, onLongPress, ...rest } = props;
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.88,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 8,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress as () => void}
      onLongPress={onLongPress as (() => void) | undefined}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[style as ViewStyle, styles.totemGuidetabButton]}
      {...rest}
    >
      <Animated.View
        style={[styles.totemGuidetabButtonInner, { transform: [{ scale }] }]}
      >
        {children as React.ReactNode}
      </Animated.View>
    </Pressable>
  );
};

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: [styles.totemGuidetabBar],
        tabBarActiveTintColor: '#5C0405CC',
        tabBarButton: props => (
          <AnimatedTabButton {...(props as Record<string, unknown>)} />
        ),
        tabBarBackground: () => (
          <View style={StyleSheet.absoluteFill}>
            <LinearGradient
              colors={['#000000', '#000000']}
              style={[StyleSheet.absoluteFill]}
            />
          </View>
        ),
      }}
    >
      <Tab.Screen
        name="PlayTogetherScreen"
        component={PlayTogetherScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.totemGuidetabIconWrap}>
              {focused ? (
                <Image
                  source={require('./[src]/assets/images/bttlbltabact1.png')}
                />
              ) : (
                <Image
                  source={require('./[src]/assets/images/bttlbltab1.png')}
                />
              )}

              {focused && (
                <Image
                  source={require('./[src]/assets/images/bttlbltabactframe.png')}
                  style={{ position: 'absolute', top: -10 }}
                />
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="JkseBattlTellBullJokeScreen"
        component={JkseBattlTellBullJokeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.totemGuidetabIconWrap}>
              {focused ? (
                <Image
                  source={require('./[src]/assets/images/bttlbltabact2.png')}
                />
              ) : (
                <Image
                  source={require('./[src]/assets/images/bttlbltab2.png')}
                />
              )}
              {focused && (
                <Image
                  source={require('./[src]/assets/images/bttlbltabactframe.png')}
                  style={{ position: 'absolute', top: -10 }}
                />
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="SelectionOfJokesScreen"
        component={SelectionOfJokesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.totemGuidetabIconWrap}>
              {focused ? (
                <Image
                  source={require('./[src]/assets/images/bttlbltabact3.png')}
                />
              ) : (
                <Image
                  source={require('./[src]/assets/images/bttlbltab3.png')}
                />
              )}
              {focused && (
                <Image
                  source={require('./[src]/assets/images/bttlbltabactframe.png')}
                  style={{ position: 'absolute', top: -10 }}
                />
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="SavedJokesScreen"
        component={SavedJokesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.totemGuidetabIconWrap}>
              {focused ? (
                <Image
                  source={require('./[src]/assets/images/bttlbltabact4.png')}
                />
              ) : (
                <Image
                  source={require('./[src]/assets/images/bttlbltab4.png')}
                />
              )}
              {focused && (
                <Image
                  source={require('./[src]/assets/images/bttlbltabactframe.png')}
                  style={{ position: 'absolute', top: -10 }}
                />
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Collectionscrn"
        component={Collectionscrn}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.totemGuidetabIconWrap}>
              {focused ? (
                <Image
                  source={require('./[src]/assets/images/bttlbltabact5.png')}
                />
              ) : (
                <Image
                  source={require('./[src]/assets/images/bttlbltab5.png')}
                />
              )}
              {focused && (
                <Image
                  source={require('./[src]/assets/images/bttlbltabactframe.png')}
                  style={{ position: 'absolute', top: -10 }}
                />
              )}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  totemGuidetabButton: {
    flex: 1,
  },
  totemGuidetabButtonInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  totemGuidetabIconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  totemGuidetabDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#5C0405CC',
    position: 'absolute',
    top: 35,
  },
  totemGuidetabBar: {
    marginHorizontal: 16,
    elevation: 0,
    paddingTop: 20,
    justifyContent: 'center',
    position: 'absolute',
    bottom: 34,
    paddingHorizontal: 6,
    borderColor: '#E6CE67',
    borderTopWidth: 1,
    borderTopColor: '#E6CE67',
    backgroundColor: 'transparent',
    borderRadius: 20,
    height: 72,
    paddingBottom: 20,
    overflow: 'hidden',
    borderWidth: 1,
  },
});

export default BottomTabs;
