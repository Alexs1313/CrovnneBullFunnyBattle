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

const regFont = 'OrelegaOne-Regular';
const bgColor = '#000';
const goldGradient = ['#FFF9CC', '#E2C23B'];
const startPosition = { x: 0, y: 0 };
const endPosition = { x: 0, y: 1.2 };

const AboutBullScreen = () => {
  const navigation = useNavigation();
  const { height } = useWindowDimensions();

  const onShare = async () => {
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
        contentContainerStyle={[styles.scroll, { paddingTop: height * 0.07 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Image source={require('../assets/icons/back_arrow.png')} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>About</Text>

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

        <View style={styles.logoCard}>
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
              style={[
                {
                  width: 320,
                  height: 320,
                  borderRadius: 22,
                  borderWidth: 0.8,
                  borderColor: '#E6CE67',
                },
              ]}
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

        <TouchableOpacity activeOpacity={0.7} onPress={onShare}>
          <LinearGradient
            colors={goldGradient}
            start={startPosition}
            end={endPosition}
            style={styles.shareButton}
          >
            <Text style={styles.shareText}>Share</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bgColor,
  },
  scroll: {
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
    fontFamily: regFont,
    fontSize: 20,
  },
  appIcon: {
    width: 56,
    height: 56,
  },
  logoCard: {
    marginBottom: 30,
  },
  logoImage: {
    resizeMode: 'cover',
  },
  description: {
    color: '#fff',
    fontFamily: regFont,
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
  shareText: {
    color: '#000',
    fontFamily: regFont,
    fontSize: 20,
  },
});

export default AboutBullScreen;
