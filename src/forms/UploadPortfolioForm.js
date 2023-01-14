import React from "react";
import { WithContext as ReactTags } from "react-tag-input";
import styled from "styled-components";
import { PortfolioDropzone } from "../components/partials/Dropzone";
import { removeDuplicates } from "../components/utils/functions";
import PortfolioServices from "../services/PortfolioServices";


function UploadPortfolioForm() {
  const [portfolioPhotos, setPortfolioPhotos] = React.useState([]);
  const supportedExtentions = "image/jpg , image/jpeg , image/png";

  const [hashtags, setHashtags] = React.useState([]);

  const [formState, setFormState] = React.useState({
    title: "",
    description: "",
  });

  const handleFormChange = (e) => {
    setFormState((previouState) => {
      return {
        ...previouState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHashtags(removeDuplicates(hashtags));
    setPortfolioPhotos(removeDuplicates(portfolioPhotos));
  //   console.log(e);
    await PortfolioServices.create({
        title: formState.title,
        description: formState.description,
        hashtags: hashtags.map(h=>h.text)
    }).then(async (res) => {
        console.log(res);

        await PortfolioServices.uploadPortfolioImages(res.data._id, portfolioPhotos)
        setPortfolioPhotos([]);
        setHashtags([]);
        setFormState({title: "",
        description: ""});
    })

  };

  const handleDelete = (i) => {
    setHashtags(hashtags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setHashtags([...hashtags, tag]);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = hashtags.slice();
    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);
    // re-render
    setHashtags(newTags);
  };

  const handleTagClick = (index) => {
    console.log("The tag at index " + index + " was clicked");
  };

  const handleOnDrop = (acceptedFiles) => {
    acceptedFiles.map((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPortfolioPhotos((p) => {
          if (p.length < 20)
            return [...p, { src: e.target.result, file, progress: 0 }];
          else return p;
        });
      };
      reader.readAsDataURL(file);
      return file;
    });
  };

  return (
    <div>
      Upload YOUR Portfolio 
      <form>
        <label htmlFor="title">
          Title
          <input
            name="title"
            type="text"
            value={formState.title}
            onChange={handleFormChange}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            name="description"
            type="text"
            value={formState.description}
            onChange={handleFormChange}
          />
        </label>
        <ReactTags
          tags={hashtags}
          /*suggestions={suggestions}*/
          handleDelete={handleDelete}
          handleAddition={handleAddition}
          handleDrag={handleDrag}
          handleTagClick={handleTagClick}
          inputFieldPosition="bottom"
          autocomplete
        />
        <PortfolioDropzone
          onDrop={handleOnDrop}
          accept={supportedExtentions}
          multiple={true}
          maxSize={20}
        />

        <button onClick={handleSubmit}>Save</button>
      </form>
    </div>
  );
}


export default UploadPortfolioForm;
