import React from "react";

const CustomCheckboxRenderer = (props) => {
  const { value, node, colDef } = props;

  const handleChange = (event) => {
    const isChecked = event.target.checked;
    // Update the row's selected state
    node.setSelected(isChecked);
    console.log(`Checkbox clicked! Row data:`, props.data);
  };

  return (
    <input
      type="checkbox"
      className="cursor-pointer w-[16px] h-[16px] border-4 border-blue-500"
      checked={node.isSelected()} // Reflect the row's selection state
      onChange={handleChange}
    />
  );
};

export default CustomCheckboxRenderer;
