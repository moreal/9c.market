import type { Product } from "~/types/iap";
import AttributeItem from "~/components/ui/AttributeItem";

type IAPProductDetailsProps = {
	product: Product;
};

export default function IAPProductDetails(props: IAPProductDetailsProps) {
	return (
		<div class="grid grid-cols-2 gap-3 text-sm text-gray-600">
			{props.product.required_level && (
				<AttributeItem
					icon="lightning"
					label="Required Level:"
					value={props.product.required_level}
				/>
			)}

			{props.product.daily_limit && (
				<AttributeItem
					icon="clock"
					label="Daily Limit:"
					value={props.product.daily_limit}
				/>
			)}

			{props.product.weekly_limit && (
				<AttributeItem
					icon="calendar"
					label="Weekly Limit:"
					value={props.product.weekly_limit}
				/>
			)}

			{props.product.account_limit && (
				<AttributeItem
					icon="user"
					label="Account Limit:"
					value={props.product.account_limit}
				/>
			)}

			{props.product.product_type && (
				<AttributeItem
					icon="tag"
					label="Type:"
					value={props.product.product_type}
				/>
			)}
		</div>
	);
}
