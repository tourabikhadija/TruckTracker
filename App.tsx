import AppNavigator from "./src/navigation/AppNavigator";
import { TrucksProvider } from "./src/context/TrucksContext";

export default function App() {
  return (
    <TrucksProvider>
      <AppNavigator />
    </TrucksProvider>
  );
}