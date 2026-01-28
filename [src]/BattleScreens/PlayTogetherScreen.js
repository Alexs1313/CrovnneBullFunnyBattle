import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
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
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// consts

const regFont = 'OrelegaOne-Regular';
const bgColor = '#000';
const goldGradient = ['#FFF9CC', '#E2C23B'];
const startPosition = { x: 0, y: 0 };
const endPosition = { x: 0, y: 1.2 };
const borderColor = '#E6CE67';
const addButton = require('../assets/images/addButton.png');

// avatars / winner skins

const AVATARS = [
  { id: 0, image: require('../assets/images/bull_avatar_1.png') },
  { id: 1, image: require('../assets/images/bull_avatar_2.png') },
  { id: 2, image: require('../assets/images/bull_avatar_3.png') },
  { id: 3, image: require('../assets/images/bull_avatar_4.png') },
  { id: 4, image: require('../assets/images/bull_avatar_5.png') },
];

const WINNER_SKINS = {
  0: require('../assets/images/bull_winner_1.png'),
  1: require('../assets/images/bull_winner_2.png'),
  2: require('../assets/images/bull_winner_3.png'),
  3: require('../assets/images/bull_winner_4.png'),
  4: require('../assets/images/bull_winner_5.png'),
};

const STAGES = {
  ENTER: 'ENTER',
  MOVE: 'MOVE',
  VOTING: 'VOTING',
  RESULT: 'RESULT',
};

