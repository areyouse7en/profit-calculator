const calculateCommonValues = (costValue: number, priceValue: number, quantityValue: number, taxRateValue: number) => {
    const totalCostValue = costValue * quantityValue;
    const totalPriceBeforeTaxValue = priceValue * quantityValue;
    const priceAfterTaxValue = priceValue * (1 - taxRateValue / 100);
    const totalPriceAfterTaxValue = totalPriceBeforeTaxValue * (1 - taxRateValue / 100);
    const totalProfitBeforeTaxValue = totalPriceBeforeTaxValue - totalCostValue;
    const profitMarginBeforeTaxValue = (totalProfitBeforeTaxValue / totalPriceBeforeTaxValue) * 100;
    const totalProfitAfterTaxValue = totalPriceAfterTaxValue - totalCostValue;
    const profitMarginAfterTaxValue = (totalProfitAfterTaxValue / totalPriceAfterTaxValue) * 100;

    return {
        totalCostValue,
        totalPriceBeforeTaxValue,
        priceAfterTaxValue,
        totalPriceAfterTaxValue,
        totalProfitBeforeTaxValue,
        profitMarginBeforeTaxValue,
        totalProfitAfterTaxValue,
        profitMarginAfterTaxValue
    };
};

const formatNumber = (num: number | undefined): string => {
    if (num === undefined) return "";
    return num.toFixed(2);
};

export { calculateCommonValues, formatNumber }