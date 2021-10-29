import axios from "axios";

const Kakao = axios.create({
  baseURL: "https://dapi.kakao.com", // 공통 요청 경로를 지정해준다.
  headers: {
    Authorization: "KakaoAK 38095ad2bbeec69dc46b2ec65238801d" // 공통으로 요청 할 헤더
  }
});
// search blog api
export const bookSearch = (params) => {
  return Kakao.get("/v3/search/book", { params });
};
