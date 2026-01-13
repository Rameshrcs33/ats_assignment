import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Keyboard,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { s, ScaledSheet, vs } from "react-native-size-matters";
import OtpInput from "../components/OtpInput";
import { colors } from "../utility/colors";

const RESEND_SECONDS = 60;
export default function OtpScreen() {
  const [otp, setOtp] = useState<string>("");
  const [timer, setTimer] = useState(RESEND_SECONDS);
  const [canResend, setCanResend] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    startTimer();
    return () => clearInterval(intervalRef.current!);
  }, []);

  const startTimer = () => {
    setCanResend(false);
    setTimer(RESEND_SECONDS);

    intervalRef.current && clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleResendOTP = async () => {
    if (!canResend) return;
    Alert.alert("Info", "OTP Resent Successfully!");
    startTimer();
  };

  const verifyOtp = () => {
    Keyboard.dismiss();
    if (otp.length == 4) {
      Alert.alert("Success", "OTP Verified Successfully!");
    } else if (otp.length == 0 || otp.length < 4) {
      Alert.alert("Error", "Please enter a valid OTP");
    }
  };

  const handleOtpChange = (val: string) => {
    setOtp(val);
  };

  return (
    <Pressable onPress={() => Keyboard.dismiss()} style={styles.container}>
      <View style={{ width: s(300) }}>
        <Text style={styles.otplabel}>OTP Verification</Text>
        <View style={{ marginVertical: vs(5) }} />

        <Text style={styles.otpdescripton}>
          Enter the verification code we just send you on.
        </Text>

        <View style={{ marginVertical: vs(10) }} />
        <Text style={styles.otpemail}>example@gmail.com</Text>
        <View style={{ marginVertical: vs(15) }} />
      </View>

      <OtpInput onOtpChange={handleOtpChange} />

      <View style={{ marginVertical: vs(15) }} />

      <TouchableOpacity style={styles.button} onPress={verifyOtp}>
        <Text style={styles.verifytxt}>Verify</Text>
      </TouchableOpacity>
      <View style={{ marginVertical: vs(10) }} />

      <View style={{ flexDirection: "row" }}>
        <Text style={styles.otpdescripton}>Didn't receive the code?</Text>
        <Text style={{ paddingHorizontal: s(2) }} />
        <Pressable onPress={handleResendOTP}>
          <Text
            style={[
              styles.otpdescripton,
              {
                fontWeight: "500",
                color: canResend ? colors.red : colors.dark_gray,
              },
            ]}
          >
            Resend
          </Text>
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: "20@vs",
    paddingHorizontal: "20@s",
  },
  otplabel: {
    fontSize: "20@ms",
    color: colors.black,
    fontWeight: "700",
    letterSpacing: 1,
  },
  otpdescripton: {
    fontSize: "14@ms",
    color: colors.dark_gray,
    fontWeight: "400",
  },
  otpemail: {
    fontSize: "14@ms",
    color: colors.black,
    fontWeight: "500",
  },
  verifytxt: {
    fontSize: "14@ms",
    color: colors.white,
    fontWeight: "400",
  },
  button: {
    width: "300@s",
    height: "50@vs",
    backgroundColor: colors.dark_gray,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "8@s",
  },
});
