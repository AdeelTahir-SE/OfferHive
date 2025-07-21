export async function checkAspectRatio(file: File): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      const width = img.width;
      const height = img.height;
      const aspectRatio = width / height;
      console.log(`Aspect Ratio: ${aspectRatio.toFixed(2)} (${width} x ${height})`);

      const isValid = Math.abs(aspectRatio - 16 / 9) < 0.05;
      if (!isValid) {
        alert("⚠️ Image must be 16:9 aspect ratio");
      }
      resolve(isValid);
    };

    img.onerror = () => {
      alert("Could not load image to check aspect ratio");
      reject(false);
    };
  });
}

