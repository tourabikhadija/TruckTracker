import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useTrucks } from "../context/TrucksContext";
import { TruckStatus, FuelType } from "../types/truck";

const FUEL_OPTIONS: { key: FuelType; label: string }[] = [
  { key: "diesel", label: "Diesel" },
  { key: "essence", label: "Essence" },
  { key: "electric", label: "Électrique" },
  { key: "hybrid", label: "Hybride" },
];

interface Props {
  truckId: string;
  onGoBack: () => void;
}

export default function EditTruckScreen({ truckId, onGoBack }: Props) {
  const { trucks, updateTruck } = useTrucks();
  const truck = trucks.find((t) => t.id === truckId);

  const [plateNumber, setPlateNumber] = useState(
    truck?.plateNumber ?? ""
  );
  const [color, setColor] = useState(truck?.color ?? "");
  const [fuelType, setFuelType] = useState<FuelType>(
    truck?.fuelType ?? "diesel"
  );
  const [mileage, setMileage] = useState(
    truck?.mileage.toString() ?? ""
  );
  const [nextOilChangeMileage, setNextOilChangeMileage] = useState(
    truck?.nextOilChangeMileage.toString() ?? ""
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!truck) {
    return (
      <View style={styles.container}>
        <Text style={styles.notFound}>Camion introuvable</Text>
      </View>
    );
  }

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!plateNumber.trim()) {
      newErrors.plateNumber = "L'immatriculation est requise";
    }

    if (!color.trim()) {
      newErrors.color = "La couleur est requise";
    }

    const parsedMileage = Number(mileage);
    if (!mileage.trim() || isNaN(parsedMileage) || parsedMileage < 0) {
      newErrors.mileage = "Kilométrage invalide";
    }

    const parsedOil = Number(nextOilChangeMileage);
    if (
      !nextOilChangeMileage.trim() ||
      isNaN(parsedOil) ||
      parsedOil < 0
    ) {
      newErrors.nextOilChangeMileage =
        "Kilométrage vidange invalide";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    updateTruck(truck.id, {
      plateNumber: plateNumber.trim(),
      color: color.trim(),
      fuelType,
      mileage: Number(mileage),
      nextOilChangeMileage: Number(nextOilChangeMileage),
    });

    onGoBack();
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.sectionTitle}>Modifier le camion</Text>

      <Field
        label="Immatriculation"
        value={plateNumber}
        onChangeText={setPlateNumber}
        error={errors.plateNumber}
      />

      <Field
        label="Couleur"
        value={color}
        onChangeText={setColor}
        error={errors.color}
      />

      <Text style={styles.label}>Type de carburant</Text>
      <View style={styles.chipRow}>
        {FUEL_OPTIONS.map((opt) => (
          <TouchableOpacity
            key={opt.key}
            style={[
              styles.chip,
              fuelType === opt.key && styles.chipActive,
            ]}
            onPress={() => setFuelType(opt.key)}
          >
            <Text
              style={[
                styles.chipText,
                fuelType === opt.key && styles.chipTextActive,
              ]}
            >
              {opt.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Field
        label="Kilométrage actuel"
        value={mileage}
        onChangeText={setMileage}
        error={errors.mileage}
        keyboardType="numeric"
      />

      <Field
        label="Prochaine vidange (km)"
        value={nextOilChangeMileage}
        onChangeText={setNextOilChangeMileage}
        error={errors.nextOilChangeMileage}
        keyboardType="numeric"
      />

      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit}
        activeOpacity={0.7}
      >
        <Text style={styles.submitButtonText}>Enregistrer</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function Field({
  label,
  value,
  onChangeText,
  error,
  keyboardType,
}: {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  keyboardType?: "default" | "numeric";
}) {
  return (
    <View style={fieldStyles.wrapper}>
      <Text style={fieldStyles.label}>{label}</Text>
      <TextInput
        style={[fieldStyles.input, error && fieldStyles.inputError]}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        placeholderTextColor="#BBB"
      />
      {error && <Text style={fieldStyles.error}>{error}</Text>}
    </View>
  );
}

const fieldStyles = StyleSheet.create({
  wrapper: {
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#FFF",
    borderWidth: 1.5,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: "#333",
  },
  inputError: {
    borderColor: "#F44336",
  },
  error: {
    color: "#F44336",
    fontSize: 12,
    marginTop: 4,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  content: {
    padding: 20,
    paddingBottom: 60,
  },
  notFound: {
    textAlign: "center",
    marginTop: 60,
    fontSize: 16,
    color: "#999",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
    marginBottom: 8,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 18,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#E8E8E8",
  },
  chipActive: {
    backgroundColor: "#2196F3",
  },
  chipText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  chipTextActive: {
    color: "#FFF",
  },
  submitButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  submitButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
