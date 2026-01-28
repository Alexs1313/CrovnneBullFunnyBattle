import { useNavigation as _uNV_9xQpLTrZaKs } from '@react-navigation/native';
import React, { useState as _uST_6mQpZtLxV8nR3aKs } from 'react';
import {
  View as _vW_9tVmQpLxZ7nR3aKs,
  Text as _tXt_3aKsQpLxVnZ8tRm2,
  StyleSheet as _sSy_8tVmQpLxZ7nR3aKs,
  Image as _iMg_4pLxQnZ8tVmR2aKs,
  TouchableOpacity as _tOp_7nR3aKsQpLxV8tZm,
  ImageBackground as _iBg_4pLxQnZ8tVmR2aKs,
  ScrollView as _sCv_6mQpZtLxV8nR3aKs,
  Share as _sHr_5pZtLxQnV8aKsR3m,
  useWindowDimensions as _uWD_2Rm9xQpLzT7nVaKs,
  Platform as _pLf_1VaKsQpLxT7nR9mZ2,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { jokesCategories as _jkC_7qPzLxVnT3mA9rKb } from '../_x0CrvnBtldt/jokesCategories';

const _rgF_9mZ2tVmQpLxR7nVaKs = 'OrelegaOne-Regular';
const _bgC_7nR3aKsQpLxV8tZm = '#000';
const _gdG_6mQpZtLxV8nR3aKs = ['#FFF9CC', '#E2C23B'];
const _stP_5pZtLxQnV8aKsR3m = { x: 0, y: 0 };
const _enP_4pLxQnZ8tVmR2aKs = { x: 0, y: 1.2 };
const _bdC_2Rm9xQpLzT7nVaKs = '#E6CE67';

const SelectionOfJokesScreen = () => {
  const _nv_9xQmTrL7pZaVnK4s = _uNV_9xQpLTrZaKs();
  const [_sv_6mQpZtLxV8nR3aKs, _sSv_5pZtLxQnV8aKsR3m] =
    _uST_6mQpZtLxV8nR3aKs(false);
  const [_ix_4pLxQnZ8tVmR2aKs, _sIx_3pZtLxQnV8aKsR9m] =
    _uST_6mQpZtLxV8nR3aKs(0);
  const [_sj_2Rm9xQpLzT7nVaKs, _sSj_7nR3aKsQpLxV8tZm] =
    _uST_6mQpZtLxV8nR3aKs(null);
  const { height: _ht_1VaKsQpLxT7nR9mZ2 } = _uWD_2Rm9xQpLzT7nVaKs();

  const _ct_9mZ2tVmQpLxR7nVaKs = _jkC_7qPzLxVnT3mA9rKb[_ix_4pLxQnZ8tVmR2aKs];

  const _chCt_6mQpZtLxV8nR3aKs = async () => {
    try {
      const _rJ_5pZtLxQnV8aKsR3m =
        _ct_9mZ2tVmQpLxR7nVaKs.jokes[
          Math.floor(Math.random() * _ct_9mZ2tVmQpLxR7nVaKs.jokes.length)
        ];

      _sSj_7nR3aKsQpLxV8tZm(_rJ_5pZtLxQnV8aKsR3m);

      const _st_4pLxQnZ8tVmR2aKs = await AsyncStorage.getItem('saved_jokes');
      const _svJ_3pZtLxQnV8aKsR9m = _st_4pLxQnZ8tVmR2aKs
        ? JSON.parse(_st_4pLxQnZ8tVmR2aKs)
        : [];

      const _ex_2Rm9xQpLzT7nVaKs = _svJ_3pZtLxQnV8aKsR9m.some(
        it => it.joke === _rJ_5pZtLxQnV8aKsR3m,
      );
      _sSv_5pZtLxQnV8aKsR3m(_ex_2Rm9xQpLzT7nVaKs);

      console.log('selected');
    } catch (error) {
      console.error('category error', error);
    }
  };

  const _tgSv_8tVmQpLxZ7nR3aKs = async () => {
    try {
      const _st_4pLxQnZ8tVmR2aKs = await AsyncStorage.getItem('saved_jokes');
      const _svJ_3pZtLxQnV8aKsR9m = _st_4pLxQnZ8tVmR2aKs
        ? JSON.parse(_st_4pLxQnZ8tVmR2aKs)
        : [];

      const _ex_2Rm9xQpLzT7nVaKs = _svJ_3pZtLxQnV8aKsR9m.some(
        it => it.joke === _sj_2Rm9xQpLzT7nVaKs,
      );

      if (_ex_2Rm9xQpLzT7nVaKs) {
        const _up_7nR3aKsQpLxV8tZm = _svJ_3pZtLxQnV8aKsR9m.filter(
          it => it.joke !== _sj_2Rm9xQpLzT7nVaKs,
        );
        await AsyncStorage.setItem(
          'saved_jokes',
          JSON.stringify(_up_7nR3aKsQpLxV8tZm),
        );
        _sSv_5pZtLxQnV8aKsR3m(false);

        console.log('deleted');
      } else {
        const _nw_9xQmTrL7pZaVnK4s = {
          joke: _sj_2Rm9xQpLzT7nVaKs,
          category: _ct_9mZ2tVmQpLxR7nVaKs.id,
          date: Date.now(),
        };
        const _up_7nR3aKsQpLxV8tZm = [
          ..._svJ_3pZtLxQnV8aKsR9m,
          _nw_9xQmTrL7pZaVnK4s,
        ];
        await AsyncStorage.setItem(
          'saved_jokes',
          JSON.stringify(_up_7nR3aKsQpLxV8tZm),
        );
        _sSv_5pZtLxQnV8aKsR3m(true);

        console.log('saved');
      }
    } catch (error) {
      console.error('Error toggling joke:', error);
    }
  };

  const _nx_6tVmQpLxZ7nR3aKs = () =>
    _sIx_3pZtLxQnV8aKsR9m(
      (_ix_4pLxQnZ8tVmR2aKs + 1) % _jkC_7qPzLxVnT3mA9rKb.length,
    );

  const _pv_4pLxQnZ8tVmR2aKs = () =>
    _sIx_3pZtLxQnV8aKsR9m(
      (_ix_4pLxQnZ8tVmR2aKs - 1 + _jkC_7qPzLxVnT3mA9rKb.length) %
        _jkC_7qPzLxVnT3mA9rKb.length,
    );

  return (
    <LinearGradient colors={['#0b0525ff', '#000000ff']} style={{ flex: 1 }}>
      <_sCv_6mQpZtLxV8nR3aKs
        contentContainerStyle={[
          _q$.sC_6mQpZtLxV8nR3aKs,
          { paddingTop: _ht_1VaKsQpLxT7nR9mZ2 * 0.07 },
        ]}
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
            Selection of jokes
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

        {!_sj_2Rm9xQpLzT7nVaKs ? (
          <>
            <_tXt_3aKsQpLxVnZ8tRm2
              style={[
                _q$.tT_3pZtLxQnV8aKsR9m,
                { marginTop: _ht_1VaKsQpLxT7nR9mZ2 * 0.04 },
              ]}
            >
              Choose a category
            </_tXt_3aKsQpLxVnZ8tRm2>

            <_iBg_4pLxQnZ8tVmR2aKs
              source={require('../assets/images/back_blur.png')}
              style={[
                _q$.bW_4pLxQnZ8tVmR2aKs,
                { marginTop: _ht_1VaKsQpLxT7nR9mZ2 * 0.1 },
              ]}
            >
              <_iMg_4pLxQnZ8tVmR2aKs source={_ct_9mZ2tVmQpLxR7nVaKs.image} />
            </_iBg_4pLxQnZ8tVmR2aKs>

            <_iMg_4pLxQnZ8tVmR2aKs
              source={_ct_9mZ2tVmQpLxR7nVaKs.title}
              style={{ marginTop: 20 }}
            />
            <_tXt_3aKsQpLxVnZ8tRm2 style={_q$.dS_6mQpZtLxV8nR3aKs}>
              {_ct_9mZ2tVmQpLxR7nVaKs.description}
            </_tXt_3aKsQpLxVnZ8tRm2>

            <_vW_9tVmQpLxZ7nR3aKs style={_q$.bBW_7nR3aKsQpLxV8tZm}>
              <_tOp_7nR3aKsQpLxV8tZm
                style={_q$.aB_8tVmQpLxZ7nR3aKs}
                onPress={_pv_4pLxQnZ8tVmR2aKs}
              >
                <_iMg_4pLxQnZ8tVmR2aKs
                  source={require('../assets/icons/back_arrow.png')}
                />
              </_tOp_7nR3aKsQpLxV8tZm>

              <_tOp_7nR3aKsQpLxV8tZm
                activeOpacity={0.7}
                onPress={_chCt_6mQpZtLxV8nR3aKs}
                style={{ flex: 1 }}
              >
                <LinearGradient
                  colors={_gdG_6mQpZtLxV8nR3aKs}
                  start={_stP_5pZtLxQnV8aKsR3m}
                  end={_enP_4pLxQnZ8tVmR2aKs}
                  style={_q$.cB_9mZ2tVmQpLxR7nVaKs}
                >
                  <_tXt_3aKsQpLxVnZ8tRm2 style={_q$.cT_2Rm9xQpLzT7nVaKs}>
                    Choose
                  </_tXt_3aKsQpLxVnZ8tRm2>
                </LinearGradient>
              </_tOp_7nR3aKsQpLxV8tZm>

              <_tOp_7nR3aKsQpLxV8tZm
                style={_q$.aB_8tVmQpLxZ7nR3aKs}
                onPress={_nx_6tVmQpLxZ7nR3aKs}
              >
                <_iMg_4pLxQnZ8tVmR2aKs
                  source={require('../assets/icons/arr_right.png')}
                />
              </_tOp_7nR3aKsQpLxV8tZm>
            </_vW_9tVmQpLxZ7nR3aKs>
          </>
        ) : (
          <>
            <_iBg_4pLxQnZ8tVmR2aKs
              source={require('../assets/images/back_blur.png')}
              style={[
                _q$.bW_4pLxQnZ8tVmR2aKs,
                { marginTop: _ht_1VaKsQpLxT7nR9mZ2 * 0.1 },
              ]}
            >
              <_iMg_4pLxQnZ8tVmR2aKs source={_ct_9mZ2tVmQpLxR7nVaKs.image} />
            </_iBg_4pLxQnZ8tVmR2aKs>

            <_iMg_4pLxQnZ8tVmR2aKs
              source={_ct_9mZ2tVmQpLxR7nVaKs.title}
              style={{ marginTop: 30 }}
            />
            <_tXt_3aKsQpLxVnZ8tRm2 style={_q$.jT_1VaKsQpLxT7nR9mZ2}>
              {_sj_2Rm9xQpLzT7nVaKs}
            </_tXt_3aKsQpLxVnZ8tRm2>

            <_vW_9tVmQpLxZ7nR3aKs style={_q$.bR_3pZtLxQnV8aKsR9m}>
              <_tOp_7nR3aKsQpLxV8tZm
                activeOpacity={0.7}
                style={{ width: '60%' }}
                onPress={() =>
                  _sHr_5pZtLxQnV8aKsR3m.share({ message: _sj_2Rm9xQpLzT7nVaKs })
                }
              >
                <LinearGradient
                  colors={_gdG_6mQpZtLxV8nR3aKs}
                  start={_stP_5pZtLxQnV8aKsR3m}
                  end={_enP_4pLxQnZ8tVmR2aKs}
                  style={_q$.sB_6tVmQpLxZ7nR3aKs}
                >
                  <_tXt_3aKsQpLxVnZ8tRm2 style={_q$.cT_2Rm9xQpLzT7nVaKs}>
                    Share
                  </_tXt_3aKsQpLxVnZ8tRm2>
                </LinearGradient>
              </_tOp_7nR3aKsQpLxV8tZm>

              <_tOp_7nR3aKsQpLxV8tZm
                style={_q$.sIB_7qPzLxVnT3mA9rKb}
                onPress={_tgSv_8tVmQpLxZ7nR3aKs}
                activeOpacity={0.7}
              >
                {_sv_6mQpZtLxV8nR3aKs ? (
                  <_iMg_4pLxQnZ8tVmR2aKs
                    source={require('../assets/icons/bookmark_saved.png')}
                  />
                ) : (
                  <_iMg_4pLxQnZ8tVmR2aKs
                    source={require('../assets/icons/bookmark.png')}
                  />
                )}
              </_tOp_7nR3aKsQpLxV8tZm>
            </_vW_9tVmQpLxZ7nR3aKs>
          </>
        )}
      </_sCv_6mQpZtLxV8nR3aKs>
    </LinearGradient>
  );
};

export default SelectionOfJokesScreen;

const _q$ = _sSy_8tVmQpLxZ7nR3aKs.create({
  cN_5pZtLxQnV8aKsR3m: { flex: 1, backgroundColor: _bgC_7nR3aKsQpLxV8tZm },

  sC_6mQpZtLxV8nR3aKs: { alignItems: 'center', padding: 20 },

  tT_3pZtLxQnV8aKsR9m: {
    color: '#fff',
    fontFamily: _rgF_9mZ2tVmQpLxR7nVaKs,
    fontSize: 24,
    marginBottom: 20,
  },

  hD_7nR3aKsQpLxV8tZm: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 0.8,
    borderColor: _bdC_2Rm9xQpLzT7nVaKs,
    borderRadius: 16,
    padding: 10,
  },

  bK_8tVmQpLxZ7nR3aKs: {
    width: 56,
    height: 56,
    borderRadius: 12,
    borderWidth: 0.8,
    borderColor: _bdC_2Rm9xQpLzT7nVaKs,
    justifyContent: 'center',
    alignItems: 'center',
  },

  hT_9mZ2tVmQpLxR7nVaKs: {
    color: '#fff',
    fontFamily: _rgF_9mZ2tVmQpLxR7nVaKs,
    fontSize: 20,
  },

  aI_2Rm9xQpLzT7nVaKs: { width: 56, height: 56 },

  bW_4pLxQnZ8tVmR2aKs: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },

  dS_6mQpZtLxV8nR3aKs: {
    marginTop: 27,
    color: '#fff',
    fontFamily: _rgF_9mZ2tVmQpLxR7nVaKs,
    fontSize: 15,
    textAlign: 'center',
    paddingHorizontal: 24,
  },

  bBW_7nR3aKsQpLxV8tZm: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    gap: 9,
    justifyContent: 'center',
  },

  aB_8tVmQpLxZ7nR3aKs: {
    width: 57,
    height: 57,
    borderRadius: 13,
    borderWidth: 0.9,
    borderColor: _bdC_2Rm9xQpLzT7nVaKs,
    justifyContent: 'center',
    alignItems: 'center',
  },

  cB_9mZ2tVmQpLxR7nVaKs: {
    height: 64,
    flex: 1,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  cT_2Rm9xQpLzT7nVaKs: {
    color: '#000',
    fontFamily: _rgF_9mZ2tVmQpLxR7nVaKs,
    fontSize: 20,
  },

  jT_1VaKsQpLxT7nR9mZ2: {
    marginTop: 40,
    color: '#fff',
    fontFamily: _rgF_9mZ2tVmQpLxR7nVaKs,
    fontSize: 20,
    textAlign: 'center',
    paddingHorizontal: 24,
  },

  bR_3pZtLxQnV8aKsR9m: {
    flexDirection: 'row',
    marginTop: 50,
    gap: 14,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  sB_6tVmQpLxZ7nR3aKs: {
    height: 64,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  sIB_7qPzLxVnT3mA9rKb: {
    width: 56,
    height: 56,
    borderRadius: 12,
    borderWidth: 0.8,
    borderColor: _bdC_2Rm9xQpLzT7nVaKs,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
