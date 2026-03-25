import LinearGradient from 'react-native-linear-gradient';

import { useStorage } from '../Jkssbllstorage/bullBattleContext';

import { useNavigation, useRoute } from '@react-navigation/native';

import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Share,
  Modal,
  useWindowDimensions,
  Alert,
  Platform,
  ImageBackground,
} from 'react-native';

// consts

const jkseBattlRegFont = 'OrelegaOne-Regular';
const jkseBattlBgColor = '#000';
const jkseBattlGoldGradient = [
  '#E1C352',
  '#FFF9CC',
  '#E6CE67',
  '#EDE5BC',
  '#E2C23B',
];
const jkseBattlStartPosition = { x: 0, y: 0 };
const jkseBattlEndPosition = { x: 1, y: 0 };
const jkseBattlBorderColor = '#E6CE67';
const jkseBattlAddButton = require('../assets/images/addButton.png');
const jkseBattlResultShareMessage =
  'You received 3 golden hooves for participating in the game, keep going and you will have even more of them';

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

// avatars / winner skins

const jkseBattlAvatars = [
  { id: 0, image: require('../assets/images/bull_avatar_1.png') },
  { id: 1, image: require('../assets/images/bull_avatar_2.png') },
  { id: 2, image: require('../assets/images/bull_avatar_3.png') },
  { id: 3, image: require('../assets/images/bull_avatar_4.png') },
  { id: 4, image: require('../assets/images/bull_avatar_5.png') },
];

const jkseBattlWinnerSkins = {
  0: require('../assets/images/bull_winner_1.png'),
  1: require('../assets/images/bull_winner_2.png'),
  2: require('../assets/images/bull_winner_3.png'),
  3: require('../assets/images/bull_winner_4.png'),
  4: require('../assets/images/bull_winner_5.png'),
};

const jkseBattlStages = {
  ENTER: 'ENTER',
  MOVE: 'MOVE',
  VOTING: 'VOTING',
  WINNER: 'WINNER',
  RESULT: 'RESULT',
};

