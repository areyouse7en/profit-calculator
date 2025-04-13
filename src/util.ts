const calculateProfitValues = (costValue: number, priceValue: number, quantityValue: number) => {
    const totalCostValue = costValue * quantityValue;
    const totalPriceValue = priceValue * quantityValue;
    // 税前毛利率 =（营业收入 - 营业成本）÷ 营业收入 ×100%
    const totalProfitValue = totalPriceValue - totalCostValue;
    const profitMarginValue = (totalProfitValue / totalPriceValue) * 100;

    return {
        totalCostValue,
        totalPriceValue,
        totalProfitValue,
        profitMarginValue
    };
};

const caluculatePriceValues = (costValue: number, profitMarginValue: number, quantityValue: number) => {
    const totalCostValue = costValue * quantityValue;
    // 营业收入 = 营业成本 ÷ （1 - 毛利率）
    const totalPriceValue = totalCostValue / (1 - profitMarginValue / 100);
    const totalProfitValue = totalPriceValue - totalCostValue;
    const priceValue = totalPriceValue / quantityValue;
    return {
        totalCostValue,
        totalPriceValue,
        totalProfitValue,
        priceValue
    }
}

const calculateCostValues = (priceValue: number, profitMarginValue: number, quantityValue: number) => {
    const totalPriceValue = priceValue * quantityValue;
    // 营业成本 = 营业收入 * （1 - 毛利率）
    const totalCostValue = totalPriceValue * (1 - profitMarginValue / 100);
    const costValue = totalCostValue / quantityValue;
    const totalProfitValue = totalPriceValue - totalCostValue;
    return {
        costValue,
        totalCostValue,
        totalPriceValue,
        totalProfitValue
    }
}

const formatNumber = (num: number | string | undefined): string => {
    if (num === undefined) return "";
    if (typeof num === 'string') return Number(num).toFixed(2);
    return num.toFixed(2);
};

export { calculateProfitValues, calculateCostValues, caluculatePriceValues, formatNumber }