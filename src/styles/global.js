import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

    :root {
        --screen-size: calc(100vh - 100px);
        --max-width: 1120px;
        --border-radius: 8px;
        --primary-color: #12101A;
        --secondary-color: #FFFFFF;
        --dark-grey: #292730;
        --light-grey: #414048;
        --purple: #5454fb;
        --red: #ff3232;
        --yellow: #ffee51;
        --green: #51be51;
        --dark-blue: #0B69F5;
        --light-blue: #4faaff;
    }   

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Oxygen",
            "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
            sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
`;
