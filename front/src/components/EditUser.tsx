import toast from "react-hot-toast";
import Modal from "./Modal";
import { PATCH, DELETE } from "../utils/functions";
import { IUSER } from "../utils/types";

export default function EditUser({
  setEditUser,
  editUser,
  setUsers,
}: {
  setEditUser: (param: any) => void;
  editUser: any;
  setUsers: (param: any) => void;
}) {
  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    let { fullName, email, password, active } = Object.fromEntries(
      new FormData(form)
    );

    if (!(fullName as string).trim() || !(email as string).trim()) {
      return toast.error("Fill all the fields without spaces");
    }

    if (!(password as string).trim()) {
      password = editUser.password;
    }

    const isUpdated = await PATCH(`/user/${editUser.id_user}`, {
      fullName,
      email,
      password,
      active: active === "true" ? true : false,
    });

    if (isUpdated.error) {
      return toast.error(isUpdated.error[0]);
    }

    setUsers((users: IUSER[]) => {
      return users.map((user) => {
        if (user.id_user === editUser.id_user) {
          return {
            ...user,
            fullName: fullName as string,
            email: email as string,
            password: password as string,
            active: active === "true" ? true : false,
          };
        }

        return user;
      });
    });

    toast.success("User updated successfully");

    setEditUser(null);
  };

  const handleDelete = async () => {
    const isDeleted = await DELETE(`/user/${editUser.id_user}`);

    if (isDeleted.error) {
      return toast.error(isDeleted.error[0]);
    }

    setUsers((users: IUSER[]) => {
      return users.filter((user) => user.id_user !== editUser.id_user);
    });

    toast.success("User deleted successfully");

    setEditUser(null);
  };
  return (
    <Modal closeModal={() => setEditUser(null)}>
      <form onSubmit={handleEdit} className="w-[450px] h-[500px] items-center">
        <h2 className="text-2xl font-bold font-serif mb-8">Edit or Delete</h2>
        <input
          type="text"
          className="rounded-md border border-black p-2"
          placeholder="Full name"
          name="fullName"
          value={editUser.fullName}
          onChange={(e) =>
            setEditUser({ ...editUser, fullName: e.target.value })
          }
        />
        <input
          type="text"
          className="rounded-md border border-black p-2"
          placeholder="Email"
          name="email"
          value={editUser.email}
          onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
        />
        <input
          type="password"
          name="password"
          className="rounded-md border border-black p-2"
          placeholder="New password"
          onChange={(e) =>
            setEditUser({ ...editUser, password: e.target.value })
          }
        />
        <div className="flex gap-5 justify-center">
          <div>
            <input
              type="radio"
              name="active"
              value="true"
              id="true"
              checked={editUser.active}
              onChange={() => setEditUser({ ...editUser, active: true })}
            />
            <label htmlFor="active">Activo</label>
          </div>
          <div>
            <input
              type="radio"
              name="active"
              value="false"
              id="false"
              checked={!editUser.active}
              onChange={() => setEditUser({ ...editUser, active: false })}
            />
            <label htmlFor="false">Inactivo</label>
          </div>
        </div>

        <button className="bg-blue-300 w-32 rounded-md py-2 text-blue-100 hover:text-blue-500 transition-all duration-200 ease-in-out">
          Update
        </button>
        <button
          type="button"
          className="transition-all duration-200 underline  ease-in-out w-32 rounded-md py-2 hover:[text-decoration:none;]  hover:bg-red-500 hover:text-white"
          onClick={handleDelete}
        >
          Delete
        </button>
      </form>
    </Modal>
  );
}
