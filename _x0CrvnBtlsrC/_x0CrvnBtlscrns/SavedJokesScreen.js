import {
  useNavigation as _uNV_9xQpLTrZaKs,
  useFocusEffect as _uFE_7qPzLxVnT3mA9rKb,
} from '@react-navigation/native';
import React, {
  useCallback as _uCB_8tVmQpLxZaKs,
  useState as _uST_6mQpZtLxV8nR3aKs,
} from 'react';
import {
  View as _vW_9tVmQpLxZ7nR3aKs,
  Text as _tXt_3aKsQpLxVnZ8tRm2,
  StyleSheet as _sSy_8tVmQpLxZ7nR3aKs,
  Image as _iMg_4pLxQnZ8tVmR2aKs,
  TouchableOpacity as _tOp_7nR3aKsQpLxV8tZm,
  ScrollView as _sCv_6mQpZtLxV8nR3aKs,
  Share as _sHr_5pZtLxQnV8aKsR3m,
  useWindowDimensions as _uWD_2Rm9xQpLzT7nVaKs,
  Platform as _pLf_1VaKsQpLxT7nR9mZ2,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useStorage as _uSG_3pZtLxQnV8aKsR9m } from '../_x0CrvnBtlstrg/bullBattleContext';

const _rgF_9mZ2tVmQpLxR7nVaKs = 'OrelegaOne-Regular';
const _bgC_7nR3aKsQpLxV8tZm = '#000';
const _gdG_6mQpZtLxV8nR3aKs = [
  '#E1C352',
  '#FFF9CC',
  '#E6CE67',
  '#EDE5BC',
  '#E2C23B',
];
const _stP_5pZtLxQnV8aKsR3m = { x: 0, y: 2 };
const _enP_4pLxQnZ8tVmR2aKs = { x: 1, y: 0 };

const _cMT_2Rm9xQpLzT7nVaKs = {
  friendly: {
    title: require('../assets/images/FriendlyBull.png'),
    image: require('../assets/images/friendly_bull.png'),
  },
  smart: {
    title: require('../assets/images/SmartBull.png'),
    image: require('../assets/images/smart_bull.png'),
  },
  savage: {
    title: require('../assets/images/SavageBull.png'),
    image: require('../assets/images/savage_bull.png'),
  },
};

