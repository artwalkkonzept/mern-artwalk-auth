import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useToken } from '../auth/useToken';
import { useUser } from '../auth/useUser';

export const UserInfoPage = () => {
    const user = useUser();
    const [token, setToken] = useToken();

    const { id, email, info } = user;

    // We'll use the history to navigate the user
    // programmatically later on (we're not using it yet)
    const history = useHistory();

    // These states are bound to the values of the text inputs
    // on the page (see JSX below). 
    const [name, setName] = useState(info.name || '');
    const [bild, setBild] = useState(info.bild || '');

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
                bild,
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
    localStorage.removeItem("token");
    history.push("./login");
    }
    
    const resetValues = () => {
        setName(info.name);
        setBild(info.bild);
    }
    
    // And here we have the JSX for our component. It's pretty straightforward
    return (
        <div className="content-container">
            <h3>Profil {email}</h3>
            {showSuccessMessage && <div className="success">Successfully saved user data!</div>}
            {showErrorMessage && <div className="fail">Uh oh... something went wrong and we couldn't save changes</div>}
            <li><label>
                <p>ArtWalk:</p>
                <input
                    onChange={e => setName(e.target.value)}
                    value={name} />
            </label></li>
            <li><label>
                <p>Bilder:</p>
                <input
                    onChange={e => setBild(e.target.value)}
                    value={bild} />
            </label></li>
            <button style={{ marginRight: 8 }} onClick={saveChanges}>Save Changes</button>
            <button onClick={resetValues}>Reset Values</button>
            <li><button onClick={logOut}>Log Out</button></li>
        </div>
    );
}