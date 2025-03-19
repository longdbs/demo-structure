import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
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
import { useAuth } from "../context/AuthContext";
import { useDebounce } from "../hooks/useDebounce";
import useMultipleDialogs from "../hooks/useMultipleDialogs";
import { UserLoginI } from "../types/user.type";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { dialogs, toggleDialog } = useMultipleDialogs({
    isOpenLogin: false,
  });
  const [account, setAccount] = useState<UserLoginI>({
    username: "",
    password: "",
  });
  const handleLoginDialog = () => toggleDialog("isOpenLogin");
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
        <Typography variant="h3">Carelogix</Typography>
        <Button
          variant="contained"
          sx={{
            minWidth: "100px",
            alignSelf: "center",
            p: 1,
            borderRadius: 16,
            fontWeight: 600,
          }}
          onClick={handleLoginDialog}
        >
          Login
        </Button>
      </Grid2>
      {dialogs?.isOpenLogin && (
        <Dialog
          open={dialogs?.isOpenLogin}
          onClose={handleLoginDialog}
          aria-labelledby="responsive-dialog-title"
          sx={{
            ".MuiPaper-root": {
              padding: 2,
            },
          }}
        >
          <DialogTitle id="responsive-dialog-title">
            <Typography variant="h4">Welcome Back</Typography>
            <Typography variant="body2" sx={{ color: "text.disabled" }}>
              Fill out the information below in order to access your account
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Grid2 container sx={{ flexDirection: "column", gap: 2, pt: 2 }}>
              <TextField
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
                type="email"
                value={account.username}
                onChange={(e) => handleInputChange(e, "username")}
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
                />
              </FormControl>
            </Grid2>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button
              autoFocus
              variant="contained"
              sx={{ width: "100%", p: 1 }}
              onClick={handleSignIn}
              disabled={!account?.username || !account?.password}
            >
              Sign In
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </React.Fragment>
  );
}

export default LoginPage;
