import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "./styles.css";
import { useMemo } from 'react';

const Grid = ({ gridRef, columns, data, options, ...rest }) => {
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

    return (
        <div style={containerStyle}>
            <div className="outer-div">
                <div className="grid-wrapper">
                    <div
                        style={gridStyle}
                        className={
                            "ag-theme-quartz"
                        }
                    >
                        <AgGridReact
                            ref={gridRef}
                            rowData={data}
                            columnDefs={columns}
                            gridOptions={options}
                            rowHeight={56}
                            {...rest} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Grid