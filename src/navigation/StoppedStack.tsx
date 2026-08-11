import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TruckListScreen from "../screens/TruckListScreen";

const Stack = createNativeStackNavigator();

export default function StoppedStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="StoppedList"
        options={{
          title: "À l'arrêt",
        }}
      >
        {() => <TruckListScreen status="stopped" />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}