const PlayTogetherScreen = () => {
  const jkseBattlNavigation = useNavigation();
  const jkseBattlRoute = useRoute();
  const { addHooves: jkseBattlAddHooves } = useStorage();
  const jkseBattlHasFlowPlayers = Array.isArray(jkseBattlRoute.params?.players);
  const jkseBattlIsFlowMode =
    jkseBattlRoute.name === 'PlayTogetherFlowScreen' && jkseBattlHasFlowPlayers;
  const { height: jkseBattlHeight } = useWindowDimensions();
  const jkseBattlScreenOpacity = useRef(new Animated.Value(0)).current;
  const jkseBattlScreenTranslateY = useRef(new Animated.Value(12)).current;
  const jkseBattlMissingProfileShake = useRef(new Animated.Value(0)).current;
  const [jkseBattlStage, setJkseBattlStage] = useState(
    jkseBattlIsFlowMode ? jkseBattlStages.MOVE : jkseBattlStages.ENTER,
  );
  const [jkseBattlPlayers, setJkseBattlPlayers] = useState(() =>
    jkseBattlHasFlowPlayers
      ? jkseBattlRoute.params.players.map(jkseBattlPlayer => ({
          ...jkseBattlPlayer,
        }))
      : [
          { name: '', avatarId: null, joke: '', votes: 0 },
          { name: '', avatarId: null, joke: '', votes: 0 },
        ],
  );
  const [jkseBattlCurrent, setJkseBattlCurrent] = useState(0);
  const [jkseBattlAvatarPickerFor, setJkseBattlAvatarPickerFor] =
    useState(null);
  const [jkseBattlVotingPlayer, setJkseBattlVotingPlayer] = useState(0);
  const [jkseBattlSelectedVote, setJkseBattlSelectedVote] = useState(null);
  const [jkseBattlIsRewardGranted, setJkseBattlIsRewardGranted] =
    useState(false);

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

  const jkseBattlUsedAvatars = jkseBattlPlayers
    .map(jkseBattlPlayer => jkseBattlPlayer.avatarId)
    .filter(jkseBattlValue => jkseBattlValue !== null);

  const jkseBattlWinner = [...jkseBattlPlayers].sort(
    (jkseBattlA, jkseBattlB) => jkseBattlB.votes - jkseBattlA.votes,
  )[0];

  const jkseBattlWinnerSkin = jkseBattlWinnerSkins[jkseBattlWinner.avatarId];

  const jkseBattlCanShowStart =
    jkseBattlPlayers.length >= 2 &&
    jkseBattlPlayers.every(jkseBattlPlayer => jkseBattlPlayer.name.trim());

  const jkseBattlRunMissingProfileShake = () => {
    Animated.sequence([
      Animated.timing(jkseBattlMissingProfileShake, {
        toValue: -7,
        duration: 35,
        useNativeDriver: true,
      }),
      Animated.timing(jkseBattlMissingProfileShake, {
        toValue: 7,
        duration: 35,
        useNativeDriver: true,
      }),
      Animated.timing(jkseBattlMissingProfileShake, {
        toValue: -5,
        duration: 30,
        useNativeDriver: true,
      }),
      Animated.timing(jkseBattlMissingProfileShake, {
        toValue: 5,
        duration: 30,
        useNativeDriver: true,
      }),
      Animated.timing(jkseBattlMissingProfileShake, {
        toValue: 0,
        duration: 25,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const jkseBattlHandleStart = () => {
    const jkseBattlAllPlayersHaveAvatars = jkseBattlPlayers.every(
      jkseBattlPlayer => jkseBattlPlayer.avatarId !== null,
    );

    if (!jkseBattlAllPlayersHaveAvatars) {
      jkseBattlRunMissingProfileShake();
      Alert.alert(
        'Choose profile',
        'Each player must choose an profile before starting the game.',
      );
      return;
    }

    jkseBattlNavigation.navigate('PlayTogetherFlowScreen', {
      players: jkseBattlPlayers.map(jkseBattlPlayer => ({
        ...jkseBattlPlayer,
        votes: 0,
      })),
    });
  };

  const jkseBattlHandleVote = () => {
    if (jkseBattlSelectedVote !== null) {
      const jkseBattlUpdatedPlayers = [...jkseBattlPlayers];
      jkseBattlUpdatedPlayers[jkseBattlSelectedVote].votes += 1;
      setJkseBattlPlayers(jkseBattlUpdatedPlayers);

      console.log('voted');
    }

    setJkseBattlSelectedVote(null);

    if (jkseBattlVotingPlayer < jkseBattlPlayers.length - 1) {
      setJkseBattlVotingPlayer(jkseBattlPrev => jkseBattlPrev + 1);
    } else {
      setJkseBattlStage(jkseBattlStages.WINNER);
    }
  };

  const jkseBattlHandleShareResult = () => {
    Share.share({
      message:
        jkseBattlStage === jkseBattlStages.RESULT
          ? jkseBattlResultShareMessage
          : `${jkseBattlWinner.name} wins!\n\n${jkseBattlWinner.joke}`,
    });
  };

  const jkseBattlHandleBackPress = () => {
    if (jkseBattlAvatarPickerFor !== null) {
      setJkseBattlAvatarPickerFor(null);
      return;
    }

    if (jkseBattlStage === jkseBattlStages.MOVE) {
      if (jkseBattlCurrent > 0) {
        setJkseBattlCurrent(jkseBattlPrev => jkseBattlPrev - 1);
      } else if (jkseBattlIsFlowMode) {
        jkseBattlNavigation.goBack();
      } else {
        setJkseBattlStage(jkseBattlStages.ENTER);
      }
      return;
    }

    if (jkseBattlStage === jkseBattlStages.VOTING) {
      setJkseBattlStage(jkseBattlStages.MOVE);
      setJkseBattlCurrent(jkseBattlPlayers.length - 1);
      setJkseBattlSelectedVote(null);
      return;
    }

    if (jkseBattlStage === jkseBattlStages.RESULT) {
      jkseBattlNavigation.navigate('BottomTabs', {
        screen: 'PlayTogetherScreen',
      });
      return;
    }

    jkseBattlNavigation.goBack();
  };

  const JkseBattlBattleHeader = () => (
    <View style={[jkseBattlStyles.jkseBattlHeader]}>
      {jkseBattlStage === jkseBattlStages.ENTER ? (
        <View style={jkseBattlStyles.jkseBattlBackButtonPlaceholder} />
      ) : (
        <JkseBattlScaleTouchable
          style={jkseBattlStyles.jkseBattlBackButton}
          onPress={jkseBattlHandleBackPress}
        >
          <Image source={require('../assets/icons/back_arrow.png')} />
        </JkseBattlScaleTouchable>
      )}

      <Text style={jkseBattlStyles.jkseBattlHeaderTitle}>Play together</Text>

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
              borderColor: jkseBattlBorderColor,
            },
          ]}
        />
      )}
    </View>
  );

  if (jkseBattlStage === jkseBattlStages.ENTER) {
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
            contentContainerStyle={[
              jkseBattlStyles.jkseBattlScroll,
              { paddingTop: jkseBattlHeight * 0.07, paddingBottom: 130 },
            ]}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                gap: 10,
                marginBottom: 30,
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
            <Text style={jkseBattlStyles.jkseBattlTitle}>Enter data</Text>

            {jkseBattlPlayers.map((jkseBattlPlayer, jkseBattlIndex) => (
              <View
                key={jkseBattlIndex}
                style={jkseBattlStyles.jkseBattlPlayerRow}
              >
                <Animated.View
                  style={{
                    transform: [
                      {
                        translateX:
                          jkseBattlPlayer.avatarId === null
                            ? jkseBattlMissingProfileShake
                            : 0,
                      },
                    ],
                  }}
                >
                  <JkseBattlScaleTouchable
                    style={jkseBattlStyles.jkseBattlAvatarBox}
                    onPress={() => setJkseBattlAvatarPickerFor(jkseBattlIndex)}
                  >
                    {jkseBattlPlayer.avatarId !== null ? (
                      <Image
                        source={
                          jkseBattlAvatars[jkseBattlPlayer.avatarId].image
                        }
                        style={{
                          width: 29,
                          height: 49,
                          resizeMode: 'contain',
                        }}
                      />
                    ) : (
                      <Image
                        source={require('../assets/icons/user_icon.png')}
                      />
                    )}
                  </JkseBattlScaleTouchable>
                </Animated.View>

                <TextInput
                  placeholder={`Player ${jkseBattlIndex + 1}`}
                  placeholderTextColor="#FFFFFF"
                  style={jkseBattlStyles.jkseBattlInput}
                  maxLength={14}
                  value={jkseBattlPlayer.name}
                  onChangeText={jkseBattlText => {
                    const jkseBattlCopy = [...jkseBattlPlayers];
                    jkseBattlCopy[jkseBattlIndex].name = jkseBattlText;
                    setJkseBattlPlayers(jkseBattlCopy);
                  }}
                />
              </View>
            ))}

            {jkseBattlPlayers.length < 5 && (
              <JkseBattlScaleTouchable
                style={{ marginTop: jkseBattlHeight * 0.03 }}
                onPress={() =>
                  setJkseBattlPlayers([
                    ...jkseBattlPlayers,
                    { name: '', avatarId: null, joke: '', votes: 0 },
                  ])
                }
              >
                <Image source={jkseBattlAddButton} />
              </JkseBattlScaleTouchable>
            )}
            {jkseBattlCanShowStart && (
              <JkseBattlScaleTouchable
                onPress={jkseBattlHandleStart}
                activeOpacity={0.7}
                style={{
                  width: '100%',
                  alignItems: 'center',
                  marginTop: jkseBattlHeight * 0.05,
                }}
              >
                <LinearGradient
                  colors={jkseBattlGoldGradient}
                  style={jkseBattlStyles.jkseBattlMainButton}
                  start={jkseBattlStartPosition}
                  end={jkseBattlEndPosition}
                >
                  <Text style={jkseBattlStyles.jkseBattlButtonText}>Start</Text>
                </LinearGradient>
              </JkseBattlScaleTouchable>
            )}

            <Modal visible={jkseBattlAvatarPickerFor !== null} transparent>
              <View style={jkseBattlStyles.jkseBattlModalBg}>
                <View style={jkseBattlStyles.jkseBattlModal}>
                  <Text style={jkseBattlStyles.jkseBattlModalTitle}>
                    Choose a profile
                  </Text>

                  <View style={jkseBattlStyles.jkseBattlAvatarGrid}>
                    {jkseBattlAvatars.map(jkseBattlAvatar => {
                      const jkseBattlIsUsed = jkseBattlUsedAvatars.includes(
                        jkseBattlAvatar.id,
                      );

                      return (
                        <JkseBattlScaleTouchable
                          key={jkseBattlAvatar.id}
                          disabled={jkseBattlIsUsed}
                          style={[
                            jkseBattlStyles.jkseBattlAvatarPick,
                            jkseBattlIsUsed &&
                              jkseBattlStyles.jkseBattlAvatarDisabled,
                          ]}
                          onPress={() => {
                            const jkseBattlCopy = [...jkseBattlPlayers];
                            jkseBattlCopy[jkseBattlAvatarPickerFor].avatarId =
                              jkseBattlAvatar.id;
                            setJkseBattlPlayers(jkseBattlCopy);
                            setJkseBattlAvatarPickerFor(null);
                          }}
                        >
                          <Image
                            source={jkseBattlAvatar.image}
                            style={{ opacity: jkseBattlIsUsed ? 0.4 : 1 }}
                          />
                        </JkseBattlScaleTouchable>
                      );
                    })}
                  </View>

                  <JkseBattlScaleTouchable
                    style={jkseBattlStyles.jkseBattlClose}
                    onPress={() => setJkseBattlAvatarPickerFor(null)}
                  >
                    <Image source={require('../assets/icons/close.png')} />
                  </JkseBattlScaleTouchable>
                </View>
              </View>
            </Modal>
          </ScrollView>
        </Animated.View>
      </View>
    );
  }

  if (jkseBattlStage === jkseBattlStages.MOVE) {
    const jkseBattlPlayer = jkseBattlPlayers[jkseBattlCurrent];

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
            contentContainerStyle={[
              jkseBattlStyles.jkseBattlScroll,
              { paddingTop: jkseBattlHeight * 0.07 },
            ]}
          >
            <JkseBattlBattleHeader />
            <Text style={jkseBattlStyles.jkseBattlTitle}>Player's move</Text>

            <View style={jkseBattlStyles.jkseBattlCurrentPlayer}>
              <View style={jkseBattlStyles.jkseBattlAvatarMoveBox}>
                <Image
                  source={jkseBattlAvatars[jkseBattlPlayer.avatarId].image}
                  style={jkseBattlStyles.jkseBattlAvatarVoteBox}
                />
              </View>
              <View style={jkseBattlStyles.jkseBattlPlayerNameBox}>
                <Text style={jkseBattlStyles.jkseBattlPlayerName}>
                  {jkseBattlPlayer.name}
                </Text>
              </View>
            </View>

            <TextInput
              multiline
              placeholder="Write a joke"
              placeholderTextColor="#FFFFFF"
              style={jkseBattlStyles.jkseBattlJokeInput}
              textAlignVertical="top"
              value={jkseBattlPlayer.joke}
              onChangeText={jkseBattlText => {
                const jkseBattlCopy = [...jkseBattlPlayers];
                jkseBattlCopy[jkseBattlCurrent].joke = jkseBattlText;
                setJkseBattlPlayers(jkseBattlCopy);
              }}
            />

            <JkseBattlScaleTouchable
              style={{ width: '100%', alignItems: 'center' }}
              activeOpacity={0.7}
              disabled={!jkseBattlPlayer.joke.trim()}
              onPress={() => {
                if (jkseBattlCurrent < jkseBattlPlayers.length - 1) {
                  setJkseBattlCurrent(
                    jkseBattlCurrentIndex => jkseBattlCurrentIndex + 1,
                  );
                } else {
                  setJkseBattlStage(jkseBattlStages.VOTING);
                }
              }}
            >
              <LinearGradient
                colors={jkseBattlGoldGradient}
                style={jkseBattlStyles.jkseBattlMainButton}
                start={jkseBattlStartPosition}
                end={jkseBattlEndPosition}
              >
                <Text style={jkseBattlStyles.jkseBattlButtonText}>
                  {jkseBattlCurrent === jkseBattlPlayers.length - 1
                    ? 'Voting'
                    : 'Next player'}
                </Text>
              </LinearGradient>
            </JkseBattlScaleTouchable>
          </ScrollView>
        </Animated.View>
      </View>
    );
  }

  if (jkseBattlStage === jkseBattlStages.VOTING) {
    const jkseBattlVoter = jkseBattlPlayers[jkseBattlVotingPlayer];

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
            contentContainerStyle={[
              jkseBattlStyles.jkseBattlScroll,
              { paddingTop: jkseBattlHeight * 0.07 },
            ]}
          >
            <JkseBattlBattleHeader />
            <Text style={jkseBattlStyles.jkseBattlTitle}>Player votes:</Text>

            <View style={jkseBattlStyles.jkseBattlCurrentPlayer}>
              <View style={jkseBattlStyles.jkseBattlAvatarMoveBox}>
                <Image
                  source={jkseBattlAvatars[jkseBattlVoter.avatarId].image}
                  style={jkseBattlStyles.jkseBattlAvatarVoteBox}
                />
              </View>
              <View style={jkseBattlStyles.jkseBattlPlayerNameBox}>
                <Text style={jkseBattlStyles.jkseBattlPlayerName}>
                  {jkseBattlVoter.name}
                </Text>
              </View>
            </View>

            <View style={jkseBattlStyles.jkseBattlGrid}>
              {jkseBattlPlayers.map((jkseBattlPlayer, jkseBattlIndex) => (
                <JkseBattlScaleTouchable
                  activeOpacity={0.7}
                  key={jkseBattlIndex}
                  style={[
                    jkseBattlStyles.jkseBattlVoteCard,
                    jkseBattlSelectedVote === jkseBattlIndex &&
                      jkseBattlStyles.jkseBattlVoteSelected,
                  ]}
                  onPress={() => setJkseBattlSelectedVote(jkseBattlIndex)}
                >
                  <Text style={jkseBattlStyles.jkseBattlVoteText}>
                    {jkseBattlPlayer.joke}
                  </Text>
                </JkseBattlScaleTouchable>
              ))}
            </View>

            <JkseBattlScaleTouchable
              style={{ width: '100%', alignItems: 'center', marginTop: 30 }}
              activeOpacity={0.7}
              disabled={jkseBattlSelectedVote === null}
              onPress={() => {
                jkseBattlHandleVote();
              }}
            >
              <LinearGradient
                colors={jkseBattlGoldGradient}
                style={jkseBattlStyles.jkseBattlMainButton}
                start={jkseBattlStartPosition}
                end={jkseBattlEndPosition}
              >
                <Text style={jkseBattlStyles.jkseBattlButtonText}>Vote</Text>
              </LinearGradient>
            </JkseBattlScaleTouchable>
          </ScrollView>
        </Animated.View>
      </View>
    );
  }

  if (jkseBattlStage === jkseBattlStages.WINNER) {
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
            contentContainerStyle={[
              jkseBattlStyles.jkseBattlScroll,
              { paddingTop: jkseBattlHeight * 0.07 },
            ]}
          >
            <JkseBattlBattleHeader />

            <Image source={require('../assets/images/winner_text.png')} />
            <View style={jkseBattlStyles.jkseBattlWinnerWrapper}>
              <Text style={jkseBattlStyles.jkseBattlPlayerName}>
                {jkseBattlWinner.name}
              </Text>
              <View style={jkseBattlStyles.jkseBattlWinnerCard}>
                <Text style={jkseBattlStyles.jkseBattlVoteText}>
                  {jkseBattlWinner.joke}
                </Text>
              </View>
            </View>

            <Image
              source={jkseBattlWinnerSkin}
              style={jkseBattlStyles.jkseBattlWinnerBull}
            />
            <View style={jkseBattlStyles.jkseBattlSharePosition}>
              <JkseBattlScaleTouchable
                style={{ width: '100%', alignItems: 'center' }}
                activeOpacity={0.7}
                onPress={() => {
                  if (!jkseBattlIsRewardGranted) {
                    jkseBattlAddHooves(3);
                    setJkseBattlIsRewardGranted(true);
                  }

                  setJkseBattlStage(jkseBattlStages.RESULT);
                }}
              >
                <LinearGradient
                  colors={jkseBattlGoldGradient}
                  style={jkseBattlStyles.jkseBattlMainButton}
                  start={jkseBattlStartPosition}
                  end={jkseBattlEndPosition}
                >
                  <Text style={jkseBattlStyles.jkseBattlButtonText}>Next</Text>
                </LinearGradient>
              </JkseBattlScaleTouchable>
            </View>
          </ScrollView>
        </Animated.View>
      </View>
    );
  }

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
          contentContainerStyle={[
            jkseBattlStyles.jkseBattlScroll,
            { paddingTop: jkseBattlHeight * 0.07, paddingBottom: 120 },
          ]}
        >
          <JkseBattlBattleHeader />
          <Text style={jkseBattlStyles.jkseBattlTitle}>Result</Text>

          <ImageBackground
            source={require('../assets/images/back_blur.png')}
            style={jkseBattlStyles.jkseBattlLogoBgBlur}
          >
            <Image source={require('../assets/images/bttlbltabactfgl.png')} />
          </ImageBackground>

          <Text style={jkseBattlStyles.jkseBattlResultDescription}>
            You received 3 golden hooves for participating in the game, keep
            going and you will have even more of them
          </Text>

          <JkseBattlScaleTouchable
            style={{ width: '100%', alignItems: 'center' }}
            activeOpacity={0.7}
            onPress={() => jkseBattlHandleShareResult()}
          >
            <LinearGradient
              colors={jkseBattlGoldGradient}
              style={jkseBattlStyles.jkseBattlMainButton}
              start={jkseBattlStartPosition}
              end={jkseBattlEndPosition}
            >
              <Text style={jkseBattlStyles.jkseBattlButtonText}>Share</Text>
            </LinearGradient>
          </JkseBattlScaleTouchable>
        </ScrollView>
      </Animated.View>
    </View>
  );
};

