import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

export const StoreContext = createContext(undefined);
const SAVED_JOKES_KEY = 'saved_jokes';
const HOOVES_BALANCE_KEY = 'hooves_balance';
const OWNED_COLLECTION_IDS_KEY = 'owned_collection_ids';
const DEFAULT_HOOVES_BALANCE = 15;

export const useStorage = () => {
  return useContext(StoreContext);
};

export const StoreProvider = ({ children }) => {
  const [saved, setSaved] = useState([]);
  const [hoovesBalance, setHoovesBalance] = useState(DEFAULT_HOOVES_BALANCE);
  const [ownedCollectionIds, setOwnedCollectionIds] = useState([]);

  const loadSavedJokes = async () => {
    try {
      const storedJokes = await AsyncStorage.getItem(SAVED_JOKES_KEY);

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

      await AsyncStorage.setItem(SAVED_JOKES_KEY, JSON.stringify(filteredJokes));
    } catch (error) {
      console.error('Error removing:', error);
    }
  };

  const loadCollectionState = async () => {
    try {
      const [storedBalance, storedOwnedIds] = await Promise.all([
        AsyncStorage.getItem(HOOVES_BALANCE_KEY),
        AsyncStorage.getItem(OWNED_COLLECTION_IDS_KEY),
      ]);

      if (storedBalance === null) {
        setHoovesBalance(DEFAULT_HOOVES_BALANCE);
        await AsyncStorage.setItem(
          HOOVES_BALANCE_KEY,
          String(DEFAULT_HOOVES_BALANCE),
        );
      } else {
        const parsedBalance = Number(storedBalance);
        setHoovesBalance(Number.isFinite(parsedBalance) ? parsedBalance : 0);
      }

      if (storedOwnedIds === null) {
        setOwnedCollectionIds([]);
        await AsyncStorage.setItem(OWNED_COLLECTION_IDS_KEY, JSON.stringify([]));
      } else {
        const parsedOwnedIds = JSON.parse(storedOwnedIds);
        setOwnedCollectionIds(Array.isArray(parsedOwnedIds) ? parsedOwnedIds : []);
      }
    } catch (error) {
      console.error('Error loading collection state:', error);
    }
  };

  useEffect(() => {
    loadSavedJokes();
    loadCollectionState();
  }, []);

  const addHooves = async amount => {
    if (!Number.isFinite(amount) || amount <= 0) return;

    const nextBalance = hoovesBalance + amount;
    setHoovesBalance(nextBalance);

    try {
      await AsyncStorage.setItem(HOOVES_BALANCE_KEY, String(nextBalance));
    } catch (error) {
      console.error('Error adding hooves:', error);
    }
  };

  const buyCollectionItem = async ({ id, price }) => {
    if (!id || !Number.isFinite(price) || price < 0) {
      return { success: false, reason: 'invalid_payload' };
    }

    if (ownedCollectionIds.includes(id)) {
      return { success: false, reason: 'already_owned' };
    }

    if (hoovesBalance < price) {
      return { success: false, reason: 'not_enough_hooves' };
    }

    const nextBalance = hoovesBalance - price;
    const nextOwnedIds = [...ownedCollectionIds, id];

    setHoovesBalance(nextBalance);
    setOwnedCollectionIds(nextOwnedIds);

    try {
      await Promise.all([
        AsyncStorage.setItem(HOOVES_BALANCE_KEY, String(nextBalance)),
        AsyncStorage.setItem(
          OWNED_COLLECTION_IDS_KEY,
          JSON.stringify(nextOwnedIds),
        ),
      ]);
    } catch (error) {
      console.error('Error buying collection item:', error);
      return { success: false, reason: 'storage_error' };
    }

    return { success: true };
  };

  const contextValue = {
    saved,
    loadSavedJokes,
    removeSavedJoke,
    hoovesBalance,
    ownedCollectionIds,
    addHooves,
    buyCollectionItem,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};
