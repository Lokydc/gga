
    const media = (value) => {
        let ar = value.split('+').filter(Number)
        if(!ar[0]) throw new TypeError('Invalid Value')
        if(ar.length === 1) return Number(ar[0])
        let t = 0
        for (let i = 0; i < ar.length; i++) {
                t = t + Number(ar[i])
        }
    
        return ~~(t / ar.length)
    }
    
    const porcent = (porcent, value) => {
        return ~~((porcent * value) / 100)
    }
    
    const format = (value) => {
        if(typeof value !== 'number') return 'Inválido'
        let internationalNumberFormat = new Intl.NumberFormat('en-US')
        return internationalNumberFormat.format(value)
    }


module.exports = {
    media,
    porcent,
    format
}