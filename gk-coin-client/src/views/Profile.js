import React, { useState, useContext, useEffect } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { Button, Paper } from '@mui/material'
import GkValidator from './GkValidator'
import { ethContext } from '../ethContext'
import Cookies from 'js-cookie'
const Profile = () => {
    const [showValidateDialog, setShowValidateDialog] = useState(false);
    const [userBalance, setUserBalanace] = useState(0);
    const { etherContext,userAddress, setEthContext } = useContext(ethContext);

    function createData(transactionId, coins, action, dateAndTime, status) {
        return { transactionId, coins, action, dateAndTime, status }
    }
    const getBalance =  async () => {
        let currentUser = Cookies.get('auth')
        let x = await etherContext.methods.balanceDetails(currentUser).call({from:currentUser})
        console.log("x", x)
        setUserBalanace(x.escrow)

    }
    useEffect(() => {
        console.log(getBalance());
       
    }, [])

    const openValidateDialog = () => {
        setShowValidateDialog(true)
    }
    const closeValidateDialog = () => {
        setShowValidateDialog(false)
    }

    const rows = [
        createData(
            'asdn23daf',
            12.3,
            'Donate',
            ' April 3rd 2022, 12:55:07 am',
            'Completed'
        ),
        createData(
            '123ds23',
            213.4,
            'Deposit',
            ' April 3rd 2022, 01:55:07 am',
            'Completed'
        ),
        createData(
            '12asd233',
            32.4,
            'Deposit',
            ' April 2rd 2022, 12:43:07 am',
            'Failed'
        ),
    ]
    return (
        <>
            <div className="flex flex-col org-wrapper">
                <div className="flex flex-row justify-between org-header items-center">
                    <div className="org-title">Profile</div>
                    <div>
                        <Button
                            variant="contained"
                            onClick={() => openValidateDialog()}
                        >
                            Validate Item
                        </Button>
                    </div>
                </div>
                <div className="profile-wrapper">
                    <div className="wallet-wrapper flex justify-between">
                        <div className="flex flex-col">
                            <div className="wallet-title">Wallet</div>
                            <div className="wallet-sub-title mt-5">
                                Balance in wallet
                            </div>
                            <div className="wallet-amt"> {userBalance} GK</div>
                        </div>
                        <div className="flex flex-col justify-center w-72">
                            <div className="flex flex-row justify-between">
                                <div className="dep-text">Total Deposit:</div>
                                <div className="text-base">2130.23 GK</div>
                            </div>
                            <div className="flex flex-row justify-between mt-3">
                                <div className="dep-text">Total Donation:</div>
                                <div className="text-green-600 text-base">
                                    1130.23 GK
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="transactions-wrapper">
                        <div className="wallet-title">Transactions</div>
                        <Paper
                            elevation={0}
                            sx={{
                                width: '100%',
                                height: '80%',
                                overflow: 'hidden',
                            }}
                        >
                            <TableContainer
                                className="mt-5"
                                sx={{ maxHeight: '100%' }}
                            >
                                <Table
                                    stickyHeader
                                    sx={{ minWidth: 650 }}
                                    aria-label="simple table"
                                >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className="font-bold">
                                                Transaction Id
                                            </TableCell>
                                            <TableCell className="font-bold">
                                                Coins
                                            </TableCell>
                                            <TableCell align="right">
                                                Action
                                            </TableCell>
                                            <TableCell align="right">
                                                Date & Time
                                            </TableCell>
                                            <TableCell align="right">
                                                Status
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row, index) => (
                                            <TableRow
                                                key={index}
                                                sx={{
                                                    '&:last-child td, &:last-child th':
                                                        { border: 0 },
                                                }}
                                            >
                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                >
                                                    {row.transactionId}
                                                </TableCell>
                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                >
                                                    {row.coins}
                                                </TableCell>
                                                <TableCell
                                                    align="right"
                                                    className={[
                                                        row.action ===
                                                            'Deposit' &&
                                                            'color-blue',
                                                        row.action ===
                                                            'Donate' &&
                                                            'color-green',
                                                    ].join(' ')}
                                                >
                                                    {row.action}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {row.dateAndTime}
                                                </TableCell>
                                                <TableCell
                                                    align="right"
                                                    className={[
                                                        row.status ===
                                                            'Completed' &&
                                                            'color-green',
                                                        row.status ===
                                                            'Failed' &&
                                                            'color-red',
                                                    ].join(' ')}
                                                >
                                                    {row.status}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </div>
                </div>
            </div>
            {showValidateDialog && (
                <GkValidator
                    showDialog={showValidateDialog}
                    closeDialog={() => closeValidateDialog()}
                ></GkValidator>
            )}
        </>
    )
}

export default Profile
