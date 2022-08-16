import moment from "moment";

export const dataMask = [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/];

export const formatDateToDatabase = (values) => {
    return moment(values, 'DD/MM/YYYY').toISOString()
}

export const formatDateToRender = (values) => {
    return moment(values).format('DD/MM/YYYY')
}
export const nomeFinal =  value => {
    return value.toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letra => letra.toUpperCase());
}

export const ehDataValida = (value) => {      
    return moment(value, 'DD/MM/YYYY').isValid()
}

export const ehDataAnterior = (value) => {
    if(value?.replace(/\D/g, '').length === 8 ){
        const today = moment().startOf('day') 
        return moment(value, 'DD/MM/YYYY').diff(today, 'days') >= 0
    }

    return true
}
