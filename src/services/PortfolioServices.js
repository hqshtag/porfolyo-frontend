import { AxiosClient } from "./AxiosClient";

class PortfolioServices {
  getAll = async () => {
    return await AxiosClient.get("/portfolio/");
  };
  getOne = async (id) => {
    return await AxiosClient.get(`/portfolio/${id}`);
  };
  getByUserId = async (id) => {
    return await AxiosClient.get(`/portfolio/user/${id}`);
  }
  create = async ({title, description, hashtags}) => {
    const token = localStorage.getItem("auth-token");
    return await AxiosClient.post(`/portfolio/`, {title, description, hashtags},{
        headers: {
            "auth-token": `${token}`,
          }
    });
  }
  update = async ({_id, title, description, hashtags}) => {
    const token = localStorage.getItem("auth-token");
    return await AxiosClient.patch(`/portfolio/${_id}`, {title, description, hashtags}, {
        headers: {
            "auth-token": `${token}`,
          }
    });
  }

  uploadPortfolioImages = async (_id, images) => {
    const token = localStorage.getItem("auth-token");
    const form = new FormData();
   images.forEach((img)=> {
    form.append("photos", img.file);
   })

    return await AxiosClient.post(`/portfolio/multi-upload/${_id}`, form, {
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
    });
  }

  appendOneImagePortfolio = async (_id, image) => {
    const token = localStorage.getItem("auth-token");
    const form = new FormData();
    form.append("image", image);

    return await AxiosClient.post(`/portfolio/single-upload/${_id}`, form, {
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
    });
  }

  getSingleImage = async (_id, index) => {
    return await AxiosClient.get(`/portfolio/${_id}/image/${index}`)
  }

  
}



// eslint-disable-next-line import/no-anonymous-default-export
export default new PortfolioServices();

