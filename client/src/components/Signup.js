import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';

function Signup({ handleUser }) {
    const history = useHistory();
    const [error, setError] = useState('');

    const formSchema = yup.object().shape({
        name: yup.string().required("Participants must have a name.").min(2).max(30),
        password: yup.string().required("Participants must have a password.").min(6).max(30),
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            password: "",
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch('/participants', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2),
            }).then((res) => {
                if (res.ok) {
                    res.json().then(data => {
                        handleUser(data); const prev = history.location.state && history.location.state.from
                        if (prev && (prev !== '/login' && prev !== '/signup')) {
                            history.push(prev)
                        }
                        else {
                            history.push('/')
                        }
                    });
                } else {
                    res.json().then(data => {
                        setError(data.error || "A problem has appeared while trying to create your participant!");
                    });
                }
            });
        },
    });
    return (
        <div className='signup-div'>
            <h2 className='signup-button'>Signup</h2>
            {error && <div className='error-login'>{error}</div>}
            <form onSubmit={formik.handleSubmit}>
                <div className='form-username-div'>
                    <label className='form-label'>Username:</label>
                    <input
                        type="text"
                        className='form-control'
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        name='name'
                        id='name'
                        required
                    />
                </div>
                <p></p>
                <div className='form-password-div'>
                    <label className='form-label'>Password:</label>
                    <input
                        type="password"
                        className='form-control'
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        name='password'
                        id='password'
                        required
                    />
                </div>
                <p></p>
                <div className='signup-button-div'>
                    <button className='signup-button-classname' type='submit'>
                        Signup
                    </button>
                </div>
            </form>
        </div>
    )

}

export default Signup;