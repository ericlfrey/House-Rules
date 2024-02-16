import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { createChore } from '../managers/choreManager';

export default function CreateChore() {
  const initialState = {
    name: '',
    difficulty: 0,
    choreFrequencyDays: 0,
  };
  const [formInput, setFormInput] = useState(initialState);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setFormInput(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    createChore(formInput).then(res => {
      if (res.errors) {
        setErrors(res.errors);
      } else {
        navigate('/chores');
      }
    });
  };
  return (
    <div>
      <h2>Add a new chore</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Name</Label>
          <Input
            required
            type="text"
            value={formInput.name}
            name="name"
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Difficulty</Label>
          <Input
            type="select"
            name="difficulty"
            value={formInput.difficulty}
            onChange={handleChange}
            required
          >
            <option value="" style={{ display: 'none' }}>
              Select Difficulty
            </option>
            {[...Array(5)].map((_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label>Frequency (in days)</Label>
          <Input
            type="number"
            value={formInput.choreFrequencyDays}
            name="choreFrequencyDays"
            min={1}
            max={365}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <Button type="submit" color="primary">
          Submit
        </Button>
      </Form>
      <div style={{ color: 'red' }}>
        {Object.keys(errors).map(key => (
          <p key={key}>
            {key}: {errors[key].join(',')}
          </p>
        ))}
      </div>
    </div>
  );
}
