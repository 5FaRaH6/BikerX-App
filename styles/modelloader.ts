import * as FileSystem from 'expo-file-system/legacy';

export async function downloadModel(modelUrl: string) {
  const fileName =
    modelUrl.split('/').pop() || 'bike.glb';

  const localUri =
    FileSystem.cacheDirectory + fileName;

  const fileInfo =
    await FileSystem.getInfoAsync(localUri);

  if (!fileInfo.exists) {
    await FileSystem.downloadAsync(
      modelUrl,
      localUri
    );
  }

  return localUri;
}