export default function UnauthenticatedHomepage() {
	return (
		<>
			<div className="hero min-h-[85vh] bg-primary">
  <div className="hero-content flex-col lg:flex-row">
    <div className="text-center lg:text-left p-10">
      <h1 className="text-8xl font-bold text-secondary">Fortuna</h1>
      <p className="py-6 text-3xl text-secondary">Get better results with Fortuna at the helm of your portfolio</p>
    </div>
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <div className="card-body bg-secondary">
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
        borderColor: "#ababab",
		}}
		/>
		</div>
		<div className="label-text-alt">Don't have an account? 
			<a className="link link-hover "> Sign up</a>
		</div>
        <div className="form-control mt-6">
          <button className="btn btn-neutral text-white">Sign in</button>
        </div>
      </div>
    </div>
  </div>
</div>
<div className="h-[15vh] bg-gradient-to-b from-[#707099] to-[#f0ecd8]}"></div>
		</>
	);
}

