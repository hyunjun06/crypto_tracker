import styled from "styled-components";
import { Link } from "react-router-dom";
import React from "react";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    max-width: 480px;
    margin: 0 auto;
`;

const Header = styled.header`
    margin-top: 2em;
    margin-bottom: 2em;
    width: 100%;
`;

const Title = styled.h1`
    font-size: 3em;
    font-weight: 900;
    color: ${({ theme }) => theme.textColor};
    text-align: left;
    margin-left: 2rem;
`;

const CoinsList = styled.ul`
    width: 100%;
`;

const Coin = styled.li`
    background-color: ${({ theme }) => theme.lightAccent};
    color: ${({ theme }) => theme.textColor};
    font-weight: 100;
    padding: 20px;
    margin: 0 2rem 1rem 2rem;
    border-radius: 1em;
    display: flex;
    flex-direction: row;
    transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out;
    
    &:hover {
        background-color: ${({ theme }) => theme.textColor};
        color: ${({ theme }) => theme.lightAccent};
    }
    
    h2 {
        font-size: 1em;
        font-weight: 400;
        margin-right: .3em;
    }
    
    h3 {
        font-size: .7em;
        margin-top: .6em;
    }
`;

interface ICoin {
    id: string;
    name: string;
    symbol: string; 
    rank: number; 
    is_new: boolean; 
    is_active: boolean; 
    type: string; 
};

const CoinItem: React.FC<{coin: ICoin}> = ({ coin }) => (
    <Link to={coin.id} state={coin.name}>
        <Coin>
            <h2>{coin.name}</h2>
            <h3>{coin.symbol}</h3>
        </Coin>
    </Link>
);

function Coins() {
    const { isLoading, data } = useQuery<ICoin[]>("coins", fetchCoins);    

    return (
        <Container>
            <Header>
                <Title>Coins</Title>
            </Header>
            {isLoading ? (
                <h1>Loading...</h1>
            ) : (
                <CoinsList>
                    {data?.slice(0, 100).map((coin) => (
                        <CoinItem coin={coin} key={coin.id}/>
                    ))}
                </CoinsList>
            )}
        </Container>
    );
}

export default Coins;