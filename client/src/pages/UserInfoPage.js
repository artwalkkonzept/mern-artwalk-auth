import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useToken } from '../auth/useToken';
import { useUser } from '../auth/useUser';

export const UserInfoPage = () => {
    const user = useUser();
    const [token, setToken] = useToken();

    const { id, email, isVerified, info } = user;

    // We'll use the history to navigate the user
    // programmatically later on (we're not using it yet)
    const history = useHistory();

    // These states are bound to the values of the text inputs
    // on the page (see JSX below). 
    const [name, setName] = useState(info.name || '');
    const [bilds, setBilds] = useState(info.bilds || '');

    // These state variables control whether or not we show
    // the success and error message sections after making
    // a network request (see JSX below).
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    // This useEffect hook automatically hides the
    // success and error messages after 3 seconds when they're shown.
    // Just a little user interface improvement.
    useEffect(() => {
        if (showSuccessMessage || showErrorMessage) {
            setTimeout(() => {
                setShowSuccessMessage(false);
                setShowErrorMessage(false);
            }, 3000);
        }
    }, [showSuccessMessage, showErrorMessage]);

    const saveChanges = async () => {
        try {
            const response = await axios.put(`/api/users/${id}`, {
                name,
                bilds,
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const { token: newToken } = response.data;
            setToken(newToken);
            setShowSuccessMessage(true);
        } catch (error) {
            setShowErrorMessage(true);
        }
    }

    const logOut = () => {
        localStorage.removeItem('token');
        history.push('/login');
    }
    
    const resetValues = () => {
        setName(info.name);
        setBilds(info.bilds);
    }
    
    // And here we have the JSX for our component. It's pretty straightforward
    return (
        <div className="content-container">
            <h1> {email}</h1>
            {!isVerified && <div className="fail">You won't be able to make any changes until you verify your email</div>}
            {showSuccessMessage && <div className="success">Successfully saved user data!</div>}
            {showErrorMessage && <div className="fail">Uh oh... something went wrong and we couldn't save changes</div>}
            <h3>Create an ArtWalk</h3>
            <label>
                <p>ArtWalk title:</p>
                <input
                    onChange={e => setName(e.target.value)}
                    value={name} />
            </label>
            <label>
                <p>Bild:</p>
                <input
                    onChange={e => setBilds(e.target.value)}
                    value={bilds} />
            </label>
                <div className="buttom">
            <li><button onClick={resetValues}>Reset Values</button></li>
            <li><button onClick={saveChanges}>Save Changes</button></li>
            <hr />
            <li><button onClick={logOut}>Log Out</button></li>
            </div>

            <li><h3>Liste der Artwalks</h3>
            <hr />
            <h4 >{info.name}</h4>
            <p >{info.bilds}</p></li>
        </div>
    );
}
