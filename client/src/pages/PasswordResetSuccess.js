import { useHistory } from 'react-router-dom';

export const PasswordResetSuccess = () => {
    const history = useHistory();

    return (
        <div className="content-container">
            <h3>Success!</h3>
            <p>
                Your password has been reset, now please login with your new password.
            </p>
            <button onClick={() => history.push('/login')}>Log in</button>
        </div>
    );
}