const SavedJokesScreen = () => {
  const _nv_9xQmTrL7pZaVnK4s = _uNV_9xQpLTrZaKs();
  const { height: _ht_2Rm9xQpLzT7nVaKs } = _uWD_2Rm9xQpLzT7nVaKs();
  const {
    saved: _sv_6mQpZtLxV8nR3aKs,
    loadSavedJokes: _ld_5pZtLxQnV8aKsR3m,
    removeSavedJoke: _rm_4pLxQnZ8tVmR2aKs,
  } = _uSG_3pZtLxQnV8aKsR9m();

  _uFE_7qPzLxVnT3mA9rKb(
    _uCB_8tVmQpLxZaKs(() => {
      _ld_5pZtLxQnV8aKsR3m();
    }, []),
  );

  if (!_sv_6mQpZtLxV8nR3aKs.length) {
    return (
      <LinearGradient colors={['#0b0525ff', '#000000ff']} style={{ flex: 1 }}>
        <_sCv_6mQpZtLxV8nR3aKs
          contentContainerStyle={[
            _q$.sC_6mQpZtLxV8nR3aKs,
            { paddingTop: _ht_2Rm9xQpLzT7nVaKs * 0.07 },
          ]}
          showsVerticalScrollIndicator={false}
        >
          <_vW_9tVmQpLxZ7nR3aKs style={[_q$.hD_7nR3aKsQpLxV8tZm]}>
            <_tOp_7nR3aKsQpLxV8tZm
              style={_q$.bK_8tVmQpLxZ7nR3aKs}
              onPress={() => _nv_9xQmTrL7pZaVnK4s.goBack()}
            >
              <_iMg_4pLxQnZ8tVmR2aKs
                source={require('../assets/icons/back_arrow.png')}
              />
            </_tOp_7nR3aKsQpLxV8tZm>

            <_tXt_3aKsQpLxVnZ8tRm2 style={_q$.hT_9mZ2tVmQpLxR7nVaKs}>
              Saved
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
                  {
                    borderRadius: 12,
                    borderWidth: 0.8,
                    borderColor: '#E6CE67',
                  },
                ]}
              />
            )}
          </_vW_9tVmQpLxZ7nR3aKs>

          <_vW_9tVmQpLxZ7nR3aKs style={_q$.eW_3pZtLxQnV8aKsR9m}>
            <_tXt_3aKsQpLxVnZ8tRm2 style={_q$.eT_4pLxQnZ8tVmR2aKs}>
              You don&apos;t have any saved jokes yet...
            </_tXt_3aKsQpLxVnZ8tRm2>
          </_vW_9tVmQpLxZ7nR3aKs>
        </_sCv_6mQpZtLxV8nR3aKs>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#0b0525ff', '#000000ff']} style={{ flex: 1 }}>
      <_sCv_6mQpZtLxV8nR3aKs
        contentContainerStyle={[
          _q$.sC_6mQpZtLxV8nR3aKs,
          { paddingTop: _ht_2Rm9xQpLzT7nVaKs * 0.07 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <_vW_9tVmQpLxZ7nR3aKs style={_q$.hD_7nR3aKsQpLxV8tZm}>
          <_tOp_7nR3aKsQpLxV8tZm
            style={_q$.bK_8tVmQpLxZ7nR3aKs}
            onPress={() => _nv_9xQmTrL7pZaVnK4s.goBack()}
          >
            <_iMg_4pLxQnZ8tVmR2aKs
              source={require('../assets/icons/back_arrow.png')}
            />
          </_tOp_7nR3aKsQpLxV8tZm>

          <_tXt_3aKsQpLxVnZ8tRm2 style={_q$.hT_9mZ2tVmQpLxR7nVaKs}>
            Saved
          </_tXt_3aKsQpLxVnZ8tRm2>

          <_iMg_4pLxQnZ8tVmR2aKs
            source={require('../assets/images/app_icon.png')}
            style={_q$.aI_2Rm9xQpLzT7nVaKs}
          />
        </_vW_9tVmQpLxZ7nR3aKs>

        {_sv_6mQpZtLxV8nR3aKs.map((item, idx) => {
          const _mt_5pZtLxQnV8aKsR3m = _cMT_2Rm9xQpLzT7nVaKs[item.category];

          return (
            <_vW_9tVmQpLxZ7nR3aKs key={idx} style={_q$.cD_6tVmQpLxZ7nR3aKs}>
              <_iMg_4pLxQnZ8tVmR2aKs
                source={_mt_5pZtLxQnV8aKsR3m.image}
                style={_q$.cB_7qPzLxVnT3mA9rKb}
              />

              <_vW_9tVmQpLxZ7nR3aKs style={_q$.cC_8tVmQpLxZ7nR3aKs}>
                <_iMg_4pLxQnZ8tVmR2aKs
                  source={_mt_5pZtLxQnV8aKsR3m.title}
                  style={{ width: 160, height: 35, resizeMode: 'contain' }}
                />

                <_tXt_3aKsQpLxVnZ8tRm2 style={_q$.cT_9mZ2tVmQpLxR7nVaKs}>
                  {item.joke}
                </_tXt_3aKsQpLxVnZ8tRm2>

                <_vW_9tVmQpLxZ7nR3aKs style={_q$.cA_1VaKsQpLxT7nR9mZ2}>
                  <_tOp_7nR3aKsQpLxV8tZm
                    activeOpacity={0.7}
                    onPress={() =>
                      _sHr_5pZtLxQnV8aKsR3m.share({ message: item.joke })
                    }
                    style={{ flex: 1 }}
                  >
                    <LinearGradient
                      colors={_gdG_6mQpZtLxV8nR3aKs}
                      style={_q$.sB_2Rm9xQpLzT7nVaKs}
                      start={_stP_5pZtLxQnV8aKsR3m}
                      end={_enP_4pLxQnZ8tVmR2aKs}
                    >
                      <_tXt_3aKsQpLxVnZ8tRm2 style={_q$.sT_3pZtLxQnV8aKsR9m}>
                        Share
                      </_tXt_3aKsQpLxVnZ8tRm2>
                    </LinearGradient>
                  </_tOp_7nR3aKsQpLxV8tZm>

                  <_tOp_7nR3aKsQpLxV8tZm
                    style={_q$.tB_4pLxQnZ8tVmR2aKs}
                    onPress={() => _rm_4pLxQnZ8tVmR2aKs(item.joke)}
                  >
                    <_iMg_4pLxQnZ8tVmR2aKs
                      source={require('../assets/icons/trash.png')}
                    />
                  </_tOp_7nR3aKsQpLxV8tZm>
                </_vW_9tVmQpLxZ7nR3aKs>
              </_vW_9tVmQpLxZ7nR3aKs>
            </_vW_9tVmQpLxZ7nR3aKs>
          );
        })}
      </_sCv_6mQpZtLxV8nR3aKs>
    </LinearGradient>
  );
};

export default SavedJokesScreen;

const _q$ = _sSy_8tVmQpLxZ7nR3aKs.create({
  cN_5pZtLxQnV8aKsR3m: {
    flex: 1,
    backgroundColor: _bgC_7nR3aKsQpLxV8tZm,
  },

  sC_6mQpZtLxV8nR3aKs: {
    alignItems: 'center',
    padding: 20,
    flexGrow: 1,
  },

  hD_7nR3aKsQpLxV8tZm: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 0.8,
    borderColor: '#E6CE67',
    borderRadius: 16,
    padding: 10,
    marginBottom: 30,
  },

  bK_8tVmQpLxZ7nR3aKs: {
    width: 56,
    height: 56,
    borderRadius: 12,
    borderWidth: 0.8,
    borderColor: '#E6CE67',
    justifyContent: 'center',
    alignItems: 'center',
  },

  hT_9mZ2tVmQpLxR7nVaKs: {
    color: '#fff',
    fontFamily: _rgF_9mZ2tVmQpLxR7nVaKs,
    fontSize: 20,
  },

  aI_2Rm9xQpLzT7nVaKs: {
    width: 56,
    height: 56,
  },

  eW_3pZtLxQnV8aKsR9m: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  eT_4pLxQnZ8tVmR2aKs: {
    color: '#fff',
    fontFamily: _rgF_9mZ2tVmQpLxR7nVaKs,
    fontSize: 20,
  },

  cD_6tVmQpLxZ7nR3aKs: {
    width: '100%',
    borderWidth: 0.8,
    borderColor: '#E6CE67',
    borderRadius: 18,
    padding: 12,
    flexDirection: 'row',
    marginBottom: 20,
  },

  cB_7qPzLxVnT3mA9rKb: {
    width: 133,
    height: 215,
    resizeMode: 'contain',
  },

  cC_8tVmQpLxZ7nR3aKs: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'center',
  },

  cT_9mZ2tVmQpLxR7nVaKs: {
    marginTop: 10,
    color: '#fff',
    fontFamily: _rgF_9mZ2tVmQpLxR7nVaKs,
    fontSize: 24,
  },

  cA_1VaKsQpLxT7nR9mZ2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
    gap: 10,
  },

  sB_2Rm9xQpLzT7nVaKs: {
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  sT_3pZtLxQnV8aKsR9m: {
    color: '#000',
    fontFamily: _rgF_9mZ2tVmQpLxR7nVaKs,
    fontSize: 16,
  },

  tB_4pLxQnZ8tVmR2aKs: {
    width: 48,
    height: 48,
    borderRadius: 14,
    borderWidth: 0.8,
    borderColor: '#E6CE67',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
