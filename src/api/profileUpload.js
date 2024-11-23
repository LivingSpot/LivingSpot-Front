import axios from "axios";

/**
 * Profile image upload API
 * @param {File} imageFile - The profile image file
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export async function uploadProfileImage(imageFile) {
  const formData = new FormData();
  formData.append("file", imageFile); // Adjust the key name based on the backend's expected parameter

  try {
    console.log("POST: Uploading image...");
    return axios.post("http://localhost:8080/member/upload-profile-image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    console.error("Image upload failed:", error);
    throw error;
  }
}
