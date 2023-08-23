import React, { useEffect, useState } from "react";
import { useFormik } from 'formik';

function CreateTournament({ user }) {
    const [form, setForm] = useState('')

    const formik = useFormik({
        initialValues: {
            name: "",
            tournament_contest: "",
        },
        onSubmit: (values) => {
            fetch('/tournaments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values, null, 2)
            })
                .then(r => {
                    if (r.ok) {
                        formik.resetForm()
                        return r.json();
                    } else {
                        r.json().then(data => {
                            setForm(data.error || 'A problem occured while trying to create your tornament')
                        })
                    }
                })


        }
    })
    return (
        <div classname='create-tourny'>
            {user ? (
                <>
                    <h3 className="create-tourny-header">Create Your Own Tournament Here!</h3>
                    {form && <div className="create-torny-state-div">{form}</div>}
                    <form onSubmit={formik.handleSubmit}>
                        <div className="tourny-name">
                            <label className="form-label">What is the name of your Tournament?</label>
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
                        <div className="tourny-contest">
                            <label className="form-label">What is being played?</label>
                            <input
                                type="text"
                                className='form-control'
                                value={formik.values.tournament_contest}
                                onChange={formik.handleChange}
                                name='tournament_contest'
                                id='tournament_contest'
                                required
                            />
                        </div>
                        <div className="tourny-button">
                            <button type='submit'>
                                Create Tournament!
                            </button>
                        </div>
                    </form>
                </>
            ) : (
                <h2>Please login and signup to create a tournament!</h2>
            )
            }
        </div>
    )
}

export default CreateTournament;