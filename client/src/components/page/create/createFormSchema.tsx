import * as Yup from 'yup'
import { CARD_COLORS } from '../../../config'

const createFormSchema = Yup.object().shape({
    isAnonim: Yup.boolean(),
    sender: Yup.string().when('isAnonim', {
        is: false,
        then: Yup.string()
            .required('Harus diisi')
            .min(2, 'Panjang karakter harus lebih dari sama dengan 2')
            .max(16, 'Panjang karakter harus kurang dari sama dengan 16')
    }),
    receiver: Yup.string()
        .required('Harus diisi')
        .min(2, 'Panjang karakter harus lebih dari sama dengan 2')
        .max(16, 'Panjang karakter harus kurang dari sama dengan 16'),
    title: Yup.string()
        .required('Harus diisi')
        .min(3, 'Panjang karakter harus lebih dari sama dengan 3')
        .max(80, 'Panjang karakter harus kurang dari sama dengan 80'),
    message: Yup.string()
        .required('Harus diisi')
        .min(3, 'Panjang karakter harus lebih dari sama dengan 3')
        .max(1000, 'Panjang karakter harus kurang dari sama dengan 1000'),
    emoji: Yup.string().matches(/\p{Emoji}/u, 'Opss ada yang salah'),
    color: Yup.string().oneOf(Object.keys(CARD_COLORS), 'Opss ada yang salah')
})

export default createFormSchema