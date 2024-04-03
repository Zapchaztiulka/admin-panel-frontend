import axios from "axios";

const key = import.meta.env.VITE_IMGBB_API_KEY;

export const getImageUrl = async(image) => {
    const url = `https://api.imgbb.com/1/upload?key=${key}`;
    try {
        const formData = new FormData();
        formData.append('image', image);
        const response = await fetch(url, {
            method: 'POST',
            body: formData
          });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const imageInfo = {
            url: data.data.url,
            deleteUrl: data.data.delete_url
        }
        deleteImageUrl(data.data.delete_url)
        console.log(imageInfo);
        return imageInfo
      } catch (error) {
        console.error('Error fetching data:', error);
      }
}

export const deleteImageUrl = async(deleteUrl) => {
    try {
        const response = await fetch(deleteUrl, {
            method: 'DELETE'
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log('Image deleted successfully');
    } catch (error) {
        console.error('Error deleting image:', error);
    }
}