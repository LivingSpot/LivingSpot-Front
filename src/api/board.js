import axios from "axios";

const token = localStorage.getItem("access_token");

export async function searchAllArticles() {
  return await axios({
    method: "get",
    url: "http://localhost:8080/board/list",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function searchOneArticle(articleNo) {
  return await axios({
    method: "get",
    url: "http://localhost:8080/board/detail",
    params: { articleNo },
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function updateArticle(articleNo, title, content, type) {
  const updateDto = {
    articleNo,
    title,
    content,
    type,
  };
  console.log(updateDto);
  return await axios({
    method: "post",
    url: "http://localhost:8080/board/update",
    params: updateDto,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function deleteArticle(articleNo) {
  return await axios({
    method: "post",
    url: "http://localhost:8080/board/delete",
    params: { articleNo },
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function writeArticle(title, content, type) {
  console.log(title, content, type);
  const writeDto = {
    title,
    content,
    type,
  };
  console.log(writeDto);
  return await axios({
    method: "post",
    url: "http://localhost:8080/board/write",
    params: writeDto,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function changeToName(id) {
  return await axios({
    method: "get",
    url: "http://localhost:8080/board/change",
    params: { id },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}
