import {
	Box,
	Button,
	Container,
	Flex,
	Heading,
	HStack,
	Img,
	Spacer,
	Stack,
	Text,
} from '@chakra-ui/react';
import { IconFloatLeft } from '@tabler/icons';
import { Outlet, useNavigate } from 'react-router';
import SearchName from '../components/page/home/searchName';

import HeroImage from '../image/hero.svg';

export default function Home() {
	const navigate = useNavigate();

	return (
		<div>
			<Container maxW="full" p="3" maxH="100dvh" h="100dvh">
				<Box
					h="full"
					rounded="xl"
					py="3"
					bg="linear-gradient(to right, #3b82f6, #6366f1)"
					position="relative"
					overflow="hidden"
				>
					<Container
						as={Flex}
						maxW="container.lg"
						h="full"
						gap="16px"
						flexDirection="column"
					>
						<HStack>
							<HStack color="white">
								<IconFloatLeft size="28" />
								<Text fontSize="2xl" fontWeight="bold">
									LayangKu
								</Text>
							</HStack>
							<Spacer />
							<Button
								size="md"
								onClick={() => navigate('/create')}
								children="Buat Pesan"
							/>
						</HStack>
						<Stack
							direction={{ base: 'column', md: 'row' }}
							align={{ base: 'start', md: 'center' }}
							pb={{ base: '0px', md: '64px' }}
							pt={{ base: '32px', md: '0px' }}
							maxW="container.lg"
							flexGrow="1"
							justify="space-between"
						>
							<Box position="relative" zIndex="10">
								<Heading
									color="white"
									fontSize={{ base: '3xl', md: '4xl' }}
								>
									Temukan Pesan Untukmu Dari banyak Orang
								</Heading>
								<Text color="white" mt="2" fontSize="lg" opacity="0.9">
									Temukan sekarang atau tulis pesan untuk orang lain
								</Text>
								<SearchName />
							</Box>
							<Spacer />
							<Spacer />
							<Img
								bottom="-40px"
								right="0"
								left="0"
								position={{ base: 'absolute', md: 'relative' }}
								w={{ base: '100%', md: '40%' }}
								opacity={{ base: '0.8', md: 'initial' }}
								transform="scaleX(-1)"
								maxH={{ base: '55%', md: 'initial' }}
								objectFit="contain"
								draggable={false}
								src={HeroImage}
							/>
						</Stack>
					</Container>
				</Box>
			</Container>
			<Outlet />
		</div>
	);
}
