import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { useTrucks } from "../context/TrucksContext";
import { TruckStatus } from "../types/truck";

const STATUS_COLORS: Record<TruckStatus, string> = {
  service: "#4CAF50",
  stopped: "#FF9800",
  maintenance: "#F44336",
};

const STATUS_LABELS: Record<TruckStatus, string> = {
  service: "En service",
  stopped: "À l'arrêt",
  maintenance: "En maintenance",
};

const FUEL_LABELS: Record<string, string> = {
  diesel: "Diesel",
  essence: "Essence",
  electric: "Électrique",
  hybrid: "Hybride",
};

interface Props {
  status: TruckStatus;
  onNavigate: (screen: string, params?: Record<string, unknown>) => void;
}

export default function TruckListScreen({ status, onNavigate }: Props) {
  const { trucks } = useTrucks();

  const filteredTrucks = trucks.filter(
    (truck) => truck.status === status
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.count}>
          {filteredTrucks.length} camion
          {filteredTrucks.length !== 1 ? "s" : ""}
        </Text>
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: STATUS_COLORS[status] }]}
          onPress={() => onNavigate("AddTruck")}
          activeOpacity={0.7}
        >
          <Text style={styles.addButtonText}>+ Ajouter</Text>
        </TouchableOpacity>
      </View>

      {filteredTrucks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🚛</Text>
          <Text style={styles.emptyText}>
            Aucun camion {STATUS_LABELS[status]?.toLowerCase()}
          </Text>
          <TouchableOpacity
            style={[styles.emptyAddButton, { borderColor: STATUS_COLORS[status] }]}
            onPress={() => onNavigate("AddTruck")}
            activeOpacity={0.7}
          >
            <Text style={[styles.emptyAddText, { color: STATUS_COLORS[status] }]}>
              Ajouter un camion
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={filteredTrucks}
          keyExtractor={(truck) => truck.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => {
            const isOilDue =
              item.mileage >= item.nextOilChangeMileage;

            return (
              <TouchableOpacity
                style={styles.card}
                onPress={() =>
                  onNavigate("TruckDetail", {
                    truckId: item.id,
                  })
                }
                activeOpacity={0.7}
              >
                <View style={styles.cardHeader}>
                  <View
                    style={[
                      styles.colorDot,
                      { backgroundColor: item.color },
                    ]}
                  />
                  <View style={styles.cardTitleArea}>
                    <Text style={styles.plateNumber}>
                      {item.plateNumber}
                    </Text>
                    <Text style={styles.statusBadge}>
                      {STATUS_LABELS[item.status]}
                    </Text>
                  </View>
                  {isOilDue && (
                    <View style={styles.oilBadge}>
                      <Text style={styles.oilBadgeText}>Vidange</Text>
                    </View>
                  )}
                </View>

                <View style={styles.cardBody}>
                  <Text style={styles.cardDetail}>
                    Carburant : {FUEL_LABELS[item.fuelType] ?? item.fuelType}
                  </Text>
                  <Text style={styles.cardDetail}>
                    Kilométrage : {item.mileage.toLocaleString("fr-FR")} km
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  count: {
    fontSize: 14,
    color: "#888",
    fontWeight: "500",
  },
  addButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addButtonText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "600",
  },
  list: {
    padding: 16,
    paddingBottom: 80,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 100,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    marginBottom: 20,
  },
  emptyAddButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    borderWidth: 2,
  },
  emptyAddText: {
    fontSize: 15,
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  colorDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 12,
  },
  cardTitleArea: {
    flex: 1,
  },
  plateNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
    letterSpacing: 0.5,
  },
  statusBadge: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
  oilBadge: {
    backgroundColor: "#F44336",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  oilBadgeText: {
    color: "#FFF",
    fontSize: 11,
    fontWeight: "bold",
  },
  cardBody: {
    borderTopWidth: 1,
    borderTopColor: "#F5F5F5",
    paddingTop: 10,
    gap: 4,
  },
  cardDetail: {
    fontSize: 14,
    color: "#666",
  },
});
