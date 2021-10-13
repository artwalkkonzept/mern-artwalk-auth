import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

export const ForgotPasswordPage = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [emailValue, setEmailValue] = useState('');
    const history = useHistory();

    const onSubmitClicked = async () => {
        try {
            await axios.put(`/api/forgot-password/${emailValue}`);
            setSuccess(true);
            setTimeout(() => {
                history.push(`/reset-password?email=${encodeURIComponent(emailValue)}`);
            }, 3000);
        } catch (e) {
            setErrorMessage(e.message);
        }
    }

    return success ? (
        <div className="content-container">
            <h3>Success</h3>
            <p>Check your email for a reset link</p>
        </div>
    ) : (
        <div className="content-container">
            <h3>Forgot your Password</h3>
            <div>
            <p>Enter your email for a reset link</p>
            {errorMessage && <div className="fail">{errorMessage}</div>}
            <input
                value={emailValue}
                onChange={e => setEmailValue(e.target.value)}
                placeholder="example@gmail.com" />
            <li><button disabled={!emailValue} onClick={onSubmitClicked}>Send Reset Link</button></li>
            <li><button onClick={() => history.push('/login')}>Back to Log In</button></li>
            </div>
        </div>
    );
}