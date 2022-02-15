import axios from 'axios';
import qs from 'qs';

// export const login = async (username, password) => {
//   try {
//     const options = {
//       username: username,
//       password: password,
//     };

//     const response = await axios({
//       method: `POST`,
//       url: `/users/login`,
//       data: qs.stringify(options),
//     });
//     if (response.statusText === `OK`) alert(response, response.data, response.data.user);
//   } catch (error) {
//     console.log(error);
//   }
// };

// try {
//   const options = {
//     username: username,
//     password: password,
//   };

//   const response = await axios({
//     method: `GET`,
//     url: `/users/login`,
//     data: qs.stringify(options),
//   });
//   if (response.statusText === `OK`) alert(response, response.data, response.data.user);
// } catch (error) {
//   console.log(error);
// }

export const login = async (username, password) => {
  try {
    const options = {
      username: username,
      password: password,
    };

    const response1 = await axios({
      method: `POST`,
      url: `/App/user`,
      data: qs.stringify(options),
    });
    if (response1.statusText === 'OK') {
      let user = response1.data.data.user;
      console.log(response1);
      console.log(user);
      const options = {
        username: username,
        password: password,
        id: user._id,
      };
      const response2 = await axios({
        method: `POST`,
        url: `/App/users/${user._id}`,
        data: qs.stringify(options),
      });
      if (response2.statusText === 'OK') {
        document.open(`text/html`).write(response2.data);
        window.location.assign(`/App/users/${user._id}`);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (id) => {
  try {
    const response = await axios({
      method: 'GET',
      url: `/App/users/${id}/logout`,
    });
    console.log(response);
    if (response.data.status === 'Success') {
      window.location.assign(`/App`);
    }
  } catch (error) {
    console.log(error);
  }
};
