import React from "react";
import { Grid, List, Paper, ListItemButton, ListItemIcon, ListItemText, Checkbox, Button } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

export default function TransferList({
  left,
  setLeft,
  right,
  setRight,
  checked,
  setChecked,
  isDisabled
}) {
  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight([...right, ...left]);
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setChecked(not(checked, leftChecked));
    setRight([...right, ...leftChecked]);
    setLeft(not(left, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft([...right, ...left]);
    setRight([]);
  };

  const handleSortUpward = () => {
    const sortedRight = [...right];
    const indices = rightChecked.map((item) => right.indexOf(item));
    indices.sort((a, b) => a - b);
    indices.forEach((index, i) => {
      if (index > 0 && right.indexOf(rightChecked[i]) === index) {
        const temp = sortedRight[index - 1];
        sortedRight[index - 1] = sortedRight[index];
        sortedRight[index] = temp;
      }
    });

    setRight(sortedRight);
  };

  const handleSortDownward = () => {
    const sortedRight = [...right];
    const indices = rightChecked.map((item) => right.indexOf(item));
    indices.sort((a, b) => b - a);
    indices.forEach((index, i) => {
      if (index < sortedRight.length - 1) {
        const temp = sortedRight[index + 1];
        sortedRight[index + 1] = sortedRight[index];
        sortedRight[index] = temp;
      }
    });
    setRight(sortedRight);
  };

  const customList = (items) => (
    <Paper
      sx={{ width: "100%", height: 250, overflow: "auto" }}
      className="scrollbar-w-3 border"
    >
      <List dense component="div" role="list" sx={{ margin: "unset" }}>
        {items.map((value) => {
          const labelId = `transfer-list-item-${value}-label`;
          return (
            <ListItemButton
              sx={{ padding: "unset" }}
              key={value}
              role="listitem"
              onClick={handleToggle(value)}
              disabled={isDisabled}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </ListItemIcon>
              <p className="text-[16px]">{`${value}`} </p>
            </ListItemButton>
          );
        })}
      </List>
    </Paper>
  );

  return (
    <Grid container className="flex items-center justify-between w-full">
      <div className="w-[35%] ">
        <h2 className="my-2 text-[16px] text-neutral-500">
          Available Options
        </h2>
        <Grid item>{customList(left)}</Grid>
      </div>
      <Grid item>
        <Grid
          container
          direction="column"
          alignItems="center"
          className="mt-10"
        >
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleSortUpward}
              disabled={(leftChecked.length === 0 && rightChecked.length === 0) || isDisabled}
              aria-label="move all right"
            >
              <KeyboardArrowUpIcon />
            </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllRight}
            disabled={left.length === 0 || isDisabled}
            aria-label="move all right"
          >
            <KeyboardDoubleArrowRightIcon />
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0 || isDisabled}
            aria-label="move selected right"
          >
            <KeyboardArrowRightIcon />
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0 || isDisabled}
            aria-label="move selected left"
          >
            <KeyboardArrowLeftIcon />
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllLeft}
            disabled={right.length === 0 || isDisabled}
            aria-label="move all left"
          >
            <KeyboardDoubleArrowLeftIcon />
          </Button>
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleSortDownward}
              disabled={(leftChecked.length === 0 && rightChecked.length === 0) || isDisabled}
              aria-label="move all right"
            >
              <KeyboardArrowDownIcon />
            </Button>
        </Grid>
      </Grid>
      <div className="w-[35%]">
        <h2 className="my-2 text-[16px] text-neutral-500">
          Selected Options
        </h2>
        <Grid item>{customList(right)}</Grid>
      </div>
    </Grid>
  );
}
