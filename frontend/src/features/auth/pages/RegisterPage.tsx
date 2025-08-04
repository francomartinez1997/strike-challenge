import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  useTheme,
  alpha,
  InputAdornment,
  IconButton
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { register } from '../api';
import { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required')
});

export default function RegisterPage() {
  const theme = useTheme();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(show => !show);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      roleId: 2
    },
    validationSchema,
    onSubmit: async values => {
      try {
        await register(values);
        navigate('/login');
      } catch (error: any) {
        console.error(error);
      }
    }
  });

  return (
    <Box
      sx={{
        height: '100vh',
        backgroundImage: `linear-gradient(270deg, ${theme.palette.primary.main}, ${theme.palette.background.default})`,
        backgroundSize: '800% 800%',
      }}
    >
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Card
          sx={{
            width: 400,
            p: 3,
            backdropFilter: 'blur(10px)',
            backgroundColor: alpha(theme.palette.background.default, 0.8),
            borderRadius: 1
          }}
        >
          <CardContent>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Sign up
            </Typography>
            <Box component="form" onSubmit={formik.handleSubmit}>
              <TextField
                name="name"
                label="Name"
                fullWidth
                margin="normal"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              <TextField
                name="email"
                label="Email"
                fullWidth
                margin="normal"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                name="password"
                label="Password"
                fullWidth
                margin="normal"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                type={showPassword ? 'text' : 'password'}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleClickShowPassword} sx={{ padding: 0.5 }}>
                          {showPassword ? (
                            <VisibilityOffIcon fontSize="small" />
                          ) : (
                            <VisibilityIcon fontSize="small" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    )
                  }
                }}
              />
              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{ mt: 2 }}
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? 'Signing up...' : 'Sign up'}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
