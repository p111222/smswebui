import React, { useContext } from "react";
import { Modal, Box, Typography } from "@mui/material";
import debounce from "../utils/debounce";

const ButtonRenderer = ({ type, onOkClick, onCancelClick }) => {

    const debouncedOnOkClick = debounce(onOkClick, 300); // 300ms delay

    if (type === "confirm") {
        return (
            <>
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    onClick={debouncedOnOkClick}
                >
                    OK
                </button>
                <button
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                    onClick={onCancelClick}
                >
                    Cancel
                </button>
            </>
        );
    }

    return (
        <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={onOkClick}
        >
            OK
        </button>
    );
};

const DecisionBox = ({
    open,
    onClose,
    heading,
    msg,
    onOkClick,
    onCancelClick,
    type,
}) => {
    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        border: "2px solid #fff",
        boxShadow: 24,
        p: 2,
        borderRadius: "10px"
    };

    return (
        <Modal
            onClick={(e) => {
                e.stopPropagation()
            }}
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography sx={{ fontWeight: "bold" }} id="modal-modal-title" variant="h6" component="h2">
                    {heading}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {msg}
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        mt: 3,
                        gap: 2,
                    }}
                >
                    <ButtonRenderer
                        type={type}
                        onOkClick={onOkClick}
                        onCancelClick={onCancelClick}
                    />
                </Box>
            </Box>
        </Modal>
    );
};

export default DecisionBox;
