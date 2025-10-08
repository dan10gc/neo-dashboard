import { columns } from "./columns"
import { DataTable } from "./data-table"

export const AsteroidTable = ({data}) => {
    // TODO: Add state for active filter
    // useState for tracking 'all' | 'hazardous' | 'size'
    
    return (
      <div>
        {/* Filter buttons */}
        {/* <div className="flex gap-3 mb-4">
          <Button variant="outline">All</Button>
          <Button variant="outline">Hazardous Only</Button>
          <Button variant="outline">Sort by Size</Button>
        </div> */}
        <DataTable  columns={columns} data={data} />
      </div>
    )
  }