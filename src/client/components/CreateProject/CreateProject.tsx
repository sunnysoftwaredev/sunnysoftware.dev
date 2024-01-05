```
import type { FunctionComponent } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import type { UserIdNameEmailRole } from '../../../server/database';
import styles from './CreateProject.scss';

type CreateProjectProps = {
    userList: UserIdNameEmailRole[];
};

const CreateProject: FunctionComponent<CreateProjectProps> = (props) => {
    const { userList } = props;
    const clientList = userList.filter(user => user.role === 'client');

    return (
        <div className={styles.createProjectContainer}>
            <h1>Create a client project</h1>
            <Formik initialValues={{ client: clientList[0]?.id, title: '', description: '' }}
                validate={values => {
                    const errors = {};
                    if (!values.client) {
                        errors.client = 'Client is required';
                    }
                    if (!values.title) {
                        errors.title = 'Title is required';
                    }
                    if (!values.description) {
                        errors.description = 'Description is required';
                    }
                    return errors;
                }}
                onSubmit={async(values, { setSubmitting, resetForm }) => {
                    const response = await fetch('api/projects', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(values),
                    });

                    if (response.ok) {
                        resetForm();
                        setSubmitting(false);
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form className={styles.formContainer}>
                        <div>
                            <label>Client: </label>
                            <Field as='select' name='client'>
                                {clientList.map(option => (
                                    <option key={option.id} value={option.id}>{option.username}</option>
                                ))}
                            </Field>
                            <ErrorMessage name='client' component='div' />
                        </div>

                        <div>
                            <label className={styles.projectTitle}>Title</label>
                            <Field type='text' name='title' className='input' />
                            <ErrorMessage name='title' component='div' />
                        </div>

                        <div>
                            <div>
                                <label>Description: </label>
                                <Field as='textarea' name='description' placeholder='Client project description...' className={styles.textArea} />
                                <ErrorMessage name='description' component='div' />
                            </div>
                        </div>

                        <button type="submit" disabled={isSubmitting}>
                            Create Project
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default CreateProject;
```
