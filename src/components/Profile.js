import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import PortfolioServices from "../services/PortfolioServices";
import UserServices from "../services/UserServices";
import Portfolio from "./partials/Portfolio";
import { PortfoliosDisplay } from "./Portfolios";

const Profile = ({ openEditPopup, openPortfolioEdit,selectPortfolio, update, search }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [userProfile, setUserProfile] = React.useState({});
  const [userPortfolios, setUserPortfolios] = React.useState([]);

  const [userAvatarSrc, setUserAvatarSrc] = React.useState("");

  const canEdit = localStorage.getItem("id#username")?.split("#")[0] === id;

  React.useEffect(() => {
    (async () => {
      try {
        setUserProfile((await UserServices.getOneById(id)).data.data);
        const response = await PortfolioServices.getByUserId(id);
        setUserPortfolios(response.data.data);
      } catch (error) {
        navigate("/");
      }
    })();
  }, [id, navigate, update]);

  React.useEffect(() => {
    if (userProfile?.avatar) {
      setUserAvatarSrc(`http://localhost:3100/users/${userProfile._id}/avatar`);
    } else
      setUserAvatarSrc(
        `https://ui-avatars.com/api/?name=${userProfile.username}`
      );
  }, [userProfile, update, userProfile?.avatar]);

  const forwardedSelectPortfolio = (portfolio) => {
    if (canEdit) {
      selectPortfolio(portfolio);
      openPortfolioEdit(true);
    } else {
      console.log(portfolio);
    }
  };

  const portfoliosRender = Array.isArray(userPortfolios) && userPortfolios.length > 0
    ? userPortfolios.filter((p) => {
      return (
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase()) ||
        p.hashtags?.find((hashtag) => hashtag.label === search.toLowerCase())
      );
    }).map((p, k) => (
        <Portfolio
          portfolio={p}
          key={k}
          showAuthor={false}
          select={(p) => forwardedSelectPortfolio(p)}
        />
      ))
    : [];

  return (
    <div>
      <GoBack onClick={() => navigate("/")}>❮❮</GoBack>
      {canEdit && <EditButton onClick={openEditPopup}>✒️ Edit</EditButton>}
      <Container>
        <Avatar src={userAvatarSrc} alt="" key={Date.now()} />

        <div>
          <h3>{userProfile.username}</h3>
          <h4>{userProfile.email}</h4>
        </div>
      </Container>
      <PortfoliosDisplay>
        {portfoliosRender.length
          ? portfoliosRender
          : "Il n’y a rien à voir ici"}
      </PortfoliosDisplay>
    </div>
  );
};
const GoBack = styled.span`
  position: absolute;
  top: 80px;
  left: 42px;

  height: 40px;
  width: 40px;

  font-size: 20px;
  background: rgba(0, 0, 0, 0.5);
  color: white;

  border-radius: 50%;

  line-height: 38px;

  padding-right: 2px;
`;

const EditButton = styled.button`
position: absolute;
right: 100px;
margin: 4px;
width: 80px;
height: 30px;
border-radius: 18px;
color: #111111;
background-color: #ffffff;
line-height: 2px;
`

const Container = styled.div`
  margin: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #DEF;
  padding: 8px 14px;
  > div {
    display: flex;
    flex-direction: column;
    justify-content: start;
    width: 70vw;
    text-align: left;
  }
  h4,
  h3 {
    padding: 0;
    margin: 0;
    margin-left: 24px;
    color: #1c1c1c;
  }
`;

export const Avatar = styled.img`
  height: 58px;
  width: 58px;
  border-radius: 50%;
  object-fit: cover;
`;
export const SmallAvatar = styled.img`
  height: 37px;
  width: 37px;
  border-radius: 50%;
  margin: 2px;
  object-fit: cover;
`;

export default Profile;
