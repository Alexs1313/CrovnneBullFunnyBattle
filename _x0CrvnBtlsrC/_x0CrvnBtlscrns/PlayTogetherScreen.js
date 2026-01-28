import { useNavigation as _uNV_9xQpLTrZaKs } from '@react-navigation/native';
import React, { useState as _uST_8QpLxZaKs } from 'react';
import {
  View as _vW_1QpLxZaKs,
  Text as _tXt_2QpLxZaKs,
  StyleSheet as _sSy_3QpLxZaKs,
  Image as _iMg_4QpLxZaKs,
  TouchableOpacity as _tOp_5QpLxZaKs,
  ScrollView as _sCv_6QpLxZaKs,
  TextInput as _tIp_7QpLxZaKs,
  Share as _sHr_8QpLxZaKs,
  Modal as _mDl_9QpLxZaKs,
  useWindowDimensions as _uWD_7ZaKsQpLx,
  Alert as _aLt_6ZaKsQpLx,
  Platform as _pLf_5ZaKsQpLx,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// consts
const _rgF_4ZaKsQpLx = 'OrelegaOne-Regular';
const _bgC_3ZaKsQpLx = '#000';
const _gdG_2ZaKsQpLx = ['#FFF9CC', '#E2C23B'];
const _stP_1ZaKsQpLx = { x: 0, y: 0 };
const _enP_9ZaKsQpLx = { x: 0, y: 1.2 };
const _brC_8ZaKsQpLx = '#E6CE67';
const _adB_7ZaKsQpLx = require('../assets/images/addButton.png');

// avatars / winner skins
const _aVS_6ZaKsQpLx = [
  { id: 0, image: require('../assets/images/bull_avatar_1.png') },
  { id: 1, image: require('../assets/images/bull_avatar_2.png') },
  { id: 2, image: require('../assets/images/bull_avatar_3.png') },
  { id: 3, image: require('../assets/images/bull_avatar_4.png') },
  { id: 4, image: require('../assets/images/bull_avatar_5.png') },
];

const _wSK_5ZaKsQpLx = {
  0: require('../assets/images/bull_winner_1.png'),
  1: require('../assets/images/bull_winner_2.png'),
  2: require('../assets/images/bull_winner_3.png'),
  3: require('../assets/images/bull_winner_4.png'),
  4: require('../assets/images/bull_winner_5.png'),
};

const _sTG_4ZaKsQpLx = {
  ENTER: 'ENTER',
  MOVE: 'MOVE',
  VOTING: 'VOTING',
  RESULT: 'RESULT',
};

const PlayTogetherScreen = () => {
  const _nv_2ZaKsQpLx = _uNV_9xQpLTrZaKs();
  const { height: _ht_1ZaKsQpLx } = _uWD_7ZaKsQpLx();

  const [_sg_9ZaKsQpLx, _sSg_8ZaKsQpLx] = _uST_8QpLxZaKs(_sTG_4ZaKsQpLx.ENTER);
  const [_pl_7ZaKsQpLx, _sPl_6ZaKsQpLx] = _uST_8QpLxZaKs([
    { name: '', avatarId: null, joke: '', votes: 0 },
    { name: '', avatarId: null, joke: '', votes: 0 },
  ]);

  const [_cr_5ZaKsQpLx, _sCr_4ZaKsQpLx] = _uST_8QpLxZaKs(0);
  const [_apF_3ZaKsQpLx, _sApF_2ZaKsQpLx] = _uST_8QpLxZaKs(null);
  const [_vtP_1ZaKsQpLx, _sVtP_9ZaKsQpLx] = _uST_8QpLxZaKs(0);
  const [_slV_8ZaKsQpLx, _sSlV_7ZaKsQpLx] = _uST_8QpLxZaKs(null);

  const _usA_6ZaKsQpLx = _pl_7ZaKsQpLx
    .map(p => p.avatarId)
    .filter(v => v !== null);

  const _wn_5ZaKsQpLx = [..._pl_7ZaKsQpLx].sort(
    (a, b) => b.votes - a.votes,
  )[0] || {
    name: '',
    avatarId: 0,
    joke: '',
    votes: 0,
  };

  const _wnSk_4ZaKsQpLx = _wSK_5ZaKsQpLx[_wn_5ZaKsQpLx.avatarId];

  const _cnSt_3ZaKsQpLx =
    _pl_7ZaKsQpLx.length >= 2 && _pl_7ZaKsQpLx.every(p => p.name.trim());

  const _hdSt_2ZaKsQpLx = () => {
    const _alAv_1ZaKsQpLx = _pl_7ZaKsQpLx.every(p => p.avatarId !== null);

    if (!_alAv_1ZaKsQpLx) {
      _aLt_6ZaKsQpLx.alert(
        'Choose profile',
        'Each player must choose an profile before starting the game.',
      );
      return;
    }

    _sSg_8ZaKsQpLx(_sTG_4ZaKsQpLx.MOVE);
  };

  const _hdVt_9ZaKsQpLx = () => {
    if (_slV_8ZaKsQpLx !== null) {
      const _nx_8ZaKsQpLx = [..._pl_7ZaKsQpLx];
      _nx_8ZaKsQpLx[_slV_8ZaKsQpLx].votes += 1;
      _sPl_6ZaKsQpLx(_nx_8ZaKsQpLx);
    }

    _sSlV_7ZaKsQpLx(null);

    if (_vtP_1ZaKsQpLx < _pl_7ZaKsQpLx.length - 1) {
      _sVtP_9ZaKsQpLx(p => p + 1);
    } else {
      _sSg_8ZaKsQpLx(_sTG_4ZaKsQpLx.RESULT);
    }
  };

  const _shRs_7ZaKsQpLx = () => {
    _sHr_8QpLxZaKs.share({
      message: `${_wn_5ZaKsQpLx.name} wins!\n\n${_wn_5ZaKsQpLx.joke}`,
    });
  };

  const _BhHd_6ZaKsQpLx = () => (
    <_vW_1QpLxZaKs style={[_s$.hD_9ZaKsQpLx]}>
      <_tOp_5QpLxZaKs
        style={_s$.bK_8ZaKsQpLx}
        onPress={() => _nv_2ZaKsQpLx.goBack()}
      >
        <_iMg_4QpLxZaKs source={require('../assets/icons/back_arrow.png')} />
      </_tOp_5QpLxZaKs>

      <_tXt_2QpLxZaKs style={_s$.hT_7ZaKsQpLx}>Play together</_tXt_2QpLxZaKs>

      {_pLf_5ZaKsQpLx.OS === 'ios' ? (
        <_iMg_4QpLxZaKs
          source={require('../assets/images/app_icon.png')}
          style={_s$.aI_6ZaKsQpLx}
        />
      ) : (
        <_iMg_4QpLxZaKs
          source={require('../assets/images/icon.png')}
          style={[
            _s$.aI_6ZaKsQpLx,
            { borderRadius: 12, borderWidth: 0.8, borderColor: _brC_8ZaKsQpLx },
          ]}
        />
      )}
    </_vW_1QpLxZaKs>
  );

  if (_sg_9ZaKsQpLx === _sTG_4ZaKsQpLx.ENTER) {
    return (
      <LinearGradient colors={['#0b0525ff', '#000000ff']} style={{ flex: 1 }}>
        <_sCv_6QpLxZaKs
          contentContainerStyle={[
            _s$.sC_1ZaKsQpLx,
            { paddingTop: _ht_1ZaKsQpLx * 0.07 },
          ]}
        >
          <_BhHd_6ZaKsQpLx />
          <_tXt_2QpLxZaKs style={_s$.tT_2ZaKsQpLx}>Enter data</_tXt_2QpLxZaKs>

          {_pl_7ZaKsQpLx.map((p, i) => (
            <_vW_1QpLxZaKs key={i} style={_s$.pR_3ZaKsQpLx}>
              <_tOp_5QpLxZaKs
                style={_s$.aB_4ZaKsQpLx}
                onPress={() => _sApF_2ZaKsQpLx(i)}
              >
                {p.avatarId !== null ? (
                  <_iMg_4QpLxZaKs
                    source={_aVS_6ZaKsQpLx[p.avatarId].image}
                    style={{ width: 29, height: 49, resizeMode: 'contain' }}
                  />
                ) : (
                  <_iMg_4QpLxZaKs
                    source={require('../assets/icons/user_icon.png')}
                  />
                )}
              </_tOp_5QpLxZaKs>

              <_tIp_7QpLxZaKs
                placeholder={`Player ${i + 1}`}
                placeholderTextColor="#FFFFFF"
                style={_s$.iP_5ZaKsQpLx}
                maxLength={14}
                value={p.name}
                onChangeText={t => {
                  const _cp_4ZaKsQpLx = [..._pl_7ZaKsQpLx];
                  _cp_4ZaKsQpLx[i].name = t;
                  _sPl_6ZaKsQpLx(_cp_4ZaKsQpLx);
                }}
              />
            </_vW_1QpLxZaKs>
          ))}

          {_pl_7ZaKsQpLx.length < 5 && (
            <_tOp_5QpLxZaKs
              style={{ marginTop: _ht_1ZaKsQpLx * 0.03 }}
              onPress={() =>
                _sPl_6ZaKsQpLx([
                  ..._pl_7ZaKsQpLx,
                  { name: '', avatarId: null, joke: '', votes: 0 },
                ])
              }
            >
              <_iMg_4QpLxZaKs source={_adB_7ZaKsQpLx} />
            </_tOp_5QpLxZaKs>
          )}

          {_cnSt_3ZaKsQpLx && (
            <_tOp_5QpLxZaKs
              onPress={_hdSt_2ZaKsQpLx}
              activeOpacity={0.7}
              style={{
                width: '100%',
                alignItems: 'center',
                marginTop: _ht_1ZaKsQpLx * 0.05,
              }}
            >
              <LinearGradient colors={_gdG_2ZaKsQpLx} style={_s$.mB_6ZaKsQpLx}>
                <_tXt_2QpLxZaKs style={_s$.bT_7ZaKsQpLx}>Start</_tXt_2QpLxZaKs>
              </LinearGradient>
            </_tOp_5QpLxZaKs>
          )}

          <_mDl_9QpLxZaKs visible={_apF_3ZaKsQpLx !== null} transparent>
            <_vW_1QpLxZaKs style={_s$.mG_8ZaKsQpLx}>
              <_vW_1QpLxZaKs style={_s$.mD_9ZaKsQpLx}>
                <_tXt_2QpLxZaKs style={_s$.mT_1ZaKsQpLx}>
                  Choose a profile
                </_tXt_2QpLxZaKs>

                <_vW_1QpLxZaKs style={_s$.aG_2ZaKsQpLx}>
                  {_aVS_6ZaKsQpLx.map(a => {
                    const _isU_3ZaKsQpLx = _usA_6ZaKsQpLx.includes(a.id);

                    return (
                      <_tOp_5QpLxZaKs
                        key={a.id}
                        disabled={_isU_3ZaKsQpLx}
                        style={[
                          _s$.aP_4ZaKsQpLx,
                          _isU_3ZaKsQpLx && _s$.aD_5ZaKsQpLx,
                        ]}
                        onPress={() => {
                          const _cp_6ZaKsQpLx = [..._pl_7ZaKsQpLx];
                          _cp_6ZaKsQpLx[_apF_3ZaKsQpLx].avatarId = a.id;
                          _sPl_6ZaKsQpLx(_cp_6ZaKsQpLx);
                          _sApF_2ZaKsQpLx(null);
                        }}
                      >
                        <_iMg_4QpLxZaKs
                          source={a.image}
                          style={{ opacity: _isU_3ZaKsQpLx ? 0.4 : 1 }}
                        />
                      </_tOp_5QpLxZaKs>
                    );
                  })}
                </_vW_1QpLxZaKs>

                <_tOp_5QpLxZaKs
                  style={_s$.cL_6ZaKsQpLx}
                  onPress={() => _sApF_2ZaKsQpLx(null)}
                >
                  <_iMg_4QpLxZaKs
                    source={require('../assets/icons/close.png')}
                  />
                </_tOp_5QpLxZaKs>
              </_vW_1QpLxZaKs>
            </_vW_1QpLxZaKs>
          </_mDl_9QpLxZaKs>
        </_sCv_6QpLxZaKs>
      </LinearGradient>
    );
  }

  if (_sg_9ZaKsQpLx === _sTG_4ZaKsQpLx.MOVE) {
    const _plr_7ZaKsQpLx = _pl_7ZaKsQpLx[_cr_5ZaKsQpLx];

    return (
      <LinearGradient colors={['#0b0525ff', '#000000ff']} style={{ flex: 1 }}>
        <_sCv_6QpLxZaKs
          contentContainerStyle={[
            _s$.sC_1ZaKsQpLx,
            { paddingTop: _ht_1ZaKsQpLx * 0.07 },
          ]}
        >
          <_BhHd_6ZaKsQpLx />
          <_tXt_2QpLxZaKs style={_s$.tT_2ZaKsQpLx}>
            Player&apos;s move
          </_tXt_2QpLxZaKs>

          <_vW_1QpLxZaKs style={_s$.cP_7ZaKsQpLx}>
            <_vW_1QpLxZaKs style={_s$.aM_8ZaKsQpLx}>
              <_iMg_4QpLxZaKs
                source={_aVS_6ZaKsQpLx[_plr_7ZaKsQpLx.avatarId].image}
                style={_s$.aV_9ZaKsQpLx}
              />
            </_vW_1QpLxZaKs>

            <_vW_1QpLxZaKs style={_s$.nB_1ZaKsQpLx}>
              <_tXt_2QpLxZaKs style={_s$.pN_2ZaKsQpLx}>
                {_plr_7ZaKsQpLx.name}
              </_tXt_2QpLxZaKs>
            </_vW_1QpLxZaKs>
          </_vW_1QpLxZaKs>

          <_tIp_7QpLxZaKs
            multiline
            placeholder="Write a joke"
            placeholderTextColor="#FFFFFF"
            style={_s$.jI_3ZaKsQpLx}
            textAlignVertical="top"
            value={_plr_7ZaKsQpLx.joke}
            onChangeText={t => {
              const _cp_4ZaKsQpLx = [..._pl_7ZaKsQpLx];
              _cp_4ZaKsQpLx[_cr_5ZaKsQpLx].joke = t;
              _sPl_6ZaKsQpLx(_cp_4ZaKsQpLx);
            }}
          />

          <_tOp_5QpLxZaKs
            style={{ width: '100%', alignItems: 'center' }}
            activeOpacity={0.7}
            disabled={!_plr_7ZaKsQpLx.joke.trim()}
            onPress={() => {
              if (_cr_5ZaKsQpLx < _pl_7ZaKsQpLx.length - 1) {
                _sCr_4ZaKsQpLx(c => c + 1);
              } else {
                _sSg_8ZaKsQpLx(_sTG_4ZaKsQpLx.VOTING);
              }
            }}
          >
            <LinearGradient
              colors={_gdG_2ZaKsQpLx}
              style={_s$.mB_6ZaKsQpLx}
              start={_stP_1ZaKsQpLx}
              end={_enP_9ZaKsQpLx}
            >
              <_tXt_2QpLxZaKs style={_s$.bT_7ZaKsQpLx}>
                {_cr_5ZaKsQpLx === _pl_7ZaKsQpLx.length - 1
                  ? 'Voting'
                  : 'Next player'}
              </_tXt_2QpLxZaKs>
            </LinearGradient>
          </_tOp_5QpLxZaKs>
        </_sCv_6QpLxZaKs>
      </LinearGradient>
    );
  }

  if (_sg_9ZaKsQpLx === _sTG_4ZaKsQpLx.VOTING) {
    const _vtr_4ZaKsQpLx = _pl_7ZaKsQpLx[_vtP_1ZaKsQpLx];

    return (
      <LinearGradient colors={['#0b0525ff', '#000000ff']} style={{ flex: 1 }}>
        <_sCv_6QpLxZaKs
          contentContainerStyle={[
            _s$.sC_1ZaKsQpLx,
            { paddingTop: _ht_1ZaKsQpLx * 0.07 },
          ]}
        >
          <_BhHd_6ZaKsQpLx />
          <_tXt_2QpLxZaKs style={_s$.tT_2ZaKsQpLx}>
            Player votes:
          </_tXt_2QpLxZaKs>

          <_vW_1QpLxZaKs style={_s$.cP_7ZaKsQpLx}>
            <_vW_1QpLxZaKs style={_s$.aM_8ZaKsQpLx}>
              <_iMg_4QpLxZaKs
                source={_aVS_6ZaKsQpLx[_vtr_4ZaKsQpLx.avatarId].image}
                style={_s$.aV_9ZaKsQpLx}
              />
            </_vW_1QpLxZaKs>

            <_vW_1QpLxZaKs style={_s$.nB_1ZaKsQpLx}>
              <_tXt_2QpLxZaKs style={_s$.pN_2ZaKsQpLx}>
                {_vtr_4ZaKsQpLx.name}
              </_tXt_2QpLxZaKs>
            </_vW_1QpLxZaKs>
          </_vW_1QpLxZaKs>

          <_vW_1QpLxZaKs style={_s$.gD_5ZaKsQpLx}>
            {_pl_7ZaKsQpLx.map((p, i) => (
              <_tOp_5QpLxZaKs
                activeOpacity={0.7}
                key={i}
                style={[
                  _s$.vC_6ZaKsQpLx,
                  _slV_8ZaKsQpLx === i && _s$.vS_7ZaKsQpLx,
                ]}
                onPress={() => _sSlV_7ZaKsQpLx(i)}
              >
                <_tXt_2QpLxZaKs style={_s$.vT_8ZaKsQpLx}>
                  {p.joke}
                </_tXt_2QpLxZaKs>
              </_tOp_5QpLxZaKs>
            ))}
          </_vW_1QpLxZaKs>

          <_tOp_5QpLxZaKs
            style={{ width: '100%', alignItems: 'center', marginTop: 30 }}
            activeOpacity={0.7}
            disabled={_slV_8ZaKsQpLx === null}
            onPress={_hdVt_9ZaKsQpLx}
          >
            <LinearGradient
              colors={_gdG_2ZaKsQpLx}
              style={_s$.mB_6ZaKsQpLx}
              start={_stP_1ZaKsQpLx}
              end={_enP_9ZaKsQpLx}
            >
              <_tXt_2QpLxZaKs style={_s$.bT_7ZaKsQpLx}>Vote</_tXt_2QpLxZaKs>
            </LinearGradient>
          </_tOp_5QpLxZaKs>
        </_sCv_6QpLxZaKs>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#0b0525ff', '#000000ff']} style={{ flex: 1 }}>
      <_sCv_6QpLxZaKs
        contentContainerStyle={[
          _s$.sC_1ZaKsQpLx,
          { paddingTop: _ht_1ZaKsQpLx * 0.07 },
        ]}
      >
        <_BhHd_6ZaKsQpLx />

        <_iMg_4QpLxZaKs source={require('../assets/images/winner_text.png')} />

        <_vW_1QpLxZaKs style={_s$.wW_9ZaKsQpLx}>
          <_tXt_2QpLxZaKs style={_s$.pN_2ZaKsQpLx}>
            {_wn_5ZaKsQpLx.name}
          </_tXt_2QpLxZaKs>
          <_vW_1QpLxZaKs style={_s$.wC_1ZaKsQpLx}>
            <_tXt_2QpLxZaKs style={_s$.vT_8ZaKsQpLx}>
              {_wn_5ZaKsQpLx.joke}
            </_tXt_2QpLxZaKs>
          </_vW_1QpLxZaKs>
        </_vW_1QpLxZaKs>

        <_iMg_4QpLxZaKs source={_wnSk_4ZaKsQpLx} style={_s$.wB_2ZaKsQpLx} />

        <_vW_1QpLxZaKs style={_s$.sP_3ZaKsQpLx}>
          <_tOp_5QpLxZaKs
            style={{ width: '100%', alignItems: 'center' }}
            activeOpacity={0.7}
            onPress={_shRs_7ZaKsQpLx}
          >
            <LinearGradient
              colors={_gdG_2ZaKsQpLx}
              style={_s$.mB_6ZaKsQpLx}
              start={_stP_1ZaKsQpLx}
              end={_enP_9ZaKsQpLx}
            >
              <_tXt_2QpLxZaKs style={_s$.bT_7ZaKsQpLx}>Share</_tXt_2QpLxZaKs>
            </LinearGradient>
          </_tOp_5QpLxZaKs>
        </_vW_1QpLxZaKs>
      </_sCv_6QpLxZaKs>
    </LinearGradient>
  );
};

const _s$ = _sSy_3QpLxZaKs.create({
  sC_1ZaKsQpLx: {
    backgroundColor: _bgC_3ZaKsQpLx,
    alignItems: 'center',
    padding: 20,
    flexGrow: 1,
  },

  wB_2ZaKsQpLx: {
    resizeMode: 'contain',
    marginVertical: 30,
    position: 'relative',
  },

  hD_9ZaKsQpLx: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 0.8,
    borderColor: _brC_8ZaKsQpLx,
    borderRadius: 16,
    padding: 10,
    marginBottom: 40,
    alignItems: 'center',
  },

  bK_8ZaKsQpLx: {
    width: 56,
    height: 56,
    borderRadius: 12,
    borderWidth: 0.8,
    borderColor: _brC_8ZaKsQpLx,
    justifyContent: 'center',
    alignItems: 'center',
  },

  hT_7ZaKsQpLx: {
    color: '#fff',
    fontFamily: _rgF_4ZaKsQpLx,
    fontSize: 20,
  },

  aI_6ZaKsQpLx: { width: 56, height: 56 },

  wW_9ZaKsQpLx: {
    alignItems: 'center',
    marginVertical: 20,
    width: '80%',
    padding: 15,
    borderWidth: 1,
    borderColor: _brC_8ZaKsQpLx,
    borderRadius: 16,
  },

  aV_9ZaKsQpLx: {
    width: 35,
    height: 69,
    resizeMode: 'contain',
  },

  tT_2ZaKsQpLx: {
    color: '#fff',
    fontFamily: _rgF_4ZaKsQpLx,
    fontSize: 24,
    marginBottom: 40,
  },

  pR_3ZaKsQpLx: {
    width: '100%',
    flexDirection: 'row',
    gap: 12,
    marginBottom: 17,
  },

  aB_4ZaKsQpLx: {
    width: 62,
    height: 62,
    borderRadius: 15,
    borderWidth: 0.8,
    borderColor: _brC_8ZaKsQpLx,
    justifyContent: 'center',
    alignItems: 'center',
  },

  iP_5ZaKsQpLx: {
    flex: 1,
    height: 62,
    borderRadius: 14,
    borderWidth: 0.8,
    borderColor: _brC_8ZaKsQpLx,
    color: '#fff',
    fontFamily: _rgF_4ZaKsQpLx,
    paddingHorizontal: 15,
    paddingVertical: 4,
    fontSize: 14,
  },

  cP_7ZaKsQpLx: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 40,
    justifyContent: 'center',
  },

  pN_2ZaKsQpLx: {
    color: '#fff',
    fontFamily: _rgF_4ZaKsQpLx,
    fontSize: 28,
    marginBottom: 6,
  },

  jI_3ZaKsQpLx: {
    width: '100%',
    height: 180,
    borderRadius: 18,
    borderWidth: 0.8,
    borderColor: _brC_8ZaKsQpLx,
    backgroundColor: '#2A2A2A',
    color: '#fff',
    fontFamily: _rgF_4ZaKsQpLx,
    padding: 16,
    marginBottom: 30,
  },

  gD_5ZaKsQpLx: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
    justifyContent: 'space-between',
  },

  vC_6ZaKsQpLx: {
    width: '47%',
    minHeight: 120,
    borderRadius: 16,
    borderWidth: 0.8,
    borderColor: '#7B6B31',
    backgroundColor: '#2A2A2A',
    padding: 12,
  },

  vS_7ZaKsQpLx: {
    borderWidth: 1,
    borderColor: _brC_8ZaKsQpLx,
  },

  vT_8ZaKsQpLx: {
    color: '#fff',
    fontFamily: _rgF_4ZaKsQpLx,
    fontSize: 9,
  },

  wC_1ZaKsQpLx: {
    width: '100%',
    borderRadius: 13,
    backgroundColor: '#2A2929',
    padding: 16,
  },

  mB_6ZaKsQpLx: {
    width: '80%',
    height: 64,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },

  bT_7ZaKsQpLx: {
    color: '#000',
    fontFamily: _rgF_4ZaKsQpLx,
    fontSize: 20,
  },

  mG_8ZaKsQpLx: {
    flex: 1,
    backgroundColor: '#62606058',
    justifyContent: 'center',
    alignItems: 'center',
  },

  mD_9ZaKsQpLx: {
    width: '80%',
    backgroundColor: '#000',
    borderRadius: 16,
    borderWidth: 0.8,
    borderColor: _brC_8ZaKsQpLx,
    padding: 20,
  },

  mT_1ZaKsQpLx: {
    color: '#fff',
    fontFamily: _rgF_4ZaKsQpLx,
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 30,
  },

  aG_2ZaKsQpLx: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    gap: 15,
  },

  aP_4ZaKsQpLx: {
    width: 100,
    height: 100,
    borderRadius: 15,
    borderWidth: 0.9,
    borderColor: '#7B6B31',
    justifyContent: 'center',
    alignItems: 'center',
  },

  aD_5ZaKsQpLx: {
    opacity: 0.7,
  },

  cL_6ZaKsQpLx: {
    width: 56,
    height: 56,
    borderRadius: 15,
    borderWidth: 0.9,
    borderColor: _brC_8ZaKsQpLx,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },

  aM_8ZaKsQpLx: {
    width: 75,
    height: 75,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: _brC_8ZaKsQpLx,
    justifyContent: 'center',
    alignItems: 'center',
  },

  nB_1ZaKsQpLx: {
    flex: 1,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: _brC_8ZaKsQpLx,
    justifyContent: 'center',
    alignItems: 'center',
    height: 75,
  },

  sP_3ZaKsQpLx: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    bottom: 45,
  },
});

export default PlayTogetherScreen;
