import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import { PermissionsAndroid } from "react-native";

// 🔥 Correct import for Expo + react-native-thermal-printer v2.3.6
const ThermalPrinter = require("react-native-thermal-printer").default;

const PRINTER_MAC = "66:32:03:77:90:E1"; // your CX588 MAC

const PrinterTestScreen = () => {

  /* ---------------- Permission check (Android 12+) ---------------- */
  const ensureBluetoothPermission = async () => {
    if (Platform.OS !== "android") return true;

    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT
    );

    if (!granted) {
      Alert.alert(
        "Permission Required",
        "Please enable Nearby Devices permission in Settings to use the printer."
      );
      return false;
    }
    return true;
  };

  /* ---------------- Print ---------------- */
  const printBill = async () => {
    try {
      const ok = await ensureBluetoothPermission();
      if (!ok) return;

      // console.log("Printing via Bluetooth...");

   
      const payload =
        "F2C PRINTER TEST\n" +
        "CX588 - 58mm\n\n" +
        "Item 1        50\n" +
        "Item 2        30\n" +
        "-------------------------------\n" +
        "TOTAL         80\n\n" +
        "Thank You\n\n\n\n";

      await ThermalPrinter.printBluetooth(
        PRINTER_MAC,
        payload,
        {
          printerWidthMM: 58,
          printerNbrCharactersPerLine: 32,
          mmFeedPaper: 20, 
        }
      );

      Alert.alert("Success", "Printed successfully");
    } catch (e: any) {
      console.log("PRINT ERROR:", e);
      Alert.alert(
        "Printer Error",
        e?.message || "Failed to print"
      );
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      <Text style={{ fontSize: 18, marginBottom: 20 }}>
        F2C CX588 Printer Test
      </Text>

      <TouchableOpacity
        onPress={printBill}
        style={{
          backgroundColor: "#16a34a",
          paddingVertical: 14,
          paddingHorizontal: 28,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 16 }}>
          Print Test Bill
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PrinterTestScreen;
