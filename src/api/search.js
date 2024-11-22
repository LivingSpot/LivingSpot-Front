import axios from "axios";

/**
 * 로그인 api
 * @param dongName
 * @param aptName
 * @param dealYear
 * @param dealMonth
 * @returns {Promise<axios.AxiosResponse<any>>}
 */

export async function searchDetail(dongName, aptName, dealYear, dealMonth) {
  console.log(dongName, aptName, dealYear, dealMonth);
  const searchDto = {
    dongName,
    aptName,
    dealYear,
    dealMonth,
  };
  return await axios({
    method: "get",
    url: "http://localhost:8080/house/searchDetail",
    params: searchDto,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
