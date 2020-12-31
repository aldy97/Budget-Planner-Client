import React from "react";
import { COLORS } from "../../utils/constants";
import styled from "styled-components";

interface Toggler {
  atLogin: boolean;
  toogle: () => void;
}

interface ItemProps {
  highlighted?: boolean;
}

const StyledToggler = styled.div`
  width: 320px;
  height: 40px;
  line-height: 40px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  display: flex;
  .option: hover {
    color: ${COLORS.THEMEBLUE};
    -webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
    -ms-transition: all 0.5s;
    -o-transition: all 0.5s;
    transition: all 0.5s;
  }
`;

const StyledItem = styled.span<ItemProps>`
  flex: 1;
  color: ${props =>
    props.highlighted ? COLORS.THEMEBLUE : COLORS.UNSELECTEDOPTION};
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

function LoginRegToggler({ atLogin, toogle }: Toggler): JSX.Element {
  const handleLoginClick = () => {
    if (!atLogin) {
      toogle();
    }
  };

  const handleRegisterClick = () => {
    if (atLogin) {
      toogle();
    }
  };

  return (
    <StyledToggler>
      <StyledItem highlighted={atLogin}>
        <span
          className="option"
          onClick={handleLoginClick}
          style={{ cursor: "pointer" }}
        >
          Login
        </span>
      </StyledItem>
      <StyledItem highlighted={!atLogin}>
        <span
          className="option"
          onClick={handleRegisterClick}
          style={{ cursor: "pointer" }}
        >
          Register
        </span>
      </StyledItem>
    </StyledToggler>
  );
}

export default LoginRegToggler;
