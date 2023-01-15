import React from "react";
import { WithContext as ReactTags } from "react-tag-input";
import { toast } from "react-toastify";
import styled from "styled-components";
import { Button, Container, Form, Label } from "../components/FormComponents";
import { PortfolioDropzone } from "../components/partials/Dropzone";
import { removeDuplicates } from "../components/utils/functions";
import PortfolioServices from "../services/PortfolioServices";

function UploadPortfolioForm({ editMode, selectedPortfolio, closeModal, setPortfolioEditMode }) {
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
    if (editMode) {
      await PortfolioServices.update({
        _id: selectedPortfolio?._id,
        title: formState.title,
        description: formState.description,
        hashtags: hashtags.map((h) => h.text),
      }).then((res) => {
        setHashtags([]);
        setFormState({ title: "", description: "" });
        setPortfolioEditMode(false);
        closeModal();
        toast.success(`Votre projet a été Modifier`, {
          position: "bottom-center",
          autoClose: 3500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
    } else {
      await PortfolioServices.create({
        title: formState.title,
        description: formState.description,
        hashtags: hashtags.map((h) => h.text),
      }).then(async (res) => {
        await PortfolioServices.uploadPortfolioImages(
          res.data._id,
          portfolioPhotos
        );
        setPortfolioPhotos([]);
        setHashtags([]);
        setFormState({ title: "", description: "" });
        closeModal();
        toast.success(`Votre projet a été ajouter`, {
          position: "bottom-center",
          autoClose: 3500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
    }
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
  console.log(editMode)
  return (
    <Container>
      <Form>
        <Label htmlFor="title">
          Titre
          <input
            name="title"
            type="text"
            value={formState.title}
            onChange={handleFormChange}
          />
        </Label>
        <Label htmlFor="description">
          Description
          <textarea
            name="description"
            type="text"
            value={formState.description}
            onChange={handleFormChange}
            rows={4}
          />
        </Label>
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
        {!editMode && (
          <PortfolioDropzone
            onDrop={handleOnDrop}
            accept={supportedExtentions}
            multiple={true}
            maxSize={20}
          />
        )}

        <Button onClick={handleSubmit}>Sauvgarde</Button>
      </Form>
    </Container>
  );
}



export default UploadPortfolioForm;
