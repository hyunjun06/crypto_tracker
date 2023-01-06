import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import { useQuery } from "react-query";
import ReactApexChart from "react-apexcharts";
import styled, { useTheme } from "styled-components";
import { Helmet } from "react-helmet";
import { lightTheme } from "../Themes";

interface IData {
    time_open: number;
    time_close: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}

interface IOutletContext {
    coinId: string;
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
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

function Chart() {
    const { coinId } = useOutletContext<IOutletContext>();
    const { isLoading, data: coinHistory } = useQuery<IData[]>(
			["coinHistory", coinId],
			() => fetchCoinHistory(coinId ?? "Bitcoin"),
			{ refetchInterval: 5000 }
		);
    const theme = useTheme();
    
    return (
        <Container>
            <Helmet>
                <title>Chart</title>
            </Helmet>
            {isLoading ? <div>Loading...</div> : (
                <ReactApexChart
                    type="candlestick"
                    series={[
                        {
                            data: coinHistory?.map((d) => [d.time_close * 1000, d.open, d.high, d.low, d.close]) ?? [],
                        }
                    ]}
                    options={{
                        theme: {
                            mode: theme === lightTheme ? "light" : "dark",
                        },
                        chart: {
                            toolbar: {
                                show: false,
                            },
                            background: "transparent",
                        },
                        stroke: {
                            curve: "smooth",
                        },
                        grid: {
                            show: false,
                        },
                        yaxis: {
                            show: false,
                        },
                        xaxis: {
                            axisTicks: {
                                show: false,
                            },
                            labels: {
                                show: false,
                            },
                            type: "datetime",
                            categories: coinHistory?.map((d) => new Date(d.time_close * 1000).toUTCString()) ?? [],
                        },
                        tooltip: {
                            y: {
                                formatter: (value: number) => `$${value.toFixed(2)}`,
                            }
                        },
                        plotOptions: {
                            candlestick: {
                                colors: {
                                    upward: "#3C90EB",
                                    downward: "#F56565",
                                },
                            },
                        }
                    }}
                    width={ 480 }
                />
            )}
        </Container>
    );
}

export default Chart;