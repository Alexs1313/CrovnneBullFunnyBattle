import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
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

const regularFont = 'OrelegaOne-Regular';
const backgroundColor = '#000';
const buttonGradientColors = ['#FFF9CC', '#E2C23B'];
const gradientStart = { x: 0, y: 0 };
const gradientEnd = { x: 0, y: 1.2 };

const AboutBullScreen = () => {
  const navigation = useNavigation();
  const { height: screenHeight } = useWindowDimensions();

  const handleShare = async () => {
    try {
      await Share.share({
        message:
          'Crovnne Bull Funny Battle is a fun social app for humorous competitions between friends. Write or voice your jokes, vote for the best ones, and find out the verdict of the charismatic Bull. Collect your favorite jokes, open categories, and prove that your humor is worthy of the crown.',
      });
    } catch (error) {
      console.error('Share Error', error);
    }
  };

  return (
    <LinearGradient colors={['#0b0525ff', '#000000ff']} style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: screenHeight * 0.07 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Image
              source={require('../assets/icons/back_arrow.png')}
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>About</Text>

          {Platform.OS === 'ios' ? (
            <Image
              source={require('../assets/images/app_icon.png')}
              style={styles.headerIcon}
            />
          ) : (
            <Image
              source={require('../assets/images/icon.png')}
              style={[
                styles.headerIcon,
                {
                  borderRadius: 12,
                  borderWidth: 0.8,
                  borderColor: '#E6CE67',
                },
              ]}
            />
          )}
        </View>

        <View style={styles.logoContainer}>
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
              style={{
                width: 320,
                height: 320,
                borderRadius: 22,
                borderWidth: 0.8,
                borderColor: '#E6CE67',
              }}
            />
          )}
        </View>

        <Text style={styles.description}>
          Crovnne Bull Funny Battle is a fun social app for humorous
          competitions between friends. Write or voice your jokes, vote for the
          best ones and find out the verdict of the charismatic Bull. Collect
          your favorite jokes, open categories and prove that your humor is
          worthy of the crown.
        </Text>

        <TouchableOpacity activeOpacity={0.7} onPress={handleShare}>
          <LinearGradient
            colors={buttonGradientColors}
            start={gradientStart}
            end={gradientEnd}
            style={styles.shareButton}
          >
            <Text style={styles.shareButtonText}>Share</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor,
  },
  scrollContent: {
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
    fontFamily: regularFont,
    fontSize: 20,
  },
  headerIcon: {
    width: 56,
    height: 56,
  },
  logoContainer: {
    marginBottom: 30,
  },
  logoImage: {
    resizeMode: 'cover',
  },
  description: {
    color: '#fff',
    fontFamily: regularFont,
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
  shareButtonText: {
    color: '#000',
    fontFamily: regularFont,
    fontSize: 20,
  },
});

export default AboutBullScreen;