const jkseBattlStyles = StyleSheet.create({
  jkseBattlScroll: {
    backgroundColor: jkseBattlBgColor,
    alignItems: 'center',
    padding: 20,
    flexGrow: 1,
  },
  jkseBattlWinnerBull: {
    resizeMode: 'contain',
    marginVertical: 30,
    position: 'relative',
  },
  jkseBattlHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 0.8,
    borderColor: jkseBattlBorderColor,
    borderRadius: 16,
    padding: 10,
    marginBottom: 40,
    alignItems: 'center',
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
  jkseBattlLogoBgBlur: {
    width: 310,
    height: 310,
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
  jkseBattlWinnerWrapper: {
    alignItems: 'center',
    marginVertical: 20,
    width: '80%',
    padding: 15,
    borderWidth: 1,
    borderColor: jkseBattlBorderColor,
    borderRadius: 16,
  },
  jkseBattlHoovesImage: {
    width: 230,
    height: 230,
    resizeMode: 'contain',
    marginBottom: 24,
  },
  jkseBattlResultDescription: {
    color: '#fff',
    fontFamily: jkseBattlRegFont,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    width: '100%',
    lineHeight: 24,
  },
  jkseBattlAvatarVoteBox: {
    width: 35,
    height: 69,
    resizeMode: 'contain',
  },
  jkseBattlTitle: {
    color: '#fff',
    fontFamily: jkseBattlRegFont,
    fontSize: 24,
    marginBottom: 40,
  },
  jkseBattlPlayerRow: {
    width: '100%',
    flexDirection: 'row',
    gap: 12,
    marginBottom: 17,
  },
  jkseBattlAvatarBox: {
    width: 62,
    height: 62,
    borderRadius: 15,
    borderWidth: 0.8,
    borderColor: jkseBattlBorderColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  jkseBattlInput: {
    flex: 1,
    height: 62,
    borderRadius: 14,
    borderWidth: 0.8,
    borderColor: jkseBattlBorderColor,
    color: '#fff',
    fontFamily: jkseBattlRegFont,
    paddingHorizontal: 15,
    paddingVertical: 4,
    fontSize: 14,
  },
  jkseBattlAddButton: {
    width: 56,
    height: 56,
    borderRadius: 14,
    borderWidth: 0.8,
    borderColor: jkseBattlBorderColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
  jkseBattlCurrentPlayer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 40,
    justifyContent: 'center',
  },
  jkseBattlPlayerName: {
    color: '#fff',
    fontFamily: jkseBattlRegFont,
    fontSize: 28,
    marginBottom: 6,
  },
  jkseBattlJokeInput: {
    width: '100%',
    height: 180,
    borderRadius: 18,
    borderWidth: 0.8,
    borderColor: jkseBattlBorderColor,
    backgroundColor: '#2A2A2A',
    color: '#fff',
    fontFamily: jkseBattlRegFont,
    padding: 16,
    marginBottom: 30,
  },
  jkseBattlGrid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
    justifyContent: 'space-between',
  },
  jkseBattlVoteCard: {
    width: '47%',
    minHeight: 120,
    borderRadius: 16,
    borderWidth: 0.8,
    borderColor: '#7B6B31',
    backgroundColor: '#2A2A2A',
    padding: 12,
  },
  jkseBattlVoteSelected: {
    borderWidth: 1,
    borderColor: jkseBattlBorderColor,
  },
  jkseBattlVoteText: {
    color: '#fff',
    fontFamily: jkseBattlRegFont,
    fontSize: 9,
  },
  jkseBattlWinnerTitle: {
    borderColor: jkseBattlBorderColor,
    fontFamily: jkseBattlRegFont,
    fontSize: 32,
  },
  jkseBattlWinnerName: {
    color: '#fff',
    fontFamily: jkseBattlRegFont,
    fontSize: 22,
    marginBottom: 20,
  },
  jkseBattlWinnerCard: {
    width: '100%',
    borderRadius: 13,
    backgroundColor: '#2A2929',
    padding: 16,
  },
  jkseBattlMainButton: {
    width: '80%',
    height: 64,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  jkseBattlButtonText: {
    color: '#000',
    fontFamily: jkseBattlRegFont,
    fontSize: 20,
  },
  jkseBattlModalBg: {
    flex: 1,
    backgroundColor: '#62606058',
    justifyContent: 'center',
    alignItems: 'center',
  },
  jkseBattlModal: {
    width: '80%',
    backgroundColor: '#000',
    borderRadius: 16,
    borderWidth: 0.8,
    borderColor: jkseBattlBorderColor,
    padding: 20,
  },
  jkseBattlModalTitle: {
    color: '#fff',
    fontFamily: jkseBattlRegFont,
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 30,
  },
  jkseBattlAvatarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    gap: 15,
  },
  jkseBattlAvatarPick: {
    width: 100,
    height: 100,
    borderRadius: 15,
    borderWidth: 0.9,
    borderColor: '#7B6B31',
    justifyContent: 'center',
    alignItems: 'center',
  },
  jkseBattlClose: {
    width: 56,
    height: 56,
    borderRadius: 15,
    borderWidth: 0.9,
    borderColor: jkseBattlBorderColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  jkseBattlAvatarMoveBox: {
    width: 75,
    height: 75,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: jkseBattlBorderColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  jkseBattlPlayerNameBox: {
    flex: 1,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: jkseBattlBorderColor,
    justifyContent: 'center',
    alignItems: 'center',
    height: 75,
  },
  jkseBattlSharePosition: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    bottom: 45,
  },
});

export default PlayTogetherScreen;
