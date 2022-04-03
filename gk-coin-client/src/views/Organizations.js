import React, { useState, useContext, useEffect } from 'react'
import { Button, TextField, Box } from '@mui/material'
import NgoImage from '../resources/ngo-image.jpeg'
import GkDialog from './GkDialog'
import SearchIcon from '@mui/icons-material/Search'
import { ethContext } from '../ethContext'
const Organizations = () => {
    const [showDialog, setShowDialog] = useState(false)
    const [curRecord, setCurRecord] = useState(false)
    const openDialog = (record) => {
        console.log(record)
        setCurRecord(record)
        

    }
    const closeDialog = () => {
        setCurRecord(false)
        setShowDialog(false)
    }
    const [orgs, setOrgs] = useState([]);
    const { etherContext, userAddress,  setEthContext } = useContext(ethContext);
    const [isLoading, setLoading] = useState(false);
    let userList = []
    useEffect(()=> {
        setOrgs([])
        etherContext.methods.getAccountList().call({from:"0x2187EDc33904b8f432c877DAE29406538F6B60Eb"})
        .then(data => {
            userList = data;
            console.log(userList);
            // let finalList = []
            userList.forEach(user => {
                etherContext.methods.balanceDetails(user).call({from:"0x2187EDc33904b8f432c877DAE29406538F6B60Eb"})
                .then(d => {
                    if(d.usertype == "1"){
                        console.log("23", d)
                        setOrgs([...orgs, {address : user, balance: d.escrow}])
                    }
                   
                })
            });
            
        })
        
    }, [])




    

    return (
        <>
        {true && 

            <div className="flex flex-col org-wrapper">
                <div className="flex flex-row justify-between org-header items-center">
                    <div className="org-title">Organizations</div>
                    <div>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <SearchIcon className="mr-2" />
                            <TextField
                                label="Search organizations"
                                variant="standard"
                            />
                        </Box>
                    </div>
                </div>
                <div className="org-list">
                    {orgs.map((record, index) => (
                        <div className="card-wrapper" key={index}>
                            <div>
                                <img
                                    src={NgoImage}
                                    alt="Ngo"
                                    className="img-wrapper"
                                />
                            </div>
                            <div className="info-wrapper">
                                <div className="info-title flex flex-row justify-between">
                                    Organization Name
                                    <Button
                                        variant="outlined"
                                        className="button-padding"
                                        onClick={() => openDialog(record)}
                                    >
                                        Donate
                                    </Button>
                                </div>
                                <p>Current Balance: {record.balance}</p>
                                <div className="info-desc">
                                    NGO stands for non-governmental
                                    organization. While there is no universally
                                    agreed-upon definition of an NGO, typically
                                    it is a voluntary group or institution with
                                    a social mission, which operates
                                    independently from the government. NGOs or
                                    similar organizations exist in all parts of
                                    the world.
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>}
            {curRecord && (
                <GkDialog
                    showDialog={showDialog}
                    record={curRecord}
                    closeDialog={() => closeDialog()}
                ></GkDialog>
            )}
        </>
    )
}
export default Organizations
