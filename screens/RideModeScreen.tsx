import { Linking, Text, TouchableOpacity, View } from 'react-native';

export default function RideModeScreen() {
  function openWaze() {
    const latitude = 32.7940;
    const longitude = 35.0410;

    const url =
      `https://waze.com/ul?ll=${latitude},${longitude}&navigate=yes`;

    Linking.openURL(url);
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#050505',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      }}
    >
      <Text
        style={{
          color: '#FFFFFF',
          fontSize: 26,
          fontWeight: '800',
          marginBottom: 10,
        }}
      >
        Ride Mode
      </Text>

      <Text
        style={{
          color: '#888888',
          fontSize: 14,
          textAlign: 'center',
          marginBottom: 30,
        }}
      >
        Start navigation using Waze.
      </Text>

      <TouchableOpacity
        onPress={openWaze}
        style={{
          width: '100%',
          backgroundColor: '#39FF14',
          paddingVertical: 16,
          borderRadius: 14,
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            color: '#050505',
            fontWeight: '800',
          }}
        >
          OPEN WAZE
        </Text>
      </TouchableOpacity>
    </View>
  );
}