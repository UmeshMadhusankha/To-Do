import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TaskAddingScreen from './screens/TaskAddingScreen';
import StatisticsScreen from './screens/StatisticsScreen';
import DisplayTasksScreen from './screens/DisplayTasksScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { Provider } from 'react-redux';
import store from './redux/store';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TaskStatus from './screens/TaskStatus';
import DisplayTasksStack from './screens/DisplayTasksStack';
import Loading from './screens/components/Loading';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


export default function App() {

  const [isLoading,setIsLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    },2500)
  
    return () => clearTimeout(timer);
  },[])

  if (isLoading) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{
          backgroundColor: 'rgba(0,0,255,0.1)',
          width: '100%',
          height: '100%'
        }}>
          <Loading />
        </View>
      </SafeAreaView>
    )
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator 
          screenOptions={{
            tabBarInactiveBackgroundColor: "#eee",
            tabBarInactiveTintColor: "#000",
            tabBarActiveBackgroundColor: "cyan",
            tabBarActiveTintColor: "#000",
            headerShown: false,
            tabBarStyle: {
              height: 65
            }
          }}
        >
          <Tab.Screen name="Tasks Stack" component={DisplayTasksStack} 
            options={{
              tabBarIcon: ({ size , color }) => <MaterialCommunityIcons name='format-list-checks' size={size} color={color}/>
            }}
          />
          <Tab.Screen name="Add Tasks" component={TaskAddingScreen} 
            options={{
              tabBarIcon: ({ size , color }) => <MaterialCommunityIcons name='plus-circle-outline' size={size} color={color}/>
            }}
          />
          <Tab.Screen name="Statistics" component={StatisticsScreen} 
            options={{
              tabBarIcon: ({ size , color }) => <Entypo name='bar-graph' size={size} color={color}/>
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
