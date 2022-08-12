import styled from "styled-components";

export const DashboardContainer = styled.div`
  padding-top: 26px;
  background: #121214;
  height: 100vh;
  overflow-y: scroll;

  .logoContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 120px;
    padding-bottom: 30px;
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0px 16.2426px;
    gap: 10.15px;

    width: 79.54px;
    height: 31.95px;

    background: #212529;
    border-radius: 4px;

    text-decoration: none;
    font-weight: 600;
    font-size: 12px;
    line-height: 28px;

    color: #f8f9fa;
  }

  a:hover {
    background: #343b41;
  }

  .presentationContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 12px;
    gap: 10px;

    height: 131px;
    border: 1px solid #212529;
  }

  h3 {
    font-weight: 700;
    font-size: 18px;
    line-height: 28px;

    color: #f8f9fa;
  }

  p {
    font-weight: 400;
    font-size: 12px;
    line-height: 22px;

    color: #868e96;
  }

  .developContainer {
    display: none;
  }

  h4 {
    font-weight: 700;
    font-size: 18px;
    line-height: 28px;

    color: #f8f9fa;
  }

  .developContainer p {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #ffffff;
  }

  @media (min-width: 768px) {
    .logoContainer {
      justify-content: space-evenly;
      gap: 180px;
    }

    .presentationContainer {
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
    }

    .developContainer {
      display: none;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 23px;
      margin: auto;
      margin-top: 35px;
    }
  }
`;
