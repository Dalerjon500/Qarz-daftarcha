import {
  Box,
  Drawer,
  TextField,
  FormControl,
  Select as MuiSelect,
  MenuItem,
  Typography,
} from "@mui/material";
import {
  IoMdCalendar,
  IoMdPerson,
  IoMdFlag,
  IoMdList,
  IoMdCreate,
  IoMdCheckmarkCircle,
} from "react-icons/io";
import { FaPlayCircle, FaEdit } from "react-icons/fa";
import { useForm, Controller, type FieldValues } from "react-hook-form";
import Select from "react-select";
import { useState, useEffect } from "react";
import ModalHeader from "./ModalHeader";

import SubmitButton from "./SubmitButton";
import type { ReqTask, Task, User } from "../../../types/types";
import useUsers from "../../../hooks/useUsers";
import useTasks from "../../../hooks/useTasks";
import FormField from "./FromField";
import { getPriorityIcon, inputStyles } from "../../../utils";

export type StatusType = "TODO" | "IN_PROGRESS" | "VERIFIED" | "DONE";
export type PriorityType = "LOW" | "MEDIUM" | "HIGH";
type AssigneeOption = { value: string; label: string };

interface AddTaskModalProps {
  open: boolean;
  onClose: () => void;
  task?: Task | null;
}

const statusType: StatusType[] = ["TODO", "IN_PROGRESS", "VERIFIED", "DONE"];
const priorityType: PriorityType[] = ["LOW", "MEDIUM", "HIGH"];

