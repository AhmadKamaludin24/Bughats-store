function ConvertToSubCurrency(amount:number, factor = 100) {
    const subCurrency = amount * factor;
    return subCurrency;
}

export default ConvertToSubCurrency