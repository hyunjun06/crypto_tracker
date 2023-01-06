import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";
import Chart from "./routes/Chart";
import Price from "./routes/Price";
import NoCoinError from "./NoCoinError";

const router =  createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Coins />,
            },
            {
                path: ":coinId",
                element: <Coin />,
                children: [
                    {
                        path: "chart",
                        element: <Chart />
                    },
                    {
                        path: "price",
                        element: <Price />
                    }
                ],
                errorElement: <NoCoinError />
            }
        ]
    }    
]);

export default router;