import { createStackNavigator } from '@react-navigation/stack';

// local imports

import TellBullJokeScreen from './[src]/Jkssbllscrnns/JkseBattlTellBullJokeScreen';
import SelectionOfJokesScreen from './[src]/Jkssbllscrnns/SelectionOfJokesScreen';
import SavedJokesScreen from './[src]/Jkssbllscrnns/SavedJokesScreen';
import AboutBullScreen from './[src]/Jkssbllscrnns/AboutBullScreen';
import PlayTogetherScreen from './[src]/Jkssbllscrnns/PlayTogetherScreen';
import BottomTabs from './BottomTabs';
import Crovbbllonboard from './[src]/Jkssbllscrnns/Crovbbllonboard';
import JkseBattlWelcomeLoader from './[src]/Jkssbllscrnns/JkseBattlWelcomeLoader';

const Stack = createStackNavigator();

const StacckkRoutee = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="JkseBattlWelcomeLoader"
        component={JkseBattlWelcomeLoader}
      />
      <Stack.Screen name="Crovbbllonboard" component={Crovbbllonboard} />
      <Stack.Screen name="BottomTabs" component={BottomTabs} />
      <Stack.Screen name="TellBullJokeScreen" component={TellBullJokeScreen} />
      <Stack.Screen
        name="SelectionOfJokesScreen"
        component={SelectionOfJokesScreen}
      />
      <Stack.Screen
        name="SelectionOfJokesResultScreen"
        component={SelectionOfJokesScreen}
      />
      <Stack.Screen name="SavedJokesScreen" component={SavedJokesScreen} />
      <Stack.Screen name="AboutBullScreen" component={AboutBullScreen} />
      <Stack.Screen name="PlayTogetherScreen" component={PlayTogetherScreen} />
      <Stack.Screen
        name="PlayTogetherFlowScreen"
        component={PlayTogetherScreen}
      />
    </Stack.Navigator>
  );
};

export default StacckkRoutee;
