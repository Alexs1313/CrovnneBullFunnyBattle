import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useState } from 'react';

export const StoreContext = createContext(undefined);

export const useStorage = () => {
  return useContext(StoreContext);
};

export const StoreProvider = ({ children }) => {
  const [saved, setSaved] = useState([]);

  const loadSavedJokes = async () => {
    try {
      const storedJokes = await AsyncStorage.getItem('saved_jokes');

      setSaved(storedJokes ? JSON.parse(storedJokes) : []);
    } catch (error) {
      console.error('Error saved jokes:', error);

      setSaved([]);
    }
  };

  const removeSavedJoke = async jokeText => {
    try {
      const filteredJokes = saved.filter(item => item.joke !== jokeText);

      setSaved(filteredJokes);

      await AsyncStorage.setItem('saved_jokes', JSON.stringify(filteredJokes));
    } catch (error) {
      console.error('Error removing:', error);
    }
  };

  const contextValue = {
    saved,
    loadSavedJokes,
    removeSavedJoke,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};
