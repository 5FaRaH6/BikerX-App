import { View } from "react-native";
import { WebView } from "react-native-webview";

type Props = {
  modelUrl: string;
  onTouchStart?: () => void;
  onTouchEnd?: () => void;
};

export default function Bike3DViewer({
  modelUrl,
  onTouchStart,
  onTouchEnd,
}: Props) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <script
          type="module"
          src="https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js">
        </script>

        <style>
          html, body {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            background: #101010;
          }

          model-viewer {
            width: 100%;
            height: 100%;
            background: #101010;
          }
        </style>
      </head>

      <body>
        <model-viewer
          src="${modelUrl}"
          camera-controls
          auto-rotate
          shadow-intensity="1"
          exposure="1"
        >
        </model-viewer>
      </body>
    </html>
  `;

  return (
    <View
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      style={{
        width: "100%",
        height: 280,
        overflow: "hidden",
        borderRadius: 16,
      }}
    >
      <WebView
        source={{ html }}
        originWhitelist={["*"]}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        mixedContentMode="always"
        allowsInlineMediaPlayback={true}
        style={{
          backgroundColor: "#101010",
        }}
      />
    </View>
  );
}
