import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import { Fragment } from 'react';
import { Link } from "react-router-dom"

export const FlowCrumbs = ({titles, redirections}) => {
    return (
        <div>
            {titles.map((title, idx) => 
                <Fragment key={nanoid()}>
                    {redirections[idx]
                        ?
                        <Link to={redirections[idx]} key={nanoid()}>{title}</Link>
                        :
                        <span key={nanoid()}>{title}</span>
                    }
                    {idx+1 < titles.length && <span key={nanoid()}> / </span>}
                </Fragment>                   
            )}
        </div>
    )
}

FlowCrumbs.propTypes = {
    titles: PropTypes.arrayOf(PropTypes.string).isRequired,
    redirections: PropTypes.arrayOf(PropTypes.string)
};