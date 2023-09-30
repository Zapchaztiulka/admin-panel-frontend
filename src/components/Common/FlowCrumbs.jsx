import PropTypes from 'prop-types';
import { Link } from "react-router-dom"

export const FlowCrumbs = ({titles, redirections}) => {
    return (
        <div>
            {titles.map((title, idx) => {
                return (<>
                    {redirections[idx]
                        ?
                        <Link to={redirections[idx]}>{title}</Link>
                        :
                        <span>{title}</span>
                    }

                    {idx+1 < titles.length && <span> / </span>}
                </>)
            })}
        </div>
    )
}

FlowCrumbs.propTypes = {
    titles: PropTypes.arrayOf(PropTypes.string),
    redirections: PropTypes.arrayOf(PropTypes.string)
};