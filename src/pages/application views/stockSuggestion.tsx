import { gql, useMutation, useReactiveVar } from "@apollo/client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import {
	accounts,
	currentAccountId,
	userInfo,
} from "../../utilities/reactiveVariables";


export default function StockSuggestion() {
	const navigate = useNavigate();
	const user = useReactiveVar(userInfo);

	return (
		<div className="h-screen flex [&>div]:w-[50%]">
			<div className="flex flex-col gap-5 bg-primary text-accent p-8">
				<h1 className=" mt-[30%] font-semibold text-left md:text-7xl text-5xl">
					Let's invest in your first stock
				</h1>
				
			</div>
			<div className="bg-accent p-4 text-primary">
				<h1 className="text-1xl md:text-3xl">Select 5 categories that you're most interested in</h1>
				<hr className="h-[2px] my-8 bg-primary border-0"></hr>
				<div className="App">
					<center>
					
						
					</center>
				</div>
			</div>
		</div>
	);
}
