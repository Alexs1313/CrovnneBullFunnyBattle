import { createStackNavigator } from '@react-navigation/stack';

// local imports

import WelcomeLoader from '../BullBattleScreens/WelcomeLoader';
import CrovnneBullOnboard from '../BullBattleScreens/CrovnneBullOnboard';
import FunnyBattleMenu from '../BullBattleScreens/FunnyBattleMenu';
import TellBullJokeScreen from '../BullBattleScreens/TellBullJokeScreen';
import SelectionOfJokesScreen from '../BullBattleScreens/SelectionOfJokesScreen';
import SavedJokesScreen from '../BullBattleScreens/SavedJokesScreen';
import AboutBullScreen from '../BullBattleScreens/AboutBullScreen';
import PlayTogetherScreen from '../BullBattleScreens/PlayTogetherScreen';

const Stack = createStackNavigator();

// bull battle stack screens

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
