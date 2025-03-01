import { useState } from "react";
import {
	Tabs,
	Button,
	Flex,
	Text,
	Box,
	TextField,
	Card,
} from "@radix-ui/themes";
import * as Form from "@radix-ui/react-form";

type CalculateType = "profit" | "price" | "cost";

function App() {
	const defaultTaxRate = 13;
	const [calculateType, setCalculateType] = useState<CalculateType>("profit");
	const [showResults, setShowResults] = useState<boolean>(false);
	const [cost, setCost] = useState<number>(); // 成本单价
	const [price, setPrice] = useState<number>(); // 销售单价
	const [priceAfterTax, setPriceAfterTax] = useState<number>(); // 销售单价（税后）
	const [quantity, setQuantity] = useState<number>(1); // 数量
	const [taxRate, setTaxRate] = useState<number>(defaultTaxRate); // 税率
	const [totalCost, setTotalCost] = useState<number>(); // 成本总价
	const [totalPriceBeforeTax, setTotalPriceBeforeTax] = useState<number>(); // 销售总价（税前）
	const [totalPriceAfterTax, setTotalPriceAfterTax] = useState<number>(); // 销售总价（税后）
	const [totalProfitBeforeTax, setTotalProfitBeforeTax] = useState<number>(); // 总毛利（税前）
	const [totalProfitAfterTax, setTotalProfitAfterTax] = useState<number>(); // 总毛利（税后）
	const [profitMarginBeforeTax, setProfitMarginBeforeTax] = useState<number>(); // 毛利率（税前）
	const [profitMarginAfterTax, setProfitMarginAfterTax] = useState<number>(); // 毛利率（税后）

	const resetFields = () => {
		setCost(undefined);
		setPrice(undefined);
		setPriceAfterTax(undefined);
		setQuantity(1);
		setTaxRate(defaultTaxRate);
		setProfitMarginBeforeTax(undefined);
		setProfitMarginAfterTax(undefined);
		setTotalCost(undefined);
		setTotalPriceBeforeTax(undefined);
		setTotalPriceAfterTax(undefined);
		setTotalProfitBeforeTax(undefined);
		setTotalProfitAfterTax(undefined);
		setShowResults(false);
	};

	const calculate = () => {
		// 计算毛利
		if (calculateType === "profit") {
			if (!cost || !price || !quantity || !taxRate) {
				return;
			}
			const totalCostValue = cost * quantity;
			const totalPriceBeforeTaxValue = price * quantity;
			const totalPriceAfterTaxValue =
				totalPriceBeforeTaxValue * (1 - taxRate / 100);
			const totalProfitBeforeTaxValue =
				totalPriceBeforeTaxValue - totalCostValue;
			const profitMarginBeforeTaxValue =
				(totalProfitBeforeTaxValue / totalPriceBeforeTaxValue) * 100;
			const totalProfitAfterTaxValue = totalPriceAfterTaxValue - totalCostValue;
			const profitMarginAfterTaxValue =
				(totalProfitAfterTaxValue / totalPriceAfterTaxValue) * 100;

			setPriceAfterTax(totalPriceAfterTaxValue);
			setTotalCost(totalCostValue);
			setTotalPriceBeforeTax(totalPriceBeforeTaxValue);
			setTotalPriceAfterTax(totalPriceAfterTaxValue);
			setTotalProfitBeforeTax(totalProfitBeforeTaxValue);
			setTotalProfitAfterTax(totalProfitAfterTaxValue);
			setProfitMarginBeforeTax(profitMarginBeforeTaxValue);
			setProfitMarginAfterTax(profitMarginAfterTaxValue);
		}

		// 计算售价
		if (calculateType === "price") {
			if (
				!cost ||
				(!profitMarginBeforeTax && !profitMarginAfterTax) ||
				!quantity ||
				!taxRate
			) {
				return;
			}
			const totalCostValue = cost * quantity;
			setTotalCost(totalCostValue);
			// 用税前毛利率计算
			if (profitMarginBeforeTax) {
				const priceValue = cost / (1 - profitMarginBeforeTax / 100);
				const totalPriceBeforeTaxValue = priceValue * quantity;
				const priceAfterTaxValue =
					cost / (1 - profitMarginBeforeTax / 100) / (1 - taxRate / 100);
				const totalPriceAfterTaxValue = priceAfterTaxValue * quantity;
				const totalProfitBeforeTaxValue =
					totalPriceBeforeTaxValue - totalCostValue;
				setPrice(priceValue);
				setPriceAfterTax(priceAfterTaxValue);
				setTotalPriceBeforeTax(totalPriceBeforeTaxValue);
				setTotalPriceAfterTax(totalPriceAfterTaxValue);
				setTotalProfitBeforeTax(totalProfitBeforeTaxValue);
			} else if (profitMarginAfterTax) {
				// 用税后毛利率计算
				const priceAfterTaxValue = cost / (1 - profitMarginAfterTax / 100);
				const totalPriceAfterTaxValue = priceAfterTaxValue * quantity;
				const priceValue = priceAfterTaxValue / (1 - taxRate / 100);
				const totalPriceBeforeTaxValue = priceValue * quantity;
				const totalProfitBeforeTaxValue =
					totalPriceBeforeTaxValue - totalCostValue;
				setPrice(priceValue);
				setPriceAfterTax(priceAfterTaxValue);
				setTotalCost(totalCostValue);
				setTotalPriceBeforeTax(totalPriceBeforeTaxValue);
				setTotalPriceAfterTax(totalPriceAfterTaxValue);
				setTotalProfitBeforeTax(totalProfitBeforeTaxValue);
			}
		}

		setShowResults(true);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		calculate();
	};

	return (
		<div className="container">
			<Tabs.Root defaultValue="profit" value={calculateType}>
				<Tabs.List>
					<Tabs.Trigger
						value="profit"
						onClick={() => {
							setCalculateType("profit");
							resetFields();
						}}
					>
						计算毛利
					</Tabs.Trigger>
					<Tabs.Trigger
						value="price"
						onClick={() => {
							setCalculateType("price");
							resetFields();
						}}
					>
						计算售价
					</Tabs.Trigger>
					<Tabs.Trigger
						value="cost"
						onClick={() => {
							setCalculateType("cost");
							resetFields();
						}}
					>
						计算成本
					</Tabs.Trigger>
				</Tabs.List>

				<Box pt="2">
					<Form.Root className="w-full" onSubmit={handleSubmit}>
						<Form.Field className="mb-2.5 grid" name="cost">
							<Flex justify="between" align="baseline">
								<Form.Label className="text-[15px] font-medium leading-[35px] text-black">
									成本单价：
								</Form.Label>
								<Form.Message
									className="text-[13px] text-red-600 opacity-80"
									match="valueMissing"
								>
									成本单价不能为空
								</Form.Message>
							</Flex>
							<Form.Control required asChild>
								<TextField.Root
									placeholder="输入成本"
									value={cost}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
										setCost(Number(e.target.value))
									}
								/>
							</Form.Control>
						</Form.Field>
						{calculateType === "profit" && (
							<Form.Field className="mb-2.5 grid" name="price">
								<Flex justify="between" align="baseline">
									<Form.Label className="text-[15px] font-medium leading-[35px] text-black">
										销售单价：
									</Form.Label>
									<Form.Message
										className="text-[13px] text-red-600 opacity-80"
										match="valueMissing"
									>
										销售单价不能为空
									</Form.Message>
								</Flex>
								<Form.Control required asChild>
									<TextField.Root
										placeholder="输入售价"
										value={price}
										onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
											setPrice(Number(e.target.value))
										}
									/>
								</Form.Control>
							</Form.Field>
						)}
						{calculateType === "price" && (
							<Form.Field className="mb-2.5 grid" name="profitMarginBeforeTax">
								<Flex justify="between" align="baseline">
									<Form.Label className="text-[15px] font-medium leading-[35px] text-black">
										毛利率（税前）：
									</Form.Label>
									<Form.Message
										className="text-[13px] text-red-600 opacity-80"
										match="valueMissing"
									>
										毛利率不能为空
									</Form.Message>
								</Flex>
								<Form.Control asChild>
									<TextField.Root
										placeholder="输入毛利率"
										value={profitMarginBeforeTax}
										onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
											setProfitMarginBeforeTax(Number(e.target.value))
										}
									/>
								</Form.Control>
							</Form.Field>
						)}
						{calculateType === "price" && (
							<Form.Field className="mb-2.5 grid" name="profitMarginAfterTax">
								<Flex justify="between" align="baseline">
									<Form.Label className="text-[15px] font-medium leading-[35px] text-black">
										毛利率（税后）：
									</Form.Label>
									<Form.Message
										className="text-[13px] text-red-600 opacity-80"
										match="valueMissing"
									>
										毛利率不能为空
									</Form.Message>
								</Flex>
								<Form.Control asChild>
									<TextField.Root
										placeholder="输入毛利率"
										value={profitMarginAfterTax}
										onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
											setProfitMarginAfterTax(Number(e.target.value))
										}
									/>
								</Form.Control>
							</Form.Field>
						)}
						<Form.Field className="mb-2.5 grid" name="quantity">
							<Flex justify="between" align="baseline">
								<Form.Label className="text-[15px] font-medium leading-[35px] text-black">
									数量：
								</Form.Label>
								<Form.Message
									className="text-[13px] text-red-600 opacity-80"
									match="valueMissing"
								>
									数量不能为空
								</Form.Message>
							</Flex>
							<Form.Control required asChild>
								<TextField.Root
									placeholder="输入数量"
									value={quantity.toString()}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
										setQuantity(Number(e.target.value))
									}
								/>
							</Form.Control>
						</Form.Field>

						<Form.Field className="mb-2.5 grid" name="taxRate">
							<Flex justify="between" align="baseline">
								<Form.Label className="text-[15px] font-medium leading-[35px] text-black">
									税率(%)：
								</Form.Label>
								<Form.Message
									className="text-[13px] text-red-600 opacity-80"
									match="valueMissing"
								>
									税率不能为空
								</Form.Message>
							</Flex>
							<Form.Control required asChild>
								<TextField.Root
									placeholder="输入税率"
									value={taxRate.toString()}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
										setTaxRate(Number(e.target.value))
									}
								/>
							</Form.Control>
						</Form.Field>
						<Form.Submit asChild>
							<Button
								style={{
									width: "100%",
									cursor: "pointer",
								}}
							>
								开始计算
							</Button>
						</Form.Submit>
					</Form.Root>
				</Box>
			</Tabs.Root>

			{showResults && (
				<Card mt="2">
					<Flex direction="column" gap="1" gridColumn="1 / -1">
						<Flex justify="between">
							<Text size="2" mb="1" color="gray">
								成本单价
							</Text>
							<Text size="2" mb="1" color="gray">
								{cost}
							</Text>
						</Flex>
						<Flex justify="between">
							<Text size="2" mb="1" color="gray">
								成本总价
							</Text>
							<Text size="2" mb="1" color="gray">
								{totalCost}
							</Text>
						</Flex>
						<Flex justify="between">
							<Text size="2" mb="1" color="gray">
								销售单价（税前）
							</Text>
							<Text size="2" mb="1" color="gray">
								{price}
							</Text>
						</Flex>
						<Flex justify="between">
							<Text size="2" mb="1" color="gray">
								销售总价（税前）
							</Text>
							<Text size="2" mb="1" color="gray">
								{totalPriceBeforeTax}
							</Text>
						</Flex>
						<Flex justify="between">
							<Text size="2" mb="1" color="gray">
								总毛利（税前）
							</Text>
							<Text size="2" mb="1" color="gray">
								{totalProfitBeforeTax}
							</Text>
						</Flex>
						<Flex justify="between">
							<Text size="2" mb="1" color="gray">
								毛利率（税前）
							</Text>
							<Text size="2" mb="1" color="gray">
								{profitMarginBeforeTax?.toFixed(2)}%
							</Text>
						</Flex>
						<Flex justify="between">
							<Text size="2" mb="1" color="gray">
								销售单价（税后）
							</Text>
							<Text size="2" mb="1" color="gray">
								{priceAfterTax}
							</Text>
						</Flex>
						<Flex justify="between">
							<Text size="2" mb="1" color="gray">
								销售总价（税后）
							</Text>
							<Text size="2" mb="1" color="gray">
								{totalPriceAfterTax}
							</Text>
						</Flex>
						<Flex justify="between">
							<Text size="2" mb="1" color="gray">
								总毛利（税后）
							</Text>
							<Text size="2" mb="1" color="gray">
								{totalProfitAfterTax}
							</Text>
						</Flex>
						<Flex justify="between">
							<Text size="2" mb="1" color="gray">
								毛利率（税后）
							</Text>
							<Text size="2" mb="1" color="gray">
								{profitMarginAfterTax?.toFixed(2)}%
							</Text>
						</Flex>
					</Flex>
				</Card>
			)}
		</div>
	);
}

export default App;
