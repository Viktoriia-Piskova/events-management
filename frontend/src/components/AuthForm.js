import { Form, Link, useActionData, useNavigation, useSearchParams } from 'react-router-dom';
import classes from './AuthForm.module.css';

function AuthForm() {
  const [searchParams] = useSearchParams();
  const navigation = useNavigation();
  const isLoginMode = searchParams.get('mode') === 'login';
  const isSubmitting = navigation.state === "submitting"

  const data = useActionData();

  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>{isLoginMode ? 'Log in' : 'Create a new user'}</h1>
        {data && data.errors && (
          <ul>
            {Object.values(data.errors).map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={classes.actions}>
          <Link to={`?mode=${isLoginMode ? 'signup': 'login'}`} >
            {isLoginMode ? 'Create new user' : 'Login'}
          </Link>
          <button disabled={isSubmitting} >{`${isSubmitting ? 'Submitting...' : 'Submit'}`}</button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
