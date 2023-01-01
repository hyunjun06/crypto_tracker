import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        bgColor: string;
        textColor: string;
        lightAccent: string;
        accent: string;
        darkAccent: string;
        basic: string;
    };
};