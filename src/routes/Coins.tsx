import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
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
    margin-left: 1rem;
`;

const CoinsList = styled.ul`
    width: 100%;
`;

const Coin = styled.li`
    background-color: ${({ theme }) => theme.lightAccent};
    color: ${({ theme }) => theme.textColor};
    font-weight: 100;
    padding: 20px;
    margin: 0 2em 1em 2em;
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

const coins = [
	{
		id: "btc-bitcoin",
		name: "Bitcoin",
		symbol: "BTC",
		rank: 1,
		is_new: false,
		is_active: true,
		type: "coin",
	},
	{
		id: "eth-ethereum",
		name: "Ethereum",
		symbol: "ETH",
		rank: 2,
		is_new: false,
		is_active: true,
		type: "coin",
	},
	{
		id: "usdt-tether",
		name: "Tether",
		symbol: "USDT",
		rank: 3,
		is_new: false,
		is_active: true,
		type: "token",
	},
	{
		id: "usdc-usd-coin",
		name: "USD Coin",
		symbol: "USDC",
		rank: 4,
		is_new: false,
		is_active: true,
		type: "token",
	},
	{
		id: "bnb-binance-coin",
		name: "Binance Coin",
		symbol: "BNB",
		rank: 5,
		is_new: false,
		is_active: true,
		type: "coin",
	},
	{
		id: "xrp-xrp",
		name: "XRP",
		symbol: "XRP",
		rank: 6,
		is_new: false,
		is_active: true,
		type: "coin",
	},
	{
		id: "busd-binance-usd",
		name: "Binance USD",
		symbol: "BUSD",
		rank: 7,
		is_new: false,
		is_active: true,
		type: "token",
	},
];

interface CoinItemProps {
    id: string,
    name: string,
    symbol: string,
};

const CoinItem = (coin: CoinItemProps) => (
    <Link to={coin.id}>
        <Coin key={coin.id}>
            <h2>{coin.name}</h2>
            <h3>{coin.symbol}</h3>
        </Coin>
    </Link>
);

function Coins() {
    return (
        <Container>
            <Header>
                <Title>Coins</Title>
            </Header>
            <CoinsList>
                {coins.map((coin) => (
                    <CoinItem id={coin.id} name={coin.name} symbol={coin.symbol}/>
                ))}
            </CoinsList>
        </Container>
    );
}

export default Coins;