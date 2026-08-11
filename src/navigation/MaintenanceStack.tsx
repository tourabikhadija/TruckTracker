import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TruckListScreen from "../screens/TruckListScreen";

const Stack = createNativeStackNavigator();

export default function MaintenanceStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MaintenanceList"
        options={{
          title: "En maintenance",
        }}
      >
        {() => <TruckListScreen status="maintenance" />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}