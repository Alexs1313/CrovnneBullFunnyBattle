import { useNavigation as _uNV_9xQpLTrZaKs } from '@react-navigation/native';
import React, {
  useEffect as _uEF_6mQpZtLxV8nR3aKs,
  useState as _uST_5pZtLxQnV8aKsR3m,
} from 'react';
import {
  View as _vW_9tVmQpLxZ7nR3aKs,
  Text as _tXt_3aKsQpLxVnZ8tRm2,
  StyleSheet as _sSy_8tVmQpLxZ7nR3aKs,
  Image as _iMg_4pLxQnZ8tVmR2aKs,
  TouchableOpacity as _tOp_7nR3aKsQpLxV8tZm,
  ImageBackground as _iBg_4pLxQnZ8tVmR2aKs,
  useWindowDimensions as _uWD_2Rm9xQpLzT7nVaKs,
  ScrollView as _sCv_6mQpZtLxV8nR3aKs,
  Share as _sHr_7qPzLxVnT3mA9rKb,
  Platform as _pLf_1VaKsQpLxT7nR9mZ2,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const _rgF_9mZ2tVmQpLxR7nVaKs = 'OrelegaOne-Regular';
const _bgC_7nR3aKsQpLxV8tZm = '#000';
const _gdG_6mQpZtLxV8nR3aKs = ['#FFF9CC', '#E2C23B'];
const _stP_5pZtLxQnV8aKsR3m = { x: 0, y: 0 };
const _enP_4pLxQnZ8tVmR2aKs = { x: 0, y: 1.2 };
const _bdC_2Rm9xQpLzT7nVaKs = '#E6CE67';

const _sTS_6tVmQpLxZ7nR3aKs = {
  IDLE: 'idle',
  RECORDING: 'recording',
  RESULT_BAD: 'result_bad',
  RESULT_GOOD: 'result_good',
};

const TellBullJokeScreen = () => {
  const [_st_4pLxQnZ8tVmR2aKs, _sSt_7nR3aKsQpLxV8tZm] = _uST_5pZtLxQnV8aKsR3m(
    _sTS_6tVmQpLxZ7nR3aKs.IDLE,
  );
  const [_sc_3aKsQpLxVnZ8tRm2, _sSc_9tVmQpLxZ7nR3aKs] =
    _uST_5pZtLxQnV8aKsR3m(15);
  const [_tI_6mQpZtLxV8nR3aKs, _sTI_8tVmQpLxZ7nR3aKs] =
    _uST_5pZtLxQnV8aKsR3m(null);

  const { height: _ht_2Rm9xQpLzT7nVaKs } = _uWD_2Rm9xQpLzT7nVaKs();
  const _nv_9xQmTrL7pZaVnK4s = _uNV_9xQpLTrZaKs();

  const _stRc_7qPzLxVnT3mA9rKb = () => {
    _sSt_7nR3aKsQpLxV8tZm(_sTS_6tVmQpLxZ7nR3aKs.RECORDING);
    _sSc_9tVmQpLxZ7nR3aKs(15);

    const _id_4pLxQnZ8tVmR2aKs = setInterval(() => {
      _sSc_9tVmQpLxZ7nR3aKs(prev => {
        if (prev <= 1) {
          clearInterval(_id_4pLxQnZ8tVmR2aKs);
          _sSt_7nR3aKsQpLxV8tZm(_sTS_6tVmQpLxZ7nR3aKs.RESULT_GOOD);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    _sTI_8tVmQpLxZ7nR3aKs(_id_4pLxQnZ8tVmR2aKs);
  };

  _uEF_6mQpZtLxV8nR3aKs(() => {
    if (
      _st_4pLxQnZ8tVmR2aKs !== _sTS_6tVmQpLxZ7nR3aKs.RECORDING &&
      _tI_6mQpZtLxV8nR3aKs
    ) {
      clearInterval(_tI_6mQpZtLxV8nR3aKs);
      _sTI_8tVmQpLxZ7nR3aKs(null);
    }
  }, [_st_4pLxQnZ8tVmR2aKs]);

  const _slB_9mZ2tVmQpLxR7nVaKs = () => {
    switch (_st_4pLxQnZ8tVmR2aKs) {
      case _sTS_6tVmQpLxZ7nR3aKs.RECORDING:
        return require('../assets/images/thinking_bull.png');
      case _sTS_6tVmQpLxZ7nR3aKs.RESULT_BAD:
        return require('../assets/images/bad_bull.png');
      case _sTS_6tVmQpLxZ7nR3aKs.RESULT_GOOD:
        return require('../assets/images/good_bull.png');
      default:
        return require('../assets/images/reg_bull.png');
    }
  };

  const _shRs_2Rm9xQpLzT7nVaKs = async res => {
    try {
      const _msg_7nR3aKsQpLxV8tZm =
        res === _sTS_6tVmQpLxZ7nR3aKs.RESULT_GOOD
          ? 'This is a very great joke, I expect more such jokes from you!'
          : `You could have joked better. I hope you'll succeed next time!`;

      await _sHr_7qPzLxVnT3mA9rKb.share({ message: _msg_7nR3aKsQpLxV8tZm });
    } catch (error) {
      console.error('sharing error', error);
    }
  };

  const _bmBt_6tVmQpLxZ7nR3aKs = () => {
    if (_st_4pLxQnZ8tVmR2aKs === _sTS_6tVmQpLxZ7nR3aKs.IDLE) {
      return (
        <_pBt_7qPzLxVnT3mA9rKb
          text="Start recording"
          onPress={_stRc_7qPzLxVnT3mA9rKb}
        />
      );
    }

    if (_st_4pLxQnZ8tVmR2aKs === _sTS_6tVmQpLxZ7nR3aKs.RECORDING) {
      return (
        <_pBt_7qPzLxVnT3mA9rKb
          text="Recording in progress..."
          onPress={() =>
            _sSt_7nR3aKsQpLxV8tZm(_sTS_6tVmQpLxZ7nR3aKs.RESULT_GOOD)
          }
          disabled
        />
      );
    }

    return (
      <_pBt_7qPzLxVnT3mA9rKb
        text="Share"
        onPress={() => _shRs_2Rm9xQpLzT7nVaKs(_st_4pLxQnZ8tVmR2aKs)}
      />
    );
  };

  const _rsTx_9tVmQpLxZ7nR3aKs = () => {
    switch (_st_4pLxQnZ8tVmR2aKs) {
      case _sTS_6tVmQpLxZ7nR3aKs.RESULT_BAD:
        return "You could have joked better. I hope you'll succeed next time!";
      case _sTS_6tVmQpLxZ7nR3aKs.RESULT_GOOD:
        return 'This is a very great joke, I expect more such jokes from you!';
      default:
        return '';
    }
  };

  return (
    <LinearGradient colors={['#0b0525ff', '#000000ff']} style={{ flex: 1 }}>
      <_sCv_6mQpZtLxV8nR3aKs
        contentContainerStyle={{
          alignItems: 'center',
          flexGrow: 1,
          paddingTop: _ht_2Rm9xQpLzT7nVaKs * 0.07,
          paddingBottom: 30,
        }}
      >
        <_vW_9tVmQpLxZ7nR3aKs style={_q$.hD_7nR3aKsQpLxV8tZm}>
          <_tOp_7nR3aKsQpLxV8tZm
            style={_q$.bK_8tVmQpLxZ7nR3aKs}
            onPress={() => _nv_9xQmTrL7pZaVnK4s.goBack()}
            activeOpacity={0.7}
          >
            <_iMg_4pLxQnZ8tVmR2aKs
              source={require('../assets/icons/back_arrow.png')}
            />
          </_tOp_7nR3aKsQpLxV8tZm>

          <_tXt_3aKsQpLxVnZ8tRm2 style={_q$.hT_9mZ2tVmQpLxR7nVaKs}>
            Tell a jokes
          </_tXt_3aKsQpLxVnZ8tRm2>

          {_pLf_1VaKsQpLxT7nR9mZ2.OS === 'ios' ? (
            <_iMg_4pLxQnZ8tVmR2aKs
              source={require('../assets/images/app_icon.png')}
              style={_q$.aI_2Rm9xQpLzT7nVaKs}
            />
          ) : (
            <_iMg_4pLxQnZ8tVmR2aKs
              source={require('../assets/images/icon.png')}
              style={[
                _q$.aI_2Rm9xQpLzT7nVaKs,
                { borderRadius: 12, borderWidth: 0.8, borderColor: '#E6CE67' },
              ]}
            />
          )}
        </_vW_9tVmQpLxZ7nR3aKs>

        {_st_4pLxQnZ8tVmR2aKs !== _sTS_6tVmQpLxZ7nR3aKs.RECORDING && (
          <_tXt_3aKsQpLxVnZ8tRm2
            style={[
              _q$.tT_3pZtLxQnV8aKsR9m,
              {
                marginTop: _ht_2Rm9xQpLzT7nVaKs * 0.05,
                marginBottom: _ht_2Rm9xQpLzT7nVaKs * 0.02,
              },
            ]}
          >
            {_st_4pLxQnZ8tVmR2aKs.includes('result')
              ? 'Result'
              : 'Tell a joke to the bull'}
          </_tXt_3aKsQpLxVnZ8tRm2>
        )}

        {_st_4pLxQnZ8tVmR2aKs === _sTS_6tVmQpLxZ7nR3aKs.RECORDING && (
          <_vW_9tVmQpLxZ7nR3aKs
            style={[
              _q$.tB_6mQpZtLxV8nR3aKs,
              { marginTop: _ht_2Rm9xQpLzT7nVaKs * 0.05 },
            ]}
          >
            <_iMg_4pLxQnZ8tVmR2aKs
              source={require('../assets/icons/clock.png')}
            />
            <_tXt_3aKsQpLxVnZ8tRm2 style={_q$.tX_7qPzLxVnT3mA9rKb}>
              00:{_sc_3aKsQpLxVnZ8tRm2.toString().padStart(2, '0')}
            </_tXt_3aKsQpLxVnZ8tRm2>
          </_vW_9tVmQpLxZ7nR3aKs>
        )}

        <_iBg_4pLxQnZ8tVmR2aKs
          source={require('../assets/images/back_blur.png')}
          style={_q$.bW_4pLxQnZ8tVmR2aKs}
        >
          <_iMg_4pLxQnZ8tVmR2aKs
            source={_slB_9mZ2tVmQpLxR7nVaKs()}
            style={_q$.bL_2Rm9xQpLzT7nVaKs}
          />
        </_iBg_4pLxQnZ8tVmR2aKs>

        <_tXt_3aKsQpLxVnZ8tRm2
          style={[
            _q$.rT_8tVmQpLxZ7nR3aKs,
            { marginBottom: _ht_2Rm9xQpLzT7nVaKs * 0.04 },
          ]}
        >
          {_rsTx_9tVmQpLxZ7nR3aKs()}
        </_tXt_3aKsQpLxVnZ8tRm2>

        {_bmBt_6tVmQpLxZ7nR3aKs()}
      </_sCv_6mQpZtLxV8nR3aKs>
    </LinearGradient>
  );
};

const _pBt_7qPzLxVnT3mA9rKb = ({ text, onPress, disabled }) => (
  <_tOp_7nR3aKsQpLxV8tZm
    activeOpacity={disabled ? 1 : 0.7}
    onPress={disabled ? null : onPress}
    style={{ marginTop: 30 }}
  >
    <LinearGradient
      colors={_gdG_6mQpZtLxV8nR3aKs}
      style={_q$.bT_6tVmQpLxZ7nR3aKs}
      start={_stP_5pZtLxQnV8aKsR3m}
      end={_enP_4pLxQnZ8tVmR2aKs}
    >
      {text !== 'Share' && (
        <_iMg_4pLxQnZ8tVmR2aKs
          source={require('../assets/icons/microphone.png')}
        />
      )}
      <_tXt_3aKsQpLxVnZ8tRm2 style={_q$.bTx_9mZ2tVmQpLxR7nVaKs}>
        {text}
      </_tXt_3aKsQpLxVnZ8tRm2>
    </LinearGradient>
  </_tOp_7nR3aKsQpLxV8tZm>
);

export default TellBullJokeScreen;

const _q$ = _sSy_8tVmQpLxZ7nR3aKs.create({
  mC_7nR3aKsQpLxV8tZm: {
    flex: 1,
    backgroundColor: _bgC_7nR3aKsQpLxV8tZm,
    paddingHorizontal: 20,
    alignItems: 'center',
  },

  hD_7nR3aKsQpLxV8tZm: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderWidth: 0.9,
    borderColor: _bdC_2Rm9xQpLzT7nVaKs,
    padding: 10,
    borderRadius: 15,
  },

  bK_8tVmQpLxZ7nR3aKs: {
    height: 58,
    width: 58,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 11,
    borderWidth: 0.9,
    borderColor: _bdC_2Rm9xQpLzT7nVaKs,
  },

  tB_6mQpZtLxV8nR3aKs: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 11,
    borderWidth: 0.6,
    borderColor: _bdC_2Rm9xQpLzT7nVaKs,
  },

  tX_7qPzLxVnT3mA9rKb: {
    color: '#E1C352',
    fontFamily: _rgF_9mZ2tVmQpLxR7nVaKs,
    fontSize: 16,
  },

  hT_9mZ2tVmQpLxR7nVaKs: {
    color: '#fff',
    fontFamily: _rgF_9mZ2tVmQpLxR7nVaKs,
    fontSize: 20,
  },

  aI_2Rm9xQpLzT7nVaKs: { width: 58, height: 58 },

  tT_3pZtLxQnV8aKsR9m: {
    color: '#fff',
    fontSize: 24,
    fontFamily: _rgF_9mZ2tVmQpLxR7nVaKs,
  },

  bW_4pLxQnZ8tVmR2aKs: {
    width: 290,
    height: 290,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },

  bL_2Rm9xQpLzT7nVaKs: { resizeMode: 'contain' },

  rT_8tVmQpLxZ7nR3aKs: {
    color: '#fff',
    fontFamily: _rgF_9mZ2tVmQpLxR7nVaKs,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 30,
    paddingHorizontal: 20,
  },

  bT_6tVmQpLxZ7nR3aKs: {
    width: 268,
    height: 67,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },

  bTx_9mZ2tVmQpLxR7nVaKs: {
    fontFamily: _rgF_9mZ2tVmQpLxR7nVaKs,
    fontSize: 17,
    color: '#000',
  },
});
