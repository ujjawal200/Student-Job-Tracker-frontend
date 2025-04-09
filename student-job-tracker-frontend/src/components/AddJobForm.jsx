import React from 'react';
import { useForm } from 'react-hook-form';

const AddJobForm = ({ onAdd }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    onAdd(data);
    reset(); 
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="add-job-form">
      <h2>Add Job Application</h2>

      <input
        type="text"
        placeholder="Company"
        {...register("company", { required: "Company is required" })}
      />
      {errors.company && <p className="error">{errors.company.message}</p>}

      <input
        type="text"
        placeholder="Role"
        {...register("role", { required: "Role is required" })}
      />
      {errors.role && <p className="error">{errors.role.message}</p>}

      <select {...register("status")}>
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Offer">Offer</option>
        <option value="Rejected">Rejected</option>
      </select>

      <input
        type="date"
        {...register("dateOfApplication", { required: "Date is required" })}
      />
      {errors.dateOfApplication && <p className="error">{errors.dateOfApplication.message}</p>}

      <input
        type="url"
        placeholder="Job Link (optional)"
        {...register("link")}
      />

      <button type="submit">Add Job</button>
    </form>
  );
};

export default AddJobForm;
