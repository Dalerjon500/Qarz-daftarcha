import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import { FaCheck, FaTimes } from "react-icons/fa";

function AllPaidModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      PaperProps={{
        sx: {
          borderRadius: 4,
          background: "rgba(20, 20, 20, 0.85)",
          backdropFilter: "blur(16px)",
          boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
          border: "1px solid rgba(255,255,255,0.08)",
          overflow: "hidden",
        },
      }}
    >
      {/* Close */}
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
          color: "rgba(255,255,255,0.6)",
          "&:hover": { color: "#fff" },
        }}
      >
        <FaTimes />
      </IconButton>

      <DialogContent sx={{ px: 4, py: 5 }}>
        {/* Icon */}
        <Box
          sx={{
            width: 90,
            height: 90,
            mx: "auto",
            mb: 3,
            borderRadius: "50%",
            background:
              "linear-gradient(135deg, #00E676 0%, #1DE9B6 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 40px rgba(0,230,118,0.6)",
          }}
        >
          <FaCheck size={38} color="#0B1F14" />
        </Box>

        {/* Title */}
        <Typography
          align="center"
          sx={{
            fontSize: "1.6rem",
            fontWeight: 800,
            color: "#fff",
            mb: 1,
          }}
        >
          Debt Free Status
        </Typography>

        <Typography
          align="center"
          sx={{
            color: "rgba(255,255,255,0.7)",
            fontSize: "0.95rem",
            mb: 4,
          }}
        >
          Every outstanding balance has been successfully cleared.
        </Typography>

        {/* Info Cards */}
        <Box sx={{ display: "grid", gap: 1.5 }}>
          {[
            "No active debts",
            "Clean financial history",
            "You’re in full control",
          ].map((text) => (
            <Box
              key={text}
              sx={{
                px: 2,
                py: 1.5,
                borderRadius: 2,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#E0F2F1",
                fontSize: "0.85rem",
              }}
            >
              ✔ {text}
            </Box>
          ))}
        </Box>

        {/* Action */}
        <Button
          fullWidth
          onClick={onClose}
          sx={{
            mt: 4,
            py: 1.6,
            borderRadius: 3,
            fontWeight: 700,
            fontSize: "0.95rem",
            color: "#0B1F14",
            background:
              "linear-gradient(135deg, #00E676 0%, #1DE9B6 100%)",
            boxShadow: "0 10px 30px rgba(0,230,118,0.4)",
            "&:hover": {
              boxShadow: "0 14px 40px rgba(0,230,118,0.6)",
              transform: "translateY(-2px)",
            },
            transition: "all .3s ease",
          }}
        >
          Back to Dashboard
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default AllPaidModal;
