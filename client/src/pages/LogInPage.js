import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useToken } from '../auth/useToken';

export const LogInPage = () => {
    const [token, setToken] = useToken();

    const [errorMessage, setErrorMessage] = useState('');

    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

    const history = useHistory();

    const onLogInClicked = async () => {
        const response = await axios.post('/api/login', {
            email: emailValue,
            password: passwordValue,
        });
        const { token } = response.data;
        setToken(token);
        history.push('/');
    }

    return (
        
        <div className="content-container">
            <h3>Log In</h3>
            <div>
            {errorMessage && <div className="fail">{errorMessage}</div>}
            <input
                value={emailValue}
                onChange={e => setEmailValue(e.target.value)}
                placeholder="example@mail.com" />
            <input
                type="password"
                value={passwordValue}
                onChange={e => setPasswordValue(e.target.value)}
                placeholder="password" />
            <li><button  style={{ marginRight: 8 }} 
                disabled={!emailValue || !passwordValue}
                onClick={onLogInClicked}>Log In</button>
            <button onClick={() => history.push('/signup')}>Sign Up</button></li>
            </div>
        </div>
    );
}

/*<li><button
disabled={!googleOauthUrl}
onClick={() => { window.location.href = googleOauthUrl }}
>Log in with Google</button></li>
<li><button onClick={() => history.push('/forgot-password')}>Forgot your password?</button></li>
*/