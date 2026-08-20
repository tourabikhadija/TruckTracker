import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ServiceStack from "./ServiceStack";
import StoppedStack from "./StoppedStack";
import MaintenanceStack from "./MaintenanceStack";

const Tab = createBottomTabNavigator();

const SERVICE_COLOR = "#4CAF50";
const STOPPED_COLOR = "#FF9800";
const MAINTENANCE_COLOR = "#F44336";

function TabIcon({
  label,
  color,
  focused,
}: {
  label: string;
  color: string;
  focused: boolean;
}) {
  return (
    <Text
      style={{
        fontSize: focused ? 20 : 16,
        opacity: focused ? 1 : 0.5,
      }}
    >
      {label}
    </Text>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#1A237E",
          },
          headerTintColor: "#FFF",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          tabBarActiveTintColor: "#1A237E",
          tabBarInactiveTintColor: "#999",
          tabBarStyle: {
            backgroundColor: "#FFF",
            borderTopColor: "#EEE",
            paddingBottom: 4,
            height: 60,
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: "600",
          },
        }}
      >
        <Tab.Screen
          name="En service"
          component={ServiceStack}
          options={{
            title: "En service",
            headerTitle: "TruckTracker",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon label="🟢" color={color} focused={focused} />
            ),
          }}
        />

        <Tab.Screen
          name="À l'arrêt"
          component={StoppedStack}
          options={{
            title: "À l'arrêt",
            headerTitle: "TruckTracker",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon label="🟠" color={color} focused={focused} />
            ),
          }}
        />

        <Tab.Screen
          name="En maintenance"
          component={MaintenanceStack}
          options={{
            title: "En maintenance",
            headerTitle: "TruckTracker",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon label="🔴" color={color} focused={focused} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
