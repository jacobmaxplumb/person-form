import axios from "axios";
import { useEffect, useState } from "react";
import * as yup from "yup";

const initialFormState = {
  fullName: "",
  shirtSize: "",
  animals: [],
};

const initialErrorsState = {
  fullName: "",
  shirtSize: "",
};

const animals = [
  { id: 1, name: "Dog" },
  { id: 2, name: "Cat" },
  { id: 3, name: "Bird" },
  { id: 4, name: "Fish" },
  { id: 5, name: "Other" },
];

const schema = yup.object().shape({
  fullName: yup
    .string()
    .required("Full name is required")
    .min(3, "Full name must be at least 3 characters")
    .max(20, "Full name must be at most 20 characters"),
  shirtSize: yup
    .string()
    .required("Shirt size is required")
    .oneOf(["S", "M", "L", "XL"]),
});

export const PersonFrom = () => {
  const [formValues, setFormValues] = useState(initialFormState);
  const [errors, setErrors] = useState(initialErrorsState);
  const [isDisabled, setIsDisabled] = useState(true);
  const [message, setMessage] = useState("");

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });

    yup
      .reach(schema, name)
      .validate(value.trim())
      .then(() => setErrors({ ...errors, [name]: "" }))
      .catch((err) => setErrors({ ...errors, [name]: err.errors[0] }));
  };

  useEffect(() => {
    schema.isValid(formValues).then((valid) => setIsDisabled(!valid));
  }, [formValues]);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target; // value=1, checked=false
    if (checked) {
      setFormValues({
        ...formValues,
        animals: [...formValues.animals, parseInt(value)],
      });
      // {fullName: '', shirtSize: '', animals: [1]}
    } else {
      setFormValues({
        ...formValues,
        animals: formValues.animals.filter((id) => id !== parseInt(value)),
      });
      // {fullName: '', shirtSize: '', animals: [2]}
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post('http://localhost:9000/api/people', formValues);
    setMessage(data.message);
    setFormValues(initialFormState);
  }

  return (
    <form onSubmit={handleSubmit}>
      {message && <p>{message}</p>}
      <input
        type="text"
        name="fullName"
        value={formValues.fullName}
        onChange={handleTextChange}
      />
      {errors.fullName && <p>{errors.fullName}</p>}
      <select
        name="shirtSize"
        value={formValues.shirtSize}
        onChange={handleTextChange}
      >
        <option value="">Select a shirt size</option>
        <option value="S">Small</option>
        <option value="M">Medium</option>
        <option value="L">Large</option>
        <option value="XL">Extra Large</option>
      </select>
      {errors.shirtSize && <p>{errors.shirtSize}</p>}
      {animals.map((animal) => (
        <label key={animal.id}>
          <input
            checked={formValues.animals.includes(animal.id)}
            type="checkbox"
            value={animal.id}
            onChange={handleCheckboxChange}
          />
          {animal.name}
        </label>
      ))}
      <button type="submit" disabled={isDisabled}>
        Submit
      </button>
    </form>
  );
};
