import { useState } from "react";
import {
	Tabs,
	Button,
	Flex,
	Text,
	Box,
	TextField,
	Card,
	SegmentedControl,
} from "@radix-ui/themes";
import * as Form from "@radix-ui/react-form";

type CalculateType = "profit" | "price" | "cost";
type ProfitMarginType = "beforeTax" | "afterTax";

function App() {
	const defaultTaxRate = 13;
	const [calculateType, setCalculateType] = useState<CalculateType>("profit");
	const [profitMarginType, setProfitMarginType] =
		useState<ProfitMarginType>("afterTax");
	const [showResults, setShowResults] = useState<boolean>(false);
	const [cost, setCost] = useState<number | string>(); // 成本单价
	const [price, setPrice] = useState<number | string>(); // 销售单价
	const [profitMargin, setProfitMargin] = useState<number | string>(); // 毛利率
	const [priceAfterTax, setPriceAfterTax] = useState<number | undefined>(); // 销售单价（税后）
	const [quantity, setQuantity] = useState<number>(1); // 数量
	const [taxRate, setTaxRate] = useState<number>(defaultTaxRate); // 税率
	const [totalCost, setTotalCost] = useState<number | undefined>(); // 成本总价
	const [totalPriceBeforeTax, setTotalPriceBeforeTax] = useState<
		number | undefined
	>(); // 销售总价（税前）
	const [totalPriceAfterTax, setTotalPriceAfterTax] = useState<
		number | undefined
	>(); // 销售总价（税后）
	const [totalProfitBeforeTax, setTotalProfitBeforeTax] = useState<
		number | undefined
	>(); // 总毛利（税前）
	const [totalProfitAfterTax, setTotalProfitAfterTax] = useState<
		number | undefined
	>(); // 总毛利（税后）
	const [profitMarginBeforeTax, setProfitMarginBeforeTax] = useState<
		number | undefined
	>(); // 毛利率（税前）
	const [profitMarginAfterTax, setProfitMarginAfterTax] = useState<
		number | undefined
	>(); // 毛利率（税后）

	const resetFields = () => {
		setCost("");
		setPrice("");
		setQuantity(1);
		setProfitMargin("");
		setPriceAfterTax(undefined);
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
			const totalCostValue = Number(cost) * quantity;
			const totalPriceBeforeTaxValue = Number(price) * quantity;
			const priceAfterTaxValue = Number(price) * (1 - taxRate / 100);
			const totalPriceAfterTaxValue =
				totalPriceBeforeTaxValue * (1 - taxRate / 100);
			const totalProfitBeforeTaxValue =
				totalPriceBeforeTaxValue - totalCostValue;
			const profitMarginBeforeTaxValue =
				(totalProfitBeforeTaxValue / totalPriceBeforeTaxValue) * 100;
			const totalProfitAfterTaxValue = totalPriceAfterTaxValue - totalCostValue;
			const profitMarginAfterTaxValue =
				(totalProfitAfterTaxValue / totalPriceAfterTaxValue) * 100;

			setPriceAfterTax(priceAfterTaxValue);
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
			if (!cost || !quantity || !taxRate) {
				return;
			}
			const totalCostValue = Number(cost) * quantity;
			setTotalCost(totalCostValue);
			// 用税前毛利率计算
			if (profitMarginType === "beforeTax" && profitMargin) {
				const profitMarginBeforeTaxValue = Number(profitMargin);
				const priceValue =
					Number(cost) / (1 - profitMarginBeforeTaxValue / 100);
				const totalPriceBeforeTaxValue = priceValue * quantity;
				const priceAfterTaxValue = priceValue * (1 - taxRate / 100);
				const totalPriceAfterTaxValue = priceAfterTaxValue * quantity;
				const totalProfitBeforeTaxValue =
					totalPriceBeforeTaxValue - totalCostValue;
				const totalProfitAfterTaxValue =
					totalPriceAfterTaxValue - totalCostValue;
				const profitMarginAfterTaxValue =
					(totalProfitAfterTaxValue / totalPriceAfterTaxValue) * 100;
				setPrice(priceValue);
				setPriceAfterTax(priceAfterTaxValue);
				setTotalPriceBeforeTax(totalPriceBeforeTaxValue);
				setTotalPriceAfterTax(totalPriceAfterTaxValue);
				setTotalProfitBeforeTax(totalProfitBeforeTaxValue);
				setTotalProfitAfterTax(totalProfitAfterTaxValue);
				setProfitMarginAfterTax(profitMarginAfterTaxValue);
			} else if (profitMarginType === "afterTax" && profitMargin) {
				// 用税后毛利率计算
				const profitMarginAfterTaxValue = Number(profitMargin);
				const priceAfterTaxValue =
					Number(cost) / (1 - profitMarginAfterTaxValue / 100);
				const totalPriceAfterTaxValue = priceAfterTaxValue * quantity;
				const priceValue = priceAfterTaxValue / (1 - taxRate / 100);
				const totalPriceBeforeTaxValue = priceValue * quantity;
				const totalProfitBeforeTaxValue =
					totalPriceBeforeTaxValue - totalCostValue;
				const totalProfitAfterTaxValue =
					totalPriceAfterTaxValue - totalCostValue;
				const profitMarginBeforeTaxValue =
					(totalProfitBeforeTaxValue / totalPriceBeforeTaxValue) * 100;
				setPrice(priceValue);
				setPriceAfterTax(priceAfterTaxValue);
				setTotalCost(totalCostValue);
				setTotalPriceBeforeTax(totalPriceBeforeTaxValue);
				setTotalPriceAfterTax(totalPriceAfterTaxValue);
				setTotalProfitBeforeTax(totalProfitBeforeTaxValue);
				setTotalProfitAfterTax(totalProfitAfterTaxValue);
				setProfitMarginBeforeTax(profitMarginBeforeTaxValue);
			}
		}

		// 计算成本
		if (calculateType === "cost") {
			if (!price || !quantity || !taxRate) {
				return;
			}

			const totalPriceBeforeTaxValue = Number(price) * quantity;
			const priceAfterTaxValue = Number(price) * (1 - taxRate / 100);
			const totalPriceAfterTaxValue = priceAfterTaxValue * quantity;
			setPriceAfterTax(priceAfterTaxValue);
			setTotalPriceBeforeTax(totalPriceBeforeTaxValue);
			setTotalPriceAfterTax(totalPriceAfterTaxValue);

			// 用税前毛利率计算
			if (profitMarginType === "beforeTax" && profitMargin) {
				const profitMarginBeforeTaxValue = Number(profitMargin);
				const costValue =
					Number(price) * (1 - profitMarginBeforeTaxValue / 100);
				const totalCostValue = costValue * quantity;
				const totalProfitBeforeTaxValue =
					totalPriceBeforeTaxValue - totalCostValue;
				const totalProfitAfterTaxValue =
					totalPriceAfterTaxValue - totalCostValue;
				const profitMarginAfterTaxValue =
					(totalProfitAfterTaxValue / totalPriceAfterTaxValue) * 100;

				setCost(costValue);
				setTotalCost(totalCostValue);
				setTotalProfitBeforeTax(totalProfitBeforeTaxValue);
				setTotalProfitAfterTax(totalProfitAfterTaxValue);
				setProfitMarginBeforeTax(profitMarginBeforeTaxValue);
				setProfitMarginAfterTax(profitMarginAfterTaxValue);
			} else if (profitMarginType === "afterTax" && profitMargin) {
				// 用税后毛利率计算
				const profitMarginAfterTaxValue = Number(profitMargin);
				const costValue =
					Number(priceAfterTaxValue) * (1 - profitMarginAfterTaxValue / 100);
				const totalCostValue = costValue * quantity;
				const totalProfitBeforeTaxValue =
					totalPriceBeforeTaxValue - totalCostValue;
				const totalProfitAfterTaxValue =
					totalPriceAfterTaxValue - totalCostValue;
				const profitMarginBeforeTaxValue =
					(totalProfitBeforeTaxValue / totalPriceBeforeTaxValue) * 100;

				setCost(costValue);
				setTotalCost(totalCostValue);
				setTotalProfitBeforeTax(totalProfitBeforeTaxValue);
				setTotalProfitAfterTax(totalProfitAfterTaxValue);
				setProfitMarginBeforeTax(profitMarginBeforeTaxValue);
				setProfitMarginAfterTax(profitMarginAfterTaxValue);
			}
		}

		setShowResults(true);
	};

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		setValue: (value: number) => void
	) => {
		if (showResults) {
			setShowResults(false);
		}
		const value = e.target.value as unknown as number;
		setValue(value);
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
						{calculateType !== "cost" && (
							<Form.Field className="mb-2.5 grid" name="cost">
								<Form.Label className="text-[15px] font-medium leading-[35px] text-black">
									成本单价：
								</Form.Label>
								<Form.Control required asChild>
									<TextField.Root
										placeholder="请输入数字"
										type="number"
										value={cost}
										onChange={(e) => {
											handleInputChange(e, setCost);
										}}
									/>
								</Form.Control>
								<Form.Message
									className="text-[13px] text-red-600 opacity-80"
									match="valueMissing"
								>
									成本单价不能为空
								</Form.Message>
							</Form.Field>
						)}
						{calculateType !== "price" && (
							<Form.Field className="mb-2.5 grid" name="price">
								<Form.Label className="text-[15px] font-medium leading-[35px] text-black">
									销售单价：
								</Form.Label>
								<Form.Control required asChild>
									<TextField.Root
										placeholder="请输入数字"
										type="number"
										value={price}
										onChange={(e) => {
											handleInputChange(e, setPrice);
										}}
									/>
								</Form.Control>
								<Form.Message
									className="text-[13px] text-red-600 opacity-80"
									match="valueMissing"
								>
									销售单价不能为空
								</Form.Message>
							</Form.Field>
						)}
						{calculateType !== "profit" && (
							<Form.Field
								className="mb-2.5 grid"
								name={
									profitMarginType === "afterTax"
										? "profitMarginAfterTax"
										: "profitMarginBeforeTax"
								}
							>
								<Flex justify="between" align="baseline">
									<Form.Label className="text-[15px] font-medium leading-[35px] text-black">
										<Flex align="center">毛利率(%)：</Flex>
									</Form.Label>
									<SegmentedControl.Root
										defaultValue="afterTax"
										value={profitMarginType}
										onValueChange={(value) => {
											if (showResults) {
												setShowResults(false);
											}
											setProfitMarginType(value as ProfitMarginType);
										}}
										size="1"
									>
										<SegmentedControl.Item value="beforeTax">
											税前
										</SegmentedControl.Item>
										<SegmentedControl.Item value="afterTax">
											税后
										</SegmentedControl.Item>
									</SegmentedControl.Root>
								</Flex>
								<Form.Control required asChild>
									<TextField.Root
										placeholder="请输入数字"
										type="number"
										value={profitMargin}
										onChange={(e) => {
											handleInputChange(e, setProfitMargin);
										}}
									/>
								</Form.Control>
								<Form.Message
									className="text-[13px] text-red-600 opacity-80"
									match="valueMissing"
								>
									毛利率不能为空
								</Form.Message>
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
									placeholder="请输入数字"
									type="number"
									value={quantity}
									onChange={(e) => {
										handleInputChange(e, setQuantity);
									}}
								/>
							</Form.Control>
						</Form.Field>

						<Form.Field className="mb-2.5 grid" name="taxRate">
							<Form.Label className="text-[15px] font-medium leading-[35px] text-black">
								税率(%)：
							</Form.Label>
							<Form.Control required asChild>
								<TextField.Root
									placeholder="请输入数字"
									type="number"
									value={taxRate}
									onChange={(e) => {
										handleInputChange(e, setTaxRate);
									}}
								/>
							</Form.Control>
							<Form.Message
								className="text-[13px] text-red-600 opacity-80"
								match="valueMissing"
							>
								税率不能为空
							</Form.Message>
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
							<Text
								size="2"
								mb="1"
								className={calculateType === "cost" ? "font-bold" : ""}
							>
								{cost}
							</Text>
						</Flex>
						<Flex justify="between">
							<Text size="2" mb="1" color="gray">
								成本总价
							</Text>
							<Text
								size="2"
								mb="1"
								className={calculateType === "cost" ? "font-bold" : ""}
							>
								{totalCost}
							</Text>
						</Flex>
						<Flex justify="between">
							<Text size="2" mb="1" color="gray">
								销售单价（税前）
							</Text>
							<Text
								size="2"
								mb="1"
								className={calculateType === "price" ? "font-bold" : ""}
							>
								{price}
							</Text>
						</Flex>
						<Flex justify="between">
							<Text size="2" mb="1" color="gray">
								销售总价（税前）
							</Text>
							<Text
								size="2"
								mb="1"
								className={calculateType === "price" ? "font-bold" : ""}
							>
								{totalPriceBeforeTax}
							</Text>
						</Flex>
						<Flex justify="between">
							<Text size="2" mb="1" color="gray">
								总毛利（税前）
							</Text>
							<Text
								size="2"
								mb="1"
								className={calculateType === "profit" ? "font-bold" : ""}
							>
								{totalProfitBeforeTax}
							</Text>
						</Flex>
						<Flex justify="between">
							<Text size="2" mb="1" color="gray">
								毛利率（税前）
							</Text>
							<Text
								size="2"
								mb="1"
								className={calculateType === "profit" ? "font-bold" : ""}
							>
								{Number(profitMarginBeforeTax).toFixed(2)}%
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
							<Text
								size="2"
								mb="1"
								className={calculateType === "profit" ? "font-bold" : ""}
							>
								{totalProfitAfterTax}
							</Text>
						</Flex>
						<Flex justify="between">
							<Text size="2" mb="1" color="gray">
								毛利率（税后）
							</Text>
							<Text
								size="2"
								mb="1"
								className={calculateType === "profit" ? "font-bold" : ""}
							>
								{Number(profitMarginAfterTax).toFixed(2)}%
							</Text>
						</Flex>
					</Flex>
				</Card>
			)}
		</div>
	);
}

export default App;
