import * as ImagePicker from "expo-image-picker";
import React from "react";
const useCameraPermission = () => {
  const [granted, setGranted] = React.useState<boolean>(false);

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted) {
      (async () => {
        const { granted } = await ImagePicker.getCameraPermissionsAsync();
        if (granted) {
          setGranted(granted);
        } else {
          const { granted } = await ImagePicker.requestCameraPermissionsAsync();
          setGranted(granted);
        }
      })();
    }
    return () => {
      mounted = false;
    };
  }, []);
  return { granted };
};

export default useCameraPermission;
