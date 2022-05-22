import * as React from 'react';

interface IPaginationProps {
  pagination: PaginationProps
  handleChangePage: Function
}

export interface PaginationProps {
  count: number
  next: number
  offset: number
  page: number
  prev: number
  total: number
}

const Pagination: React.FunctionComponent<IPaginationProps> = (props) => {
  const { pagination, handleChangePage } = props
  const renderPageNumber = () => {
    const listNumber = []
    for(let i = 0; i < pagination.total; i++) {
      listNumber.push(i)
    }
    return listNumber.map((x, i) => (
      <li key={x} className={`page-item ${pagination.page === i + 1 && 'active'}`} onClick={() => pagination.page === i + 1 ? console.log('') : handleChangePage(i + 1)}>
        <a className="page-link">
          { i + 1 }
        </a>
      </li>
    ))
  }
  return(
    <nav aria-label="...">
      <ul className="pagination" style={{ flexWrap: 'wrap' }}>
        <li className={`page-item ${pagination.page === 1 && 'disabled'}`} onClick={() => pagination.page === 1 ? console.log('') : handleChangePage(pagination.page - 1)}>
          <a className="page-link" tabIndex={-1}>Previous</a>
        </li>
        { renderPageNumber() }
        <li className={`page-item ${pagination.page === pagination.total && 'disabled'}`} onClick={() => pagination.page === pagination.total ? console.log('') : handleChangePage(pagination.page + 1)}>
          <a className="page-link">Next</a>
        </li>
      </ul>
    </nav>
  );
};

export default React.memo(Pagination);
