import * as React from 'react';
import Table from '../../components/Table';
import '../../css/blogList.css'
import { useNavigate } from "react-router-dom";
import BlogService from '../../services/BlogService';
import { useDispatch, useSelector } from 'react-redux';
import { viewBlogList } from '../../redux/actions';
import { blogListSelector } from '../../redux/selectors';
import { Popup } from '../../components/Popup';

export interface IAppProps {
}

export interface PaginationProps {
  count: number
  next: number
  offset: number
  page: number
  prev: number
  total: number
}

export function BlogList (props: IAppProps) {
  const dispatch = useDispatch()
  const [item, setItem] = React.useState<number>(0);
  const [pagination, setPagination] = React.useState<PaginationProps>({
    count: 0,
    next: 0,
    offset: 10,
    page: 1,
    prev: 0,
    total: 0
  })
  let navigate = useNavigate();
  const columns = [
    { name: 'STT' },
    { name: 'Title' },
    { name: 'Image' },
    { name: 'Action' }
  ]
  const blogList = useSelector(blogListSelector)

  const [loading, setLoading] = React.useState(true)
  const [params, setParams] = React.useState({
    page: 1,
    offset: 10,
    search: '',
    sort_by: '',
    sort_direction: ''
  })

  React.useEffect(() => {
    handleGetBlogList(params)
  }, [params])
  const handleGetBlogList = (_params: any) => {
    setLoading(true)
    BlogService.getListBlog(_params,
      (response: any) => {
        const { data } = response
        if(data && data.data && data.data.items.length) {
          const { items } = data.data
          items.forEach((element: any, index: number) => {
            element.image_url = element.image.url
            element.index = data.pagination.page == 1 ? index + 1 : index !== 9 ? data.pagination.page + '' + (index + 1) : (data.pagination.page + 1) + '' + 0
          });
          dispatch(viewBlogList(items))
          setPagination(data.pagination)
          setLoading(false)
        }
      },
      (error: any) => {
        setLoading(false)
      }
    )
  }
  const handleAction = () => {
    BlogService.deleteBlog(item,
      (response: any) => {
        handleGetBlogList(params)
      },
      (error: any) => {

      }
    )
    
  }

  const handleDelete = React.useCallback((id: number) => {
    setItem(id)
  }, [])

  const handleChangePage = React.useCallback((page: number) => {
    setParams({
      ...params,
      page: page
    })
  }, [])
  return (
    <div className='blogList'>
      <div className='action'>
        <button type="button" className="btn btn-primary" onClick={() => navigate('/blog-add')}>Create</button>
      </div>
      <Table
        columns={columns}
        rows={blogList}
        loading={loading}
        handleDelete={handleDelete}
        pagination={pagination}
        handleChangePage={handleChangePage}
      />
      <Popup
        title={'Confirm blog deletion'}
        handleAction={handleAction}
      />
    </div>
  );
}
