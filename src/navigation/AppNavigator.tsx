import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ServiceStack from "./ServiceStack";
import StoppedStack from "./StoppedStack";
import MaintenanceStack from "./MaintenanceStack";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="En service"
          component={ServiceStack}
          options={{
            title: "En service",
          }}
        />

        <Tab.Screen
          name="À l'arrêt"
          component={StoppedStack}
          options={{
            title: "À l'arrêt",
          }}
        />

        <Tab.Screen
          name="En maintenance"
          component={MaintenanceStack}
          options={{
            title: "En maintenance",
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}