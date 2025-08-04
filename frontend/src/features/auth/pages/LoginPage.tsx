import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Link,
  useTheme,
  IconButton,
  InputAdornment,
  keyframes,
  alpha
} from '@mui/material';
import BugReportIcon from '@mui/icons-material/BugReport';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { login } from '../api';
import { useNavigate } from 'react-router-dom';

const gradientAnimation = keyframes`
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 100vw 0;
  }
`;

export default function LoginPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      await login({ email, password });
      navigate('/');
    } catch (error: any) {
      setErrorMsg(error?.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(show => !show);

  return (
    <Box
      sx={{
        height: '100vh',
        backgroundImage: `linear-gradient(270deg, ${theme.palette.primary.main}, ${theme.palette.background.default}, ${theme.palette.primary.main}, ${theme.palette.background.default})`,
        backgroundSize: '800% 800%',
        animation: `${gradientAnimation} 4s ease 1`,
        animationFillMode: 'forwards'
      }}
    >
      <Box
        sx={{
          position: 'relative',
          height: '100%',
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.25)',
          gap: 30
        }}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <BugReportIcon sx={{ width: '5.5rem', height: '5.5rem', color: 'white' }} />
          <Typography color="white" fontSize="5.5rem" fontWeight={800}>
            STRIKE
          </Typography>
        </Box>
        <Card
          sx={{
            width: 400,
            p: 3,
            backdropFilter: 'blur(10px)',
            backgroundColor: alpha(theme.palette.background.default, 0.8),
            borderRadius: 1,
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
            zIndex: 1
          }}
        >
          <CardContent>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Log in
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                color="secondary"
                fullWidth
                label="Email"
                type="email"
                margin="normal"
                value={email}
                onChange={e => setEmail(e.target.value)}
                error={!!errorMsg}
              />

              <TextField
                color="secondary"
                fullWidth
                label="Password"
                margin="normal"
                value={password}
                onChange={e => setPassword(e.target.value)}
                error={!!errorMsg}
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

              <Button fullWidth variant="contained" type="submit" disabled={loading} sx={{ mt: 2 }}>
                {loading ? 'Loging...' : 'Log in'}
              </Button>
            </Box>

            {errorMsg && (
              <Typography variant="body2" color="error" sx={{ mb: 1 }}>
                {errorMsg}
              </Typography>
            )}

            <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
              Don't you have an account?{' '}
              <Link color="secondary" href="/register" underline="hover">
                Sign up!
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
