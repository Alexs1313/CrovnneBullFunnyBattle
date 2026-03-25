import { captureRef } from 'react-native-view-shot';

import React, { useMemo, useRef } from 'react';

import {
  Animated,
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';

import { useStorage } from '../Jkssbllstorage/bullBattleContext';

import RNFS from 'react-native-fs';

import Share from 'react-native-share';

const jkseBattlRegFont = 'OrelegaOne-Regular';
const jkseBattlBgColor = '#000';
const jkseBattlBorderColor = '#E6CE67';

const jkseBattlCollectionItems = [
  {
    id: 'bull_skin_1',
    image: require('../assets/images/bttlbltabacemcoll1.png'),
    price: 10,
  },
  {
    id: 'bull_skin_2',
    image: require('../assets/images/bttlbltabacemcoll2.png'),
    price: 15,
  },
  {
    id: 'bull_skin_3',
    image: require('../assets/images/bttlbltabacemcoll3.png'),
    price: 20,
  },
  {
    id: 'bull_skin_4',
    image: require('../assets/images/bttlbltabacemcoll4.png'),
    price: 25,
  },
  {
    id: 'bull_skin_5',
    image: require('../assets/images/bttlbltabacemcoll5.png'),
    price: 30,
  },
  {
    id: 'bull_skin_6',
    image: require('../assets/images/bttlbltabacemcoll6.png'),
    price: 35,
  },
];

const jkseBattlHoofIcon = require('../assets/images/bttlbltabactfgl.png');
const jkseBattlShareIcon = require('../assets/images/bttlbltabactfshr.png');

const JkseBattlScaleTouchable = ({ children, style, onPress }) => {
  return (
    <TouchableOpacity activeOpacity={0.85} style={style} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

const JkseBattlCollectionscrn = () => {
  const { height: jkseBattlHeight } = useWindowDimensions();
  const {
    hoovesBalance: jkseBattlHoovesBalance,
    ownedCollectionIds: jkseBattlOwnedCollectionIds,
    buyCollectionItem: jkseBattlBuyCollectionItem,
  } = useStorage();
  const jkseBattlCardShakeMapRef = React.useRef(new Map());

  const jkseBattlImageRef = useRef(null);

  const jkseBattlOwnedSet = useMemo(
    () => new Set(jkseBattlOwnedCollectionIds),
    [jkseBattlOwnedCollectionIds],
  );

  const jkseBattlGetCardShakeValue = itemId => {
    if (!jkseBattlCardShakeMapRef.current.has(itemId)) {
      jkseBattlCardShakeMapRef.current.set(itemId, new Animated.Value(0));
    }

    return jkseBattlCardShakeMapRef.current.get(itemId);
  };

  const jkseBattlRunInsufficientHoovesShake = itemId => {
    const jkseBattlShakeX = jkseBattlGetCardShakeValue(itemId);

    Animated.sequence([
      Animated.timing(jkseBattlShakeX, {
        toValue: -8,
        duration: 35,
        useNativeDriver: true,
      }),
      Animated.timing(jkseBattlShakeX, {
        toValue: 8,
        duration: 35,
        useNativeDriver: true,
      }),
      Animated.timing(jkseBattlShakeX, {
        toValue: -5,
        duration: 30,
        useNativeDriver: true,
      }),
      Animated.timing(jkseBattlShakeX, {
        toValue: 5,
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

  const jkseBattlHandleCardPress = async item => {
    const jkseBattlResult = await jkseBattlBuyCollectionItem({
      id: item.id,
      price: item.price,
    });

    if (jkseBattlResult.success) {
      return;
    }

    if (jkseBattlResult.reason === 'not_enough_hooves') {
      jkseBattlRunInsufficientHoovesShake(item.id);
      return;
    }

    Alert.alert('Error', 'Could not purchase item now. Please try again.');
  };

  const jkseBattlShareImage = async () => {
    try {
      const jkseBattlTmpUri = await captureRef(jkseBattlImageRef, {
        format: 'png',
        quality: 1,
        result: 'tmpfile',
      });

      const jkseBattlFileUri = jkseBattlTmpUri.startsWith('file://')
        ? jkseBattlTmpUri
        : `file://${jkseBattlTmpUri}`;

      const jkseBattlPathToCheck = jkseBattlFileUri.replace('file://', '');
      const jkseBattlExists = await RNFS.exists(jkseBattlPathToCheck);

      if (!jkseBattlExists) {
        return;
      }

      await Share.open({
        url: jkseBattlFileUri,
        type: 'image/png',
        failOnCancel: false,
      });
    } catch (jkseBattlError) {
      if (!jkseBattlError?.message?.includes('User did not share')) {
        console.error('shareWallpaper error', jkseBattlError);
      }
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
        <View style={jkseBattlStyles.jkseBattlHeaderRow}>
          <View style={jkseBattlStyles.jkseBattlTitleCard}>
            <Text style={jkseBattlStyles.jkseBattlTitleText}>Collection</Text>
          </View>
          {Platform.OS === 'ios' ? (
            <Image
              source={require('../assets/images/about_logo.png')}
              style={jkseBattlStyles.jkseBattlIosAppIcon}
            />
          ) : (
            <Image
              source={require('../assets/images/icon.png')}
              style={jkseBattlStyles.jkseBattlAndroidAppIcon}
            />
          )}
        </View>

        <View style={jkseBattlStyles.jkseBattlBalanceCard}>
          <Text style={jkseBattlStyles.jkseBattlBalanceText}>Balance:</Text>
          <Image
            source={jkseBattlHoofIcon}
            style={jkseBattlStyles.jkseBattlBalanceIcon}
          />
          <Text style={jkseBattlStyles.jkseBattlBalanceCount}>
            {String(jkseBattlHoovesBalance).padStart(3, '0')}
          </Text>
        </View>

        <View style={jkseBattlStyles.jkseBattlGrid}>
          {jkseBattlCollectionItems.map(item => {
            const jkseBattlIsOwned = jkseBattlOwnedSet.has(item.id);

            return (
              <Animated.View
                key={item.id}
                style={[
                  jkseBattlStyles.jkseBattlItemCard,
                  {
                    transform: [
                      {
                        translateX: jkseBattlGetCardShakeValue(item.id),
                      },
                    ],
                  },
                ]}
              >
                <JkseBattlScaleTouchable
                  style={jkseBattlStyles.jkseBattlItemImage}
                  onPress={() => {
                    if (jkseBattlIsOwned) {
                      jkseBattlShareImage();
                    } else {
                      jkseBattlHandleCardPress(item);
                    }
                  }}
                >
                  <Image
                    source={item.image}
                    style={{ width: '100%', height: '100%' }}
                    ref={jkseBattlImageRef}
                    resizeMode="cover"
                  />

                  {!jkseBattlIsOwned ? (
                    <View style={jkseBattlStyles.jkseBattlPricePill}>
                      <Image
                        source={jkseBattlHoofIcon}
                        style={jkseBattlStyles.jkseBattlPriceIcon}
                      />

                      <Text style={jkseBattlStyles.jkseBattlPriceText}>
                        {String(item.price).padStart(3, '0')}
                      </Text>
                    </View>
                  ) : (
                    <Image
                      source={require('../assets/images/bttlbltabacemcgrshr.png')}
                      style={{
                        position: 'absolute',
                        bottom: 8,
                        alignSelf: 'center',
                      }}
                    />
                  )}
                </JkseBattlScaleTouchable>
              </Animated.View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default JkseBattlCollectionscrn;

const jkseBattlStyles = StyleSheet.create({
  jkseBattlContainer: {
    flex: 1,
    backgroundColor: jkseBattlBgColor,
  },
  jkseBattlScroll: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  jkseBattlHeaderRow: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 16,
  },
  jkseBattlTitleCard: {
    flex: 1,
    height: 77,
    borderWidth: 0.8,
    borderColor: jkseBattlBorderColor,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  jkseBattlTitleText: {
    color: '#fff',
    fontFamily: jkseBattlRegFont,
    fontSize: 24,
  },
  jkseBattlIosAppIcon: {
    width: 77,
    height: 77,
    borderRadius: 12,
    borderWidth: 0.8,
    borderColor: '#E6CE67',
  },
  jkseBattlAndroidAppIcon: {
    width: 77,
    height: 77,
    borderRadius: 12,
    borderWidth: 0.8,
    borderColor: jkseBattlBorderColor,
  },
  jkseBattlBalanceCard: {
    minWidth: 200,
    height: 56,
    borderWidth: 0.8,
    borderColor: jkseBattlBorderColor,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginBottom: 22,
  },
  jkseBattlBalanceText: {
    color: '#fff',
    fontFamily: jkseBattlRegFont,
    fontSize: 22,
    marginRight: 8,
  },
  jkseBattlBalanceIcon: {
    width: 34,
    height: 34,
    resizeMode: 'contain',
    marginRight: 8,
  },
  jkseBattlBalanceCount: {
    color: '#fff',
    fontFamily: jkseBattlRegFont,
    fontSize: 28,
  },
  jkseBattlGrid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 14,
  },
  jkseBattlItemCard: {
    width: '48%',
    borderWidth: 0.8,
    borderColor: jkseBattlBorderColor,
    borderRadius: 18,
    overflow: 'hidden',
  },
  jkseBattlItemCardInner: {},

  jkseBattlItemImage: {
    width: '100%',
    aspectRatio: 9 / 12,
  },
  jkseBattlPricePill: {
    height: 52,
    margin: 8,
    width: '80%',
    borderRadius: 16,
    borderWidth: 0.8,
    borderColor: jkseBattlBorderColor,
    backgroundColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    gap: 6,
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  jkseBattlPriceIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  jkseBattlPriceText: {
    color: '#fff',
    fontFamily: jkseBattlRegFont,
    fontSize: 22,
  },
  jkseBattlShareIconButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  jkseBattlShareIcon: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
  },
});
