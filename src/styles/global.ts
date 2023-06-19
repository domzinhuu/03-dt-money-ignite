import { createGlobalStyle, keyframes } from "styled-components";
const rotate = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;

    }

    
    :focus{
        outline: 0;
        box-shadow: 0 0 0 2px ${(props) => props.theme["green-500"]};
    }

    body{
        background:  ${(props) => props.theme["gray-800"]};
        color: ${(props) => props.theme["gray-100"]};
        -webkit-font-smoothing: antialiased
    }

    body, input, textarea, button {
        font: 400 1rem Roboto, sans-serif;
    }

    svg.loading {
      animation: ${rotate} 1s linear infinite;
    }

`;
