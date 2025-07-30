import React, { useEffect, useState } from "react";
import { Box, IconButton, Tooltip, Button, Modal } from "@mui/material";
import PageTitle from "./PageTitle.jsx";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Select from "react-select";
import CloseIcon from "@mui/icons-material/Close";
import NumberComponent from "./NumberComponent.jsx";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "15px",
};

const EditUserDataModal = ({ modalOpen, setModalOpen, setNotifyFrequency }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeInput, setTimeInput] = useState(0);
  const [tempFreq, setTempFreq] = useState("");

  const option = [
    { value: "Hours", label: "Hours" },
    { value: "Minutes", label: "Minutes" },
  ];

  useEffect(() => {
    setTempFreq(`${timeInput} ${selectedOption}`);
  }, [timeInput, selectedOption]);

  const handleInputChange = (selectedOption) => {
    setSelectedOption(selectedOption.value);
  };

  const saveFrequency = () => {
    setNotifyFrequency(tempFreq);
    handleClose();
    setTimeInput(0);
    setSelectedOption(null);
  };

  const handleClose = () => {
    setModalOpen(false);
    setTimeInput(0);
    setSelectedOption(null);
  };

  return (
    <div>
      <Modal
        sx={{ zIndex: "4000" }}
        open={modalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex items-center justify-between">
            <PageTitle
              titleText="Frequency"
              titleIcon={<AccessTimeIcon style={{ color: "rgb(0,78,150)" }} />}
            />
            <Tooltip
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(255,0,0,0.1)",
                },
              }}
              title="Close"
            >
              <IconButton onClick={handleClose}>
                <CloseIcon
                  sx={{
                    color: "rgba(255,0,0,0.7)",
                  }}
                />
              </IconButton>
            </Tooltip>
          </div>
          <hr />
          <div className="flex gap-5 mt-3 items-center justify-center">
            <NumberComponent
              setTimeInput={setTimeInput}
              min={selectedOption==="minutes" ? 10 : selectedOption==="hours" ? 1 : 1}
              max={selectedOption==="minutes" ? 59 : selectedOption==="hours" ? 24 : 60}
            />
            <Select
              options={option}
              className=" mt-2 mb-3 w-12/12"
              placeholder="Select Intervals"
              name="intervals"
              onChange={handleInputChange}
              styles={{
                control: (provided) => ({
                  ...provided,
                  background: "#e7eef3",
                }),
              }}
            />
          </div>
          <div className="flex justify-end mt-4">
            <Button
              disabled={timeInput <= 0 || !selectedOption}
              variant="contained"
              onClick={saveFrequency}
            >
              Save
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default EditUserDataModal;
