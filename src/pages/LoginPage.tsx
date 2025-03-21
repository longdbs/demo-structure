import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid2,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logoCarelogix from "../assets/logoCarelogix.png";
import { useAuth } from "../context/AuthContext";
import { useDebounce } from "../hooks/useDebounce";
import { UserLoginI } from "../types/user.type";
function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [account, setAccount] = useState<UserLoginI>({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const debouncedUsername = useDebounce(account.username, 500);
  const debouncedPassword = useDebounce(account.password, 500);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const handleSignIn = () => {
    login(account?.username);
    navigate("/conversation", { replace: true });
  };
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    const value = e.target.value;
    setAccount((prevAccount) => ({
      ...prevAccount,
      [field]: value,
    }));
  };
  useEffect(() => {
    setAccount((prevAccount) => ({
      ...prevAccount,
      username: debouncedUsername,
      password: debouncedPassword,
    }));
  }, [debouncedUsername, debouncedPassword]);
  return (
    <React.Fragment>
      <Grid2 container sx={{ justifyContent: "space-between", p: 2 }}>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Avatar
            alt="Carelogix"
            src={logoCarelogix}
            sx={{ width: 60, height: 60 }}
          />
          <Typography variant="h3">Carelogix</Typography>
        </Box>
      </Grid2>

      <Grid2
        container
        sx={{
          height: "calc(100vh - 250px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          px: 3,
        }}
      >
        <Grid2
          container
          sx={{
            width: "100%",
            maxWidth: 400,
            padding: 2,
            boxSizing: "border-box",
            flexDirection: "column",
          }}
        >
          <Typography variant="h4" sx={{ textAlign: "center" }}>
            Welcome Back
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "text.disabled", whiteSpace: "nowrap" }}
          >
            Fill out the information below in order to access your account
          </Typography>

          <Grid2 container sx={{ flexDirection: "column", gap: 2, pt: 2 }}>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              type="email"
              value={account.username}
              onChange={(e) => handleInputChange(e, "username")}
              fullWidth
            />
            <FormControl sx={{ width: "100%" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword
                          ? "hide the password"
                          : "display the password"
                      }
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                value={account.password}
                onChange={(e) => handleInputChange(e, "password")}
                fullWidth
              />
            </FormControl>
          </Grid2>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Remember me"
          />
          <Box sx={{ pt: 2 }}>
            <Button
              autoFocus
              variant="contained"
              sx={{ width: "100%", p: 1 }}
              onClick={handleSignIn}
              disabled={!account?.username || !account?.password}
            >
              Sign In
            </Button>
          </Box>
        </Grid2>
      </Grid2>
    </React.Fragment>
  );
}

export default LoginPage;
