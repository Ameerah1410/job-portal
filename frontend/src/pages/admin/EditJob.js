import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateJobAction } from "../../redux/actions/jobAction";
import { Button, TextField, Typography, MenuItem, Box } from "@mui/material";
import { useFormik } from "formik";

const EditJob = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { jobs, loading, deleting } = useSelector((state) => state.loadJobs);

  const navigate = useNavigate();

  const job = jobs.find((job) => job._id === id);

  const formik = useFormik({
    initialValues: {
      title: job.title,
      id: job._id,
      description: job.description,
      salary: job.salary,
      location: job.location,
      jobType: job?.jobType.jobTypeName,
    },
    onSubmit: (values, actions) => {
      dispatch(updateJobAction(job._id, values));
      navigate("/admin/jobs");
    },
  });

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pt: 4,
      }}
    >
      <form onSubmit={formik.handleSubmit} className="form_style border-style">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography variant="h5" component="h2" sx={{ pb: 3 }}>
            Edit Job
          </Typography>
          <TextField
            sx={{ mb: 3 }}
            fullWidth
            id="id"
            label="ID"
            name="id"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Enter the ID"
            value={formik.values.id}
            onChange={formik.handleChange}
          />
          <TextField
            sx={{ mb: 3 }}
            fullWidth
            id="jobType"
            label="Job Type"
            name="jobType"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Enter the job type"
            value={formik.values.jobType}
            onChange={formik.handleChange}
          />
          <TextField
            sx={{ mb: 3 }}
            fullWidth
            id="title"
            name="title"
            label="Title"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Enter the job name"
            value={formik.values.title}
            onChange={formik.handleChange}
          />
          <TextField
            sx={{ mb: 3 }}
            fullWidth
            id="salary"
            name="salary"
            label="Salary"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Enter the salary"
            value={formik.values.salary}
            onChange={formik.handleChange}
          />
          <TextField
            sx={{ mb: 3 }}
            fullWidth
            id="description"
            name="description"
            label="Description"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Enter the description"
            value={formik.values.description}
            onChange={formik.handleChange}
          />
          <Button fullWidth variant="contained" type="submit">
            Save Changes
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default EditJob;
