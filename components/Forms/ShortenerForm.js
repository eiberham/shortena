import React from 'react';
import {Input} from "semantic-ui-react";

const ShortenerForm = (props) => {
    const {
        values: { url },
        errors,
        touched,
        handleChange,
        handleSubmit,
        isValid,
        setFieldTouched
    } = props;

    const change = (name, e) => {
        e.persist();
        handleChange(e);
        setFieldTouched(name, true, false);
    };

    return (
        <form onSubmit={handleSubmit} >
            <Input
                id="url"
                name="url"
                type="text"
                focus
                action={{color: 'teal', content: 'Shorten', type: 'submit'}}
                size="small"
                placeholder="Enter url..."
                value={ url }
                onChange={change.bind(null, "url")}
            />
        </form>
    )
};

export default ShortenerForm;