import { Center, Circle, FormControl, FormErrorMessage, FormLabel, HStack, Input, Spinner, Switch, Text, Textarea } from "@chakra-ui/react"
import { IconCheck, IconX, TablerIcon } from "@tabler/icons"

import ColorPicker from "./picker/colorPicker"
import SmallMessageCard from "../messageCard/smallMessageCard"
import MyEmojiPicker from "./picker/emojiPicker"
import { Field, useFormikContext } from "formik"


interface ICreateForm {
    page : number
}

export default function CreateForm({ page }: ICreateForm) {
    return (
        <Center minH='280px' flexDir='column' alignItems='start' children={page === 1 ? <PageOne /> :
            page === 2 ? <PageTwo /> :
            page === 3 ? <PageThree /> :
            page === 4 ? <PageFour /> : 
            <></>
        }/>
    )
}

function PageOne() {
    const { values, touched, errors, handleChange, setFieldValue } = useFormikContext<MessageForm>()

    return (
        <>
            <FormControl isInvalid={Boolean(touched.sender && errors.sender)}>
                <FormLabel>Pengirim Pesan</FormLabel>
                <Field
                    as={Input}
                    name="sender"
                    isDisabled={values.isAnonim}
                    value={values.sender}
                    onChange={handleChange}
                    maxLength={16}
                    placeholder='misal: Wahyu' />
                <FormErrorMessage>{errors.sender}</FormErrorMessage>
            </FormControl>
            <FormControl mt='2' mb='8' as={HStack}>
                <Switch
                    name='isAnonim'
                    isChecked={values.isAnonim}
                    onChange={(e) => {
                        setFieldValue('sender', '')
                        handleChange(e)
                    } } />
                <FormLabel fontSize='sm' fontWeight='normal'>Sebagai Anonim</FormLabel>
            </FormControl>
            <FormControl isInvalid={Boolean(touched.receiver && errors.receiver)}>
                <FormLabel>Penerima Pesan</FormLabel>
                <Field
                    as={Input}
                    name='receiver'
                    value={values.receiver}
                    onChange={handleChange}
                    maxLength={16}
                    placeholder='misal: Ajeng' />
                <FormErrorMessage>{errors.receiver}</FormErrorMessage>
            </FormControl>
        </>
    )
}

function PageTwo() {
    const { values, touched, errors, handleChange } = useFormikContext<MessageForm>()

    return (
        <>
            <FormControl isInvalid={Boolean(touched.title && errors.title)}>
                <FormLabel>Judul</FormLabel>
                <Field
                    as={Input}
                    autoFocus
                    name='title'
                    value={values.title}
                    maxLength={80}
                    onChange={handleChange}
                    placeholder='misal: selamat ulang tahun (Opsional)' />
                <FormErrorMessage>{errors.title}</FormErrorMessage>
            </FormControl>
            <FormControl mt='4' isInvalid={Boolean(touched.message && errors.message)}>
                <FormLabel>Isi Pesan</FormLabel>
                <Field
                    as={Textarea}
                    name='message'
                    value={values.message}
                    onChange={handleChange}
                    maxLength={1000}
                    resize='none'
                    height='40'
                    placeholder="misal: semoga bahagia selalu ya" />
                <FormErrorMessage>{errors.message}</FormErrorMessage>
            </FormControl>
        </>
    )
}

function PageThree() {
    const { values, setFieldValue } = useFormikContext<MessageForm>()
    const { color, emoji } = values


    return (
        <>
            <Text fontWeight='medium' mb='2'>Kostumisasi Kartu</Text>
            <SmallMessageCard
                my='6'
                maxW='320px'
                cursor='default'
                w='full'
                mx='auto'
                _hover={{ boxShadow: 'base' }}
                data={values} />
            <HStack mt='4' spacing='6' align='start'>
                <FormControl w='max-content'>
                    <FormLabel w='max-content'>Emoji</FormLabel>
                    <MyEmojiPicker
                        name='emoji'
                        defaultValue={emoji}
                        onChange={(e) => setFieldValue('emoji', e)} />
                </FormControl>
                <FormControl>
                    <FormLabel>Warna</FormLabel>
                    <ColorPicker
                        name='color'
                        defaultValue={color}
                        onChange={(e) => setFieldValue('color', e)} />
                </FormControl>
            </HStack>
        </>
    )
}

function PageFour() {
    const { isSubmitting, status } = useFormikContext<MessageForm>()

    interface ICircleIcon {
        Icon: TablerIcon
        color: string
    }

    const CircleIcon = ({ Icon, color }: ICircleIcon) => (
        <Circle size='12' border='4px solid' color={color} children={<Icon size='30' stroke='3' />} />
    )

    return (
        <Center flexDirection='column' w='full'>
            {isSubmitting ?
                <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl' />
                : status === 200 ?
                    <CircleIcon Icon={IconCheck} color='teal' /> :
                    <CircleIcon Icon={IconX} color='tomato' />}

            <Text mt='4' fontSize='lg' fontWeight='medium' textAlign='center'>
                {isSubmitting ?
                    'Mengirim Pesan'
                    : status === 200 ?
                        'Selesai Mengirim Pesan' :
                        'Ada yang salah. gagal mengirim Pesan'}
            </Text>
        </Center>
    )
}