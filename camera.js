import React, {PureComponent} from 'react';
import {Image, StyleSheet, View, Button, TouchableOpacity} from 'react-native';
import {RNCamera} from 'react-native-camera';
import RNFS from 'react-native-fs';

export default class Camera extends PureComponent {  constructor(props) {
  super(props);
    this.state = {
      takingPic: false,
    };
  }

  takePicture = async () => { 
    if (this.camera) { 
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      const currentDate = new Date();
      const fileName = currentDate.getTime() + '.jpg';
      const savePath = RNFS.PicturesDirectoryPath + '/' + fileName;
      RNFS.writeFile(savePath, data.base64, 'base64') 
      .then(() => { console.log('Picture saved to: ' + savePath); }) 
      .catch((error) => { console.error('Error saving picture: ' + error); 
      }); 
    }
  };
  render() {
    return (
      <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        captureAudio={false}
        style={{flex: 1, width: '100%'}}
        type={RNCamera.Constants.Type.back}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}>
        <TouchableOpacity
        activeOpacity={0.5}
        style={styles.btnAlignment}
        onPress={this.takePicture}>
        <Image style={styles.cameraIcon} source={require('./Assets/Pictures/camera.png')} />
        </TouchableOpacity>
      </RNCamera>);
  }
}

  const styles = StyleSheet.create({
    btnAlignment: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginBottom: 20,
    },
    cameraIcon: {
      width: 50,
      height: 50,
    },
  });