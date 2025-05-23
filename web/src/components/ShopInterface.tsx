import { NumberFormatter, CloseButton } from "@mantine/core";
import { fetchNui } from "../utils/fetchNui";
import { useStoreShop } from "../stores/ShopStore";
import { useStoreSelf } from "../stores/PlayerDataStore";
import { faCreditCard, faMoneyBill1Wave, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cart from "./Cart";
import ShopGrid from "./ShopGrid";
import { isEnvBrowser } from "../utils/misc";
import { Skeleton } from "./ui/skeleton";

function ShopTitle() {
	const { CurrentShop } = useStoreShop();

	if (!CurrentShop)
		return (
			<div className="my-auto ml-6 flex h-full w-1/6 flex-col gap-2">
				<Skeleton className="h-1/4 w-full rounded-full" />
				<Skeleton className="h-1/4 w-2/3 rounded-full" />
				<Skeleton className="h-1/4 w-2/3 rounded-full" />
			</div>
		);

	return <h1 className="ml-6 text-4xl font-bold shop-title">{CurrentShop?.label}</h1>;
}

function PlayerData() {
	const { Money } = useStoreSelf();

	if (!PlayerData) return null;

	return (
		<div className="flex gap-2">
			<p className="flex items-center gap-2 rounded-md px-4 py-2 text-sm font-bold leading-none text-green-300 player-cash">
				<FontAwesomeIcon size="1x" icon={faMoneyBill1Wave} />
				<NumberFormatter prefix="$" value={Money.Cash} thousandSeparator decimalScale={0} />
			</p>
			<p className="flex items-center gap-2 rounded-md px-4 py-2 text-sm font-bold leading-none text-blue-300 player-bank">
				<FontAwesomeIcon size="1x" icon={faCreditCard} />
				<NumberFormatter prefix="$" value={Money.Bank} thousandSeparator decimalScale={0}/>
			</p>
		</div>
	);
}

export default function ShopInterface() {
	return (
		<div className="flex size-full flex-col gap-1">
			<div className="flex w-full items-center justify-between gap-2">
				<ShopTitle />
				<div className="flex items-center gap-2">
					<PlayerData />
					<div className="close-button flex h-8 w-8 items-center justify-center">
					<CloseButton
						size="sm"
						onClick={() => {
							if (!isEnvBrowser()) fetchNui("hideFrame");
						}}
						style={{background:'none'}}
					/>
					</div>
				</div>
			</div>
			<div className="flex h-0 w-full grow items-center gap-2">
				<ShopGrid />
				<Cart />
			</div>
		</div>
	);
}
