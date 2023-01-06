import App from './App';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import { RouterProvider } from 'react-router-dom';
import router from './Router';
import { QueryClient, QueryClientProvider } from 'react-query';
import { connect } from 'react-redux';

const queryClient = new QueryClient();

function Root({ theme } : { theme: any }) {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme.theme}>
                <App />
                <RouterProvider router={router} />
            </ThemeProvider>
        </QueryClientProvider>
    );
}

const mapStateToProps = (state: { theme: DefaultTheme }) => ({
    theme: state.theme,
});

export default connect(mapStateToProps)(Root);