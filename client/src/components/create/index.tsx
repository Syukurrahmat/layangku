import { Button, Card, CardBody, CardFooter, CardHeader, Center, Container, Divider, HStack, Text } from "@chakra-ui/react"
import { CSSTransition, SwitchTransition } from "react-transition-group"
import { useRef, useEffect, useState } from "react"
import { Formik, FormikProps } from "formik"

import HeadingWithIcon from "../headingWithIcon"
import CreateForm from "./createForm"
import createFormSchema from "./createFormSchema"

import { CARD_COLORS, EMOJIES_LIST } from "../../config"
import { getRandomItem } from "../../utils"
import { Data } from "../../services/data"


const Create = () => {
    const [page, setPage] = useState(1)
    const [CSSTransitionClass, setCSSTransitionClass] = useState('switch-previous')
    const fieldsPerPage = [['sender', 'isAnonim', 'receiver'], ['title', 'message'], ['emoji', 'color']]

    const ref = useRef<HTMLInputElement>(null)

    const previousHandler = () => {
        setCSSTransitionClass('switch-previous')
        setTimeout(() => setPage(e => e - 1))
    }

    const nextHandler = async (formikProps: FormikProps<MessageForm>) => {
        const { setTouched, validateForm, submitForm, resetForm, status } = formikProps

        if (page === 4) resetForm({ status })

        else {
            const currentFields = fieldsPerPage[page - 1]
            setTouched(currentFields.reduce((a, v) => ({ ...a, [v]: true }), {}))
            const validated = await validateForm().then(e => !Object.keys(e).some(f => currentFields.includes(f)))
            if (!validated) return
        }

        setCSSTransitionClass('switch-next')
        setTimeout(() => setPage(e => (e % 4) + 1))
        if (page === 3) submitForm()
    }

    const formInitialValue = {
        sender: '',
        isAnonim: false,
        receiver: '',
        title: '',
        message: '',
        emoji: getRandomItem(EMOJIES_LIST),
        color: getRandomItem(Object.keys(CARD_COLORS))
    }

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" })
    }, [])

    return (
        <Container maxW='container.lg' minH='100vh' py='6' ref={ref}>
            <HeadingWithIcon
                icon='✍️'
                title={'Buat Pesan'}
                subtitle={'Buat pesan untuk orang spesialmu'}
            />
            <Divider my='6' />
            <Formik
                initialValues={formInitialValue}
                validationSchema={createFormSchema}
                onSubmit={async (values, action) => {
                    action.setStatus(await Data.createMessage(values))
                }}

                children={(formikProps) => (
                    <Card bg='white' size={['sm', 'md']} my='4' h='100%' maxW='container.sm' mx='auto' boxShadow='lg'>
                        <CardHeader>
                            <HStack fontWeight='medium' >
                                <Center w='8' h='8' rounded='full' bg='blue.200' children={page} />
                                <Text children={'Langkah ' + page} />
                            </HStack>
                        </CardHeader>

                        <CardBody overflow='hidden'>
                            <SwitchTransition mode='out-in' children={
                                <CSSTransition
                                    timeout={300}
                                    classNames={CSSTransitionClass}
                                    unmountOnExit
                                    key={page}
                                    children={<CreateForm page={page} />}
                                />
                            } />
                        </CardBody>

                        <CardFooter as={HStack} justify='end' spacing='4'>
                            {page > 1 && page <= 3 && <Button onClick={previousHandler} children={'Kembali'} />}
                            <Button
                                colorScheme='blue'
                                onClick={() => nextHandler(formikProps)}
                                isLoading={formikProps.isSubmitting}
                                children={page === 3 ? 'Kirim' : page === 4 ? 'Buat Pesan lagi' : 'Lanjut'}
                            />
                        </CardFooter>
                    </Card>
                )}
            />
        </Container>
    )
}

export default Create