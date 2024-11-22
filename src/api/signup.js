import axios from "axios";

/**
 * 회원가입 api
 * @param userEmail
 * @param userName
 * @param userNickname
 * @param password
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export async function signup(userEmail, userName, userNickname, password) {
  const signUpDto = {
    userEmail,
    userName,
    userNickname,
    password,
  };

  try {
    // axios를 이용해 POST 요청
    console.log("post요청중!!!");
    return axios({
      method: "post",
      url: "http://localhost:8080/signup",
      data: signUpDto,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("회원가입 요청 실패:", error);
    throw error; // 호출한 곳에서 오류를 처리할 수 있도록 다시 던짐
  }
}