const PlayTogetherScreen = () => {
  const navigation = useNavigation();
  const { height } = useWindowDimensions();
  const [stage, setStage] = useState(STAGES.ENTER);
  const [players, setPlayers] = useState([
    { name: '', avatarId: null, joke: '', votes: 0 },
    { name: '', avatarId: null, joke: '', votes: 0 },
  ]);
  const [current, setCurrent] = useState(0);
  const [avatarPickerFor, setAvatarPickerFor] = useState(null);
  const [votingPlayer, setVotingPlayer] = useState(0);
  const [selectedVote, setSelectedVote] = useState(null);

  const usedAvatars = players.map(p => p.avatarId).filter(v => v !== null);

  const winner = [...players].sort((a, b) => b.votes - a.votes)[0];

  const winnerSkin = WINNER_SKINS[winner.avatarId];

  const canShowStart = players.length >= 2 && players.every(p => p.name.trim());

  const handleStart = () => {
    const allPlayersHaveAvatars = players.every(
      player => player.avatarId !== null,
    );

    if (!allPlayersHaveAvatars) {
      Alert.alert(
        'Choose profile',
        'Each player must choose an profile before starting the game.',
      );
      return;
    }

    setStage(STAGES.MOVE);
  };

  const handleVote = () => {
    if (selectedVote !== null) {
      const updatedPlayers = [...players];
      updatedPlayers[selectedVote].votes += 1;
      setPlayers(updatedPlayers);

      console.log('voted');
    }

    setSelectedVote(null);

    if (votingPlayer < players.length - 1) {
      setVotingPlayer(prev => prev + 1);
    } else {
      setStage(STAGES.RESULT);
    }
  };

  const handleShareResult = () => {
    Share.share({
      message: `${winner.name} wins!\n\n${winner.joke}`,
    });
  };

  const BattleHeader = () => (
    <View style={[styles.header]}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Image source={require('../assets/icons/back_arrow.png')} />
      </TouchableOpacity>

      <Text style={styles.headerTitle}>Play together</Text>

      {Platform.OS === 'ios' ? (
        <Image
          source={require('../assets/images/app_icon.png')}
          style={styles.appIcon}
        />
      ) : (
        <Image
          source={require('../assets/images/icon.png')}
          style={[
            styles.appIcon,
            { borderRadius: 12, borderWidth: 0.8, borderColor },
          ]}
        />
      )}
    </View>
  );

  if (stage === STAGES.ENTER) {
    return (
      <LinearGradient colors={['#0b0525ff', '#000000ff']} style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={[styles.scroll, { paddingTop: height * 0.07 }]}
        >
          <BattleHeader />
          <Text style={styles.title}>Enter data</Text>

          {players.map((p, i) => (
            <View key={i} style={styles.playerRow}>
              <TouchableOpacity
                style={styles.avatarBox}
                onPress={() => setAvatarPickerFor(i)}
              >
                {p.avatarId !== null ? (
                  <Image
                    source={AVATARS[p.avatarId].image}
                    style={{ width: 29, height: 49, resizeMode: 'contain' }}
                  />
                ) : (
                  <Image source={require('../assets/icons/user_icon.png')} />
                )}
              </TouchableOpacity>

              <TextInput
                placeholder={`Player ${i + 1}`}
                placeholderTextColor="#FFFFFF"
                style={styles.input}
                maxLength={14}
                value={p.name}
                onChangeText={t => {
                  const copy = [...players];
                  copy[i].name = t;
                  setPlayers(copy);
                }}
              />
            </View>
          ))}

          {players.length < 5 && (
            <TouchableOpacity
              style={{ marginTop: height * 0.03 }}
              onPress={() =>
                setPlayers([
                  ...players,
                  { name: '', avatarId: null, joke: '', votes: 0 },
                ])
              }
            >
              <Image source={addButton} />
            </TouchableOpacity>
          )}
          {canShowStart && (
            <TouchableOpacity
              onPress={handleStart}
              activeOpacity={0.7}
              style={{
                width: '100%',
                alignItems: 'center',
                marginTop: height * 0.05,
              }}
            >
              <LinearGradient colors={goldGradient} style={styles.mainButton}>
                <Text style={styles.buttonText}>Start</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}

          <Modal visible={avatarPickerFor !== null} transparent>
            <View style={styles.modalBg}>
              <View style={styles.modal}>
                <Text style={styles.modalTitle}>Choose a profile</Text>

                <View style={styles.avatarGrid}>
                  {AVATARS.map(a => {
                    const isUsed = usedAvatars.includes(a.id);

                    return (
                      <TouchableOpacity
                        key={a.id}
                        disabled={isUsed}
                        style={[
                          styles.avatarPick,
                          isUsed && styles.avatarDisabled,
                        ]}
                        onPress={() => {
                          const copy = [...players];
                          copy[avatarPickerFor].avatarId = a.id;
                          setPlayers(copy);
                          setAvatarPickerFor(null);
                        }}
                      >
                        <Image
                          source={a.image}
                          style={{ opacity: isUsed ? 0.4 : 1 }}
                        />
                      </TouchableOpacity>
                    );
                  })}
                </View>

                <TouchableOpacity
                  style={styles.close}
                  onPress={() => setAvatarPickerFor(null)}
                >
                  <Image source={require('../assets/icons/close.png')} />
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </LinearGradient>
    );
  }

  if (stage === STAGES.MOVE) {
    const player = players[current];

    return (
      <LinearGradient colors={['#0b0525ff', '#000000ff']} style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={[styles.scroll, { paddingTop: height * 0.07 }]}
        >
          <BattleHeader />
          <Text style={styles.title}>Player's move</Text>

          <View style={styles.currentPlayer}>
            <View style={styles.avatarMoveBox}>
              <Image
                source={AVATARS[player.avatarId].image}
                style={styles.avatarVoteBox}
              />
            </View>
            <View style={styles.playerNameBox}>
              <Text style={styles.playerName}>{player.name}</Text>
            </View>
          </View>

          <TextInput
            multiline
            placeholder="Write a joke"
            placeholderTextColor="#FFFFFF"
            style={styles.jokeInput}
            textAlignVertical="top"
            value={player.joke}
            onChangeText={t => {
              const copy = [...players];
              copy[current].joke = t;
              setPlayers(copy);
            }}
          />

          <TouchableOpacity
            style={{ width: '100%', alignItems: 'center' }}
            activeOpacity={0.7}
            disabled={!player.joke.trim()}
            onPress={() => {
              if (current < players.length - 1) {
                setCurrent(c => c + 1);
              } else {
                setStage(STAGES.VOTING);
              }
            }}
          >
            <LinearGradient
              colors={goldGradient}
              style={styles.mainButton}
              start={startPosition}
              end={endPosition}
            >
              <Text style={styles.buttonText}>
                {current === players.length - 1 ? 'Voting' : 'Next player'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    );
  }

  if (stage === STAGES.VOTING) {
    const voter = players[votingPlayer];

    return (
      <LinearGradient colors={['#0b0525ff', '#000000ff']} style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={[styles.scroll, { paddingTop: height * 0.07 }]}
        >
          <BattleHeader />
          <Text style={styles.title}>Player votes:</Text>

          <View style={styles.currentPlayer}>
            <View style={styles.avatarMoveBox}>
              <Image
                source={AVATARS[voter.avatarId].image}
                style={styles.avatarVoteBox}
              />
            </View>
            <View style={styles.playerNameBox}>
              <Text style={styles.playerName}>{voter.name}</Text>
            </View>
          </View>

          <View style={styles.grid}>
            {players.map((p, i) => (
              <TouchableOpacity
                activeOpacity={0.7}
                key={i}
                style={[
                  styles.voteCard,
                  selectedVote === i && styles.voteSelected,
                ]}
                onPress={() => setSelectedVote(i)}
              >
                <Text style={styles.voteText}>{p.joke}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={{ width: '100%', alignItems: 'center', marginTop: 30 }}
            activeOpacity={0.7}
            disabled={selectedVote === null}
            onPress={() => {
              handleVote();
            }}
          >
            <LinearGradient
              colors={goldGradient}
              style={styles.mainButton}
              start={startPosition}
              end={endPosition}
            >
              <Text style={styles.buttonText}>Vote</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#0b0525ff', '#000000ff']} style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingTop: height * 0.07 }]}
      >
        <BattleHeader />

        <Image source={require('../assets/images/winner_text.png')} />
        <View style={styles.winnerWrapper}>
          <Text style={styles.playerName}>{winner.name}</Text>
          <View style={styles.winnerCard}>
            <Text style={styles.voteText}>{winner.joke}</Text>
          </View>
        </View>

        <Image source={winnerSkin} style={styles.winnerBull} />
        <View style={styles.sharePosition}>
          <TouchableOpacity
            style={{ width: '100%', alignItems: 'center' }}
            activeOpacity={0.7}
            onPress={() => handleShareResult()}
          >
            <LinearGradient
              colors={goldGradient}
              style={styles.mainButton}
              start={startPosition}
              end={endPosition}
            >
              <Text style={styles.buttonText}>Share</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: bgColor,
    alignItems: 'center',
    padding: 20,
    flexGrow: 1,
  },
  winnerBull: {
    resizeMode: 'contain',
    marginVertical: 30,
    position: 'relative',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 0.8,
    borderColor,
    borderRadius: 16,
    padding: 10,
    marginBottom: 40,
    alignItems: 'center',
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
  headerTitle: {
    color: '#fff',
    fontFamily: regFont,
    fontSize: 20,
  },
  appIcon: {
    width: 56,
    height: 56,
  },
  winnerWrapper: {
    alignItems: 'center',
    marginVertical: 20,
    width: '80%',
    padding: 15,
    borderWidth: 1,
    borderColor,
    borderRadius: 16,
  },
  avatarVoteBox: {
    width: 35,
    height: 69,
    resizeMode: 'contain',
  },
  title: {
    color: '#fff',
    fontFamily: regFont,
    fontSize: 24,
    marginBottom: 40,
  },
  playerRow: {
    width: '100%',
    flexDirection: 'row',
    gap: 12,
    marginBottom: 17,
  },
  avatarBox: {
    width: 62,
    height: 62,
    borderRadius: 15,
    borderWidth: 0.8,
    borderColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 62,
    borderRadius: 14,
    borderWidth: 0.8,
    borderColor,
    color: '#fff',
    fontFamily: regFont,
    paddingHorizontal: 15,
    paddingVertical: 4,
    fontSize: 14,
  },
  addButton: {
    width: 56,
    height: 56,
    borderRadius: 14,
    borderWidth: 0.8,
    borderColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
  currentPlayer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 40,
    justifyContent: 'center',
  },
  playerName: {
    color: '#fff',
    fontFamily: regFont,
    fontSize: 28,
    marginBottom: 6,
  },
  jokeInput: {
    width: '100%',
    height: 180,
    borderRadius: 18,
    borderWidth: 0.8,
    borderColor,
    backgroundColor: '#2A2A2A',
    color: '#fff',
    fontFamily: regFont,
    padding: 16,
    marginBottom: 30,
  },
  grid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
    justifyContent: 'space-between',
  },
  voteCard: {
    width: '47%',
    minHeight: 120,
    borderRadius: 16,
    borderWidth: 0.8,
    borderColor: '#7B6B31',
    backgroundColor: '#2A2A2A',
    padding: 12,
  },
  voteSelected: {
    borderWidth: 1,
    borderColor,
  },
  voteText: {
    color: '#fff',
    fontFamily: regFont,
    fontSize: 9,
  },
  winnerTitle: {
    borderColor,
    fontFamily: regFont,
    fontSize: 32,
  },
  winnerName: {
    color: '#fff',
    fontFamily: regFont,
    fontSize: 22,
    marginBottom: 20,
  },
  winnerCard: {
    width: '100%',
    borderRadius: 13,
    backgroundColor: '#2A2929',
    padding: 16,
  },
  mainButton: {
    width: '80%',
    height: 64,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#000',
    fontFamily: regFont,
    fontSize: 20,
  },
  modalBg: {
    flex: 1,
    backgroundColor: '#62606058',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '80%',
    backgroundColor: '#000',
    borderRadius: 16,
    borderWidth: 0.8,
    borderColor,
    padding: 20,
  },
  modalTitle: {
    color: '#fff',
    fontFamily: regFont,
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 30,
  },
  avatarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    gap: 15,
  },
  avatarPick: {
    width: 100,
    height: 100,
    borderRadius: 15,
    borderWidth: 0.9,
    borderColor: '#7B6B31',
    justifyContent: 'center',
    alignItems: 'center',
  },

  close: {
    width: 56,
    height: 56,
    borderRadius: 15,
    borderWidth: 0.9,
    borderColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  avatarMoveBox: {
    width: 75,
    height: 75,
    borderRadius: 18,
    borderWidth: 1,
    borderColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playerNameBox: {
    flex: 1,
    borderRadius: 18,
    borderWidth: 1,
    borderColor,
    justifyContent: 'center',
    alignItems: 'center',
    height: 75,
  },
  sharePosition: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    bottom: 45,
  },
});

export default PlayTogetherScreen;
