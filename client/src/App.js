import React, {useEffect, useState} from "react";
import {Button, TextField, FormControlLabel, Box, Typography, Modal, FormGroup, FormLabel,
    FormControl, InputLabel, Select, MenuItem, Checkbox,} from '@mui/material';
import './App.css';
//comment
function App() {
    const [data, setData] = useState(null);
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [checkEmail, setCheckEmail] = useState(false);
    const [checkPhone, setCheckPhone] = useState(false);
    const [supervisor, setSupervisor] = useState("");
    const [optSupervisors, setOptSupervisors] = useState(['']);
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = useState("");
    const handleClose = () => setOpen(false);
  
    React.useEffect(() => {
        const tempOptions = [];

        fetch("/api/supervisors")
            .then((res) => res.json())
            .then((data) => {
                data.map((item, idx) => (
                    tempOptions.push({label: item, value: item})
                ));
                setOptSupervisors(tempOptions);
            }

            );
    }, []);

    const handleSubmit = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                fName: fName,
                lName: lName,
                email: email,
                phone: phone,
                supervisor: supervisor,
            })
        };

        fetch('/api/submit', requestOptions)
            .then(response => response.json())
            .then(data =>
                {
                    setMessage(data.msg);
                    setOpen(true)

                    if (data.msg === 'Success') {
                        setFName('');
                        setLName('');
                        setEmail('');
                        setPhone('');
                        setSupervisor('');
                    }
                });
    }
  
    const handleCheckEmail = (event) => {
      setCheckEmail(event.target.checked);
    };

    const handleCheckPhone = (event) => {
        setCheckPhone(event.target.checked)
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

  return (
    <div className="App">
      <header className="App-header">
        Notification Form
      </header>

      <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {message}
                </Typography>
            </Box>
        </Modal>

      <div className="firstLine">
        <TextField
            sx={{ m: 1, width: '52ch' }}
            id="fname"
            label="First Name"
            variant="filled"
            onChange={e => setFName(e.target.value)}
            value={fName}
        />

        <TextField
            sx={{ m: 1, width: '52ch' }}
            id="lname"
            label="Last Name"
            variant="filled"
            onChange={e => setLName(e.target.value)}
            value={lName}
        />
      </div>

        <div className="secondLine">
            <div className="stacked">
                <FormControlLabel
                    sx={{ m: 1, width: '15ch' }}
                    label="Phone Number"
                    control={<Checkbox checked={checkPhone} onChange={handleCheckPhone} />}
                />
                <TextField
                    sx={{ m: 1, width: '52ch' }}
                    id="phone"
                    label="Phone Number"
                    variant="filled"
                    onChange={e => setPhone(e.target.value)}
                    value={phone}
                />
            </div>

            <div className="stacked">
                <FormControlLabel
                    sx={{ m: 1, width: '15ch' }}
                    label="Email"
                    control={<Checkbox checked={checkEmail} onChange={handleCheckEmail} />}
                />

                <TextField
                    sx={{ m: 1, width: '52ch' }}
                    id="email"
                    label="Email"
                    variant="filled"
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                />
            </div>
        </div>
        
        <FormControl
            variant="outlined"
            margin={"1"}
            style={{ marginBottom: 32 }}
        >
            <InputLabel id="test-select-label">Supervisor</InputLabel>
            <Select
                sx={{ color: 'black', width: '50ch' }}
                labelId="test-select-label"
                id="supervisor"
                value={supervisor}
                label="Supervisor"
                onChange={e=>setSupervisor(e.target.value)}
            >
                {optSupervisors.map((item, idx) => {
                    return(
                        <MenuItem key={"optSupervisors"+idx} value={item.value}>{item.label}</MenuItem>
                    )
                })}
            </Select>
        </FormControl>

        <div>
            <Button sx={{ m: 1, width: '20ch' }} variant="outlined" onClick={handleSubmit}>Submit</Button>
        </div>

    </div>
  );
}

export default App;
