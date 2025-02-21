import { Dispatch, SetStateAction, Fragment, ReactNode } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface Params {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	children?: ReactNode;
}

export default function MyDialog({ isOpen, setIsOpen, children }: Params) {
	return (
		<Transition show={isOpen} as={Fragment}>
			<Dialog onClose={() => setIsOpen(false)} className="relative z-50">
				{/* The backdrop, rendered as a fixed sibling to the panel container */}
				<Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
					<div className="fixed inset-0 bg-black/30" />
				</Transition.Child>

				{/* Full-screen container to center the panel */}
				<Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
					<div className="fixed inset-0 flex w-screen items-center justify-center p-4">
						{/* The actual dialog panel  */}
						<Dialog.Panel className="mx-auto max-w-sm rounded-md bg-white p-3 relative">
							<XMarkIcon onClick={() => setIsOpen(false)} className="fixed top-4 left-4 rounded-full border border-black hover:text-red-800 hover:border-red-800 duration-300 cursor-pointer p-1 flex justify-center items-center size-5 stroke-2" />
							{children}
						</Dialog.Panel>
					</div>
				</Transition.Child>
			</Dialog>
		</Transition>
	);
}
