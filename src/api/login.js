import axios from "axios";

/**
 * 로그인 api
 * @param username
 * @param password
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export async function login(userEmail, password) {
  const loginDto = {
    userEmail,
    password,
  };
  return await axios({
    method: "post",
    url: "http://localhost:8080/login",
    data: loginDto,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

/**
 * 토큰을 사용해 유저 정보 api
 * @param token
 * @returns {Promise<void>}
 */
export async function getUserInfo(token) {
  return await http.get("/api/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
