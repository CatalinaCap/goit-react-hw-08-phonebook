import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../redux/slices/authSlice';

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async e => {
    e.preventDefault();
    const form = e.target;
    const userData = {
      name: form.name.value,
      email: form.email.value,
      password: form.password.value,
    };

    try {
      await dispatch(registerUser(userData)).unwrap();
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Failed to register. Please try again.');
    }

    form.reset();
  };

  return (
    <form onSubmit={handleRegister}>
      <label>
        Name:
        <input type="text" name="name" required />
      </label>
      <label>
        Email:
        <input type="email" name="email" required />
      </label>
      <label>
        Password:
        <input type="password" name="password" required />
      </label>
      <button type="submit">Register</button>
    </form>
  );
}

export default RegisterPage;
