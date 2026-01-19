import { NavigationContainer } from '@react-navigation/native';
import BullBattleNavigation from './[CrovnneBullFunnyBattle]/CrovnneBullRoutes/BullBattleNavigation';
import { StoreProvider } from './[CrovnneBullFunnyBattle]/FunnyButtleStore/bullBattleContext';

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
