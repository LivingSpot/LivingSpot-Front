import axios from "axios";

/**
 * 회원가입 API
 * @param userEmail
 * @param userName
 * @param password
 * @param profileImage
 * @returns {Promise<axios.AxiosResponse<any>>}
 */

export async function signup(userEmail, userName, password, profileImage) {
  // FormData를 사용하여 데이터를 전송
  const formData = new FormData();
  formData.append("email", userEmail);
  formData.append("name", userName);
  formData.append("password", password);

  if (profileImage) {
    formData.append("profileImageUrl", profileImage); // 프로필 이미지 추가
  }

  try {
    // axios를 이용해 POST 요청
    console.log("POST 요청 중...");
    return axios({
      method: "post",
      url: "http://localhost:8080/member/signup",
      data: formData,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("회원가입 요청 실패:", error);
    throw error; // 호출한 곳에서 오류를 처리할 수 있도록 다시 던짐
  }
}
