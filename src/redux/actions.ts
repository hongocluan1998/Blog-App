export const addBlog = (data: any) => {
  return {
    type: 'blogList/addBlog',
    payload: data
  }
}

export const viewBlogList = (data: any) => {
  return {
    type: 'blogList/viewBlogList',
    payload: data
  }
}

export const viewBlogDetail = (id: string) => {
  return {
    type: 'blogList/viewDetail',
    payload: id
  }
}