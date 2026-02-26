import { createStackNavigator } from '@react-navigation/stack';

// local imports
import WelcomeLoader from './[src]/BattleScreens/WelcomeLoader';
import CrovnneBullOnboard from './[src]/BattleScreens/CrovnneBullOnboard';
import FunnyBattleMenu from './[src]/BattleScreens/FunnyBattleMenu';
import TellBullJokeScreen from './[src]/BattleScreens/TellBullJokeScreen';
import SelectionOfJokesScreen from './[src]/BattleScreens/SelectionOfJokesScreen';
import SavedJokesScreen from './[src]/BattleScreens/SavedJokesScreen';
import AboutBullScreen from './[src]/BattleScreens/AboutBullScreen';
import PlayTogetherScreen from './[src]/BattleScreens/PlayTogetherScreen';

const Stack = createStackNavigator();

// stack screens

const BullBattleNavigation = () => {
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

export default BullBattleNavigation;
