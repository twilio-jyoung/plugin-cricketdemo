import { default as styled } from "react-emotion";

export const CannedResponsesStyles = styled("div")`
  min-height: 60px;

  .react-select-container {
    position: fixed;
    width: 90%;
    padding: 10px 5px 5px 5px;
  }

  .react-select__menu {
    width: 90%;
    margin: 0px;
    z-index: 10000;
  }
  .react-select__menu-list {
  }
  .accented {
    color: red;
    cursor: pointer;
    float: right;
  }
`;
