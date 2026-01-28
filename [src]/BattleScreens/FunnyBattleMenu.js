import { useNavigation } from '@react-navigation/native';

import {
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const primaryFont = 'OrelegaOne-Regular';
const bgColor = '#000';
const bordersColor = '#E6CE67';
const goldGradient = ['#FFF9CC', '#E2C23B'];
const startPosition = { x: 0, y: 0 };
const endPosition = { x: 0, y: 1.2 };

const FunnyBattleMenu = () => {
  const navigation = useNavigation();

  const handleNavigateTo = selectedScreen => {
    navigation.navigate(selectedScreen);
  };

  return (
    <LinearGradient colors={['#0b0525ff', '#000000ff']} style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={s.scrollContainer}
      >
        <ImageBackground
          source={require('../assets/images/back_blur.png')}
          style={s.backgroundBlur}
        >
          {Platform.OS === 'ios' ? (
            <Image
              source={require('../assets/images/about_logo.png')}
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
              style={{ width: 230, height: 230, borderRadius: 22 }}
            />
          )}
        </ImageBackground>
        <TouchableOpacity
          activeOpacity={0.6}
          style={{ width: '90%' }}
          onPress={() => handleNavigateTo('PlayTogetherScreen')}
        >
          <LinearGradient
            colors={goldGradient}
            style={s.primaryButton}
            start={startPosition}
            end={endPosition}
          >
            <Text style={s.buttonText}>Play together</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={s.secondaryButton}
          onPress={() => handleNavigateTo('TellBullJokeScreen')}
          activeOpacity={0.6}
        >
          <Text style={s.challengeButtonText}>Tell a joke</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={s.secondaryButton}
          onPress={() => handleNavigateTo('SelectionOfJokesScreen')}
          activeOpacity={0.6}
        >
          <Text style={s.challengeButtonText}>Selection of jokes</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', gap: 20 }}>
          <TouchableOpacity
            style={s.detailsButton}
            onPress={() => handleNavigateTo('SavedJokesScreen')}
            activeOpacity={0.6}
          >
            <Image source={require('../assets/icons/stash_save-ribbon.png')} />
          </TouchableOpacity>
          <TouchableOpacity
            style={s.detailsButton}
            onPress={() => handleNavigateTo('AboutBullScreen')}
            activeOpacity={0.6}
          >
            <Image source={require('../assets/icons/m_about.png')} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const s = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: bgColor,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  primaryButton: {
    borderRadius: 15,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    alignSelf: 'center',
  },
  backgroundBlur: {
    width: 340,
    height: 340,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  secondaryButton: {
    borderWidth: 0.9,
    borderColor: bordersColor,
    borderRadius: 15,
    paddingVertical: 14,
    height: 56,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '55%',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#000',
    fontSize: 20,
    fontFamily: primaryFont,
  },
  challengeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: primaryFont,
  },
  detailsButton: {
    borderWidth: 0.9,
    borderColor: bordersColor,
    borderRadius: 13,
    paddingVertical: 14,
    height: 51,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 51,
    alignSelf: 'center',
  },
});

export default FunnyBattleMenu;
