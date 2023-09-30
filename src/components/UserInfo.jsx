import { useAuth } from "../hooks"

export const UserInfo = () => {
    const { user } = useAuth();
    console.log(user);
    return (
        <>
            <h2>{user.userName} {user.userSurname}</h2>
        </>
    )
}