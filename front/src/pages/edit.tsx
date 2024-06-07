import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import EditUser from "../components/EditUser";

import { IUSER } from "../utils/types";

let timer = setTimeout(() => {});


export default function Edit() {
  const [users, setUsers] = useState<Array<IUSER>>([]);

  const [filter, setfilter] = useState("");

  const [editUser, setEditUser] = useState<IUSER | any>(null);

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
    }, 100);
  }, [filter]);

  return (
    <>
      {editUser && (
        <EditUser
          setUsers={setUsers}
          editUser={editUser}
          setEditUser={setEditUser}
        />
      )}

      <h1 className="absolute top-28 left-1/2 -translate-x-1/2 text-4xl text-white font-light">
        Edit
      </h1>

      <form className="w-[450px] h-[500px] items-center">
        <input
          type="text"
          className="rounded-md border border-black p-2"
          placeholder="Search by email ..."
          value={filter}
          onChange={(e) => setfilter(e.target.value)}
        />
        <section className="w-full h-[200px] overflow-y-auto flex flex-col gap-3">
          {users.map((user) => {
            return (
              <div
                key={user.id_user}
                className="flex items-center justify-between p-2 border-b border-black"
              >
                <h2>{user.email}</h2>
                <button
                  type="button"
                  className="underline hover:text-blue-400 transition-all duration-200 ease-in-out"
                  onClick={() => setEditUser(user)}
                >
                  Edit
                </button>
              </div>
            );
          })}

          {!users.length && (
            <p className="text-center text-gray-400 mt-20">No users found</p>
          )}
        </section>
      </form>
    </>
  );
}
