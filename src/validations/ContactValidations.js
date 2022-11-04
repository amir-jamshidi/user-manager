import * as Yup from 'yup';

export const contactSchema = Yup.object().shape({
    fullname: Yup.string().required('الزامی'),
    img: Yup.string().url().required('الزامی'),
    phone: Yup.number().required('الزامی'),
    email: Yup.string().email('ایمیل وارد شده نامعتبر').required('الزامی'),
    jop: Yup.string().required('الزامی'),
    group: Yup.string().required('الزلمی')
})