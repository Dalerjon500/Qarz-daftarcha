import {
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Typography,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  Avatar,
  Divider,
} from "@mui/material";
import { useForm } from "react-hook-form";
import type { ReqQarzdor } from "../../types/types";
import {
  FaUser,
  FaPhone,
  FaTimes,
  FaPlus,
  FaEye,
} from "react-icons/fa";

interface DebtorFormProps {
  open: boolean;
  handleClose: () => void;
  onSubmit: (data: ReqQarzdor) => void;
}

export default function DebtorForm({
  open,
  handleClose,
  onSubmit,
}: DebtorFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ReqQarzdor>();

  const fullName = watch("full_name");
  const phone = watch("phone_number");

  const closeDialog = () => {
    reset();
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={closeDialog}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          background:
            "linear-gradient(135deg, rgba(30,30,40,0.9), rgba(20,20,30,0.9))",
          backdropFilter: "blur(18px)",
          border: "1px solid rgba(255,255,255,0.15)",
          boxShadow: "0 0 40px rgba(124,77,255,0.35)",
        },
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          px: 4,
          py: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background:
            "linear-gradient(90deg, rgba(124,77,255,0.3), rgba(0,229,255,0.25))",
        }}
      >
        <Box display="flex" gap={2} alignItems="center">
          <Avatar
            sx={{
              bgcolor: "rgba(124,77,255,0.4)",
              boxShadow: "0 0 20px rgba(124,77,255,0.6)",
            }}
          >
            <FaUser />
          </Avatar>
          <Box>
            <Typography fontSize={20} fontWeight={800} color="white">
              New Debtor
            </Typography>
            <Typography fontSize={13} color="grey.300">
              Premium debtor creation
            </Typography>
          </Box>
        </Box>
        <IconButton
          onClick={closeDialog}
          sx={{
            color: "white",
            "&:hover": { transform: "rotate(90deg)", color: "#ff5252" },
            transition: "0.3s",
          }}
        >
          <FaTimes />
        </IconButton>
      </Box>

      <DialogContent sx={{ px: 4, py: 4 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* FORM */}
          <Paper
            sx={{
              p: 3,
              mb: 4,
              borderRadius: 3,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <Typography
              fontWeight={700}
              mb={2}
              color="white"
              letterSpacing={1}
            >
              USER DETAILS
            </Typography>

            <Divider sx={{ mb: 3, borderColor: "rgba(255,255,255,0.1)" }} />

            <TextField
              fullWidth
              label="Full Name"
              error={!!errors.full_name}
              helperText={errors.full_name?.message}
              {...register("full_name", { required: "Name required" })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaUser />
                  </InputAdornment>
                ),
              }}
              sx={inputStyle}
            />

            <Box mt={3} />

            <TextField
              fullWidth
              label="Phone Number"
              error={!!errors.phone_number}
              helperText={errors.phone_number?.message}
              {...register("phone_number", {
                required: "Phone required",
              })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaPhone />
                  </InputAdornment>
                ),
              }}
              sx={inputStyle}
            />
          </Paper>

          {/* PREVIEW */}
          <Paper
            sx={{
              p: 3,
              mb: 4,
              borderRadius: 3,
              background:
                "linear-gradient(135deg, rgba(124,77,255,0.15), rgba(0,229,255,0.15))",
              border: "1px dashed rgba(124,77,255,0.6)",
            }}
          >
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <FaEye color="#7c4dff" />
              <Typography color="white" fontWeight={700}>
                LIVE PREVIEW
              </Typography>
            </Box>

            <Typography color="grey.300">
              👤 {fullName || "No name"}
            </Typography>
            <Typography color="grey.300">
              📞 {phone || "No phone"}
            </Typography>
          </Paper>

          {/* ACTIONS */}
          <DialogActions sx={{ p: 0 }}>
            <Button
              fullWidth
              variant="contained"
              type="submit"
              startIcon={<FaPlus />}
              sx={{
                py: 1.6,
                fontWeight: 800,
                borderRadius: 3,
                background:
                  "linear-gradient(90deg, #7c4dff, #00e5ff)",
                boxShadow: "0 0 25px rgba(124,77,255,0.6)",
                "&:hover": {
                  boxShadow: "0 0 35px rgba(0,229,255,0.9)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              CREATE DEBTOR
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

/* INPUT STYLE */
const inputStyle = {
  "& .MuiOutlinedInput-root": {
    color: "white",
    borderRadius: 3,
    background: "rgba(255,255,255,0.06)",
    "& fieldset": {
      borderColor: "rgba(255,255,255,0.2)",
    },
    "&:hover fieldset": {
      borderColor: "#7c4dff",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#00e5ff",
      boxShadow: "0 0 10px rgba(0,229,255,0.6)",
    },
  },
  "& label": { color: "grey.400" },
  "& label.Mui-focused": { color: "#00e5ff" },
};
