import Status from "@/components/Status/Status";

export default function StatusCell({ value, data, colDef, ...otherProps }) {

    return (
        <div className="flex items-center h-full">
            <Status status={value} />
        </div>

    )
}
