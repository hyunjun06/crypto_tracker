import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        bgColor: string;
        textColor: string;
        lightAccent: string;
        basic: string;
        disabled: string;
    };
};