import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { useTrucks } from "../context/TrucksContext";
import { TruckStatus } from "../types/truck";

const STATUS_OPTIONS: { key: TruckStatus; label: string; color: string }[] = [
  { key: "service", label: "En service", color: "#4CAF50" },
  { key: "stopped", label: "À l'arrêt", color: "#FF9800" },
  { key: "maintenance", label: "En maintenance", color: "#F44336" },
];

const STATUS_BG: Record<TruckStatus, string> = {
  service: "#E8F5E9",
  stopped: "#FFF3E0",
  maintenance: "#FFEBEE",
};

const FUEL_LABELS: Record<string, string> = {
  diesel: "Diesel",
  essence: "Essence",
  electric: "Électrique",
  hybrid: "Hybride",
};

interface Props {
  truckId: string;
  onNavigate: (screen: string, params?: Record<string, unknown>) => void;
  onGoBack: () => void;
  originStatus?: TruckStatus;
}

export default function TruckDetailScreen({
  truckId,
  onNavigate,
  onGoBack,
  originStatus,
}: Props) {
  const { trucks, deleteTruck, changeStatus } = useTrucks();
  const truck = trucks.find((t) => t.id === truckId);

  if (!truck) {
    return (
      <View style={styles.container}>
        <Text style={styles.notFound}>Camion introuvable</Text>
      </View>
    );
  }

  const isOilDue = truck.mileage >= truck.nextOilChangeMileage;
  const currentStatus = STATUS_OPTIONS.find(
    (s) => s.key === truck.status
  );

  const handleDelete = () => {
    Alert.alert(
      "Supprimer le camion",
      `Êtes-vous sûr de vouloir supprimer ${truck.plateNumber} ?`,
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: () => {
            deleteTruck(truck.id);
            onGoBack();
          },
        },
      ]
    );
  };

  const handleChangeStatus = (newStatus: TruckStatus) => {
    if (newStatus === truck.status) return;
    changeStatus(truck.id, newStatus);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.headerRow}>
        <View
          style={[
            styles.plateBadge,
            { backgroundColor: truck.color },
          ]}
        >
          <Text style={styles.plateText}>{truck.plateNumber}</Text>
        </View>
        {isOilDue && (
          <View style={styles.oilBadge}>
            <Text style={styles.oilBadgeText}>Vidange due</Text>
          </View>
        )}
      </View>

      <View style={styles.infoCard}>
        <InfoRow label="Couleur" value={truck.color} />
        <InfoRow
          label="Carburant"
          value={FUEL_LABELS[truck.fuelType] ?? truck.fuelType}
        />
        <InfoRow label="Kilométrage" value={`${truck.mileage.toLocaleString("fr-FR")} km`} />
        <InfoRow
          label="Prochaine vidange"
          value={`${truck.nextOilChangeMileage.toLocaleString("fr-FR")} km`}
          valueColor={isOilDue ? "#F44336" : undefined}
        />
        <InfoRow
          label="Statut actuel"
          value={currentStatus?.label ?? truck.status}
          valueColor={currentStatus?.color}
        />
      </View>

      <Text style={styles.sectionTitle}>Changer de statut</Text>
      <View style={styles.statusRow}>
        {STATUS_OPTIONS.map((opt) => (
          <TouchableOpacity
            key={opt.key}
            style={[
              styles.statusButton,
              {
                backgroundColor:
                  truck.status === opt.key ? opt.color : "#E0E0E0",
              },
            ]}
            onPress={() => handleChangeStatus(opt.key)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.statusButtonText,
                {
                  color: truck.status === opt.key ? "#FFF" : "#666",
                },
              ]}
            >
              {opt.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.editButton}
        onPress={() =>
          onNavigate("EditTruck", { truckId: truck.id })
        }
        activeOpacity={0.7}
      >
        <Text style={styles.editButtonText}>Modifier</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDelete}
        activeOpacity={0.7}
      >
        <Text style={styles.deleteButtonText}>Supprimer</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function InfoRow({
  label,
  value,
  valueColor,
}: {
  label: string;
  value: string;
  valueColor?: string;
}) {
  return (
    <View style={infoStyles.row}>
      <Text style={infoStyles.label}>{label}</Text>
      <Text style={[infoStyles.value, valueColor && { color: valueColor }]}>
        {value}
      </Text>
    </View>
  );
}

const infoStyles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  label: {
    fontSize: 15,
    color: "#888",
  },
  value: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  content: {
    padding: 20,
  },
  notFound: {
    textAlign: "center",
    marginTop: 60,
    fontSize: 16,
    color: "#999",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  plateBadge: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  plateText: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  oilBadge: {
    backgroundColor: "#F44336",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  oilBadgeText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  infoCard: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 28,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#444",
    marginBottom: 12,
  },
  statusRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 28,
  },
  statusButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  statusButtonText: {
    fontSize: 13,
    fontWeight: "600",
  },
  editButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  editButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  deleteButton: {
    backgroundColor: "#FFF",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#F44336",
    marginBottom: 40,
  },
  deleteButtonText: {
    color: "#F44336",
    fontSize: 16,
    fontWeight: "600",
  },
});
