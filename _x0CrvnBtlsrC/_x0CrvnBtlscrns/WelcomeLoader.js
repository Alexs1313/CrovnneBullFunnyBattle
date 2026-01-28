import React, {
  useEffect as _uEF_6mQpZtLxV8nR3aKs,
  useRef as _uRF_5pZtLxQnV8aKsR3m,
} from 'react';
import {
  View as _vW_9tVmQpLxZ7nR3aKs,
  StyleSheet as _sSy_8tVmQpLxZ7nR3aKs,
  Image as _iMg_4pLxQnZ8tVmR2aKs,
  ScrollView as _sCv_6mQpZtLxV8nR3aKs,
  ImageBackground as _iBg_4pLxQnZ8tVmR2aKs,
  Platform as _pLf_1VaKsQpLxT7nR9mZ2,
} from 'react-native';
import { WebView as _wV_7qPzLxVnT3mA9rKb } from 'react-native-webview';
import { useNavigation as _uNV_9xQmTrL7pZaVnK4s } from '@react-navigation/native';

import { bullFunnyHtmlLoader as _bHL_2Rm9xQpLzT7nVaKs } from '../_x0CrvnBtlcnsts/bullFunnyHtmlLoader';
import LinearGradient from 'react-native-linear-gradient';

const _lg_6tVmQpLxZ7nR3aKs = require('../assets/images/about_logo.png');

const _0xWlLc_7qPzLxVnT3mA9rKb = () => {
  const _nv_9xQmTrL7pZaVnK4s = _uNV_9xQmTrL7pZaVnK4s();
  const _tR_4pLxQnZ8tVmR2aKs = _uRF_5pZtLxQnV8aKsR3m(null);

  _uEF_6mQpZtLxV8nR3aKs(() => {
    _tR_4pLxQnZ8tVmR2aKs.current = setTimeout(() => {
      try {
        _nv_9xQmTrL7pZaVnK4s.replace('CrovnneBullOnboard');
        console.log('nav success!');
      } catch (err) {
        console.warn('navigate error', err);
        try {
          _nv_9xQmTrL7pZaVnK4s.navigate('CrovnneBullOnboard');
        } catch (err2) {
          console.error('failed err2', err2);
        }
      }
    }, 5000);

    return () => {
      if (_tR_4pLxQnZ8tVmR2aKs.current) {
        clearTimeout(_tR_4pLxQnZ8tVmR2aKs.current);
        _tR_4pLxQnZ8tVmR2aKs.current = null;
        console.log('[Loader] timer cleared on unmount');
      }
    };
  }, [_nv_9xQmTrL7pZaVnK4s]);

  return (
    <LinearGradient colors={['#0b0525ff', '#000000ff']} style={{ flex: 1 }}>
      <_sCv_6mQpZtLxV8nR3aKs
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <_vW_9tVmQpLxZ7nR3aKs
          style={_q$.lC_7qPzLxVnT3mA9rKb}
          accessibilityLabel="loader-screen"
        >
          <_iBg_4pLxQnZ8tVmR2aKs
            source={require('../assets/images/back_blur.png')}
            style={{
              width: 400,
              height: 400,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {_pLf_1VaKsQpLxT7nR9mZ2.OS === 'ios' ? (
              <_iMg_4pLxQnZ8tVmR2aKs
                source={_lg_6tVmQpLxZ7nR3aKs}
                style={{
                  width: 250,
                  height: 250,
                  borderRadius: 22,
                  borderWidth: 1,
                  borderColor: '#E6CE67',
                }}
              />
            ) : (
              <_iMg_4pLxQnZ8tVmR2aKs
                source={require('../assets/images/icon.png')}
                style={{ width: 250, height: 250, borderRadius: 42 }}
              />
            )}
          </_iBg_4pLxQnZ8tVmR2aKs>
        </_vW_9tVmQpLxZ7nR3aKs>

        <_vW_9tVmQpLxZ7nR3aKs
          style={{
            flex: 1,
            position: 'absolute',
            bottom: 20,
            alignSelf: 'center',
          }}
        >
          <_wV_7qPzLxVnT3mA9rKb
            originWhitelist={['*']}
            source={{ html: _bHL_2Rm9xQpLzT7nVaKs }}
            style={_q$.wV_9xQmTrL7pZaVnK4s}
            scrollEnabled={false}
          />
        </_vW_9tVmQpLxZ7nR3aKs>
      </_sCv_6mQpZtLxV8nR3aKs>
    </LinearGradient>
  );
};

const _q$ = _sSy_8tVmQpLxZ7nR3aKs.create({
  lC_7qPzLxVnT3mA9rKb: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 650,
  },
  wV_9xQmTrL7pZaVnK4s: {
    width: 360,
    height: 180,
    backgroundColor: 'transparent',
  },
});

export default _0xWlLc_7qPzLxVnT3mA9rKb;
