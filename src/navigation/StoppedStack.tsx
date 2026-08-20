import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TruckListScreen from "../screens/TruckListScreen";
import TruckDetailScreen from "../screens/TruckDetailScreen";
import AddTruckScreen from "../screens/AddTruckScreen";
import EditTruckScreen from "../screens/EditTruckScreen";

const Stack = createNativeStackNavigator();

type StoppedStackParamList = {
  StoppedList: undefined;
  TruckDetail: { truckId: string };
  AddTruck: undefined;
  EditTruck: { truckId: string };
};

function StoppedListWrapper() {
  const navigation = useNavigation<any>();
  return (
    <TruckListScreen
      status="stopped"
      onNavigate={(screen, params) =>
        navigation.navigate(screen, params)
      }
    />
  );
}

function TruckDetailWrapper() {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<StoppedStackParamList, "TruckDetail">>();
  return (
    <TruckDetailScreen
      truckId={route.params.truckId}
      originStatus="stopped"
      onNavigate={(screen, params) =>
        navigation.navigate(screen, params)
      }
      onGoBack={() => navigation.goBack()}
    />
  );
}

function AddTruckWrapper() {
  const navigation = useNavigation();
  return <AddTruckScreen onGoBack={() => navigation.goBack()} />;
}

function EditTruckWrapper() {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<StoppedStackParamList, "EditTruck">>();
  return (
    <EditTruckScreen
      truckId={route.params.truckId}
      onGoBack={() => navigation.goBack()}
    />
  );
}

export default function StoppedStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="StoppedList"
        component={StoppedListWrapper}
        options={{ title: "À l'arrêt" }}
      />
      <Stack.Screen
        name="TruckDetail"
        component={TruckDetailWrapper}
        options={{ title: "Détail du camion" }}
      />
      <Stack.Screen
        name="AddTruck"
        component={AddTruckWrapper}
        options={{ title: "Ajouter un camion" }}
      />
      <Stack.Screen
        name="EditTruck"
        component={EditTruckWrapper}
        options={{ title: "Modifier le camion" }}
      />
    </Stack.Navigator>
  );
}
