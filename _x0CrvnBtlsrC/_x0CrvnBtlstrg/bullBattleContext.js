import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext as _cCTx_9VmQpLxZ7nR3aKs,
  useContext as _uCTx_4pLxQnZ8tVmR2aKs,
  useState as _uST_6mQpZtLxV8nR3aKs,
} from 'react';

export const _sCx_7qPzLxVnT3mA9rKb = _cCTx_9VmQpLxZ7nR3aKs(undefined);

export const useStorage = () => {
  return _uCTx_4pLxQnZ8tVmR2aKs(_sCx_7qPzLxVnT3mA9rKb);
};

export const StoreProvider = ({ children }) => {
  const [_svJ_6tVmQpLxZ7nR3aKs, _sSvJ_8pLxQnZtVmR2aKs] = _uST_6mQpZtLxV8nR3aKs(
    [],
  );

  const _lSJ_9xQmTrL7pZaVnK4s = async () => {
    try {
      const _stJ_4pLxQnZ8tVmR2aKs = await AsyncStorage.getItem('saved_jokes');

      _sSvJ_8pLxQnZtVmR2aKs(
        _stJ_4pLxQnZ8tVmR2aKs ? JSON.parse(_stJ_4pLxQnZ8tVmR2aKs) : [],
      );
    } catch (error) {
      console.error('Error saved jokes:', error);
      _sSvJ_8pLxQnZtVmR2aKs([]);
    }
  };

  const _rSJ_7qPzLxVnT3mA9rKb = async _jTx_9VmQpLxZ7nR3aKs => {
    try {
      const _fJ_6pLxQnZtVmR2aKs = _svJ_6tVmQpLxZ7nR3aKs.filter(
        _it_4mQpZtLxV8nR3aKs =>
          _it_4mQpZtLxV8nR3aKs.joke !== _jTx_9VmQpLxZ7nR3aKs,
      );

      _sSvJ_8pLxQnZtVmR2aKs(_fJ_6pLxQnZtVmR2aKs);

      await AsyncStorage.setItem(
        'saved_jokes',
        JSON.stringify(_fJ_6pLxQnZtVmR2aKs),
      );
    } catch (error) {
      console.error('Error removing:', error);
    }
  };

  const _cV_2Rm9xQpLzT7nVaKs = {
    saved: _svJ_6tVmQpLxZ7nR3aKs,
    loadSavedJokes: _lSJ_9xQmTrL7pZaVnK4s,
    removeSavedJoke: _rSJ_7qPzLxVnT3mA9rKb,
  };

  return (
    <_sCx_7qPzLxVnT3mA9rKb.Provider value={_cV_2Rm9xQpLzT7nVaKs}>
      {children}
    </_sCx_7qPzLxVnT3mA9rKb.Provider>
  );
};
