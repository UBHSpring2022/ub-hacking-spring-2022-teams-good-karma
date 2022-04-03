import { Button, TextField, TextareaAutosize,  } from '@mui/material'
import React, { useEffect, useState, useContext } from 'react'
import { Modal } from 'rsuite'
import { ethContext } from '../ethContext'

const GkDialog = (props) => {
    const [coins, setCoins] = useState(0)
    const [comments, setComments] = useState('')
    const { etherContext, userAddress,  setEthContext } = useContext(ethContext);

    const handleCoinChange = (event) => {
        setCoins(event.target.value)
    }
    const handleCommentsChange = (event) => {
        setComments(event.target.value)
    }

    const completePayment = async () => {
        await etherContext.methods.donate("0x80a7635930fAcb45894fb185E5c8F92cb78c1f55").send({
            from: "0xF0A6Be2F3abA0F39C451CA8f2083B9177c849E2a",
            value: `${coins* Math.pow(10, 18)}`
        })
        props.closeDialog();
    }
    useEffect(()=> {
        console.log(etherContext);
    }, [])
    return (
        <>
            <Modal overflow={true} open={true} onClose={props?.closeDialog}>
                <Modal.Header>
                    <Modal.Title className="img-title">{'Donate'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="flex flex-col">
                        <div className="flex flex-row">
                            <div className="field-name">
                                Organization Name:{' '}
                            </div>{' '}
                            <div className="ml-2">NGO Inc.,</div>
                        </div>
                        <div className="w-2/4 mt-5">
                            <TextField
                                value={coins}
                                onChange={handleCoinChange}
                                label="GK coins"
                                type="number"
                                variant="outlined"
                            />
                        </div>
                        <div className="w-2/4 mt-5">
                            <div className="field-name">Comments</div>
                            <TextareaAutosize
                                onChange={handleCommentsChange}
                                value={comments}
                                minRows={3}
                                placeholder="Enter your comments"
                                style={{
                                    width: 500,
                                    border: '1px solid rgba(0, 0, 0, 0.3)',
                                    borderRadius: '5px',
                                    padding: '5px',
                                }}
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="flex flex-row justify-end">
                        <div>
                            <Button variant="outlined" onClick={completePayment}>Complete payment</Button>
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

export default GkDialog
