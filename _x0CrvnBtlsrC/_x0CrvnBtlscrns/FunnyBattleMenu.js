import { useNavigation as _uNV_9xQpLTrZaKs } from '@react-navigation/native';

import {
  Image as _iMg_7QpLxZaKs,
  ImageBackground as _iBg_5QpLxZaKs,
  Platform as _pLf_3QpLxZaKs,
  ScrollView as _sCv_8QpLxZaKs,
  StyleSheet as _sSy_6QpLxZaKs,
  Text as _tXt_4QpLxZaKs,
  TouchableOpacity as _tOp_2QpLxZaKs,
  View as _vW_1QpLxZaKs,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const _pFn_9QpLxZaKs = 'OrelegaOne-Regular';
const _bgC_8QpLxZaKs = '#000';
const _brC_7QpLxZaKs = '#E6CE67';
const _gdG_6QpLxZaKs = ['#FFF9CC', '#E2C23B'];
const _stP_5QpLxZaKs = { x: 0, y: 0 };
const _enP_4QpLxZaKs = { x: 0, y: 1.2 };

const FunnyBattleMenu = () => {
  const _nv_2QpLxZaKs = _uNV_9xQpLTrZaKs();

  const _hdNv_1QpLxZaKs = _sc_9QpLxZaKs => {
    _nv_2QpLxZaKs.navigate(_sc_9QpLxZaKs);
  };

  return (
    <LinearGradient colors={['#0b0525ff', '#000000ff']} style={{ flex: 1 }}>
      <_sCv_8QpLxZaKs
        showsVerticalScrollIndicator={false}
        contentContainerStyle={_s$.sC_7QpLxZaKs}
      >
        <_iBg_5QpLxZaKs
          source={require('../assets/images/back_blur.png')}
          style={_s$.bB_6QpLxZaKs}
        >
          {_pLf_3QpLxZaKs.OS === 'ios' ? (
            <_iMg_7QpLxZaKs
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
            <_iMg_7QpLxZaKs
              source={require('../assets/images/icon.png')}
              style={{ width: 230, height: 230, borderRadius: 22 }}
            />
          )}
        </_iBg_5QpLxZaKs>

        <_tOp_2QpLxZaKs
          activeOpacity={0.6}
          style={{ width: '90%' }}
          onPress={() => _hdNv_1QpLxZaKs('PlayTogetherScreen')}
        >
          <LinearGradient
            colors={_gdG_6QpLxZaKs}
            style={_s$.pB_5QpLxZaKs}
            start={_stP_5QpLxZaKs}
            end={_enP_4QpLxZaKs}
          >
            <_tXt_4QpLxZaKs style={_s$.bT_4QpLxZaKs}>
              Play together
            </_tXt_4QpLxZaKs>
          </LinearGradient>
        </_tOp_2QpLxZaKs>

        <_tOp_2QpLxZaKs
          style={_s$.sB_3QpLxZaKs}
          onPress={() => _hdNv_1QpLxZaKs('TellBullJokeScreen')}
          activeOpacity={0.6}
        >
          <_tXt_4QpLxZaKs style={_s$.cT_2QpLxZaKs}>Tell a joke</_tXt_4QpLxZaKs>
        </_tOp_2QpLxZaKs>

        <_tOp_2QpLxZaKs
          style={_s$.sB_3QpLxZaKs}
          onPress={() => _hdNv_1QpLxZaKs('SelectionOfJokesScreen')}
          activeOpacity={0.6}
        >
          <_tXt_4QpLxZaKs style={_s$.cT_2QpLxZaKs}>
            Selection of jokes
          </_tXt_4QpLxZaKs>
        </_tOp_2QpLxZaKs>

        <_vW_1QpLxZaKs style={{ flexDirection: 'row', gap: 20 }}>
          <_tOp_2QpLxZaKs
            style={_s$.dB_1QpLxZaKs}
            onPress={() => _hdNv_1QpLxZaKs('SavedJokesScreen')}
            activeOpacity={0.6}
          >
            <_iMg_7QpLxZaKs
              source={require('../assets/icons/stash_save-ribbon.png')}
            />
          </_tOp_2QpLxZaKs>

          <_tOp_2QpLxZaKs
            style={_s$.dB_1QpLxZaKs}
            onPress={() => _hdNv_1QpLxZaKs('AboutBullScreen')}
            activeOpacity={0.6}
          >
            <_iMg_7QpLxZaKs source={require('../assets/icons/m_about.png')} />
          </_tOp_2QpLxZaKs>
        </_vW_1QpLxZaKs>
      </_sCv_8QpLxZaKs>
    </LinearGradient>
  );
};

const _s$ = _sSy_6QpLxZaKs.create({
  mC_9QpLxZaKs: {
    flex: 1,
    backgroundColor: _bgC_8QpLxZaKs,
  },
  sC_7QpLxZaKs: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  pB_5QpLxZaKs: {
    borderRadius: 15,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    alignSelf: 'center',
  },
  bB_6QpLxZaKs: {
    width: 340,
    height: 340,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  sB_3QpLxZaKs: {
    borderWidth: 0.9,
    borderColor: _brC_7QpLxZaKs,
    borderRadius: 15,
    paddingVertical: 14,
    height: 56,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '55%',
    alignSelf: 'center',
  },
  bT_4QpLxZaKs: {
    color: '#000',
    fontSize: 20,
    fontFamily: _pFn_9QpLxZaKs,
  },
  cT_2QpLxZaKs: {
    color: '#fff',
    fontSize: 18,
    fontFamily: _pFn_9QpLxZaKs,
  },
  dB_1QpLxZaKs: {
    borderWidth: 0.9,
    borderColor: _brC_7QpLxZaKs,
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
