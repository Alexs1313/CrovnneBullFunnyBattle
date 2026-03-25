import { NavigationContainer } from '@react-navigation/native';

import { StoreProvider } from './[src]/Jkssbllstorage/bullBattleContext';

import StacckkRoutee from './StacckkRoutee';

const Core = () => {
  return (
    <NavigationContainer>
      <StoreProvider>
        <StacckkRoutee />
      </StoreProvider>
    </NavigationContainer>
  );
};

export default Core;
