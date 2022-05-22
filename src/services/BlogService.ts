import { withQuery } from './../helpers/withQueryString';
import { BLOG_LIST } from './constances';
import axios from 'axios';

function xAuthToken() {
  const headers = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  return headers;
}

function getListBlog(params:any, responseCb:any, errorCb:any) {
  axios.get(withQuery(BLOG_LIST, params), xAuthToken()).then(responseCb).catch(errorCb)
}

function createBlog(data:any, responseCb:any, errorCb:any) {
  axios.post(BLOG_LIST, data, xAuthToken()).then(responseCb).catch(errorCb)
}

function deleteBlog(id:number, responseCb:any, errorCb:any) {
  axios.delete(BLOG_LIST + `/${id}`, xAuthToken()).then(responseCb).catch(errorCb)
}

function getBlogDetail(id:string, responseCb:any, errorCb:any) {
  axios.get(BLOG_LIST + `/${id}`, xAuthToken()).then(responseCb).catch(errorCb)
}

function editBlog(id:string, data:any, responseCb:any, errorCb:any) {
  axios.put(BLOG_LIST + `/${id}`, data, xAuthToken()).then(responseCb).catch(errorCb)
}

const BlogService = {
  getListBlog, createBlog, deleteBlog, getBlogDetail, editBlog
}
export default BlogService

