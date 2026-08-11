import { FlatList, StyleSheet, Text, View } from "react-native";
import { useTrucks } from "../context/TrucksContext";
import { TruckStatus } from "../types/truck";

interface TruckListScreenProps {
  status: TruckStatus;
}

export default function TruckListScreen({
  status,
}: TruckListScreenProps) {
  const { trucks } = useTrucks();

  const filteredTrucks = trucks.filter(
    (truck) => truck.status === status
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Camions : {filteredTrucks.length}
      </Text>

      <FlatList
        data={filteredTrucks}
        keyExtractor={(truck) => truck.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.plateNumber}>
              {item.plateNumber}
            </Text>

            <Text>Couleur : {item.color}</Text>
            <Text>Carburant : {item.fuelType}</Text>
            <Text>Kilométrage : {item.mileage} km</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },

  card: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    backgroundColor: "#f2f2f2",
  },

  plateNumber: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
});