import styled from "styled-components";
import { Outlet, useParams, Link } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchCoin, fetchPrice } from "../api";
import { Helmet } from "react-helmet";

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
    display: flex;
    flex-direction: row;
    margin-top: 2em;
    width: 100%;
    justify-content: space-between;
    align-items: center;
`;

const Title = styled.h1`
    font-size: 3em;
    font-weight: 100;
    color: ${({ theme }) => theme.textColor};
    text-align: left;
`;

const HomeButton = styled(Link)`
    font-size: 3em;
    font-weight: 900;
    color: ${({ theme }) => theme.textColor};
    text-align: right;
    transition: color 0.2s ease-in-out;
    
    &:hover {
        color: ${({ theme }) => theme.lightAccent};
    }
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
    transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out;
    
    &:hover {
        background-color: ${({ theme }) => theme.lightAccent};
        color: ${({ theme }) => theme.textColor};
    }
    
    a {
        width: 100%;
        text-align: center;
    }
`;

const Footer = styled.footer`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 1em;
    bottom: 0;
    position: absolute;
    padding-left: 2em;
    padding-right: 2em;
    padding-bottom: 1em;
`;

interface IInfo {
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

interface IPrice {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	circulating_supply: number;
	total_supply: number;
	max_supply: number;
	beta_value: number;
	first_data_at: Date;
	last_updated: Date;
	quotes: IQuotes;
}

interface IQuotes {
	USD: IUsd;
}

interface IUsd {
	price: number;
	volume_24h: number;
	volume_24h_change_24h: number;
	market_cap: number;
	market_cap_change_24h: number;
	percent_change_15m: number;
	percent_change_30m: number;
	percent_change_1h: number;
	percent_change_6h: number;
	percent_change_12h: number;
	percent_change_24h: number;
	percent_change_7d: number;
	percent_change_30d: number;
	percent_change_1y: number;
	ath_price: number;
	ath_date: Date;
	percent_from_price_ath: number;
}

function Coin() {
    const { coinId } = useParams();
    const priceMatch = () => window.location.pathname.match(/price/) ? true : false;
    const chartMatch = () => window.location.pathname.match(/chart/) ? true : false;
    
    const info = useQuery<IInfo>(
			["info", coinId],
			() => fetchCoin(coinId ?? "Bitcoin"),
			{ refetchInterval: 5000 }
		).data;
    const price = useQuery<IPrice>(
			["price", coinId],
			() => fetchPrice(coinId ?? "Bitcoin"),
			{ refetchInterval: 500 }
		).data;
    const name = () => info?.name;

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
    
    return (
        <Container>
            <Helmet>
                <title>{name() ?? "Loading..."}</title>
            </Helmet>
            <Header>
                <HomeButton to="/">Coins</HomeButton>
                <Title>{name() ?? "Loading..."}</Title>
            </Header>
            {CoinOverview}
            <Description>{info?.description}</Description>
            {SupplyOverview}
            {TabSection}
            <Outlet context={{coinId: coinId, price: price}}/>
            {!priceMatch() && !chartMatch() ?  
                <Footer>
                    <p>
                        INFO: The title works as the home button. You can change the theme with the button on the home screen.
                        Please click again if some buttons don't respond
                    </p>
                </Footer>
            : null}
        </Container>
    );
}

export default Coin;