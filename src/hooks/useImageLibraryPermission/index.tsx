import React from "react";
import * as ImagePicker from "expo-image-picker";

const useImageLibraryPermission = () => {
  const [granted, setGranted] = React.useState<boolean>(false);

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted) {
      (async () => {
        const { granted } = await ImagePicker.getMediaLibraryPermissionsAsync();
        if (granted) {
          setGranted(granted);
        } else {
          const { granted } =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
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

export default useImageLibraryPermission;
