import EdiText from "react-editext";

export default function ProfileInfo() {
  const firstName = "Lindsay";
  const onSave = (val: string) => {
    console.log("Edited Value -> ", val);
  };
  const validationFailed = () => {
    alert("Validation Failed: Please fill out all forms.");
  };

  function createField(prop: string) {
    return (
      <EdiText
        className="w-full"
        type="text"
        value={prop}
        onSave={onSave}
        validation={(val) => val !== ""}
        onValidationFail={validationFailed}
        inputProps={{ style: { borderColor: "#7c1fff" } }}
        containerProps={{
          style: {
            backgroundColor: "white",
            borderRadius: 3,
          },
        }}
        editButtonProps={{
          style: {
            backgroundColor: "",
            borderRadius: 3,
            borderColor: "white",
          },
        }}
        viewProps={{
          style: {
            backgroundColor: "white",
            borderRadius: 3,
            padding: 8,
            width: "100%",
            fontSize: "20px",
          },
        }}
      />
    );
  }

  return (
    <div className="h-screen flex">
      <div className="bg-primary w-[50%] h-full flex flex-col gap-9">
        <div className="text-secondary text-4xl md:text-6xl xl:text-8xl items-center mt-[30%] ml-[5%] font-medium">
          <h1>Hello,</h1>
          <h1 className="bg-info px-2 w-fit">{firstName}</h1>
        </div>
        <h2 className="ml-[5%] text-info text-5xl">Edit Profile</h2>
      </div>
      <div className="w-[50%] overflow-y-auto flex-col p-6 bg-accent text-primary [&>h3]:text-2xl [&>h3]:py-2 [&>h2]:text-5xl [&>h2]:py-4">
        <h1 className="text-8xl">Profile</h1>
        <hr className="h-[2px] my-8 bg-primary border-0"></hr>
        <h2>Personal Information</h2>
        <h3>First Name</h3>
        {createField(firstName)}
        <h3>Last Name</h3>
        {createField(firstName)}
        <h3>Email</h3>
        {createField(firstName)}
        <h3>Phone Number</h3>
        {createField(firstName)}

        <h2 className="py-4">Bank Information</h2>
        <h3>Bank</h3>
        {createField(firstName)}
        <h3>Account Number</h3>
        {createField(firstName)}
        <h3>Routing Number</h3>
        {createField(firstName)}

        <h2>Accounts</h2>
        <h3>Account 1</h3>
        <h3>Account 2</h3>
      </div>
    </div>
  );
}
