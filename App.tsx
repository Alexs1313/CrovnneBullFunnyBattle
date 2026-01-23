import { NavigationContainer } from '@react-navigation/native';
import BullBattleNavigation from './[src]/Routes/BullBattleNavigation';
import { StoreProvider } from './[src]/Storage/bullBattleContext';

const App = () => {
  return (
    <NavigationContainer>
      <StoreProvider>
        <BullBattleNavigation />
      </StoreProvider>
    </NavigationContainer>
  );
};

export default App;
