import { StatusBar, View } from "react-native";
import OtpScreen from "./screen/otpscreen";
import { colors } from "./utility/colors";

export default function App() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <StatusBar barStyle={"default"} backgroundColor={colors.blue} />
      <OtpScreen />
    </View>
  );
}