function AddTaskModal({ open, onClose, task }: AddTaskModalProps) {
  const { users } = useUsers();
  const { taskStatus, addTask, updateTask } = useTasks();
  const [isEditing, setIsEditing] = useState(false);

  const userOptions =
    users?.map((user: User) => ({
      value: user.id.toString(),
      label: user.username,
    })) || [];

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      assignee: [] as AssigneeOption[],
      status: "TODO" as StatusType,
      priority: "LOW" as PriorityType,
      end_date: new Date().toISOString().split("T")[0],
    },
  });

  useEffect(() => {
    if (task) {
      setIsEditing(true);
      const assigneeOptions =
        task.assignees?.map((user) => ({
          value: user.id.toString(),
          label: user.username,
        })) || [];

      reset({
        title: task.title || "",
        description: task.description || "",
        assignee: assigneeOptions,
        status: task.status as StatusType,
        priority: task.priority as PriorityType,
        end_date: task.end_date || new Date().toISOString().split("T")[0],
      });
    } else {
      setIsEditing(false);
      reset({
        title: "",
        description: "",
        assignee: [],
        status: "TODO",
        priority: "LOW",
        end_date: new Date().toISOString().split("T")[0],
      });
    }
  }, [task, reset, taskStatus]);

  const onSubmit = (data: FieldValues) => {
    const selectedUserIds = data.assignee.map((option: { value: string }) =>
      Number(option.value)
    );

    const selectedUsers: User[] = users.filter((u: User) =>
      selectedUserIds.includes(u.id)
    );

    const taskData: ReqTask = {
      title: data.title,
      description: data.description,
      assignees: selectedUsers,
      priority: data.priority,
      status: data.status,
      end_date: data.end_date,
    };

    if (isEditing && task) {
      updateTask({ id: task.id, data: taskData });
    } else {
      addTask(taskData);
    }

    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Drawer
      className="status-modal-drawer"
      anchor="right"
      open={open}
      onClose={handleClose}
    >
      <Box className="status-modal-container" sx={{ p: 3, width: 700 }}>
        <ModalHeader isEditing={isEditing} onClose={handleClose} />

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}
        >
          {/* Title */}
          <Controller
            name="title"
            control={control}
            rules={{ required: "Title is required" }}
            render={({ field }) => (
              <FormField
                icon={
                  <IoMdList style={{ color: "#6366f1", fontSize: "1.1rem" }} />
                }
                label="Task Title"
                error={errors.title?.message as string}
              >
                <TextField
                  {...field}
                  fullWidth
                  placeholder="Enter task title..."
                  error={!!errors.title}
                  helperText={errors.title?.message}
                  sx={inputStyles}
                />
              </FormField>
            )}
          />

          {/* Description */}
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <FormField
                icon={
                  <IoMdCreate
                    style={{ color: "#6366f1", fontSize: "1.1rem" }}
                  />
                }
                label="Description"
              >
                <TextField
                  {...field}
                  fullWidth
                  multiline
                  rows={4}
                  placeholder="Describe the task details..."
                  sx={inputStyles}
                />
              </FormField>
            )}
          />

          <Box sx={{ display: "flex", gap: 2 }}>
            {/* Status */}
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Box sx={{ flex: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1.5,
                    }}
                  >
                    <FaPlayCircle
                      style={{ color: "#6366f1", fontSize: "1rem" }}
                    />
                    <Typography
                      sx={{ color: "rgba(255,255,255,0.9)", fontWeight: 500 }}
                    >
                      Status
                    </Typography>
                  </Box>
                  <FormControl fullWidth>
                    <MuiSelect
                      {...field}
                      sx={{
                        color: "white",
                        backgroundColor: "rgba(255,255,255,0.03)",
                        borderRadius: 2,
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "rgba(255,255,255,0.1)",
                          borderWidth: "1.5px",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "rgba(99, 102, 241, 0.5)",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#6366f1",
                          borderWidth: "2px",
                        },
                        "& .MuiSelect-icon": {
                          color: "rgba(255,255,255,0.5)",
                        },
                      }}
                    >
                      {statusType.map((st) => (
                        <MenuItem
                          key={st}
                          value={st}
                          sx={{ color: "white", backgroundColor: "#1a1a1a" }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1.5,
                            }}
                          >
                            <Box
                              sx={{
                                width: 8,
                                height: 8,
                                borderRadius: "50%",
                                backgroundColor:
                                  st === "TODO"
                                    ? "#94a3b8"
                                    : st === "IN_PROGRESS"
                                    ? "#60a5fa"
                                    : st === "VERIFIED"
                                    ? "#a855f7"
                                    : "#34d399",
                              }}
                            />
                            {st.replace("_", " ")}
                          </Box>
                        </MenuItem>
                      ))}
                    </MuiSelect>
                  </FormControl>
                </Box>
              )}
            />

            <Controller
              name="priority"
              control={control}
              render={({ field }) => (
                <Box sx={{ flex: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1.5,
                    }}
                  >
                    <IoMdFlag
                      style={{ color: "#6366f1", fontSize: "1.1rem" }}
                    />
                    <Typography
                      sx={{ color: "rgba(255,255,255,0.9)", fontWeight: 500 }}
                    >
                      Priority
                    </Typography>
                  </Box>
                  <FormControl fullWidth>
                    <MuiSelect
                      {...field}
                      sx={{
                        color: "white",
                        backgroundColor: "rgba(255,255,255,0.03)",
                        borderRadius: 2,
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "rgba(255,255,255,0.1)",
                          borderWidth: "1.5px",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "rgba(99, 102, 241, 0.5)",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#6366f1",
                          borderWidth: "2px",
                        },
                        "& .MuiSelect-icon": {
                          color: "rgba(255,255,255,0.5)",
                        },
                      }}
                    >
                      {priorityType.map((priority) => (
                        <MenuItem
                          key={priority}
                          value={priority}
                          sx={{ color: "white", backgroundColor: "#1a1a1a" }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1.5,
                            }}
                          >
                            {getPriorityIcon(priority)}
                            {priority}
                          </Box>
                        </MenuItem>
                      ))}
                    </MuiSelect>
                  </FormControl>
                </Box>
              )}
            />
          </Box>

          {/* Assignee */}
          <Controller
            name="assignee"
            control={control}
            rules={{ required: "At least one assignee is required" }}
            render={({ field }) => (
              <FormField
                icon={
                  <IoMdPerson
                    style={{ color: "#6366f1", fontSize: "1.1rem" }}
                  />
                }
                label="Assignees"
                error={errors.assignee?.message as string}
              >
                <Select
                  {...field}
                  isMulti
                  options={userOptions}
                  placeholder="Select team members..."
                  className="react-select-container"
                  classNamePrefix="react-select"
                />
              </FormField>
            )}
          />

          {/* Due Date */}
          <Controller
            name="end_date"
            control={control}
            rules={{ required: "End date is required" }}
            render={({ field }) => (
              <FormField
                icon={
                  <IoMdCalendar
                    style={{ color: "#6366f1", fontSize: "1.1rem" }}
                  />
                }
                label="Due Date"
                error={errors.end_date?.message as string}
              >
                <TextField
                  {...field}
                  type="date"
                  fullWidth
                  error={!!errors.end_date}
                  helperText={errors.end_date?.message}
                  sx={inputStyles}
                />
              </FormField>
            )}
          />

          <SubmitButton
            isEditing={isEditing}
            startIcon={isEditing ? <FaEdit /> : <IoMdCheckmarkCircle />}
          >
            {isEditing ? "Update Task" : "Create Task"}
          </SubmitButton>
        </Box>
      </Box>
    </Drawer>
  );
}

export default AddTaskModal;
