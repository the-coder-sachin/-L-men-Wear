import { useEffect, useState } from "react";
import Select from "react-select";
import { MdOutlineDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  addUser,
  deleteUser,
  fetchUsers,
  updateUser,
} from "../../redux/slices/adminSlice";
import { toast } from "sonner";

const UserManagement = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.admin);

  const options = [
    { value: "customer", label: "customer" },
    { value: "admin", label: "admin" },
  ];

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addUser(formData));
    setFormData({ name: "", email: "", password: "", role: "customer" });
  };


  // const handleDelete = (id) => {
  //   if (confirm("Are you sure you want to delete this user?")) {
  //     dispatch(deleteUser(id));
  //   }
  // };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this user?")) {
      toast("sorry this feature is not available for some secuirty reasons!", {duration: 2000})
    }
  };

  return (
    <div>
      <h2 className="p-5 text-2xl font-bold capitalize">user management</h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="mt-7 bg-slate-50 shadow-2xl border border-slate-100 capitalize text-slate-600 flex flex-col gap-4 p-4 w-3/4 mx-auto"
      >
        <h3 className="font-bold tracking-wider">add new user</h3>

        {["name", "email", "password"].map((field) => (
          <div key={field}>
            <label className="text-sm block">{field}</label>
            <input
              type={field === "password" ? "password" : field}
              required
              value={formData[field]}
              onChange={(e) =>
                setFormData({ ...formData, [field]: e.target.value })
              }
              className="border border-slate-300 p-1 outline-none w-full"
            />
          </div>
        ))}

        <div>
          <label className="text-sm block">role</label>
          <Select
            options={options}
            placeholder="Select Role"
            value={options.find((opt) => opt.value === formData.role)}
            onChange={(selected) =>
              setFormData({ ...formData, role: selected.value })
            }
            className="w-full"
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: "#2563eb",
                primary25: "#e0f2fe",
                primary50: "#bfdbfe",
                neutral0: "#f9fafb",
                neutral80: "#111827",
                neutral20: "#d1d5db",
              },
            })}
            styles={{
              control: (base, state) => ({
                ...base,
                backgroundColor: "#f9fafb",
                borderColor: state.isFocused ? "#2563eb" : "#d1d5db",
                borderRadius: 6,
                boxShadow: state.isFocused ? "0 0 0 1px #2563eb" : "none",
                minHeight: "36px",
                fontSize: "0.875rem",
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isSelected
                  ? "#2563eb"
                  : state.isFocused
                  ? "#e0f2fe"
                  : "#ffffff",
                color: state.isSelected ? "#ffffff" : "#111827",
                fontSize: "0.875rem",
              }),
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white p-1 capitalize tracking-wide transition-all duration-300 hover:bg-zinc-900 active:scale-95 cursor-pointer disabled:opacity-50"
        >
          add new user
        </button>
      </form>

      {/* Loading & Error Feedback */}
      {loading && (
        <p className="text-blue-500 text-center mt-6">Loading users...</p>
      )}
      {error && <p className="text-red-500 text-center mt-6">{error}</p>}

      {/* User Table */}
      <div className="my-9 p-7 overflow-auto my-scrollbar text-nowrap">
        <table className="border border-slate-200 min-w-full shadow-2xl">
          <thead className="bg-slate-200">
            <tr>
              <th className="py-1 px-4 text-left font-bold text-slate-600 uppercase text-sm">
                s no.
              </th>
              <th className="py-1 px-4 text-left font-bold text-slate-600 uppercase text-sm">
                name
              </th>
              <th className="py-1 px-4 text-left font-bold text-slate-600 uppercase text-sm">
                email
              </th>
              <th className="py-1 px-4 text-left font-bold text-slate-600 uppercase text-sm">
                role
              </th>
              <th className="py-1 px-4 text-center font-bold text-slate-600 uppercase text-sm">
                action
              </th>
            </tr>
          </thead>
          <tbody>
            {users?.length > 0 ? (
              users
                .filter(Boolean) // removes any undefined/null items
                .map((user, i) => (
                  <tr
                    key={user._id}
                    className="border-b border-b-slate-200 text-sm text-slate-600 hover:bg-slate-100"
                  >
                    <td className="px-4 py-2">{i+1}</td>
                    <td className="px-4 py-2">{user.name}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">
                      <select
                        value={user.role}
                        onChange={(e) =>
                          dispatch(
                            updateUser({
                              id: user._id,
                              name: user.name,
                              role: e.target.value,
                            })
                          )
                        }
                        disabled={loading}
                        className="bg-white border border-slate-300 px-2 py-1 rounded"
                      >
                        <option value="customer">customer</option>
                        <option value="admin">admin</option>
                      </select>
                    </td>
                    <td className="px-4 py-2 text-red-600 text-center">
                      <MdOutlineDelete
                        onClick={() => handleDelete(user._id)}
                        className="size-5 cursor-pointer"
                        title="Delete User"
                      />
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan={4} className="text-slate-600 text-center py-6">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
