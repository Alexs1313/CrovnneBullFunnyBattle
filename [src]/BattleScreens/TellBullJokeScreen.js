import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  useWindowDimensions,
  ScrollView,
  Share,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const regFont = 'OrelegaOne-Regular';
const bgColor = '#000';
const goldGradient = ['#E1C352', '#FFF9CC', '#E6CE67', '#EDE5BC', '#E2C23B'];
const startPosition = { x: 0, y: 2 };
const endPosition = { x: 1, y: 0 };
const borderColor = '#E6CE67';

const STATES = {
  IDLE: 'idle',
  RECORDING: 'recording',
  RESULT_BAD: 'result_bad',
  RESULT_GOOD: 'result_good',
};

const TellBullJokeScreen = () => {
  const [state, setState] = useState(STATES.IDLE);
  const [secondsLeft, setSecondsLeft] = useState(15);
  const [timerId, setTimerId] = useState(null);
  const { height } = useWindowDimensions();
  const navigation = useNavigation();

  const startRecording = () => {
    setState(STATES.RECORDING);
    setSecondsLeft(15);

    const timerID = setInterval(() => {
      setSecondsLeft(prevSeconds => {
        if (prevSeconds <= 1) {
          clearInterval(timerID);
          setState(STATES.RESULT_GOOD);
          return 0;
        }

        return prevSeconds - 1;
      });
    }, 1000);

    setTimerId(timerID);
  };

  useEffect(() => {
    if (state !== STATES.RECORDING && timerId) {
      clearInterval(timerId);
      setTimerId(null);
    }
  }, [state]);

  const selectedBull = () => {
    switch (state) {
      case STATES.RECORDING:
        return require('../assets/images/thinking_bull.png');
      case STATES.RESULT_BAD:
        return require('../assets/images/bad_bull.png');
      case STATES.RESULT_GOOD:
        return require('../assets/images/good_bull.png');
      default:
        return require('../assets/images/reg_bull.png');
    }
  };

  const shareResult = async res => {
    try {
      const message =
        res === STATES.RESULT_GOOD
          ? 'This is a very great joke, I expect more such jokes from you!'
          : `You could have joked better. I hope you'll succeed next time!`;

      await Share.share({ message });
    } catch (error) {
      console.error('sharing error', error);
    }
  };

  const bottomButton = () => {
    if (state === STATES.IDLE) {
      return <PrimaryButton text="Start recording" onPress={startRecording} />;
    }

    if (state === STATES.RECORDING) {
      return (
        <PrimaryButton
          text="Recording in progress..."
          onPress={() => setState(STATES.RESULT_GOOD)}
          disabled
        />
      );
    }

    return (
      <PrimaryButton
        text="Share"
        onPress={() => {
          shareResult(state);
        }}
      />
    );
  };

  const resultText = () => {
    switch (state) {
      case STATES.RESULT_BAD:
        return "You could have joked better. I hope you'll succeed next time!";
      case STATES.RESULT_GOOD:
        return 'This is a very great joke, I expect more such jokes from you!';
      default:
        return '';
    }
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
          flexGrow: 1,
          paddingTop: height * 0.07,
          paddingBottom: 30,
        }}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Image source={require('../assets/icons/back_arrow.png')} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Tell a jokes</Text>
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
                {
                  borderRadius: 12,
                  borderWidth: 0.8,
                  borderColor: '#E6CE67',
                },
              ]}
            />
          )}
        </View>
        {state !== STATES.RECORDING && (
          <Text
            style={[
              styles.title,
              { marginTop: height * 0.05, marginBottom: height * 0.02 },
            ]}
          >
            {state.includes('result') ? 'Result' : 'Tell a joke to the bull'}
          </Text>
        )}

        {state === STATES.RECORDING && (
          <View style={[styles.timerBox, { marginTop: height * 0.05 }]}>
            <Image source={require('../assets/icons/clock.png')} />
            <Text style={styles.timerText}>
              00:{secondsLeft.toString().padStart(2, '0')}
            </Text>
          </View>
        )}

        <ImageBackground
          source={require('../assets/images/back_blur.png')}
          style={styles.bullWrapper}
        >
          <Image source={selectedBull()} style={styles.bull} />
        </ImageBackground>

        <Text style={[styles.resultText, { marginBottom: height * 0.04 }]}>
          {resultText()}
        </Text>

        {bottomButton()}
      </ScrollView>
    </View>
  );
};

const PrimaryButton = ({ text, onPress, disabled }) => (
  <TouchableOpacity
    activeOpacity={disabled ? 1 : 0.7}
    onPress={disabled ? null : onPress}
    style={{ marginTop: 30 }}
  >
    <LinearGradient
      colors={goldGradient}
      style={[styles.button]}
      start={startPosition}
      end={endPosition}
    >
      {text !== 'Share' && (
        <Image source={require('../assets/icons/microphone.png')} />
      )}

      <Text style={styles.buttonText}>{text}</Text>
    </LinearGradient>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: bgColor,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderWidth: 0.9,
    borderColor,
    padding: 10,
    borderRadius: 15,
  },
  backButton: {
    height: 58,
    width: 58,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 11,
    borderWidth: 0.9,
    borderColor,
  },
  timerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 11,
    borderWidth: 0.6,
    borderColor,
  },
  timerText: {
    color: '#E1C352',
    fontFamily: regFont,
    fontSize: 16,
  },
  headerTitle: {
    color: '#fff',
    fontFamily: regFont,
    fontSize: 20,
  },
  appIcon: {
    width: 58,
    height: 58,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontFamily: regFont,
  },
  bullWrapper: {
    width: 290,
    height: 290,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  bull: {
    resizeMode: 'contain',
  },
  resultText: {
    color: '#fff',
    fontFamily: regFont,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 30,
    paddingHorizontal: 20,
  },
  button: {
    width: 268,
    height: 67,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  buttonText: {
    fontFamily: regFont,
    fontSize: 17,
    color: '#000',
  },
});

export default TellBullJokeScreen;
