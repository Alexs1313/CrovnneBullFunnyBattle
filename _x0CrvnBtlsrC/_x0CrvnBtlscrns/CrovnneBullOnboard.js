import { useNavigation as _uNV_9xQpLTrZaKs } from '@react-navigation/native';
import { useState as _uST_7nQpLxZaKs } from 'react';
import {
  Image as _iMg_9tQpLxZaKs,
  ImageBackground as _iBg_7xQpLZaKs,
  Platform as _pLf_3QpLxZaKs,
  ScrollView as _sCv_8QpLxZaKs,
  StyleSheet as _sSy_6QpLxZaKs,
  Text as _tXt_4QpLxZaKs,
  TouchableOpacity as _tOp_5QpLxZaKs,
  useWindowDimensions as _uWD_2QpLxZaKs,
  View as _vW_1QpLxZaKs,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const _obIM_9xQpLxZaKs = [
  require('../assets/images/onboard_1.png'),
  require('../assets/images/onboard_2.png'),
  require('../assets/images/onboard_3.png'),
];

const _obTT_7xQpLZaKs = [
  require('../assets/images/onboard_title_1.png'),
  require('../assets/images/onboard_title_2.png'),
  require('../assets/images/onboard_title_3.png'),
];

const _rgFn_6QpLxZaKs = 'OrelegaOne-Regular';
const _gdGr_5QpLxZaKs = ['#FFF9CC', '#E2C23B'];
const _stPs_4QpLxZaKs = { x: 0, y: 0 };
const _enPs_3QpLxZaKs = { x: 0, y: 1.2 };

const CrovnneBullOnboard = () => {
  const { height: _ht_2QpLxZaKs } = _uWD_2QpLxZaKs();
  const [_stp_8QpLxZaKs, _sStp_7QpLxZaKs] = _uST_7nQpLxZaKs(0);
  const _nv_6QpLxZaKs = _uNV_9xQpLTrZaKs();

  const _nxSt_5QpLxZaKs = () => {
    if (_stp_8QpLxZaKs < 2) {
      _sStp_7QpLxZaKs(p => p + 1);
    } else {
      _nv_6QpLxZaKs.replace('FunnyBattleMenu');
    }
  };

  return (
    <LinearGradient colors={['#0b0525ff', '#000000ff']} style={{ flex: 1 }}>
      <_sCv_8QpLxZaKs
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
          paddingTop: _ht_2QpLxZaKs * 0.06,
          paddingBottom: 30,
        }}
      >
        <_iBg_7xQpLZaKs
          source={require('../assets/images/back_blur.png')}
          style={_st.bgB_1QpLxZaKs}
        >
          {_pLf_3QpLxZaKs.OS === 'ios' ? (
            <_iMg_9tQpLxZaKs
              source={require('../assets/images/about_logo.png')}
              style={{
                width: 80,
                height: 80,
                borderRadius: 8,
                borderWidth: 0.5,
                borderColor: '#E6CE67',
              }}
            />
          ) : (
            <_iMg_9tQpLxZaKs
              source={require('../assets/images/icon.png')}
              style={{ width: 80, height: 80, borderRadius: 8 }}
            />
          )}
        </_iBg_7xQpLZaKs>

        <_vW_1QpLxZaKs style={_st.pgN_2QpLxZaKs}>
          {[1, 2, 3].map((_, _ix_9QpLxZaKs) => (
            <_iMg_9tQpLxZaKs
              key={_ix_9QpLxZaKs}
              source={
                _ix_9QpLxZaKs <= _stp_8QpLxZaKs
                  ? require('../assets/images/active_pagination.png')
                  : require('../assets/images/inactive_pagination.png')
              }
            />
          ))}
        </_vW_1QpLxZaKs>

        <_iMg_9tQpLxZaKs
          source={_obTT_7xQpLZaKs[_stp_8QpLxZaKs]}
          style={{ resizeMode: 'cover', marginBottom: _ht_2QpLxZaKs * 0.05 }}
        />

        <_iBg_7xQpLZaKs
          source={require('../assets/images/back_blur.png')}
          style={_st.lgB_3QpLxZaKs}
        >
          <_iMg_9tQpLxZaKs
            source={_obIM_9xQpLxZaKs[_stp_8QpLxZaKs]}
            style={{ resizeMode: 'cover' }}
          />
        </_iBg_7xQpLZaKs>

        <_vW_1QpLxZaKs>
          <_tXt_4QpLxZaKs style={_st.txS_4QpLxZaKs}>
            {_stp_8QpLxZaKs === 0
              ? 'I’m a bull who knows a lot about jokes. Bad ones won’t pass. Good ones will be remembered.'
              : _stp_8QpLxZaKs === 1
              ? 'Write a joke, read other people’s, vote honestly. Whoever gets the most votes wins. I’m all about fairness.'
              : 'Write a joke with your voice — I’ll rate it. Choose your categories, save your favorites and come back when you need a laugh.'}
          </_tXt_4QpLxZaKs>

          <_tOp_5QpLxZaKs onPress={_nxSt_5QpLxZaKs} activeOpacity={0.6}>
            <LinearGradient
              colors={_gdGr_5QpLxZaKs}
              start={_stPs_4QpLxZaKs}
              end={_enPs_3QpLxZaKs}
              style={_st.btN_6QpLxZaKs}
            >
              <_tXt_4QpLxZaKs style={_st.btT_7QpLxZaKs}>
                {_stp_8QpLxZaKs === 0
                  ? 'Next'
                  : _stp_8QpLxZaKs === 1
                  ? 'Continue'
                  : 'Start'}
              </_tXt_4QpLxZaKs>
            </LinearGradient>
          </_tOp_5QpLxZaKs>
        </_vW_1QpLxZaKs>
      </_sCv_8QpLxZaKs>
    </LinearGradient>
  );
};

const _st = _sSy_6QpLxZaKs.create({
  bgB_1QpLxZaKs: {
    width: 110,
    height: 110,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  txS_4QpLxZaKs: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 33,
    fontFamily: _rgFn_6QpLxZaKs,
    paddingHorizontal: 30,
  },
  btN_6QpLxZaKs: {
    borderRadius: 15,
    height: 64,
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    alignSelf: 'center',
  },
  btT_7QpLxZaKs: {
    color: '#000',
    fontSize: 20,
    fontFamily: _rgFn_6QpLxZaKs,
  },
  pgN_2QpLxZaKs: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
    gap: 5,
  },
  lgB_3QpLxZaKs: {
    width: 310,
    height: 310,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CrovnneBullOnboard;
