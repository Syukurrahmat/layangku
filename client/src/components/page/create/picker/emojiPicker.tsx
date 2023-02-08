import { Box, Button, Center, Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverArrow, PopoverCloseButton, SimpleGrid, useRadio, useRadioGroup, useStyleConfig, } from "@chakra-ui/react"
import { EMOJIES_LIST } from "../../../../config"


export default function MyEmojiPicker({ name, defaultValue, onChange }: IMyCustomPicker) {
    const { getRootProps, getRadioProps } = useRadioGroup({ defaultValue, name, onChange })

    return (
        <Popover placement='top-start'>
            <PopoverTrigger>
                <Button
                    bg='gray.100'
                    size='md'
                    w='10'
                    rounded='base'
                    children={defaultValue} />
            </PopoverTrigger>
            <PopoverContent w='max-content'>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader fontSize='sm' children='Pilih Emoji' />
                <PopoverBody p='2'>
                    <SimpleGrid columns={[8, 10]} spacing='1' {...getRootProps()}>
                        {EMOJIES_LIST.map(value => (
                            <EmojiOption
                                emoji={value}
                                key={value}
                                {...getRadioProps({ value })} />
                        ))}
                    </SimpleGrid>
                </PopoverBody>
            </PopoverContent>
        </Popover>

    )
}

interface IEmojiOption {
    emoji: string
}

function EmojiOption({ emoji, ...props }: IEmojiOption) {
    const { getInputProps, getCheckboxProps } = useRadio(props)

    return (
        <Box as='label'>
            <input {...getInputProps()} />
            <Center
                w='6'
                fontSize='xl'
                children={emoji}
                _checked={{
                    boxShadow: 'outline',
                    outline: '0'
                }}
                __css={useStyleConfig('Button', { variant: 'ghost', size: 'sm' })}
                {...getCheckboxProps()} />
        </Box>
    )
}