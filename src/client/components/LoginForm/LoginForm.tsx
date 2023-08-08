import React from 'react';

const LoginForm = () => (
  <form>
    <div className="form-outline mb-4">
      <input type="email" id="emailBox" className="form-control" />
      <label className="form-label" htmlFor="emailBox">
        Email address
      </label>
    </div>

    <div className="form-outline mb-4">
      <input type="password" id="passwordBox" className="form-control" />
      <label className="form-label" htmlFor="passwordBox">
        Password
      </label>
    </div>

    <div className="row mb-4">
      <div className="col">
        <a href="#">Forgot password?</a>
      </div>
    </div>

    <button type="button" className="btn btn-primary btn-block mb-4">
      Sign in
    </button>

    <div className="text-center">
      <p>
        Don't have a login? Sign up here:
        {' '}
        <a href="#!">Create an account</a>
      </p>

      {/* maybe something to implement in the future?  */}
      {/* <p>or sign up with:</p>
        <button type="button" className="btn btn-link btn-floating mx-1">
          <i className="fab fa-facebook-f"></i>
        </button>

        <button type="button" className="btn btn-link btn-floating mx-1">
          <i className="fab fa-google"></i>
        </button>

        <button type="button" className="btn btn-link btn-floating mx-1">
          <i className="fab fa-twitter"></i>
        </button>

        <button type="button" className="btn btn-link btn-floating mx-1">
          <i className="fab fa-github"></i>
        </button> */}
    </div>
  </form>
);

export default LoginForm;
