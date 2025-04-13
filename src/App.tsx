import { useState } from "react";
import {
	Tabs,
	Button,
	Flex,
	Text,
	Box,
	TextField,
	Card
} from "@radix-ui/themes";
import * as Form from "@radix-ui/react-form";
import { calculateProfitValues, calculateCostValues, caluculatePriceValues, formatNumber } from "./util";

type CalculateType = "profit" | "price" | "cost";

function App() {
	const [calculateType, setCalculateType] = useState<CalculateType>("profit");
	const [showResults, setShowResults] = useState<boolean>(false);
	const [cost, setCost] = useState<number | string>(); // 成本单价
	const [price, setPrice] = useState<number | string>(); // 销售单价
	const [profitMargin, setProfitMargin] = useState<number | string>(); // 毛利率
	const [quantity, setQuantity] = useState<number>(1); // 数量
	const [totalCost, setTotalCost] = useState<number | string>(); // 成本总价
	const [totalPrice, setTotalPrice] = useState<
		number | string
	>(); // 销售总价
	const [totalProfit, setTotalProfit] = useState<
		number | string
	>(); // 总毛利

	const resetFields = () => {
		setCost('');
		setPrice('');
		setQuantity(1);
		setProfitMargin('');
		setTotalCost('');
		setTotalPrice('');
		setTotalProfit('');
		setShowResults(false);
	};

	// 验证表单数据
	const validateInputs = (): boolean => {
		if (calculateType === "profit" && (!cost || !price)) {
			return false;
		}
		if (calculateType === "price" && (!cost || !profitMargin)) {
			return false;
		}
		if (calculateType === "cost" && (!price || !profitMargin)) {
			return false;
		}
		if (!quantity || quantity <= 0) {
			return false;
		}
		return true;
	};

	const calculate = () => {
		if (!validateInputs()) {
			return;
		}

		// 计算毛利
		if (calculateType === "profit") {
			const costValue = Number(cost);
			const priceValue = Number(price);
			const results = calculateProfitValues(costValue, priceValue, quantity);

			setTotalCost(results.totalCostValue);
			setTotalPrice(results.totalPriceValue);
			setTotalProfit(results.totalProfitValue);
			setProfitMargin(results.profitMarginValue);
		}

		// 计算售价
		if (calculateType === "price") {
			const costValue = Number(cost);
			const profitMarginValue = Number(profitMargin);
			const results = caluculatePriceValues(costValue, profitMarginValue, quantity);

			setTotalCost(results.totalCostValue);
			setTotalPrice(results.totalPriceValue);
			setTotalProfit(results.totalProfitValue);
			setPrice(results.priceValue);
		}

		// 计算成本
		if (calculateType === "cost") {
			const priceValue = Number(price);
			const profitMarginValue = Number(profitMargin);
			const results = calculateCostValues(priceValue, profitMarginValue, quantity);
			setTotalCost(results.totalCostValue);
			setCost(results.costValue);
			setTotalPrice(results.totalPriceValue);
			setTotalProfit(results.totalProfitValue);
		}

		setShowResults(true);
	};

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		setValue: React.Dispatch<React.SetStateAction<any>>
	) => {
		if (showResults) {
			setShowResults(false);
		}
		setValue(e.target.value);

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
						data-testid="tab-profit"
					>
						计算毛利
					</Tabs.Trigger>
					<Tabs.Trigger
						value="price"
						onClick={() => {
							setCalculateType("price");
							resetFields();
						}}
						data-testid="tab-price"
					>
						计算售价
					</Tabs.Trigger>
					<Tabs.Trigger
						value="cost"
						onClick={() => {
							setCalculateType("cost");
							resetFields();
						}}
						data-testid="tab-cost"
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
										value={cost}
										onChange={(e) => handleInputChange(e, setCost)}
										data-testid="cost"
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
										value={price}
										onChange={(e) => handleInputChange(e, setPrice)}
										data-testid="price"
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
								name="profitMargin"
							>
								<Flex justify="between" align="baseline">
									<Form.Label className="text-[15px] font-medium leading-[35px] text-black">
										毛利率(%)：
									</Form.Label>
									<Form.Message
										className="text-[13px] text-red-600 opacity-80"
										match="valueMissing"
									>
										毛利率不能为空
									</Form.Message>
								</Flex>
								<Form.Control required asChild>
									<TextField.Root
										placeholder="请输入数字"
										value={profitMargin}
										onChange={(e) => handleInputChange(e, setProfitMargin)}
										data-testid="profit-margin"
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
									placeholder="请输入数字"
									value={quantity}
									onChange={(e) => handleInputChange(e, setQuantity)}
									data-testid="quantity"
								/>
							</Form.Control>
						</Form.Field>

						<Form.Submit asChild>
							<Button
								style={{
									width: "100%",
									cursor: "pointer",
								}}
								data-testid="calculate-button"
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
								data-testid="cost-value"
							>
								{formatNumber(cost)}
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
								data-testid="total-cost-value"
							>
								{formatNumber(totalCost)}
							</Text>
						</Flex>
						<Flex justify="between">
							<Text size="2" mb="1" color="gray">
								销售单价
							</Text>
							<Text
								size="2"
								mb="1"
								className={calculateType === "price" ? "font-bold" : ""}
								data-testid="price-value"
							>
								{formatNumber(price)}
							</Text>
						</Flex>
						<Flex justify="between">
							<Text size="2" mb="1" color="gray">
								销售总价
							</Text>
							<Text
								size="2"
								mb="1"
								className={calculateType === "price" ? "font-bold" : ""}
								data-testid="total-price-value"
							>
								{formatNumber(totalPrice)}
							</Text>
						</Flex>
						<Flex justify="between">
							<Text size="2" mb="1" color="gray">
								总毛利
							</Text>
							<Text
								size="2"
								mb="1"
								className={calculateType === "profit" ? "font-bold" : ""}
								data-testid="total-profit-value"
							>
								{formatNumber(totalProfit)}
							</Text>
						</Flex>
						<Flex justify="between">
							<Text size="2" mb="1" color="gray">
								毛利率
							</Text>
							<Text
								size="2"
								mb="1"
								className={calculateType === "profit" ? "font-bold" : ""}
								data-testid="profit-margin-value"
							>
								{profitMargin !== undefined ? formatNumber(profitMargin) + "%" : ""}
							</Text>
						</Flex>
					</Flex>
				</Card>
			)}
		</div>
	);
}

export default App;
