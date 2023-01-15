import styled from "styled-components";

export const Form = styled.form`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;

export const Label = styled.label`
display: flex;
flex-direction: column;
justify-content: flex-start;
> input {
  border-radius: 4px;
  padding: 2px 6px;
  width: 240px;
  height: 30px;
  margin: 8px;
}
> textarea {
  border-radius: 4px;
  padding: 4px 4px;
  width: 240px;
  margin: 8px;
}
`;

export const Container = styled.div`
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
`;

export const Button = styled.button`
margin-top: 24px;

height: 38px;
width: 248px;

border-radius: 5px;
background-color: #1f4c;
color: white;
border: none;
font-weight: 900;
font-size: 18px;
`;