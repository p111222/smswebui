import React, { useRef, useState, useEffect } from 'react'
import { IconButton, Tooltip, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MessageBubble from '../../../Common Components/MessageBubble';

const ClarificationBox = ({ showClarificationBox, setShowClarificationBox, existingClarifications }) => {

    const clarificationTextRef = useRef(null);
    const [sortedExistingClarifications, setSortedExistingClarifications] = useState([]);

    useEffect(() => {
        if (clarificationTextRef.current) {
            clarificationTextRef.current.scrollTo(0, clarificationTextRef.current.scrollHeight);
        }
    }, [sortedExistingClarifications])

    useEffect(() => {
        if (existingClarifications.length > 0) {
            const sortedExistingClarifications =
                existingClarifications.sort((a, b) =>
                    new Date(a.timeStamp) - new Date(b.timeStamp)
                );

            setSortedExistingClarifications(sortedExistingClarifications)
        }
    }, [existingClarifications])

    return (
        <Modal
            open={showClarificationBox}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] min-w-[70vw] min-h-[50vh] max-h-[95vh] overflow-auto rounded-xl bg-white">
                <div className='flex sticky bg-white px-4 shadow-md top-0 items-center justify-between'>
                    <p className='font-bold text-lg my-3 text-gray-800'>
                        Clarification History
                    </p>
                    <Tooltip
                        sx={{
                            "&:hover": {
                                backgroundColor: "rgba(255,0,0,0.1)",
                            },
                        }}
                        title="Close"
                    >
                        <IconButton onClick={() => {
                            setShowClarificationBox(false)
                        }}>
                            <CloseIcon
                                sx={{
                                    color: "rgba(255,0,0,0.7)",
                                }}
                            />
                        </IconButton>
                    </Tooltip>
                </div>
                <div
                    ref={clarificationTextRef}
                    className={`rounded-tl-[5px] rounded-tr-[5px] h-[500px] ${sortedExistingClarifications.length === 0 ? "flex items-center justify-center" : ""} space-y-3 w-full overflow-auto px-3 pt-2`}
                >
                    {sortedExistingClarifications.length === 0 ? <p>No Clarification.</p> : sortedExistingClarifications.map((msg, index) => {
                        console.log(msg);


                        return (
                            <MessageBubble
                                key={index}
                                messageId={index}
                                isAttachment={false}
                                message={msg.clarificationMsg}
                                createdOn={msg.timeStamp}
                                createdBy={msg.createdBy}
                                username={msg.createdUsername}
                            />
                        );
                    })}
                </div>
            </div>
        </Modal>
    )
}

export default ClarificationBox