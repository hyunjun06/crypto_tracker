import styled, { DefaultTheme } from "styled-components";
import { Link } from "react-router-dom";
import React from "react";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";
import { darkTheme, lightTheme } from "../Themes";
import { setTheme } from "../store";
import { connect } from "react-redux";

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
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const Title = styled.h1`
    font-size: 3em;
    font-weight: 900;
    color: ${({ theme }) => theme.textColor};
    text-align: left;
    margin-left: 2rem;
`;

const ThemeSwitch = styled.button`
    font-size: 1em;
    font-weight: 100;
    color: ${({ theme }) => theme.textColor};
    text-align: right;
    transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out;
    background-color: ${({ theme }) => theme.lightAccent};
    border: none;
    margin-right: 2rem;
    border-radius: 1em;
    padding: .5rem 1rem .5rem 1rem;
    
    &:hover {
        color: ${({ theme }) => theme.lightAccent};
        background-color: ${({ theme }) => theme.textColor};
    }
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

function Coins({ theme, setTheme } : { theme: any, setTheme: (theme: DefaultTheme) => void }) {
    const { isLoading, data } = useQuery<ICoin[]>("coins", fetchCoins);    
    
    const onClick = () => {
        if (theme.theme === lightTheme) {
            setTheme(darkTheme);
        } else {
            setTheme(lightTheme);
        }    
    };

    return (
        <Container>
            <Helmet>
                <title>Coins</title>
            </Helmet>
            <Header>
                <Title>Coins</Title>
                <ThemeSwitch onClick={onClick}>{theme.theme === lightTheme ? "Dark Theme" : "Light Theme"}</ThemeSwitch>
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

const mapStateToProps = (state: any) => ({
    theme: state.theme,
});

const mapDispatchToProps = (dispatch: any) => ({
    setTheme: (theme: DefaultTheme) => dispatch(setTheme(theme)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Coins);