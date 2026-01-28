import { NavigationContainer } from '@react-navigation/native';
import { StoreProvider } from './_x0CrvnBtlsrC/_x0CrvnBtlstrg/bullBattleContext';
import CrvnBtlstCknv from './_x0CrvnBtlsrC/_x0CrvnBtlrts/CrvnBtlstCknv';

const App = () => {
  return (
    <NavigationContainer>
      <StoreProvider>
        <CrvnBtlstCknv />
      </StoreProvider>
    </NavigationContainer>
  );
};

export default App;
