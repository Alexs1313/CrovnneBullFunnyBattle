import { createStackNavigator } from '@react-navigation/stack';

// local imports

import WelcomeLoader from '../BattleScreens/WelcomeLoader';
import CrovnneBullOnboard from '../BattleScreens/CrovnneBullOnboard';
import FunnyBattleMenu from '../BattleScreens/FunnyBattleMenu';
import TellBullJokeScreen from '../BattleScreens/TellBullJokeScreen';
import SelectionOfJokesScreen from '../BattleScreens/SelectionOfJokesScreen';
import SavedJokesScreen from '../BattleScreens/SavedJokesScreen';
import AboutBullScreen from '../BattleScreens/AboutBullScreen';
import PlayTogetherScreen from '../BattleScreens/PlayTogetherScreen';

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
