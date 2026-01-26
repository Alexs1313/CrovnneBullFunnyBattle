import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const onboardImages = [
  require('../assets/images/onboard_1.png'),
  require('../assets/images/onboard_2.png'),
  require('../assets/images/onboard_3.png'),
];

const onboardTitles = [
  require('../assets/images/onboard_title_1.png'),
  require('../assets/images/onboard_title_2.png'),
  require('../assets/images/onboard_title_3.png'),
];

const bgColor = '#000';
const regFont = 'OrelegaOne-Regular';
const goldGradient = ['#E1C352', '#FFF9CC', '#E6CE67', '#EDE5BC', '#E2C23B'];
const startPosition = { x: 0, y: 2 };
const endPosition = { x: 1, y: 0 };

const CrovnneBullOnboard = () => {
  const { height } = useWindowDimensions();
  const [onboardingStep, setOnboardingStep] = useState(0);
  const navigation = useNavigation();

  const handleNextStep = () => {
    if (onboardingStep < 2) {
      setOnboardingStep(onboardingStep + 1);

      console.log('+ 1 step');
    } else {
      navigation.replace('FunnyBattleMenu');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: bgColor }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
          paddingTop: height * 0.06,
          paddingBottom: 30,
        }}
      >
        <ImageBackground
          source={require('../assets/images/back_blur.png')}
          style={s.bgBlur}
        >
          {Platform.OS === 'ios' ? (
            <Image
              source={require('../assets/images/loade_lLogo.png')}
              style={{ width: 80, height: 80 }}
            />
          ) : (
            <Image
              source={require('../assets/images/icon.png')}
              style={{ width: 80, height: 80, borderRadius: 8 }}
            />
          )}
        </ImageBackground>

        <View style={s.pagination}>
          {[1, 2, 3].map((_, idx) => (
            <Image
              key={idx}
              source={
                idx <= onboardingStep
                  ? require('../assets/images/active_pagination.png')
                  : require('../assets/images/inactive_pagination.png')
              }
            />
          ))}
        </View>

        <Image
          source={onboardTitles[onboardingStep]}
          style={{
            resizeMode: 'cover',
            marginBottom: height * 0.05,
          }}
        />

        <ImageBackground
          source={require('../assets/images/back_blur.png')}
          style={s.logoBgBlur}
        >
          <Image
            source={onboardImages[onboardingStep]}
            style={{
              resizeMode: 'cover',
            }}
          />
        </ImageBackground>

        <View>
          <Text style={s.introSecondText}>
            {onboardingStep === 0
              ? 'I’m a bull who knows a lot about jokes. Bad ones won’t pass. Good ones will be remembered.'
              : onboardingStep === 1
              ? 'Write a joke, read other people’s, vote honestly. Whoever gets the most votes wins. I’m all about fairness.'
              : 'Write a joke with your voice — I’ll rate it. Choose your categories, save your favorites and come back when you need a laugh.'}
          </Text>

          <TouchableOpacity onPress={handleNextStep} activeOpacity={0.6}>
            <LinearGradient
              colors={goldGradient}
              style={s.button}
              start={startPosition}
              end={endPosition}
            >
              <Text style={s.buttonText}>
                {onboardingStep === 0
                  ? 'Next'
                  : onboardingStep === 1
                  ? 'Continue'
                  : 'Start'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const s = StyleSheet.create({
  bottomSheet: {
    backgroundColor: '#151225',
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    padding: 16,
    paddingTop: 30,
    width: '100%',
    borderWidth: 2,
    borderColor: '#3D375D',
    flex: 1,
    paddingBottom: 30,
    borderBottomColor: 'transparent',
  },
  bgBlur: {
    width: 110,
    height: 110,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  introSecondText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 33,
    fontFamily: regFont,
    paddingHorizontal: 30,
  },
  button: {
    borderRadius: 15,
    height: 64,
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#000',
    fontSize: 20,
    fontFamily: regFont,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
    gap: 5,
  },
  logoBgBlur: {
    width: 310,
    height: 310,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CrovnneBullOnboard;
