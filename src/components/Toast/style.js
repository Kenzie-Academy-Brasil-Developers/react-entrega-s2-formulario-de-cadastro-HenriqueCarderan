import styled, { css, keyframes } from "styled-components";

const translateXAnimationFrom = keyframes`
  0% {
    background: transparent;
    transform: translateX(120%);
  }
  95% {
    transform: translateX(-25px);
  }
  100% {
    transform: translateX(0)
  }
`;

const translateXAnimationLeave = keyframes`
  from{
    transform: translateX(0)
  }
  to{
    transform: translateX(120%);
  }`;

const ToastTypeVariations = {
  success: css`
    border-bottom: 1px solid var(--color-success);
    svg {
      color: var(--color-success);
    }
  `,
  error: css`
    border-bottom: 1px solid var(--color-error);
    svg {
      color: var(--color-error);
    }
  `,
  info: css`
    border-bottom: 1px solid;
  `,
};

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: relative;

  width: 286px;

  padding: 16px 30px 16px 16px;
  margin: 20px 22px 0px;

  color: var(--color-gray-0);
  background: var(--color-gray-2);
  border-radius: 4px;

  ${({ type }) => ToastTypeVariations[type]}

  ${({ isLeave }) =>
    css`
      animation: ${isLeave ? translateXAnimationLeave : translateXAnimationFrom}
        0.8s;
    `}
  animation-fill-mode: forwards;

  svg {
    margin-right: 4px;
  }

  div {
    strong {
      font-weight: 700;
      font-size: 14px;
      line-height: 24px;
    }

    p {
      margin-top: 4px;
    }
  }

  button {
    color: inherit;
    position: absolute;
    right: 6px;
    top: 17px;
  }
`;
