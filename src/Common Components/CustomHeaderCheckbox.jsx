
const CustomHeaderCheckbox = ({api,data}) => {
    const isAllSelected = api.getDisplayedRowCount() === api.getSelectedNodes().length;

    console.log("data",data)

    const handleHeaderCheckboxChange = (event) => {
      const isChecked = event.target.checked;
      api.forEachNode((node) => {
        node.setSelected(isChecked);
        const updatedRow = { ...node.data, selected: isChecked };
        api.applyTransaction({ update: [updatedRow] });
      });
    };

    return (
      <input
        type="checkbox"
        disabled={data.length===0}
        className={`${data.length>0 ? "cursor-pointer" : ""} w-[16px] h-[16px] border-4 border-blue-500`}
        checked={isAllSelected && data.length>0}
        onChange={handleHeaderCheckboxChange}
      />
    );
  };
export default CustomHeaderCheckbox;