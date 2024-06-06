import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Modal from "../components/Modal";

import { useNavigate } from "react-router-dom";
import { PATCH } from "../utils/functions";

let timer = setTimeout(() => {});

interface IUSER {
  id_user: number;
  email: string;
  fullName: string;
  active: boolean;
}

export default function Edit() {
  const [users, setUsers] = useState<Array<IUSER>>([]);

  const [filter, setfilter] = useState("");

  const [editUser, setEditUser] = useState<IUSER | any>(null);

  const router = useNavigate();

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const { fullName, email, password, active } = Object.fromEntries(
      new FormData(form)
    );

    console.log(fullName, email, password, active);

    if (
      !(fullName as string).trim() ||
      !(email as string).trim() ||
      !(password as string).trim()
    ) {
      return toast.error("Fill all the fields without spaces");
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

    toast.success("User updated successfully");
  };

  useEffect(() => {
    clearTimeout(timer);

    if (!filter) return setUsers([]);

    timer = setTimeout(() => {
      fetch(`http://localhost:3000/user/${filter}`)
        .then((res) => res.json())
        .then((data) => setUsers(data))
        .catch(() => {
          toast.error("Algo salió mal, intenta de nuevo");
        });
    }, 300);
  }, [filter]);

  return (
    <>
      {editUser && (
        <Modal closeModal={() => setEditUser(null)}>
          <form onSubmit={handleEdit}>
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
              onChange={(e) =>
                setEditUser({ ...editUser, email: e.target.value })
              }
            />
            <input
              type="password"
              name="password"
              className="rounded-md border border-black p-2"
              placeholder="Password"
              value={editUser.password}
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

            <button>Update</button>
          </form>
        </Modal>
      )}
      <h1 className="absolute top-28 left-1/2 -translate-x-1/2 text-4xl text-white font-light">
        Edit
      </h1>
      <button
        className="absolute top-28 left-[60%] px-5 rounded-lg -translate-x-1/2 text-xl text-black font-light bg-white"
        onClick={() => router("/create")}
      >
        Create
      </button>
      <form>
        <input
          type="text"
          className="rounded-md border border-black p-2"
          placeholder="Search by email ..."
          value={filter}
          onChange={(e) => setfilter(e.target.value)}
        />
        <section className="w-full h-[200px] overflow-y-auto">
          {users.map((user) => {
            return (
              <div
                key={user.id_user}
                className="flex items-center justify-between p-2 border-b border-black"
              >
                <h2>{user.email}</h2>
                <button type="button" onClick={() => setEditUser(user)}>
                  Edit
                </button>
              </div>
            );
          })}
        </section>
      </form>
    </>
  );
}
