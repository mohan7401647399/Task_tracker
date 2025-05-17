import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Link,
  Alert,
  MenuItem,
  CircularProgress
} from '@mui/material';
import { useAuth } from '../context/authContext';

// List of countries for the dropdown
const countries = [
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'AU', name: 'Australia' },
  { code: 'IN', name: 'India' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'JP', name: 'Japan' },
  { code: 'CN', name: 'China' },
  { code: 'BR', name: 'Brazil' },
  { code: 'MX', name: 'Mexico' },
  { code: 'RU', name: 'Russia' },
  { code: 'KR', name: 'South Korea' },
  { code: 'IT', name: 'Italy' },
  { code: 'ES', name: 'Spain' },
  { code: 'NL', name: 'Netherlands' },
];

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    country: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (!formData.country) {
      setError('Please select your country');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/register`,
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          country: formData.country
        }
      );

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);

        login(response.data.token);

        // Immediate navigation after successful registration
        navigate('/dashboard');
      } else {
        throw new Error('No token received');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError(
        err.response?.data?.message ||
        err.message ||
        'Registration failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={ {
        mt: 8,
        mb: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      } }>
        <Typography variant="h4" component="h1" gutterBottom>
          Register
        </Typography>

        { error && (
          <Alert severity="error" sx={ { mb: 2, width: '100%' } }>
            { error }
          </Alert>
        ) }

        <Box
          component="form"
          onSubmit={ handleSubmit }
          sx={ { mt: 1, width: '100%' } }
        >
          <TextField
            margin="normal"
            required
            fullWidth
            label="Full Name"
            name="name"
            autoComplete="name"
            value={ formData.name }
            onChange={ handleChange }
            error={ !!error }
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            autoComplete="email"
            value={ formData.email }
            onChange={ handleChange }
            error={ !!error }
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            name="password"
            type="password"
            autoComplete="new-password"
            value={ formData.password }
            onChange={ handleChange }
            error={ !!error }
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={ formData.confirmPassword }
            onChange={ handleChange }
            error={ !!error }
          />
          <TextField
            select
            margin="normal"
            required
            fullWidth
            label="Country"
            name="country"
            value={ formData.country }
            onChange={ handleChange }
            error={ !!error && !formData.country }
          >
            <MenuItem value="">
              <em>Select your country</em>
            </MenuItem>
            { countries.map((country) => (
              <MenuItem key={ country.code } value={ country.code }>
                { country.name }
              </MenuItem>
            )) }
          </TextField>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={ { mt: 3, mb: 2 } }
            disabled={ loading }
          >
            { loading ? <CircularProgress size={ 24 } /> : 'Register' }
          </Button>
        </Box>

        <Typography variant="body2">
          Already have an account?{ ' ' }
          <Link href="/login" underline="hover">
            Sign in
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default RegisterPage;