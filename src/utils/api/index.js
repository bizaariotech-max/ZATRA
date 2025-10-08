import axios from "axios"
import { __apiFormHeader, __apiHeader, __authToken } from "./constantfun"

// const __LIVE = process.env.REACT_APP_LIVE
// const __LOCAL = process.env.REACT_APP_LOCAL


// export const BASE_URL = "https://roadsafety-backend.onrender.com"
export const BASE_URL = "https://zatra-server.onrender.com" || "http://localhost:3050"


const __getApiData = (endpoint, params = {}) => {
  console.log(endpoint, "endpoint")
  return axios
    .get(`${BASE_URL}${endpoint}`, { ...__apiHeader(), params })
    .then(response => {
      return response.data
    })
    .catch(error => {
      console.error("API Error:", error)
      throw error
    })
}

const __postApiData = (endpoint, data, type) => {
  // console.log(endpoint, "endpoint", data, "payload", type, "type")
  return axios
    .post(
      `${BASE_URL}${endpoint}`,
      data,
      type == "form" ? __apiFormHeader() : __apiHeader(),
      {
        onUploadProgress: ({ progress }) => {
          console.log("onUploadProgress", (progress * 100).toFixed(2))
        },
        onDownloadProgress: ({ progress }) => {
          console.log("onDownloadProgress", (progress * 100).toFixed(2))
        },
      }
    )
    .then(response => {
      return response.data
    })
    .catch(error => {
      console.error("API Error:", error)
      throw error
    })
}

const __putApiData = (endpoint, data, type) => {
  console.log(endpoint, "endpoint", data, "payload", type, "type")
  return axios
    .put(
      `${BASE_URL}${endpoint}`,
      data,
      type == "form" ? __apiFormHeader() : __apiHeader()
    )
    .then(response => {
      return response.data
    })
    .catch(error => {
      console.error("API Error:", error)
      throw error
    })
}

const __deleteApiData = endpoint => {
  console.log(endpoint)
  return axios
    .delete(`${BASE_URL}${endpoint}`, __apiHeader())
    .then(response => {
      return response.data
    })
    .catch(error => {
      console.error("API Error:", error)
      throw error
    })
}

export { __getApiData, __postApiData, __putApiData, __deleteApiData }

// import axios from "axios"

// const request = (
//   method,
//   endpoint,
//   data = null,
//   type = null,
//   onProgress = null
// ) => {
//   console.log(endpoint, "endpoint", data, "payload", type, "type")

//   const config = {
//     method,
//     url: `${BASE_URL}${endpoint}`,
//     headers: type === "form" ? __apiFormHeader() : __apiHeader(),
//     data,
//     onUploadProgress: onProgress
//       ? event => {
//           const progress = ((event.loaded / event.total) * 100).toFixed(2)
//           console.log("Upload Progress:", progress + "%")
//           onProgress(progress, "upload")
//         }
//       : undefined,
//     onDownloadProgress: onProgress
//       ? event => {
//           const progress = ((event.loaded / event.total) * 100).toFixed(2)
//           console.log("Download Progress:", progress + "%")
//           onProgress(progress, "download")
//         }
//       : undefined,
//   }

//   return axios(config)
//     .then(response => response.data)
//     .catch(error => {
//       console.error("API Error:", error)
//       throw error
//     })
// }

// const __getApiData = (endpoint, onProgress) =>
//   request("get", endpoint, null, null, onProgress)

// const __postApiData = (endpoint, data, type, onProgress) =>
//   request("post", endpoint, data, type, onProgress)

// const __putApiData = (endpoint, data, type, onProgress) =>
//   request("put", endpoint, data, type, onProgress)

// const __deleteApiData = (endpoint, onProgress) =>
//   request("delete", endpoint, null, null, onProgress)

// export { __getApiData, __postApiData, __putApiData, __deleteApiData }
