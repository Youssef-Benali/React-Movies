import axios from "axios";
import logger from "./logService";
import { toast } from "react-toastify";

/*
* Interceptors can handle error and response and log them, in this case we only deal with
* error object that's why we set null for the first paramater

* We handling unexpected error to prevent rewriting it every time we need it

*Expected (404: not found, 400: bad request (wrong password)) - CLIENT ERRORS
- Display a specific error message to the user

*Unexpected (network down, server down, db down, bug)
- Log them
- Display a generic and friendly error message
*/

// On each http request, we set the x auth token to the current user token
//  ! Bi-directional Dependencies
axios.defaults.headers.common["x-auth-token"] = auth.getJwt();

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    logger.log(error);
    toast("An unexpected error occured.");
  }

  return Promise.reject(error);
});

function setJwt(jwt){
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt
};




// axios.patch(apiEndPoint + "/" + post.id, {title: post.title});

// *patch // update one or more properties
// *put // update all properties

// ! If in the future we want to use an another http client,
// ! this is the place were we make the necessary change
