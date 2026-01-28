import { createStackNavigator } from '@react-navigation/stack';

import WelcomeLoader from '../_x0CrvnBtlscrns/WelcomeLoader';
import CrovnneBullOnboard from '../_x0CrvnBtlscrns/CrovnneBullOnboard';
import FunnyBattleMenu from '../_x0CrvnBtlscrns/FunnyBattleMenu';
import TellBullJokeScreen from '../_x0CrvnBtlscrns/TellBullJokeScreen';
import SelectionOfJokesScreen from '../_x0CrvnBtlscrns/SelectionOfJokesScreen';
import SavedJokesScreen from '../_x0CrvnBtlscrns/SavedJokesScreen';
import AboutBullScreen from '../_x0CrvnBtlscrns/AboutBullScreen';
import PlayTogetherScreen from '../_x0CrvnBtlscrns/PlayTogetherScreen';

const Stack = createStackNavigator();

const CrvnBtlstCknv = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WelcomeLoader" component={WelcomeLoader} />
      <Stack.Screen name="CrovnneBullOnboard" component={CrovnneBullOnboard} />
      <Stack.Screen name="FunnyBattleMenu" component={FunnyBattleMenu} />
      <Stack.Screen name="TellBullJokeScreen" component={TellBullJokeScreen} />
      <Stack.Screen
        name="SelectionOfJokesScreen"
        component={SelectionOfJokesScreen}
      />
      <Stack.Screen name="SavedJokesScreen" component={SavedJokesScreen} />
      <Stack.Screen name="AboutBullScreen" component={AboutBullScreen} />
      <Stack.Screen name="PlayTogetherScreen" component={PlayTogetherScreen} />
    </Stack.Navigator>
  );
};

export default CrvnBtlstCknv;
