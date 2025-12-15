import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Box,
  Typography,
  Container,
  Button,
  Chip,
  Paper,
  Tooltip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Pagination,
} from "@mui/material";
import useCars from "../../hooks/useCars";
import type { Car, FilterParams, FilterState, ReqCar } from "../../types/types";
import { FaEdit, FaTrash, FaCar, FaPlus, FaTimes } from "react-icons/fa";
import { useEffect, useMemo, useState } from "react";
import CarModal from "./CarForm";
import { formatColorHex, getColorName } from "../../utils";
import { useDebounce } from "../../hooks/useDebounce";

function CarList() {
  const [open, setOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    color: "",
    model: "",
    year: 0,
  })

  const debouncedSearch = useDebounce(filters.model, 400);
  const debouncedYear = useDebounce(filters.year.toString(), 400);

  const filterParams = useMemo((): FilterParams => {

    const params: FilterParams = {};

    if (filters.color) params.color = filters.color;

    if (debouncedYear) params.year = Number(debouncedYear);

    if (debouncedSearch) params.model = debouncedSearch;

    return params;
    
  }, [debouncedSearch, filters, debouncedYear]);

  const {cars, addCar, deleteCar, updateCar, colors, page, setPage, limit } = useCars( filterParams );


  useEffect(() => {
    setPage(1);
  }, [filterParams]);


  const handleCreateCar = () => {
    setSelectedCar(null);
    setOpen(true);
  };

  const handleEditCar = (car: Car) => {
    setSelectedCar(car);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCar(null);
  };

  const handleSubmit = (data: ReqCar) => {
    if (selectedCar) {
      updateCar({
        id: selectedCar.car_id,
        data,
      });
    } else {
      addCar(data);
    }
    handleClose();
  };

  const handleDeleteCar = (id: number) => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      deleteCar(id);
    }
  };

  const clearFilters = () => {
    setFilters({
      color: "",
      model: "",
      year: 0,
    });
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 1 }}>
      <Paper
        elevation={3}
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          backgroundColor: "white",
        }}
      >
        <Box
          sx={{
            p: 4,
            bgcolor: "primary.main",
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <FaCar size={32} />
            <Box>
              <Typography variant="h4" component="h1" fontWeight="bold">
                Car Management
              </Typography>
              <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
                Manage your car inventory efficiently
              </Typography>
            </Box>
          </Box>
          <Button
            variant="contained"
            onClick={handleCreateCar}
            size="large"
            sx={{
              bgcolor: "white",
              color: "primary.main",
              "&:hover": {
                bgcolor: "grey.100",
              },
              px: 3,
              py: 1.5,
              borderRadius: 2,
              fontWeight: "bold",
              textTransform: "none",
              fontSize: "1rem",
            }}
            startIcon={<FaPlus />}
          >
            Add New Car
          </Button>
        </Box>

        <Box display="flex" justifyContent="space-between" alignItems="center" gap={2} sx={{ p: 4 }}>
         
         <FormControl fullWidth>
            <TextField
              id="outlined-basic"
              label="Search by model .."
              variant="outlined"
              type="text"
              value={filters.model}
              onChange={(e) => setFilters({ ...filters, model: e.target.value })}
            />
         </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Color</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filters.color}
              label="Color"
              onChange={(e) => setFilters({ ...filters, color: e.target.value })}
            >
              <MenuItem  value="">All</MenuItem>
              {colors.map((color, index) => (
                <MenuItem key={index} value={color.color}>
                  {color.color}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <TextField
              fullWidth
              type="number"
              label="Year"
              variant="outlined"
              value={filters.year?.toString()}
              onChange={(e) => setFilters({ ...filters, year: Number(e.target.value) })}
              inputProps={{
                min: 1886,
                max: new Date().getFullYear(),
                step: 1,
              }}
            />
          </FormControl>

          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={clearFilters}
            startIcon={<FaTimes />}
            sx={{
              bgcolor: "#fff",
              color: "primary.main",
              borderColor: "primary.main",
              px: 3,
              py: 1.4,
              borderRadius: 3,
              fontWeight: 600,
              textTransform: "none",
              fontSize: "0.95rem",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              transition: "all 0.25s ease",

              "&:hover": {
                bgcolor: "primary.main",
                color: "#fff",
                borderColor: "primary.main",
                boxShadow: "0 6px 16px rgba(25,118,210,0.35)",
                transform: "translateY(-1px)",
              },
            }}
          >
          </Button>

        </Box>

        <Box sx={{ p: 3 }}>
          {cars.data.length === 0 ? (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              py={8}
              gap={2}
            >
              <FaCar size={64} color="#9e9e9e" />
              <Typography variant="h6" color="textSecondary">
                No cars found in inventory
              </Typography>
              <Button
                variant="outlined"
                onClick={handleCreateCar}
                startIcon={<FaPlus />}
                sx={{ mt: 2 }}
              >
                Add Your First Car
              </Button>
            </Box>
          ) : (
            <>
            <Table
              sx={{
                minWidth: 650,
                "& .MuiTableCell-root": {
                  py: 2,
                },
              }}
            >
              <TableHead>
                <TableRow sx={{ bgcolor: "grey.50" }}>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                    ID
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                    Model
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                    Color
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                    Year
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                    Features
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cars.data.map((car: Car) => {
                  const colorName = getColorName(car.color);
                  const hexColor = formatColorHex(car.color);

                  return (
                    <TableRow
                      key={car.car_id}
                      sx={{
                        "&:hover": {
                          backgroundColor: "grey.50",
                          transition: "background-color 0.2s",
                        },
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell>
                        <Chip
                          label={`#${car.car_id}`}
                          size="small"
                          sx={{
                            fontWeight: "bold",
                            bgcolor: "primary.light",
                            color: "white",
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1" fontWeight="medium">
                          {car.model}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={2}>
                          <Tooltip title={`${colorName} (${hexColor})`}>
                            <Box
                              width={28}
                              height={28}
                              borderRadius="50%"
                              bgcolor={hexColor}
                              border="2px solid #e0e0e0"
                              boxShadow={1}
                              sx={{
                                background: `radial-gradient(circle at 30% 30%, ${hexColor} 0%, ${hexColor} 40%, transparent 70%)`,
                                cursor: "pointer",
                              }}
                            />
                          </Tooltip>
                          <Box>
                            <Typography variant="body1" fontWeight="medium">
                              {colorName}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                              {hexColor}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                        label={car.year_purchased ?? "N/A"}
                        variant="outlined"
                        sx={{
                          borderColor: "primary.main",
                          color: "primary.main",
                          fontWeight: "medium",
                        }}
                      />
                      </TableCell>
                      <TableCell>
                        <Box display="flex" gap={1} flexWrap="wrap">
                          {car.details && car.details.length > 0 ? (
                            car.details.map((detail, index) => (
                              <Tooltip key={index} title={detail.name}>
                                <Chip
                                  label={detail.name}
                                  size="small"
                                  sx={{
                                    bgcolor: (theme) => {
                                      const colors = [
                                        theme.palette.secondary.light,
                                        theme.palette.info.light,
                                        theme.palette.success.light,
                                        theme.palette.warning.light,
                                        theme.palette.error.light,
                                      ];
                                      return colors[index % colors.length];
                                    },
                                    color: "white",
                                    fontWeight: "medium",
                                    "& .MuiChip-label": {
                                      px: 1,
                                    },
                                    maxWidth: "120px",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                  }}
                                />
                              </Tooltip>
                            ))
                          ) : (
                            <Chip
                              label="No features"
                              size="small"
                              variant="outlined"
                              sx={{ color: "text.secondary" }}
                            />
                          )}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box display="flex" gap={1}>
                          <Tooltip title="Edit Car">
                            <IconButton
                              onClick={() => handleEditCar(car)}
                              size="medium"
                              sx={{
                                bgcolor: "primary.light",
                                color: "white",
                                "&:hover": {
                                  bgcolor: "primary.main",
                                },
                                borderRadius: 2,
                                p: 1.2,
                              }}
                            >
                              <FaEdit size={16} />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete Car">
                            <IconButton
                              onClick={() => handleDeleteCar(car.car_id!)}
                              size="medium"
                              sx={{
                                bgcolor: "error.light",
                                color: "white",
                                "&:hover": {
                                  bgcolor: "error.main",
                                },
                                borderRadius: 2,
                                p: 1.2,
                              }}
                            >
                              <FaTrash size={16} />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            {cars.total > 0 && (
                <Box mt={2} display="flex" justifyContent="center">
                  <Pagination
                    page={page}
                    count={Math.ceil(cars.total / limit)}
                    onChange={handlePageChange}
                    color="primary"
                  />
                </Box>
              )}
            </>
          )}

          {cars.data.length > 0 && (
            <Box
              sx={{
                mt: 3,
                p: 2,
                bgcolor: "grey.50",
                borderRadius: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              <Typography variant="body2" color="textSecondary">
                Showing <strong>{cars.data.length}</strong> car
                {cars.data.length !== 1 ? "s" : ""} in inventory
              </Typography>
              <Box display="flex" gap={1} alignItems="center">
                <Chip
                  label="Total Cars"
                  size="small"
                  color="primary"
                  variant="outlined"
                />
                <Typography variant="h6" color="primary" fontWeight="bold">
                  {cars.data.length}
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      </Paper>
      <CarModal
        isOpen={open}
        onClose={handleClose}
        onSubmit={handleSubmit}
        editingCar={selectedCar}
      />
    </Container>
  );
}

export default CarList;
