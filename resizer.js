function resizeImage() {
    const fileInput = document.getElementsByName('image-resizer');
    const file = fileInput[0].files[0];  // Get the uploaded image file
  
    const width = parseInt(document.getElementById('width').value);  // Get user-specified width
    const height = parseInt(document.getElementById('height').value);  // Get user-specified height
    const keepAspectRatio = document.getElementById('aspectRatio').checked;  // Check if aspect ratio should be preserved
  
    if (file && (width > 0 || height > 0)) {
      const img = new Image();  // Create an image object
      img.src = URL.createObjectURL(file);  // Create a temporary URL for the uploaded file
  
      img.onload = function() {
        let newWidth = width;
        let newHeight = height;
  
        // If aspect ratio is to be preserved and only one dimension is provided, calculate the other
        if (keepAspectRatio) {
          const aspectRatio = img.width / img.height;
  
          if (!width && height) {
            newWidth = Math.round(height * aspectRatio);
          } else if (!height && width) {
            newHeight = Math.round(width / aspectRatio);
          }
        }
  
        // Create canvas and get its context
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
  
        // Set canvas size to the new dimensions
        canvas.width = newWidth;
        canvas.height = newHeight;
  
        // Draw the image on the canvas
        ctx.drawImage(img, 0, 0, newWidth, newHeight);
  
        // Convert the resized image to a data URL (PNG format)
        const resizedImage = canvas.toDataURL('image/png');
  
        // Set up download link
        const downloadLink = document.getElementById('downloadLink');
        downloadLink.href = resizedImage;  // Set the link href to the resized image
        downloadLink.download = 'resized_image.png';  // Set default download file name
        downloadLink.style.display = 'inline';  // Make the download link visible
        downloadLink.textContent = 'Download Resized Image';  // Update the text content of the link
      };
    } else {
      alert('Please upload an image and specify valid width/height!');
    }
  }
  