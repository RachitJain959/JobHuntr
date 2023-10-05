import { Form, Link, redirect } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import Logo from '../components/Logo';
import FormRow from '../components/FormRow';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify'; //provides alerts to the user
import { SubmitBtn } from '../components';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post('/auth/register', data);
    toast.success('Registration Successful!');
    return redirect('/login');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Register = () => {
  return (
    <Wrapper>
      <div>
        <Form method="post" className="form">
          <Logo />
          <h4>Register</h4>
          <FormRow type="text" name="name" defaultValue="ron" />
          <FormRow
            type="text"
            name="lastName"
            labelText="Last Name"
            defaultValue="jain"
          />
          <FormRow type="text" name="location" defaultValue="earth" />
          <FormRow type="email" name="email" defaultValue="test@email.com" />
          <FormRow type="password" name="password" defaultValue="secret123" />

          <SubmitBtn />
          <p>
            Already a member?{' '}
            <Link to="/login" className="member-btn">
              Login
            </Link>
          </p>
        </Form>
      </div>
    </Wrapper>
  );
};

export default Register;
