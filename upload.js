const uploadImage = async () => {

		await auth()
		.signInAnonymously()
		.then(() => {
			setUploading(true);
			console.log('user logged in anonymously.');
		})
		.catch((error) => {
			if (error.code === 'auth/operation-not-allowed') {
				console.log('Enable anonymous in your firebase console.');
			}
			console.error(error);
		});
		const avatar = storage().ref(`/profile/${formData.id}/profile-image.png`);
    const {uri} = image;
    let task; // 👈 Add this
    if (uri) {
      const uploadUri =
        Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      // setUploading(true);
      setTransferred(0);
      task = avatar.putFile(uploadUri); // 👈 Remove const here
      // set progress state
      task.on('state_changed', snapshot => {
        setTransferred(
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000,
        );
      });
    }
    try {
      await task;
    } catch (e) {
      console.error(e);
    }
    setUploading(false);
		setloading(false);

		let url = await avatar.getDownloadURL()
		setImageUrl(url)
		return url
		
  };
