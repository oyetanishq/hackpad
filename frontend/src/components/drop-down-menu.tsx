import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import classNames from "classnames";

export interface Option {
	title: string;
	todo: Function;
	hoverBgColor?: string;
	hoverTextColor?: string;
}

export interface Params {
	name: string;
	options: Option[];
}

export default function DropDownMenu({ name, options }: Params) {
	return (
		<Menu as="div" className="z-30 ml-3 relative">
			<Menu.Button className="max-w-xs flex items-center">
				<h6 className="text-gray-800 font-bold hover:text-gray-500">&ensp;{name}&ensp;</h6>
			</Menu.Button>
			<Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
				<Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white overflow-hidden">
					{options.map(({ title, todo, hoverBgColor, hoverTextColor }, index) => (
						<Menu.Item key={index}>
							<button onClick={() => todo()} className={classNames("block px-4 py-2 text-sm text-gray-700 w-full text-left", `${hoverBgColor ?? "hover:bg-gray-100"} ${hoverTextColor ?? "hover:text-gray-800"}`)}>
								{title}
							</button>
						</Menu.Item>
					))}
				</Menu.Items>
			</Transition>
		</Menu>
	);
}
