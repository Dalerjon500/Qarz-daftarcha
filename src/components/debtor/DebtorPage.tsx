import { useState } from "react";
import { useParams } from "react-router-dom";

import {
  Box,
  Container,
  Typography,
  Avatar,
  Button,
  Chip,
  LinearProgress,
} from "@mui/material";

/* Custom hooks & components */


/* Utils */
import {
  formatCurrency,
  formatDateTime,
  getInitials,
} from "../../utils";
import useQarzdor from "../../hooks/useDebtor";
import RepaymentForm from "./RepaymentForm";
import DebtForm from "./DebtForm";

/* =============================== */

function DebtorPage() {
  const { id } = useParams<{ id: string }>();

  const {
    qarzdor,
    qarzlar,
    qarzdorLoading,
    qarzlarLoading,
    addQarzToQarzdor,
    qarzRepayment,
  } = useQarzdor(Number(id));

  const [openDebt, setOpenDebt] = useState(false);
  const [openPay, setOpenPay] = useState(false);
  const payableDebt = qarzlar.find((debt) => !debt.holati) ?? qarzlar[0];

  /* LOADING */
  if (qarzdorLoading || qarzlarLoading) {
    return (
      <Container sx={{ py: 10 }}>
        <LinearProgress />
        <Typography align="center" mt={3} color="gray">
          Loading financial profile...
        </Typography>
      </Container>
    );
  }

  if (!qarzdor) return null;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #1b2735 0%, #090a0f 65%)",
        py: 5,
      }}
    >
      <Container maxWidth="lg">
        {/* ================= HEADER ================= */}
        <Box
          sx={{
            p: 4,
            borderRadius: 4,
            background: "rgba(255,255,255,0.06)",
            backdropFilter: "blur(18px)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "#fff",
            mb: 5,
          }}
        >
          <Box display="flex" alignItems="center" gap={3}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                fontSize: "2rem",
                fontWeight: 800,
                bgcolor: "#2979FF",
              }}
            >
              {getInitials(qarzdor.full_name)}
            </Avatar>

            <Box>
              <Typography fontSize="1.8rem" fontWeight={800}>
                {qarzdor.full_name}
              </Typography>
              <Typography sx={{ color: "rgba(255,255,255,.6)" }}>
                Total Debt:{" "}
                <strong style={{ color: "#ff5252" }}>
                  {formatCurrency(qarzdor.total_qarz || 0)}
                </strong>
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* ================= STATS ================= */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))",
            gap: 3,
            mb: 6,
          }}
        >
          {[
            { label: "Total Records", value: qarzlar.length },
            {
              label: "Paid",
              value: qarzlar.filter((d) => d.holati).length,
            },
            {
              label: "Pending",
              value: qarzlar.filter((d) => !d.holati).length,
            },
          ].map((stat) => (
            <Box
              key={stat.label}
              sx={{
                p: 3,
                borderRadius: 3,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#fff",
              }}
            >
              <Typography
                sx={{ fontSize: ".8rem", color: "rgba(255,255,255,.6)" }}
              >
                {stat.label}
              </Typography>
              <Typography fontSize="1.6rem" fontWeight={800}>
                {stat.value}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* ================= TIMELINE ================= */}
        <Box sx={{ display: "grid", gap: 3 }}>
          {qarzlar.map((d) => (
            <Box
              key={d.qarz_id}
              sx={{
                p: 3,
                borderRadius: 3,
                background: "rgba(255,255,255,0.06)",
                borderLeft: `5px solid ${
                  d.holati ? "#00E676" : "#FF5252"
                }`,
                color: "#fff",
                transition: ".3s",
                "&:hover": {
                  transform: "translateX(6px)",
                },
              }}
            >
              <Typography fontWeight={700}>
                {formatCurrency(d.miqdor || 0)}
              </Typography>

              <Typography
                sx={{ fontSize: ".8rem", color: "rgba(255,255,255,.6)" }}
              >
                {formatDateTime(d.datetime)}
              </Typography>

              <Chip
                label={d.holati ? "PAID" : "PENDING"}
                sx={{
                  mt: 1,
                  bgcolor: d.holati ? "#00E676" : "#FF5252",
                  color: "#000",
                  fontWeight: 700,
                }}
              />
            </Box>
          ))}
        </Box>

        {/* ================= ACTIONS ================= */}
        <Box
          sx={{
            mt: 6,
            display: "flex",
            gap: 2,
            justifyContent: "center",
          }}
        >
          <Button
            onClick={() => setOpenDebt(true)}
            sx={{
              px: 4,
              py: 1.3,
              borderRadius: 3,
              background: "linear-gradient(135deg,#2979FF,#00E5FF)",
              fontWeight: 700,
              color: "#000",
            }}
          >
            Add Debt
          </Button>

          <Button
            onClick={() => setOpenPay(true)}
            sx={{
              px: 4,
              py: 1.3,
              borderRadius: 3,
              background: "linear-gradient(135deg,#00E676,#1DE9B6)",
              fontWeight: 700,
              color: "#000",
            }}
          >
            Repayment
          </Button>
        </Box>

        {/* ================= MODALS ================= */}
        <DebtForm
          open={openDebt}
          handleClose={() => setOpenDebt(false)}
          onSubmit={(amount: number) =>
            addQarzToQarzdor({ miqdor: amount })
          }
        />

        <RepaymentForm
          open={openPay}
          handleClose={() => setOpenPay(false)}
          onSubmit={(amount: number) => {
            if (!payableDebt) return;
            qarzRepayment({ qarz_id: payableDebt.qarz_id, miqdor: amount });
          }}
        />
      </Container>
    </Box>
  );
}

export default DebtorPage;
