import styled from "styled-components";

export const ImgBackground = styled.img`
    position: absolute;
    left: 0;
    top: 0;
    width: 100vh;
    height: auto;
    opacity: 0.6;
`;
export const TitleCulto = styled.h1`
    font-weight: 600;
    color: #a37435;
`;
export const Voltar = styled.div`
    width: 800px;
    max-width: 100%;
    text-align: left;
    margin: auto;
    margin-top: 30px;
}
`;
export const FlexContainer = styled.div`
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: center;
    @media(max-width: 800px) {
        flex-direction: column;
        position: relative;
      }
`;
export const ContainerCulto = styled.div`
    cursor: pointer;
    width: 220px;
    height: 200px;
    border: 1px dashed #04213c;
    padding: 10px;
    margin: 10px;
    background: #efeff2;
    border-radius: 15px;
    box-shadow: 4px 4px 7px 4px rgb(97 97 97 / 77%);
    text-align: left;
}
`;
export const Container = styled.div`
    width: 100%;
    height: 100vh;
    text-align: center;
    background: url(background.png) no-repeat;
    background-size: 100%;
`;
