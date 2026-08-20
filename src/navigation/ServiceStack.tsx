import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TruckListScreen from "../screens/TruckListScreen";
import TruckDetailScreen from "../screens/TruckDetailScreen";
import AddTruckScreen from "../screens/AddTruckScreen";
import EditTruckScreen from "../screens/EditTruckScreen";

const Stack = createNativeStackNavigator();

type ServiceStackParamList = {
  ServiceList: undefined;
  TruckDetail: { truckId: string };
  AddTruck: undefined;
  EditTruck: { truckId: string };
};

function ServiceListWrapper() {
  const navigation = useNavigation<any>();
  return (
    <TruckListScreen
      status="service"
      onNavigate={(screen, params) =>
        navigation.navigate(screen, params)
      }
    />
  );
}

function TruckDetailWrapper() {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<ServiceStackParamList, "TruckDetail">>();
  return (
    <TruckDetailScreen
      truckId={route.params.truckId}
      originStatus="service"
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
  const route = useRoute<RouteProp<ServiceStackParamList, "EditTruck">>();
  return (
    <EditTruckScreen
      truckId={route.params.truckId}
      onGoBack={() => navigation.goBack()}
    />
  );
}

export default function ServiceStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ServiceList"
        component={ServiceListWrapper}
        options={{ title: "En service" }}
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
