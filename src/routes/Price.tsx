import { useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { Helmet } from "react-helmet";

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

interface IOutletContext {
    price: IPrice;
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

const Section = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 2rem 2rem 2rem 2rem;
`;

const Title = styled.h1`
    font-size: 3em;
    font-weight: 400;
    color: ${({ theme }) => theme.lightAccent};
    text-align: center;
    margin-bottom: 1em;
    animation: 1s ease-in-out 0s 1 fadeIn;
    
    @keyframes fadeIn {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
`;

const Label = styled.h2`
    font-size: 1.5em;
    font-weight: 900;
    color: ${({ theme }) => theme.textColor};
    text-align: center;
`;

const PercentageList = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 0;
    padding: 0;
    margin-top: .5rem;
    animation: 2s ease-in-out 0s 1 fadeIn;
    
    @keyframes fadeIn {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
`;

const PercentageListItem = styled.li`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 0;
    padding: 0;
    margin-bottom: 1em;
`;

const PercentageLabel = styled.h3`
    font-size: 1.5em;
    font-weight: 100;
    color: ${({ theme }) => theme.textColor};
    text-align: center;
    margin-right: .5rem;
`;

const PercentageValue = styled.h3`
    font-size: 1.5em;
    font-weight: 400;
    color: ${({ theme }) => theme.lightAccent};
    text-align: center;
`;

function Price() {
    const { price } = useOutletContext<IOutletContext>();
    
    const PercentageItem = ({ label, value }: { label: string, value: number }) => (
        <PercentageListItem>
            <PercentageLabel>{label}</PercentageLabel>
            <PercentageValue>{value}%</PercentageValue>
        </PercentageListItem>
    );

    return (
        <Container>
            <Helmet>
                <title>Price</title>
            </Helmet>
            <Section>
                <Label>Current Price</Label>
                <Title>${price?.quotes.USD.price.toFixed(2)}</Title>
                <Label>Percentage Change</Label>
                <PercentageList>
                    <PercentageItem label="15 Minutes" value={price?.quotes.USD.percent_change_15m} />    
                    <PercentageItem label="1 Hour" value={price?.quotes.USD.percent_change_1h} />    
                    <PercentageItem label="1 Day" value={price?.quotes.USD.percent_change_24h} />    
                    <PercentageItem label="30 Days" value={price?.quotes.USD.percent_change_30d} />    
                    <PercentageItem label="1 Year" value={price?.quotes.USD.percent_change_1y} />    
                </PercentageList>
            </Section>
        </Container>
    );
}

export default Price;