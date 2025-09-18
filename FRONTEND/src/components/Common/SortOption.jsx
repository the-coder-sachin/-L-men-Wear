import { useSearchParams } from "react-router-dom";
import Select from "react-select";

const SortOption = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const options = [
    { value: "", label: "default" }, // empty string means no sorting
    { value: "priceAsc", label: "Low to High" },
    { value: "priceDesc", label: "High to Low" },
    { value: "popularity", label: "Popularity" },
  ];

  // Get current sortBy from URL params (default to empty string)
  const currentSort = searchParams.get("sortBy") || "";

  // Find the matching option object to set as value for react-select
  const selectedOption = options.find((option) => option.value === currentSort);

  const handleSorting = (selected) => {
    if (selected) {
      if (selected.value === "") {
        // If default is selected, remove sortBy from URL
        searchParams.delete("sortBy");
      } else {
        searchParams.set("sortBy", selected.value);
      }
      setSearchParams(searchParams);
    }
  };

  return (
    <div className="flex self-end rounded w-fit bg-red-700">
      <Select
        options={options}
        placeholder={"Sort by"}
        onChange={handleSorting}
        value={selectedOption}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: "#ffffff",
            primary25: "#1f2937",
            primary50: "#1f2937",
            primary75: "#1f2937",
            neutral0: "#000000",
            neutral80: "#ffffff",
            neutral20: "#4b5563",
            neutral30: "#6b7280",
          },
        })}
        styles={{
          control: (base, state) => ({
            ...base,
            backgroundColor: "#000000",
            borderColor: state.isFocused ? "#ffffff" : "#4b5563",
            boxShadow: state.isFocused ? "0 0 0 1px #ffffff" : "none",
            "&:hover": {
              borderColor: "#6b7280",
            },
          }),
          menu: (base) => ({
            ...base,
            backgroundColor: "#000000",
          }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected
              ? "#e2e8f0"
              : state.isFocused
              ? "#1f2937"
              : "#000000",
            color: state.isSelected ? "#000000" : "#ffffff",
            cursor: "pointer",
            ":active": {
              backgroundColor: "#1f2937",
            },
          }),
          singleValue: (base) => ({
            ...base,
            color: "#ffffff",
          }),
          input: (base) => ({
            ...base,
            color: "#ffffff",
          }),
          placeholder: (base) => ({
            ...base,
            color: "#9ca3af",
          }),
        }}
        className=" text-xs"
      />
    </div>
  );
};

export default SortOption;
