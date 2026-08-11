import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TruckListScreen from "../screens/TruckListScreen";

const Stack = createNativeStackNavigator();

export default function ServiceStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ServiceList"
        options={{
          title: "En service",
        }}
      >
        {() => <TruckListScreen status="service" />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}