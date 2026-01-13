import React, { useRef } from "react";
import { View } from "react-native";
import OTPTextInput from "react-native-otp-textinput";
import { ScaledSheet } from "react-native-size-matters";
import { colors } from "../utility/colors";

export default function OtpInput({
  onOtpChange,
}: {
  onOtpChange?: (otp: string) => void;
}) {
  const otpRef = useRef<OTPTextInput>(null);

  return (
    <View style={styles.container}>
      <OTPTextInput
        ref={otpRef}
        inputCount={4}
        keyboardType={"numeric"}
        tintColor={colors.blue}
        offTintColor={colors.grey}
        containerStyle={styles.otpContainer}
        textInputStyle={styles.otpInput}
        handleTextChange={onOtpChange}
      />
    </View>
  );
}

const styles: any = ScaledSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  otpContainer: {
    width: "85%",
    justifyContent: "space-between",
  },
  otpInput: {
    width: "48@s",
    height: "54@s",
    borderWidth: 1,
    borderRadius: "10@s",
    fontSize: "18@ms",
    textAlign: "center",
    color: colors.black,
  },
});
