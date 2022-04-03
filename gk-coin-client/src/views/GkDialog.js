import { Button, TextField, TextareaAutosize,  } from '@mui/material'
import React, { useEffect, useState, useContext } from 'react'
import { Modal } from 'rsuite'
import { ethContext } from '../ethContext'
import Cookies from 'js-cookie'
const GkDialog = (props) => {
    const [coins, setCoins] = useState(0)
    const [comments, setComments] = useState('')
    const { etherContext, userAddress,  setEthContext } = useContext(ethContext);
    console.log(props.record.address)
    const handleCoinChange = (event) => {
        setCoins(event.target.value)
    }
    const handleCommentsChange = (event) => {
        setComments(event.target.value)
    }

    const completePayment = async () => {
        let currentUser = Cookies.get('auth')
        await etherContext.methods.donate(`${props.record.address}`).send({
            from: currentUser,
            value: `${coins}000000000000000000`
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
