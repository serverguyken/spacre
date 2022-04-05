import { useRouter } from 'next/router'

function Profile() {
    const router = useRouter()
    const { profileID } = router.query
    return (
        <div>
        <h1>Profile</h1>
            <p>This is the user profile for user with userName: { profileID }</p>
        </div>
    );

}

export default Profile;