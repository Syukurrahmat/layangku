import { Box, Center, Flex, useRadio, useRadioGroup } from "@chakra-ui/react"
import { IconCheck } from "@tabler/icons"
import { CARD_COLORS } from "../../../config"
import { colorCardLib } from "../../../utils"


export default function ColorPicker({ name, defaultValue, onChange }: IMyCustomPicker) {
    const { getRootProps, getRadioProps } = useRadioGroup({ defaultValue, name, onChange })

    return (
        <Flex h='10' gap='2' mt='4' flexWrap='wrap' {...getRootProps()}>
            {Object.keys(CARD_COLORS).map(value => (
                <ColorOption
                    color={value}
                    key={value}
                    {...getRadioProps({ value })}
                />
            ))}
        </Flex>
    )
}

interface IColorOption {
    color: string
}

function ColorOption({ color, ...props }: IColorOption) {
    const { getInputProps, getCheckboxProps, state } = useRadio(props)

    return (
        <Box as='label'>
            <input {...getInputProps()} />
            <Center
                {...getCheckboxProps()}
                cursor='pointer'
                w='6' h='6'
                rounded='full'
                outline='1px solid'
                outlineColor='gray.400'
                bg={colorCardLib(color).bgColor}
                _checked={{
                    boxShadow: 'outline',
                    outline: '0'
                }}
                color='gray.600'
                children={state.isChecked ? <IconCheck size='18' /> : null}
            />
        </Box>
    )
}

