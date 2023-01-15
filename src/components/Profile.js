import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import PortfolioServices from "../services/PortfolioServices";
import UserServices from "../services/UserServices";
import Portfolio from "./partials/Portfolio";
import { PortfoliosDisplay } from "./Portfolios";

const Profile = ({openEditPopup, update}) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [userProfile, setUserProfile] = React.useState({});
  const [userPortfolios, setUserPortfolios] = React.useState([]);

  const [userAvatar, setUserAvatar] = React.useState(null)

  const canEdit = localStorage.getItem('id#username')?.split("#")[0] === id;

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
  
  React.useEffect(()=>{
    console.log(userProfile)
    if(userProfile?.avatar !== userAvatar){
      setUserAvatar(<Avatar
        src={`http://localhost:3100/users/${userProfile._id}/avatar`}
        alt=""
      />)
    }else setUserAvatar(<Avatar
      src={`https://ui-avatars.com/api/?name=${userProfile.username}`}
      alt=""
    />)
  }, [userProfile, update])
  
  const portfoliosRender = Array.isArray(userPortfolios)
    ? userPortfolios.map((p, k) => (
        <Portfolio portfolio={p} key={k} showAuthor={false} />
      ))
    : [];



  return (
    <div>
      <GoBack onClick={() => navigate("/")}>❮❮</GoBack>
      <Container>

        {userAvatar}
       
        <div>
          <h3>{userProfile.username}</h3>
          <h4>{userProfile.email}</h4>
        </div>
      </Container>
      {
        canEdit && (
          <button onClick={openEditPopup}>✒️ Edit</button>
        )
      }
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

const Container = styled.div`
  margin: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
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
    color: #141566;
  }
`;

export const Avatar = styled.img`
  height: 58px;
  width: 58px;
  border-radius: 50%;
`;
export const SmallAvatar = styled.img`
  height: 37px;
  width: 37px;
  border-radius: 50%;
  margin: 8px;
`;

export default Profile;
