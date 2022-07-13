// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios"

const baseApi = "https://api.github.com"
//   "https://api.github.com/users/{user}"
//  "user_repositories_url": "https://api.github.com/users/{user}/repos{?type,page,per_page,sort}",
//  "user_search_url": "https://api.github.com/search/users?q={query}{&page,per_page,sort,order}"

//  "repository_url": "https://api.github.com/repos/{owner}/{repo}",
//  "repository_search_url": "https://api.github.com/search/repositories?q={query}{&page,per_page,sort,order}",


export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}

const getUser = async (user) => {
  const res = axios.get(`${baseApi}/users/${user}`).then(response => {
    return response.data
  }).catch((err) => err.response.data.message)

  return res;
}
const getRepo = (repo) => {

  
  const response= axios.get(`${baseApi}/search/repositories?q=${repo}{&page,5,sort,order}`).then((response) => {
    return response.data
  }).catch((err) => err)

  return response;
}

module.exports = {
  getRepo,
  getUser
}