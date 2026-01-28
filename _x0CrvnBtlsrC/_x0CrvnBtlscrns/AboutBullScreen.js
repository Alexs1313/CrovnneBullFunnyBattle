import { useNavigation as _uNV_qpLxVnZaKsTrmR } from '@react-navigation/native';
import React from 'react';
import {
  View as _vW_tVmQpLxZrKsN,
  Text as _tXt_aKsQpLxVnZtRm,
  StyleSheet as _sSy_tZmQpLxVnRksA,
  Image as _iMg_pLxQnZtVmRksA,
  TouchableOpacity as _tOp_nRksQpLxVtZmA,
  ScrollView as _sCv_qpLxVnRksTmZa,
  Share as _sHr_pLxVnZaKsTrmQ,
  useWindowDimensions as _uWD_qpLxVnZaKsTrmR,
  Platform as _pLf_qpLxVnZaKsTrmR,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const _rgFn_qpLxVnZaKsTrmR = 'OrelegaOne-Regular';
const _bgCl_qpLxVnZaKsTrmR = '#000';
const _gdGr_qpLxVnZaKsTrmR = ['#FFF9CC', '#E2C23B'];
const _stPs_qpLxVnZaKsTrmR = { x: 0, y: 0 };
const _enPs_qpLxVnZaKsTrmR = { x: 0, y: 1.2 };

const AboutBullScreen = () => {
  const _nv_qpLxVnZaKsTrmR = _uNV_qpLxVnZaKsTrmR();
  const { height: _ht_qpLxVnZaKsTrmR } = _uWD_qpLxVnZaKsTrmR();

  const _sh_qpLxVnZaKsTrmR = async () => {
    try {
      await _sHr_pLxVnZaKsTrmQ.share({
        message:
          'Crovnne Bull Funny Battle is a fun social app for humorous competitions between friends. Write or voice your jokes, vote for the best ones, and find out the verdict of the charismatic Bull. Collect your favorite jokes, open categories, and prove that your humor is worthy of the crown.',
      });
    } catch (error) {
      console.error('Share Error', error);
    }
  };

  return (
    <LinearGradient colors={['#0b0525ff', '#000000ff']} style={{ flex: 1 }}>
      <_sCv_qpLxVnRksTmZa
        contentContainerStyle={[
          _st.s_sc,
          { paddingTop: _ht_qpLxVnZaKsTrmR * 0.07 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <_vW_tVmQpLxZrKsN style={_st.s_hd}>
          <_tOp_nRksQpLxVtZmA
            style={_st.s_bk}
            onPress={() => _nv_qpLxVnZaKsTrmR.goBack()}
          >
            <_iMg_pLxQnZtVmRksA
              source={require('../assets/icons/back_arrow.png')}
            />
          </_tOp_nRksQpLxVtZmA>

          <_tXt_aKsQpLxVnZtRm style={_st.s_tt}>About</_tXt_aKsQpLxVnZtRm>

          {_pLf_qpLxVnZaKsTrmR.OS === 'ios' ? (
            <_iMg_pLxQnZtVmRksA
              source={require('../assets/images/app_icon.png')}
              style={_st.s_ic}
            />
          ) : (
            <_iMg_pLxQnZtVmRksA
              source={require('../assets/images/icon.png')}
              style={[
                _st.s_ic,
                {
                  borderRadius: 12,
                  borderWidth: 0.8,
                  borderColor: '#E6CE67',
                },
              ]}
            />
          )}
        </_vW_tVmQpLxZrKsN>

        <_vW_tVmQpLxZrKsN style={_st.s_lg}>
          {_pLf_qpLxVnZaKsTrmR.OS === 'ios' ? (
            <_iMg_pLxQnZtVmRksA
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
            <_iMg_pLxQnZtVmRksA
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
        </_vW_tVmQpLxZrKsN>

        <_tXt_aKsQpLxVnZtRm style={_st.s_ds}>
          Crovnne Bull Funny Battle is a fun social app for humorous
          competitions between friends. Write or voice your jokes, vote for the
          best ones and find out the verdict of the charismatic Bull. Collect
          your favorite jokes, open categories and prove that your humor is
          worthy of the crown.
        </_tXt_aKsQpLxVnZtRm>

        <_tOp_nRksQpLxVtZmA activeOpacity={0.7} onPress={_sh_qpLxVnZaKsTrmR}>
          <LinearGradient
            colors={_gdGr_qpLxVnZaKsTrmR}
            start={_stPs_qpLxVnZaKsTrmR}
            end={_enPs_qpLxVnZaKsTrmR}
            style={_st.s_sb}
          >
            <_tXt_aKsQpLxVnZtRm style={_st.s_st}>Share</_tXt_aKsQpLxVnZtRm>
          </LinearGradient>
        </_tOp_nRksQpLxVtZmA>
      </_sCv_qpLxVnRksTmZa>
    </LinearGradient>
  );
};

const _st = _sSy_tZmQpLxVnRksA.create({
  s_ct: {
    flex: 1,
    backgroundColor: _bgCl_qpLxVnZaKsTrmR,
  },
  s_sc: {
    alignItems: 'center',
    padding: 20,
    flexGrow: 1,
  },
  s_hd: {
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
  s_bk: {
    width: 56,
    height: 56,
    borderRadius: 12,
    borderWidth: 0.8,
    borderColor: '#E6CE67',
    justifyContent: 'center',
    alignItems: 'center',
  },
  s_tt: {
    color: '#fff',
    fontFamily: _rgFn_qpLxVnZaKsTrmR,
    fontSize: 20,
  },
  s_ic: {
    width: 56,
    height: 56,
  },
  s_lg: {
    marginBottom: 30,
  },
  s_li: {
    resizeMode: 'cover',
  },
  s_ds: {
    color: '#fff',
    fontFamily: _rgFn_qpLxVnZaKsTrmR,
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  s_sb: {
    width: 260,
    height: 64,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  s_st: {
    color: '#000',
    fontFamily: _rgFn_qpLxVnZaKsTrmR,
    fontSize: 20,
  },
});

export default AboutBullScreen;
