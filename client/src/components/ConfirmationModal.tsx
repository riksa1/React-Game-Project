import React from "react"
import { Modal, Box, Typography, Button } from "@mui/material"
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorIcon from '@mui/icons-material/Error';
import MessageIcon from '@mui/icons-material/Message';

interface Props {
    open: boolean
    handleClose: () => void
    handleConfirm?: () => void
    title: string
    message: string
    success?: boolean
    error?: boolean
}

const ConfirmationModal = ({ open, handleClose, handleConfirm, title, message, success = false, error = false }: Props) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                borderRadius: 5
            }}>
                {success && <CheckCircleOutlineIcon sx={{ color: 'success.main', fontSize: 100 }} />}
                {error && <ErrorIcon sx={{ color: 'error.main', fontSize: 100 }} />}
                {!success && !error && <MessageIcon sx={{ color: 'info.main', fontSize: 100 }} />}
                <Typography id="modal-title" variant="h6" component="h2" sx={{ mb: 4 }}>
                    {title}
                </Typography>
                <Typography id="modal-description" sx={{ textAlign: 'center' }}>
                    {message}
                </Typography>
                <Box sx={{
                    mt: 4,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}>
                    {!success && !error ? (
                        <Button variant="contained" color="info" sx={{ mr: 2 }}
                            onClick={handleClose}
                        >
                            Ok
                        </Button>
                    ) : (
                        <>
                            <Button variant="contained" color={success ? "success" : "error"} sx={{ mr: 2 }}
                                onClick={handleConfirm}
                            >
                                Confirm
                            </Button>
                            <Button variant="contained" sx={{ mr: 2 }}
                                onClick={handleClose}
                            >
                                Cancel
                            </Button>  
                        </>
                    )}
                </Box>
            </Box>
        </Modal>
    )
}

export default ConfirmationModal