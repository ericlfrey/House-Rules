import { useState } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

export default function CreateChore() {
  const initialState = {
    name: '',
    difficulty: 0,
    choreFrequencyDays: 0,
  };
  const [formInput, setFormInput] = useState(initialState);
  // const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setFormInput(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(formInput);
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
    </div>
  );
}

// Create a component called CreateChore that allows admins to create new chores in the system.
// The component should contain a form to collect a name, difficulty, and chore frequency.
