import React, { useContext, useEffect, useState } from "react";
import Chip from "@mui/material/Chip";
import DoneIcon from "@mui/icons-material/Done";
import { AppStore } from "../Store/appStore";

const ChipComponent = ({ chipData, setChipData, enableMultiSelect, selectAll }) => {

    const [allSelected, setAllSelected] = useState(false);
    const { isFieldDisabled } = useContext(AppStore)
    const p2collectionModeOptionsuseState = [
        { label: "UPI", isSelected: false, isDisabled: true },
        { label: "CHEQUE", isSelected: false, isDisabled: true },
        { label: "CASH", isSelected: false, isDisabled: true },
    ]
    useEffect(() => {
        const allSelected = chipData.every(chip => chip.isSelected);
        setAllSelected(allSelected);
    }, [chipData]);

    const handleChipClick = (chip) => {
        setChipData((prevData) =>
            prevData.map((item) => {
                if (enableMultiSelect) {
                    return item.label === chip.label
                        ? { ...item, isSelected: !item.isSelected }
                        : item;
                }
                return {
                    ...item,
                    isSelected: item.label === chip.label,
                };
            })
        );
    };

    return (
        <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            width: "100%"
        }}>
            {selectAll &&
                <Chip
                    className="flex"
                    label="ALL"
                    clickable={true}
                    disabled={false || isFieldDisabled}
                    style={{
                        color: allSelected
                            ? "white"
                            : "black",
                        backgroundColor: allSelected
                            ? "rgb(0, 78, 150)"
                            : "lightgray",
                        paddingInline: "15px",
                        paddingBlock: "10px",
                        fontSize: "12px",
                        borderRadius: "20px",
                        minWidth: "100px",
                        minHeight: "40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                    }}
                    icon={
                        allSelected ? (
                            <DoneIcon
                                style={{ color: "white" }}
                                sx={{ fontSize: "18px", marginRight: "4px" }}
                            />
                        ) : null
                    }
                    onClick={() => {
                        setAllSelected(!allSelected)
                        setChipData((prevData) =>
                            prevData.map((item) => {
                                console.log("item", item);
                                return { ...item, isSelected: !allSelected }
                            }))
                    }}
                />}
            {chipData.map((chip, index) => (
                <Chip
                    className="flex"
                    key={index}
                    label={chip.label}
                    clickable={!chip.isDisabled}
                    disabled={chip.isDisabled || isFieldDisabled}
                    style={{
                        color: chip.isSelected
                            ? "white"
                            : chip.isDisabled
                                ? "gray"
                                : "black",
                        backgroundColor: chip.isSelected
                            ? "rgb(0, 78, 150)"
                            : chip.isDisabled
                                ? "#e0e0e0"
                                : "lightgray",
                        paddingInline: "15px",
                        paddingBlock: "10px",
                        fontSize: "12px",
                        borderRadius: "20px",
                        minWidth: "100px",
                        minHeight: "40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: chip.isDisabled ? "not-allowed" : "pointer",
                    }}
                    icon={
                        chip.isSelected ? (
                            <DoneIcon
                                style={{ color: "white" }}
                                sx={{ fontSize: "18px", marginRight: "4px" }}
                            />
                        ) : null
                    }
                    onClick={() => {
                        if (!chip.isDisabled) {
                            handleChipClick(chip);
                        }
                    }}
                />
            ))}
            {selectAll && p2collectionModeOptionsuseState.map((chip, index) => (
                <Chip
                    className="flex"
                    key={index}
                    label={chip.label}
                    disabled={true}
                    style={{
                        color:"gray",
                        backgroundColor: "lightgray",
                        paddingInline: "15px",
                        paddingBlock: "10px",
                        fontSize: "12px",
                        borderRadius: "20px",
                        minWidth: "100px",
                        minHeight: "40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                />
            ))}
        </div>
    );
};

export default ChipComponent;