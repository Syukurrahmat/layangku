import { Box, Center, Heading, HStack, Text } from "@chakra-ui/react"

interface IHeadingWithIcon {
    icon: string
    title: string
    subtitle: string
}

export default function HeadingWithIcon({ icon, title, subtitle }: IHeadingWithIcon) {
    return (
        <HStack spacing='4'>
            <Center bg='gray.100' w='12' h='12' fontSize='2xl' rounded='base' children={icon} />
            <Box>
                <Heading size='md'>{title}</Heading>
                <Text fontSize='sm'>{subtitle}</Text>
            </Box>
        </HStack>
    )
}