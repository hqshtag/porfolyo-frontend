import React from "react";
import styled from "styled-components";
import { SmallAvatar } from "../Profile";
import ImageViewer from "react-simple-image-viewer";
import { Link } from "react-router-dom";

const Portfolio = ({ portfolio, select, showAuthor = true }) => {
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
    <PortfolioContainer onClick={() => select(portfolio)}>
      <TitleContainer>
        <Title>{portfolio.title}</Title>
        <Para>{portfolio.description}</Para>
      </TitleContainer>
      {images.slice(0, 1).map((src, index) => (
        <PortoflioImage
          src={src}
          onClick={() => openImageViewer(index)}
          width="280"
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
      <Hashtags>

      {portfolio.hashtags?.slice(0, 5).map((h, k)=><span key={k} >#{h.label}</span>)}

      </Hashtags>
      {showAuthor && (
        <StyledLink to={`/profile/${portfolio.author._id}`}>
          <UserDetails>
            {authorAvatar}
            <h4 style={{marginLeft: '12px'}}>{portfolio.author.username}</h4>
          </UserDetails>
        </StyledLink>
      )}
    </PortfolioContainer>
  );
};

const StyledLink  = styled(Link)`
     //some CSS styles here
     text-decoration: none;
     width: 98%;
`;

const PortfolioContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  margin: 1rem 1.8rem;
  padding: 8px 16px;
  width: 300px;
  height: 290px;
  background: white;
  border-radius: 14px;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);`;

const Hashtags = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
  width: 95%;

  > span {
    background-color: #eee;
    padding: 1px 3px;
    border-radius: 2px;
    min-width: 20px;
    font-size: 10px;
    margin: 2px;
  }
`

const TitleContainer = styled.div`
  height: 50px;
  width: 98%;
  text-align: left;
`

const Para = styled.p`
  font-size: 11px;
  font-style: italic;
  margin: 1px 4px;
`

const Title = styled.h1`
  font-size: 17px;
  padding: 1px;
  margin: 4px 2px;
`

const PortoflioImage = styled.img`
  object-fit: cover;
  padding: 0;
  margin: 0;
  width: 94%;
  height: 160px;
`;

const UserDetails = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export default Portfolio;
