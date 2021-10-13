import { useHistory } from 'react-router-dom';

export const PasswordResetFail = () => {
    const history = useHistory();

    return (
        <div className="content-container">
            <h3>Uh oh...</h3>
            <p>
                Something went wrong while trying to reset your password.
            </p>
            <button onClick={() => history.push('/login')}>Back to Log in</button>
        </div>
    );
}