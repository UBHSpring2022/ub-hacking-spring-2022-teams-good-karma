import React from 'react'
import { Modal } from 'rsuite'
import {
    Button,
    TextField,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Autocomplete,
    Chip,
} from '@mui/material'

const GkValidator = (props) => {
    const handleChange = (x, emails) => console.log(x, emails)
    return (
        <>
            <Modal overflow={true} open={true} onClose={props?.closeDialog}>
                <Modal.Header>
                    <Modal.Title className="img-title">
                        {'Validate Item'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="flex flex-col">
                        <div className="flex flex-col">
                            <div className="mt-5">
                                <FormControl className="w-2/4">
                                    <InputLabel id="age-simple-select-label">
                                        Organization
                                    </InputLabel>

                                    <Select
                                        label="Organization"
                                        fullWidth
                                        labelId="age-simple-select-label"
                                        id="demo-simple-select-helper"
                                    >
                                        <MenuItem value={10}>NGO 1</MenuItem>
                                        <MenuItem value={20}>NGO 2</MenuItem>
                                        <MenuItem value={30}>NGO 3</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                        <div className="w-2/4 mt-5">
                            <div>
                                <Autocomplete
                                    multiple
                                    id="tags-filled"
                                    onChange={handleChange}
                                    options={[]}
                                    defaultValue={''}
                                    freeSolo
                                    renderTags={(value, getTagProps) =>
                                        value.map((option, index) => (
                                            <Chip
                                                label={option}
                                                {...getTagProps({ index })}
                                            />
                                        ))
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="outlined"
                                            label="Bar codes"
                                            placeholder="Add Barcode"
                                        />
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="flex flex-row justify-end">
                        <div>
                            <Button variant="outlined">Validate</Button>
                        </div>
                        <div className="ml-5">
                            <Button
                                variant="outlined"
                                onClick={props?.closeDialog}
                                color="warning"
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default GkValidator
