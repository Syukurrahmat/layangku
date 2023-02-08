import { Center, Container, Image, Text, Link as ChakraLink, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import notFoundImg from '../image/not-found.png'

export default function NotFound () {
    return (
        <Container maxW='container.lg' h='100vh' as={Center} flexDirection={['column', 'row']} gap='4' pb='20'>
            <Image w='70px' src={notFoundImg} alt='not found'/>
            <Box textAlign={['center', 'start']}>
                <Text fontSize='2xl' fontWeight='medium'>Halaman tidak tersedia</Text>
                <ChakraLink to='/' as={Link}>Kembali Ke halaman utama </ChakraLink>
            </Box>
        </Container>
    )
}