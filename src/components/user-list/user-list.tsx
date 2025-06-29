import { UserCard } from "@components/user-list/user-card";
import { checkInProgress } from "@utils/helpers/array-helpers";
import { FC } from "react";
import { UserListProps } from "./type";
import s from "./user-list.module.css";

export const UserList: FC<UserListProps> = ({
  users,
  onFollow,
  onUnFollow,
  followingInProgress,
}) => (
  <section className={s.list}>
    {users.map((u) => (
      <UserCard
        user={u}
        key={u.id}
        followToUser={onFollow}
        unfollowFromUser={onUnFollow}
        followingInProgress={checkInProgress(followingInProgress, u.id)}
      />
    ))}
  </section>
);
