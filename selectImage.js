const selectImage = () => {
    const options = {
      maxWidth: 2000,
      maxHeight: 2000,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {

				console.log(response)

				if(response && response?.url != undefined){
					const source = {uri: response?.uri};
					console.log(source);
					setImage(source);
				}else if(response && response?.assets != undefined && response.assets.length > 0){
					setImage(response.assets[0]);
				}
        
      }
    });
  };
