// "use client"
import styled from "styled-components";

const CARD = styled.div`
  height: calc(8rem + 12vw);
  width: calc(9rem + 12vw);
  background-color: var(--nav2);
  border-radius: 20px;
  position: relative;
  margin-top: calc(5rem + 5vw);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

  // background: url(${(props) => props.img});
const IMAGE = styled.div`
  width: 40%;
  height: 40%;
  position: absolute;
  left: 50%;
  bottom: 80%;
  transform: translate(-50%);
  border-radius: 50%;
  background-color: red;
  background: url(${(props) => props.img.src});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top;
  filter: drop-shadow(0px -3px 3px var(--nav2));
`;

const TEXT = styled.h4`
  color: var(--white);
  padding: 0 calc(1rem + 1vw);

  text-align: center;
  font-size: calc(0.6rem + 0.5vw);
`;

const NAME = styled.h3`
  color: var(--pink);
  padding-top: 1rem;
  font-size: calc(0.5rem + 1vw);
`;

const HomeCard = ({ name, text, image }) => {
  const Avatar = require(`/public/${image}.jpg`).default;
  return (
    <CARD>
      <IMAGE img={Avatar} width="200" height="200" />
      <TEXT>{text}</TEXT>
      <NAME>{name}</NAME>
    </CARD>
  );
};

export default HomeCard;
