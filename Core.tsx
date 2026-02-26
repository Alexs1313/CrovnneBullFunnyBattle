import { NavigationContainer } from '@react-navigation/native';

import { StoreProvider } from './[src]/Storage/bullBattleContext';
import BullBattleNavigation from './BullBattleNavigation';

const Core = () => {
  return (
    <NavigationContainer>
      <StoreProvider>
        <BullBattleNavigation />
      </StoreProvider>
    </NavigationContainer>
  );
};

export default Core;
