import { colors } from '@/lib/colors'
import React, {useState} from 'react'
import { Pressable, StyleSheet, Text, View, Image } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import * as ImagePicker from 'expo-image-picker' // upload gallery
import * as ImageManipulator from 'expo-image-manipulator' // compress image
import { ReportIssueFormType } from './Report'
import * as FileSystem from 'expo-file-system'; // check image size


interface ImageType {
  setInputValue: React.Dispatch<React.SetStateAction<ReportIssueFormType>>
  inputValue: ReportIssueFormType
}

const ImageUpload = ({ inputValue, setInputValue }: ImageType) => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)
  const handleSaveImage = (image: string) => {
    setInputValue(prev => ({ ...prev, image }))
  }

    // Max allowed size: 2MB = 2 * 1024 * 1024 bytes
    const MAX_SIZE = 2 * 1024 * 1024;


  const pickImage = async () => {
    // Ask permission first
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert(`Permission required, Please allow access to photos`);
      return;
    }

    // Launch picker
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images', 'videos'], // 👈 updated, no deprecation warning
        allowsEditing: true,
        quality: 1,
      });
  

    if (!result.canceled) {
        let uri = result.assets[0].uri;
  
        // Optimize image before upload
        const manipulated = await ImageManipulator.manipulateAsync(
          uri,
          [{ resize: { width: 800 } }], // Resize to max width 800px
          { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
        );
  
        // Check file size
        const fileInfo = await FileSystem.getInfoAsync(manipulated.uri);
        if (fileInfo.exists && fileInfo.size && fileInfo.size > MAX_SIZE) {
          setErrorMessage(`File too large, Please choose an image under 2MB.`);
          return;
        }
  
        handleSaveImage(manipulated.uri);
      }
  }
  console.log(inputValue)
  return (
    <View style={{ marginTop: 25 }}>
      <Text style={styles.text}>Attach Screenshot / File (optional)</Text>
      <View style={styles.wrapper}>
        <Pressable
          style={{ justifyContent: 'center', alignItems: 'center' }}
          onPress={pickImage}
        >
          <Ionicons name="cloud-upload-outline" size={24} color="black" />
          <Text style={styles.uploadText}>Upload file or Browse</Text>
          <Text style={styles.file}>Max File size: 2 MB</Text>
        </Pressable>
      </View>
      {errorMessage && 
        <Text style={{fontSize: 10, fontWeight: '400', color: colors.red}}>
            {errorMessage}
        </Text>}
        {inputValue.image && (
            <View style={{ width: '100%', height: 180, marginTop: 10 }}>
              <Image
                source={{ uri: inputValue.image }}
                style={{ width: '100%', height: '100%', borderRadius: 6 }}
              />
            </View>
        )}
    </View>
  )
}

export default ImageUpload

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Inter_500Medium',
    fontWeight: '500',
    fontSize: 14,
    color: colors.black,
    marginBottom: 3,
  },
  wrapper: {
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: colors.gray,
    paddingVertical: 50,
    borderRadius: 5,
    marginTop: 6,
  },
  uploadText: {
    fontWeight: '400',
    fontSize: 13,
    fontFamily: 'LibreFranklin_400Regular',
    marginTop: 2,
  },
  file: {
    color: colors.gray,
    fontWeight: '400',
    fontSize: 10,
    fontFamily: 'LibreFranklin_400Regular',
    marginTop: 1,
  },
})
