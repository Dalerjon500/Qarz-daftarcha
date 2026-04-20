import {
  Box,
  Button,
  Container,
  Typography,
  Avatar,
  Card,
  Chip,
  IconButton,
  LinearProgress,
} from "@mui/material";
import { FaPlus, FaPhone, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useDebtor from "../../hooks/useDebtor";
import { useState } from "react";
import DebtorForm from "./DebtorForm";
import {
  formatCurrency,
  formatPhoneNumber,
  getAvatarColor,
  getInitials,
  getDebtColor,
} from "../../utils";

function DebtorList() {
  const { qarzdorlar, qarzdorlarLoading, addQarzdor } = useDebtor();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const totalDebt = qarzdorlar.reduce(
    (sum, d) => sum + (d.total_qarz || 0),
    0
  );

  if (qarzdorlarLoading) {
    return (
      <Container sx={{ py: 10 }}>
        <LinearProgress />
        <Typography align="center" mt={3} color="gray">
          Loading financial data...
        </Typography>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #1b2735 0%, #090a0f 60%)",
        py: 6,
      }}
    >
      <Container maxWidth="xl">
        {/* HEADER */}
        <Box
          sx={{
            mb: 6,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 3,
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: "2.2rem",
                fontWeight: 800,
                color: "#fff",
              }}
            >
              Debtors Overview
            </Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.6)" }}>
              Total outstanding:{" "}
              <strong style={{ color: "#ff5252" }}>
                {formatCurrency(totalDebt)}
              </strong>
            </Typography>
          </Box>

          <Button
            onClick={() => setOpen(true)}
            startIcon={<FaPlus />}
            sx={{
              px: 4,
              py: 1.4,
              borderRadius: 3,
              fontWeight: 700,
              textTransform: "none",
              background:
                "linear-gradient(135deg, #00E5FF 0%, #2979FF 100%)",
              color: "#04121f",
              boxShadow: "0 10px 30px rgba(0,229,255,.35)",
              "&:hover": {
                boxShadow: "0 14px 40px rgba(0,229,255,.55)",
                transform: "translateY(-2px)",
              },
            }}
          >
            New Debtor
          </Button>
        </Box>

        {/* DEBTOR CARDS */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 4,
          }}
        >
          {qarzdorlar.map((debtor) => (
            <Card
              key={debtor.qarzdor_id}
              onClick={() => navigate(`/debtor/${debtor.qarzdor_id}`)}
              sx={{
                cursor: "pointer",
                p: 3,
                borderRadius: 4,
                background: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#fff",
                transition: "all .3s ease",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 30px 60px rgba(0,0,0,0.5)",
                },
              }}
            >
              {/* Top */}
              <Box display="flex" alignItems="center" gap={2} mb={3}>
                <Avatar
                  sx={{
                    bgcolor: getAvatarColor(debtor.full_name),
                    width: 56,
                    height: 56,
                    fontWeight: 800,
                  }}
                >
                  {getInitials(debtor.full_name)}
                </Avatar>

                <Box>
                  <Typography fontWeight={700}>
                    {debtor.full_name}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.75rem",
                      color: "rgba(255,255,255,.6)",
                    }}
                  >
                    ID #{debtor.qarzdor_id}
                  </Typography>
                </Box>
              </Box>

              {/* Phone */}
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <FaPhone size={12} />
                <Typography sx={{ fontSize: "0.85rem" }}>
                  {formatPhoneNumber(debtor.phone_number)}
                </Typography>
              </Box>

              {/* Debt */}
              <Chip
                label={formatCurrency(debtor.total_qarz || 0)}
                color={getDebtColor(debtor.total_qarz || 0)}
                sx={{
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  mb: 3,
                }}
              />

              {/* Action */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <IconButton
                  sx={{
                    bgcolor: "rgba(255,255,255,0.08)",
                    color: "#fff",
                    "&:hover": {
                      bgcolor: "#2979FF",
                    },
                  }}
                >
                  <FaArrowRight />
                </IconButton>
              </Box>
            </Card>
          ))}
        </Box>

        {/* EMPTY */}
        {qarzdorlar.length === 0 && (
          <Box textAlign="center" mt={10} color="rgba(255,255,255,0.6)">
            <Typography variant="h5" fontWeight={700}>
              No debtors yet
            </Typography>
            <Typography mt={1}>
              Start by adding your first debtor
            </Typography>
          </Box>
        )}

        <DebtorForm
          open={open}
          handleClose={() => setOpen(false)}
          onSubmit={(data) => {
            addQarzdor(data);
            setOpen(false);
          }}
        />
      </Container>
    </Box>
  );
}

export default DebtorList;
