import { Dispatch, SetStateAction } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import SigninForm from "@/components/signin/form";

type Params = {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function Signin({ open, setOpen }: Params) {
	return (
		<Dialog open={open} onClose={setOpen} className="relative z-20">
			<DialogBackdrop transition className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0" />

			<div className="fixed inset-0 overflow-hidden">
				<div className="absolute inset-0 overflow-hidden">
					<div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
						<DialogPanel transition className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700">
							<div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
								<div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
									{/* header */}
									<div className="flex items-start justify-between">
										<div className="ml-3 flex h-7 items-center">
											<button type="button" onClick={() => setOpen(false)} className="relative -m-2 p-2 text-gray-400 hover:text-gray-500">
												<span className="absolute -inset-0.5" />
												<span className="sr-only">Close panel</span>
												<XMarkIcon aria-hidden="true" className="size-6" />
											</button>
										</div>
									</div>

									{/* login / register form */}
									<div className="flow-root mt-8"><SigninForm /></div>
								</div>

								{/* footer */}
								<div className="border-t border-gray-200 px-4 py-6 sm:px-6">
									<div className=" flex justify-center text-center text-sm text-gray-500">
										<p>
											<button type="button" onClick={() => setOpen(false)} className="font-medium ">
												hackpad
											</button>
										</p>
									</div>
								</div>
							</div>
						</DialogPanel>
					</div>
				</div>
			</div>
		</Dialog>
	);
}
