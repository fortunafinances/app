export default function UnauthenticatedHomepage() {
	return (
		<>
			<div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-6xl font-bold">Fortuna</h1>
      <p className="py-6 text-3xl">Get better results with Fortuna at the helm of your portfolio</p>
    </div>
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <div className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="text" placeholder="email" className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="text" placeholder="password" className="input input-bordered" />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>

		<div>
			<hr
			style={{
            color: "red",
            backgroundColor: "red",
            height: 1
		}}
		/>
		</div>
		<div className="label-text-alt">Don't have an account? 
			<a className="link link-hover"> Sign up</a>
		</div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Sign in</button>
        </div>
      </div>
    </div>
  </div>
</div>
		</>
	);
}

