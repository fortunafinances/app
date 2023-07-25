import { Formik, Form, Field, ErrorMessage } from "formik";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function CreateAccount() {
  type errorType ={
    accountname? : string;
    bank? :string;
    accountnumber? :string;
    routingnumber?:  string;
  }

  const navigate = useNavigate();

  const routeChange = () => {
    const path = `/createProfile`;
    navigate(path);
  };
  return (
    <div className="h-screen flex [&>div]:w-[50%]">
      <div className="flex flex-col gap-5 bg-primary text-secondary p-8">
        <h1 className=" mt-[30%] font-semibold text-left md:text-8xl text-5xl">
          Create An Account
        </h1>
        {/* <h2 className=" inline-block text-4xl">
          Get better results with{" "}
          <p className="font-bold text-left inline-block text-black bg-secondary px-2">
            Fortuna
          </p>{" "}
          at the helm of your portfolio
        </h2> */}
      </div>
      <div className="bg-secondary p-4 text-primary">
        <h1 className="text-7xl">Account Information</h1>
        <hr className="h-[2px] my-8 bg-primary border-0"></hr>
        <div className="App">
          <center>
            <Formik
              initialValues={{
                accountname: "",
                bank: "",
                accountnumber: "",
                routingnumber: "",
              }}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                  setSubmitting(false);
                }, 400);
              }}

              validate={(values) => {
                const errors: errorType = {};
                if (!values.accountname) {
                  errors.accountname = "*Required";
                }

                // if (!values.bank) {
                //   errors.bank = "*Required";
                // }

                // if (!values.accountnumber) {
                //   errors.accountnumber = "*Required";
                // }

                // if (!values.routingnumber) {
                //   errors.routingnumber = "*Required";
                // }

                return errors;
              }}
            >
              {({ isSubmitting }) => (
                <Form className="flex flex-col gap-4 ">
                  <div>
                    <h1 className="text-left text-3xl font-medium pl-1">
                      Account Name
                    </h1>
                    <ErrorMessage
                      name="accountname"
                      component="div"
                      className="text-left text-[#FF0000]"
                    />
                    <Field
                      type="text"
                      name="accountname"
                      placeholder="Account Name"
                      className="pl-3 h-14 w-full rounded-md text-xl"
                    />
                  </div>
                  <div>
                    <h1 className="text-left text-3xl font-medium pl-1">
                      Bank
                    </h1>
                    {/* <ErrorMessage
                      name="bank"
                      component="div"
                      className="text-left text-[#FF0000]"
                    /> */}
                    <Field
                      type="text"
                      name="bank"
                      placeholder="Bank"
                      className="pl-3 h-14 w-full rounded-md text-xl"
                    />
                  </div>
                  <div>
                    <h1 className="text-left text-3xl font-medium pl-1">
                      Account Number
                    </h1>
                    {/* <ErrorMessage
                      name="accountnumber"
                      component="div"
                      className="text-left text-[#FF0000]"
                    /> */}
                    <Field
                      type="accountnumber"
                      name="accountnumber"
                      placeholder="Account Number"
                      className="pl-3 h-14 w-full rounded-md text-xl"
                    />
                  </div>
                  <div>
                    <h1 className="text-left text-3xl font-medium pl-1">
                      Routing Number
                    </h1>
                    {/* <ErrorMessage
                      name="routingnumber"
                      component="div"
                      className="text-left text-[#FF0000]"
                    /> */}
                    <Field
                      type="routingnumber"
                      name="routingnumber"
                      placeholder="Routing Number"
                      className="pl-3 h-14 w-full rounded-md text-xl"
                    />
                  </div>
                  <div className="flex flex-row justify-between">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex flex-row justify-end"
                      onClick={routeChange}
                    >
                      <BsArrowLeft
                        size={60}
                        className="transition duration:500 hover:scale-125"
                      />
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex flex-row justify-end"
                    >
                      <BsArrowRight
                        size={60}
                        className="transition duration:500 hover:scale-125"
                      />
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </center>
        </div>
      </div>
    </div>
  );
}
