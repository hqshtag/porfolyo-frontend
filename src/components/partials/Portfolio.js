import React from "react";
import styled from "styled-components";
import { Avatar, SmallAvatar } from "../Profile";
import ImageViewer from "react-simple-image-viewer";
import { Link } from "react-router-dom";

const Portfolio = ({ portfolio, showAuthor = true }) => {
  const [currentImage, setCurrentImage] = React.useState(0);
  const [isViewerOpen, setIsViewerOpen] = React.useState(false);
  const images = portfolio?.photos.map(
    (img, k) =>
      `http://localhost:3100/portfolio/${portfolio._id}/image/${k + 1}`
  );

  const openImageViewer = React.useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  const authorAvatar = portfolio?.author?._id ? (
    <SmallAvatar
      src={`http://localhost:3100/users/${portfolio.author._id}/avatar`}
      alt=""
    />
  ) : (
    <SmallAvatar
      src={`https://ui-avatars.com/api/?name=${portfolio?.author?.username}`}
      alt=""
    />
  );

  return (
    <PortfolioContainer>
      <div>
        <h3>{portfolio.title}</h3>
        <p className="details">{portfolio.description}</p>
      </div>
      {images.slice(0, 1).map((src, index) => (
        <PortoflioImage
          src={src}
          onClick={() => openImageViewer(index)}
          width="300"
          key={index}
          style={{ margin: "2px" }}
          alt=""
        />
      ))}

      {isViewerOpen && (
        <ImageViewer
          src={images}
          currentIndex={currentImage}
          disableScroll={false}
          closeOnClickOutside={true}
          onClose={closeImageViewer}
        />
      )}
      {showAuthor && (
        <Link to={`/profile/${portfolio.author._id}`}>
          <UserDetails>
            {authorAvatar}
            <h4>{portfolio.author.username}</h4>
          </UserDetails>
        </Link>
      )}
    </PortfolioContainer>
  );
};

const PortfolioContainer = styled.div`
display: flex;
justify-content: space-around;
align-items: center;
flex-direction: column;
  margin: 1rem 1.8rem;
  width: 240px;
  height: 290px;
  background: white;
  border-radius: 14px;
  box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
`;



const PortoflioImage = styled.img`
  padding: 0;
  margin: 0;
  max-width: 220px;
  max-height: 260px;
`;

const UserDetails = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export default Portfolio;
