import { useForm, Controller } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";

import { FaTimes, FaWallet, FaCheckCircle } from "react-icons/fa";

interface Props {
  open: boolean;
  handleClose: () => void;
  onSubmit: (amount: number) => void;
}

interface FormData {
  amount: string;
}

function RepaymentForm({ open, handleClose, onSubmit }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<FormData>({
    defaultValues: { amount: "" },
  });

  const amountValue = watch("amount");

  const onFormSubmit = (data: FormData) => {
    if (!data.amount) return;
    onSubmit(Number(data.amount));
    handleClose();
    reset();
  };

  const closeModal = () => {
    handleClose();
    reset();
  };

  return (
    <Dialog
      open={open}
      onClose={closeModal}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          background: "rgba(10, 25, 15, 0.88)",
          backdropFilter: "blur(18px)",
          border: "1px solid rgba(0,255,140,0.15)",
          color: "#fff",
        },
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          p: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box display="flex" alignItems="center" gap={1.5}>
          <Box
            sx={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              background: "linear-gradient(135deg,#00E676,#1DE9B6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#000",
            }}
          >
            <FaWallet />
          </Box>

          <Box>
            <Typography fontWeight={700}>Debt Repayment</Typography>
            <Typography fontSize=".75rem" color="rgba(255,255,255,.6)">
              Make a payment
            </Typography>
          </Box>
        </Box>

        <IconButton onClick={closeModal} sx={{ color: "#fff" }}>
          <FaTimes />
        </IconButton>
      </Box>

      <DialogContent sx={{ px: 3, pb: 3 }}>
        {/* PAYMENT PREVIEW */}
        <Box
          sx={{
            mb: 3,
            p: 2,
            borderRadius: 3,
            background: "rgba(0,255,140,0.08)",
            border: "1px dashed rgba(0,255,140,0.25)",
            textAlign: "center",
          }}
        >
          <Typography fontSize=".75rem" color="rgba(255,255,255,.6)">
            Payment Amount
          </Typography>
          <Typography fontSize="1.8rem" fontWeight={800} color="#1DE9B6">
            ${amountValue || "0.00"}
          </Typography>
        </Box>

        <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
          <Controller
            name="amount"
            control={control}
            rules={{
              required: "Payment amount is required",
              min: { value: 0.01, message: "Must be greater than 0" },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                type="number"
                placeholder="Enter payment amount"
                error={!!errors.amount}
                helperText={errors.amount?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Typography color="rgba(255,255,255,.6)">$</Typography>
                    </InputAdornment>
                  ),
                  sx: {
                    color: "#fff",
                    borderRadius: 3,
                    background: "rgba(255,255,255,0.04)",
                    "& fieldset": {
                      borderColor: "rgba(0,255,140,0.3)",
                    },
                    "&:hover fieldset": {
                      borderColor: "#1DE9B6",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#00E676",
                      borderWidth: 2,
                    },
                  },
                }}
                inputProps={{ min: 0.01, step: "0.01" }}
              />
            )}
          />

          {/* ACTIONS */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              mt: 4,
            }}
          >
            <Button
              fullWidth
              onClick={closeModal}
              sx={{
                py: 1.2,
                borderRadius: 3,
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.2)",
                textTransform: "none",
                "&:hover": {
                  background: "rgba(255,255,255,0.05)",
                },
              }}
            >
              Cancel
            </Button>

            <Button
              fullWidth
              type="submit"
              disabled={isSubmitting}
              startIcon={<FaCheckCircle />}
              sx={{
                py: 1.2,
                borderRadius: 3,
                fontWeight: 700,
                textTransform: "none",
                color: "#000",
                background: "linear-gradient(135deg,#00E676,#1DE9B6)",
                "&:hover": {
                  background: "linear-gradient(135deg,#00C853,#00E5FF)",
                },
                "&:disabled": {
                  background: "#2e2e2e",
                  color: "#777",
                },
              }}
            >
              {isSubmitting ? "Processing..." : "Confirm Payment"}
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default RepaymentForm;
