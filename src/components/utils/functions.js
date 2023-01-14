export const isValidImage = image => {
    const supportedExtentions = "image/jpg , image/jpeg , image/png";
    const imageMaxSize = 15000000; // max image size in bytes (15mb) 
    const currentImage = image;
    const currentImageSize = currentImage.size;
    const currentImageType = currentImage.type;
    const isValidType = supportedExtentions.includes(currentImageType);
    if (currentImageSize > imageMaxSize) {
      return false;
    }
    if (!isValidType) {
      return false;
    }
    return true;
  };
  

  export  function removeDuplicates(arr) {
    return arr.filter((item, 
        index) => arr.indexOf(item) === index);
}

export function blobToBase64(blob) {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }