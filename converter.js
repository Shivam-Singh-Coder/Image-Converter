function convertImage() {
    const fileInput = document.getElementsByName('image-converter');  // Get the file input element
    const file = fileInput[0].files[0];  // Get the selected file (first image in case of multiple uploads)
    const selectedFormat = document.getElementById('formatSelect').value;  // Get the selected format
  
    if (file) {
      const img = new Image();  // Create a new Image object
      img.src = URL.createObjectURL(file);  // Set the image source to the uploaded file
  
      img.onload = function() {  // When the image has fully loaded
        const canvas = document.createElement('canvas');  // Create a new canvas element
        const ctx = canvas.getContext('2d');  // Get the drawing context of the canvas
        canvas.width = img.width;  // Set the canvas width to match the image
        canvas.height = img.height;  // Set the canvas height to match the image
        ctx.drawImage(img, 0, 0);  // Draw the image on the canvas at the top-left corner
  
        // Convert the image to the selected format
        canvas.toBlob(function(blob) {
          const link = document.createElement('a');  // Create an anchor element (for downloading)
          link.href = URL.createObjectURL(blob);  // Create a URL for the image blob
          link.download = 'converted_image.' + selectedFormat;  // Set the download filename (with selected format extension)
          link.click();  // Trigger a click event to start the download
        }, 'image/' + selectedFormat);  // Specify the MIME type based on the selected format (jpeg, png, etc.)
      };
    }
} 