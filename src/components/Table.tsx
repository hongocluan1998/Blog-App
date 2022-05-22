import * as React from 'react';
import '../css/table.css'
import { useNavigate } from "react-router-dom";
import Pagination from './Pagination';

export interface ITableProps {
  columns: Columns[]
  rows: DataRows[]
  loading: boolean
  handleDelete: Function
  pagination: PaginationProps
  handleChangePage: Function
}

export interface Columns {
  name: string
}

export interface DataRows {
  id: number
  title: string
  image_url: string
  index: string
}

export interface PaginationProps {
  count: number
  next: number
  offset: number
  page: number
  prev: number
  total: number
}

function Table (props: ITableProps) {
  const { columns, rows, loading, handleDelete, pagination, handleChangePage } = props
  let navigate = useNavigate();
  return (
    <div>
    <table className="table table-hover">
      <thead>
        <tr>
        {
          columns.length && columns.map((x, i) => {
            return(
              <th key={i} scope="col">{x.name}</th>
            )
          })
        }
        </tr>
      </thead>
      <tbody>
        {
          loading ? (
            <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : rows.length ? rows.map((x, i) => {
            return(
              <tr key={i}>
                <th scope="row">{ x.index }</th>
                <td>{x.title}</td>
                <td>
                  <img width="80px" height="80px" alt='Fail' src={x.image_url} />
                </td>
                <td className='action'>
                  <button type="button" className="btn btn-secondary minWidthBtn" onClick={() => navigate(`/blog-view/${x.id}/false`)}>Detail</button>
                  <button type="button" className="btn btn-success mgLeft minWidthBtn" onClick={() => navigate(`/blog-view/${x.id}/true`)}>Edit</button>
                  <button type="button" className="btn btn-danger mgLeft minWidthBtn" data-toggle="modal" data-target="#exampleModal" onClick={() => handleDelete(x.id)}>Delete</button>
                </td>
              </tr>
            )
          }) : ''
        }
      </tbody>
    </table>
    <Pagination
      pagination={pagination}
      handleChangePage={handleChangePage}
    />
    </div>
  );
}
export default React.memo(Table) 
