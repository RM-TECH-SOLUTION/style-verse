import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
  Platform,
} from "react-native";

// ✅ Correct usage for react-native-thermal-printer
const ThermalPrinter = require("react-native-thermal-printer").default;

const PRINTER_MAC = "66:32:03:77:90:E1";

const requestBluetoothPermission = async () => {
  if (Platform.OS !== "android") return true;

  if (Platform.Version >= 31) {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
    ]);

    return (
      granted[PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT] ===
        PermissionsAndroid.RESULTS.GRANTED &&
      granted[PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN] ===
        PermissionsAndroid.RESULTS.GRANTED
    );
  }

  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
  );
  return granted === PermissionsAndroid.RESULTS.GRANTED;
};

export default function PrinterTestScreen1() {
  const printBill = async () => {
    try {
      const hasPermission = await requestBluetoothPermission();
      if (!hasPermission) {
        Alert.alert("Permission denied");
        return;
      }

      // console.log("Printing via Bluetooth...");

      // 🔥 VERY IMPORTANT: use \r\n (CRLF), not \n
      const payload =
        "F2C STORE\r\n" +
        "------------------------------\r\n" +
        "Item 1            50\r\n" +
        "Item 2            30\r\n" +
        "------------------------------\r\n" +
        "TOTAL             80\r\n" +
        "\r\n\r\n\r\n"; // buffer flush

      await ThermalPrinter.printBluetooth(
        PRINTER_MAC,
        payload,
        {
          printerWidthMM: 58,
          printerNbrCharactersPerLine: 32,
          mmFeedPaper: 30, // 🔥 forces print output
        }
      );

      Alert.alert("Success", "Printed successfully");
    } catch (error: any) {
      console.log("PRINT ERROR:", error);
      Alert.alert("Printer Error", error?.message || "Print failed");
    }
  };

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
        CX588 Printer Test
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
}
