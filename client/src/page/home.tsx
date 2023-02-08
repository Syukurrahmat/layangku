import { Container, Heading, Text, Flex, Button, Box, HStack, Img, Spacer, Stack } from "@chakra-ui/react"
import { IconFloatLeft } from "@tabler/icons"
import { Outlet, useNavigate } from "react-router"

import SearchName from "../components/page/home/searchName"
import HeroImage from '../image/hero.png'


export default function Home() {
    const navigate = useNavigate()

    return (
        <>
            <Container
                maxW='full'
                p='4'
                maxH='100vh'
                h='100vh'
                minH='600px'
            >
                <Box h='full' rounded='xl' py='3' bg='blue.500'>
                    <Container
                        as={Flex}
                        maxW='container.lg'
                        h='full'
                        flexDirection='column'
                    >
                        <HStack mb='6'>
                            <HStack color='white'>
                                <IconFloatLeft size='28' />
                                <Text fontSize='2xl' fontWeight='bold'>LayangKu</Text>
                            </HStack>
                            <Spacer />
                            <Button size='md' onClick={() => navigate('/create')} children='Buat Pesan' />
                        </HStack>
                        <Stack
                            direction={{ base: 'column', md: 'row' }}
                            maxW='container.lg'

                            flexGrow='1'
                            align='center'
                            justify='space-between'
                        >
                            <Spacer />
                            <Box>
                                <Heading color='white' fontSize='3xl'>
                                    Temukan Pesan Untukmu Dari banyak Orang
                                </Heading>
                                <Text color='white' mt='2'>
                                    Temukan sekarang atau tulis pesan untuk orang lain
                                </Text>
                                <SearchName />
                            </Box>
                            <Spacer />
                            <Img
                                alignSelf={{ base: 'end', md: 'center' }}
                                w={{ base: 'max-content', md: '45%' }}
                                maxH={{ base: 'calc(100vh - 450px)', md: 'initial' }}
                                objectFit='contain'
                                draggable={false}
                                src={HeroImage}
                                p='4'
                            />
                        </Stack>
                    </Container>
                </Box>
            </Container>
            <Outlet />
        </>
    )
}
