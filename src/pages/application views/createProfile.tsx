import { Formik, Form, Field, ErrorMessage } from "formik";

export default function CreateProfile() {
  return (
    <div className="h-screen flex [&>div]:w-[50%]">
      <div className="flex flex-col gap-5 bg-primary text-secondary p-8">
        <h1 className=" mt-[50%] font-semibold text-left md:text-8xl text-5xl">
          Welcome to Fortuna
        </h1>
        <h2 className=" inline-block text-4xl">
          Get better results with{" "}
          <h3 className="font-bold text-left inline-block text-black bg-secondary px-2">
            Fortuna
          </h3>{" "}
          at the helm of your portfolio
        </h2>
      </div>
      <div className="bg-secondary p-4 text-primary">
        <h1 className="text-7xl">Create Profile</h1>
        <hr className="h-[2px] my-8 bg-primary border-0"></hr>
        <div className="App">
          <center>
            <Formik
              initialValues={{
                firstname: "",
                lastname: "",
                email: "",
                phonenumber: "",
                birthdate: "",
              }}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                  setSubmitting(false);
                }, 400);
              }}
              validate={(values) => {
                const errors = {
                  firstname: "",
                  lastname: "",
                  email: "",
                  phonenumber: "",
                  birthdate: "",
                };
                if (!values.firstname) {
                  errors.firstname = "Required";
                }

                if (!values.lastname) {
                  errors.lastname = "Required";
                }

                if (!values.email) {
                  errors.email = "Required";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = "Invalid email address";
                }

                if (!values.phonenumber) {
                  errors.phonenumber = "Required";
                } else if (
                  !/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/i.test(
                    values.phonenumber
                  )
                ) {
                  errors.phonenumber = "Invalid phone number";
                }
                if (!values.birthdate) {
                  errors.birthdate = "Required";
                }
                return errors;
              }}
            >
              {({ isSubmitting }) => (
                <Form className="flex flex-col gap-4">
                  <div>
                    <Field
                      type="text"
                      name="firstname"
                      placeholder="First name"
                      className="h-10"
                    />
                    <ErrorMessage name="firstname" component="div" />
                  </div>
                  <div>
                    <Field
                      type="text"
                      name="lastname"
                      placeholder="Last name"
                      className="h-10"
                    />
                    <ErrorMessage name="lastname" component="div" />
                  </div>
                  <div>
                    <Field
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      className="h-10"
                    />
                    <ErrorMessage name="email" component="div" />
                  </div>
                  <div>
                    <Field
                      type="phonenumber"
                      name="phonenumber"
                      placeholder="Phone number"
                      className="h-10"
                    />
                    <ErrorMessage name="phonenumber" component="div" />
                  </div>

                  <button type="submit" disabled={isSubmitting}>
                    Submit
                  </button>
                </Form>
              )}
            </Formik>
          </center>
        </div>
      </div>
    </div>
  );
}
