import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

const Title = styled.h1`
    font-size: 3em;
    font-weight: 900;
    color: ${({ theme }) => theme.lightAccent};
    text-align: center;
    margin-top: 1em;
    margin-bottom: 1em;
`;

const Description = styled.p`
    font-size: 1em;
    font-weight: 100;
    color: ${({ theme }) => theme.textColor};
    text-align: center;
    line-height: 1em;
`;

function NoCoinError() {
    return (
        <Container>
            <Title>Oops!</Title>
            <Description>
                We couldn't find the coin data you were looking for. Please try again.<br />
                If the problem persists, the coin might not exist on the API.
            </Description>
        </Container>   
    );
}

export default NoCoinError;