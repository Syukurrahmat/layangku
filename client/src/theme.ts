import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
    styles: {
        global: {
            'html, body': {
                backgroundColor: '#F8FAFC',
                overflowY: 'overlay',
                color: 'gray.900'
            },
            '::-webkit-scrollbar':{
                width: '0.5em',
                height: '0.5em',
            },
            '::-webkit-scrollbar-thumb':{
                borderRadius: '10px',
                backgroundColor: 'darkgrey'
            },
            '::-webkit-scrollbar-thumb:hover':{
                backgroundColor: 'grey',
            },
        }
    }
})

export default theme