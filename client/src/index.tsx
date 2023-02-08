import App from './App'
import { ChakraProvider, LightMode } from '@chakra-ui/react'
import { createRoot } from 'react-dom/client';
import theme from './theme';

const container = document.getElementById('root')
const root = createRoot(container!)

root.render(
    <ChakraProvider theme={theme}>
        <LightMode>
            <App />
        </LightMode>
    </ChakraProvider>
)
