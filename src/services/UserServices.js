import { AxiosClient } from "./AxiosClient"



class UserServices {
    getAll = async () => {
        return await AxiosClient.get("/users");
    }
    getOneById = async (id) => {
        return await AxiosClient.get(`/users/${id}`)
    }

    uploadUserAvatar = async (image) => {
        const token = localStorage.getItem("auth-token");
        const form = new FormData();
        form.append("image", image.file);
        return await AxiosClient.post("/users/upload-avatar", form, {
            headers: {
                "auth-token": `${token}`,
                "Content-Type": "multipart/form-data",
              },
              onUploadProgress: (progressEvent) => {
                let percentCompleted = Math.floor(
                  (progressEvent.loaded * 100) / progressEvent.total
                );
                console.log(percentCompleted);
                // do whatever you like with the percentage complete
                // maybe dispatch an action that will update a progress bar or something
              },
        })
    }

    updateUserDetails = async ({username, email, password, _id}) => {
        const token = localStorage.getItem("auth-token");

        return await AxiosClient.patch(`/users/${_id}`,  {username, email, password },{
            headers: {
                "auth-token": `${token}`
            } 
        })
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new UserServices();