export type Items = {
    items: [{
        id: number, 
        merchantId: string,
        paymentNode: number,
        cnpjRoot: number,
        date: string,
        paymentType: string,
        cardBrand: string,
        authorizationCode: string,
        truncatedCardNumber: string,
        grossAmount: number,
        netAmount: number,
        terminal: string,
        administrationFee: number,
        channelCode: number,
        channel: string,
        withdrawAmount: number,
        minimumMDRAmmount: number,
        mdrTaxAmount: number,
        mdrFeeAmount: number,
        status: string
    }]
}