import styled from "styled-components";
import { Outlet, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

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

const Description = styled.p`
    font-size: 1em;
    font-weight: 100;
    color: ${({ theme }) => theme.textColor};
    text-align: left;
    line-height: 2em;
`;

const Overview = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin: 2rem 2rem 2rem 2rem;
    background-color: ${({ theme }) => theme.disabled};
    border-radius: 1em;
    color: ${({ theme }) => theme.lightAccent};
`;

const OverviewItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 1rem;
    font-weight: 100;
    gap: .2em;
`;

const OverviewItemTitle = styled.h3`
    font-size: 1em;
    color: ${({ theme }) => theme.basic};
`;

const Tabs = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin: 2rem 2rem 2rem 2rem;
    gap: 1em;
`;

const Tab = styled.div<{isActive: boolean}>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 1rem;
    font-weight: 100;
    background-color: ${({ theme, isActive }) => isActive ? theme.lightAccent : theme.disabled};
    color: ${({ theme, isActive }) => isActive ? theme.textColor : theme.basic};
    border-radius: 1em;
`;

interface Info {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    logo: string;
    tags: object;
    team: object;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    links: object;
    links_extended: object;
    whitepaper: object;
    first_data_at: string;
    last_data_at: string;
}

interface Price {
    id: string;
    name: string;
    symbol: string;
    rank: string;
    price_usd: string;
    price_btc: string;
    volume_24h_usd: string;
    market_cap_usd: string;
    circulating_supply: string;
    total_supply: string;
    max_supply: string;
    percent_change_1h: string;
    percent_change_24h: string;
    percent_change_7d: string;
    last_updated: string;
}

function Coin() {
    const { coinId } = useParams();
    const [info, setInfo] = useState<Info>();
    const [price, setPrice] = useState<Price>();
    const [name, setName] = useState<string>("Loading...");
    const priceMatch = () => window.location.pathname.match(/price/) ? true : false;
    const chartMatch = () => window.location.pathname.match(/chart/) ? true : false;

    const CoinOverview = (
        <Overview>
            <OverviewItem>
                <OverviewItemTitle>Rank</OverviewItemTitle>
                <p>{price?.rank}</p>
            </OverviewItem>
            <OverviewItem>
                <OverviewItemTitle>Symbol</OverviewItemTitle>
                <p>{info?.symbol}</p>
            </OverviewItem>
            <OverviewItem>
                <OverviewItemTitle>Is Active</OverviewItemTitle>
                <p>{info?.is_active ? "Yes" : "No"}</p>
            </OverviewItem>
        </Overview>
    );
    
    const SupplyOverview = (
        <Overview>
            <OverviewItem>
                <OverviewItemTitle>Total Supply</OverviewItemTitle>
                <p>{price?.total_supply}</p>
            </OverviewItem>
            <OverviewItem>
                <OverviewItemTitle>Max Supply</OverviewItemTitle>
                <p>{price?.max_supply}</p>
            </OverviewItem>
        </Overview>
    );
    
    const TabSection = (
            <Tabs>
                <Tab isActive={priceMatch()}>
                    <Link to="price">Price</Link>
                </Tab>
                <Tab isActive={chartMatch()}>
                    <Link to="chart">Chart</Link>
                </Tab>
            </Tabs>
    );
    
    useEffect(() => {
        (async () => {
            const infoResponse = await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`);
            const infoJson = await infoResponse.json();
            setInfo(infoJson);
            setName(infoJson.name);
            
            const priceResponce = await fetch(`https://api.coinpaprika.com/v1/ticker/${coinId}`);
            const priceJson = await priceResponce.json();
            setPrice(priceJson);
        })();
    }, [coinId]);

    return (
        <Container>
            <Header>
                <Title>{name ?? "Loading..."}</Title>
            </Header>
            {CoinOverview}
            <Description>{info?.description}</Description>
            {SupplyOverview}
            {TabSection}
            <Outlet />
        </Container>
    );
}

export default Coin;