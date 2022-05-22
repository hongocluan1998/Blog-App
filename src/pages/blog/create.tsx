import * as React from 'react';
import { useNavigate } from "react-router-dom";
import '../../css/blogAdd.css'
import BlogService from '../../services/BlogService';
import { useParams } from "react-router-dom";

export interface ICreateProps {
}

export function CreateBlog (props: ICreateProps) {
  let navigate = useNavigate();
  let { blog_id, isEdit } = useParams();
  const [postImage, setPostImage] = React.useState<any>()
  const [imageTypeFile, setImageTypeFile] = React.useState<any>(null)
  const [isDisable, setIsDisable] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [post, setPost] = React.useState({
    title: '',
    content: ''
  })
  React.useEffect(() => {
    return () => {
      postImage && postImage.preview && URL.revokeObjectURL(postImage.preview)
    }
  }, [postImage])

  function urltoFile(url: string, filename: string, mimeType: any){
    return (fetch(url)
        .then(function(res){return res.arrayBuffer();})
        .then(function(buf){return new File([buf], filename,{type:mimeType});})
    );
  }

  React.useEffect(() => {
    if(blog_id) {
      if(isEdit === 'false') {
        setIsDisable(true)
      }
      if(isEdit === 'true') {
        isDisable && setIsDisable(false)
      }

      BlogService.getBlogDetail(blog_id,
        (response: any) => {
          const { data } = response
          if(data && data.data) {
            setPost({
              title: data.data.title,
              content: data.data.content
            })
            setPostImage(data.data.image.url)
            urltoFile('data:text/plain;base64,aGVsbG8gd29ybGQ=', 'hello.png','image/png')
              .then(function(file){ setImageTypeFile(file) });
          }
        },
        (error: any) => {

        }
      )
    }
  }, [blog_id, isEdit])

  const selectFile = (event: any) => {
    const file = event.target.files[0]
    file.preview = URL.createObjectURL(file)
    setPostImage(file)

    event.target.value = null
  }

  const changeValueInput = (event: any) => {
    const { name, value } = event.target
    setPost({
      ...post,
      [name]: value
    })
  }

  const save = () => {
    setLoading(true)
    const data = new FormData()
    data.append(`blog[title]`, post.title)
    data.append(`blog[content]`, post.content)
    data.append(`blog[image]`, postImage)
    BlogService.createBlog(data,
      (response: any) => {
        const { status, statusText } = response
        if(status == 201 && statusText === "Created") {
          setLoading(false)
          navigate('/')
        }
      },
      (error: any) => {

      }
    )
  }

  const redirectEdit = () => {
    navigate(`/blog-edit/${blog_id}/true`)
  }

  const edit = () => {
    setLoading(true)
    const data = new FormData()
    data.append(`blog[title]`, post.title)
    data.append(`blog[content]`, post.content)
    data.append(`blog[image]`, typeof postImage === 'string' ? imageTypeFile : postImage)
    blog_id && BlogService.editBlog(blog_id, data,
      (response: any) => {
        setLoading(false)
        navigate(`/blog-view/${blog_id}/false`)
      },
      (error: any) => {
        setLoading(false)
      }
    )
  }
  return (
    <div className='container'>
      <div className='row flex-center mgTpbt'>
        <div className='col-lg-2'>
          Post title :
        </div>
        <div className='col-lg-4'>
          <input disabled={isDisable} name='title' onChange={changeValueInput} value={post.title} type="text" className="form-control"/>
        </div>
      </div>
      <div className='row flex-center mgTpbt'>
        <div className='col-lg-2'>
          Post content :
        </div>
        <div className='col-lg-4'>
          <textarea disabled={isDisable} name='content' onChange={changeValueInput} value={post.content} className="form-control" rows={3}/>
        </div>
      </div>
      <div className='row flex-center mgTpbt'>
        <div className='col-lg-2'>
          Upload image :
        </div>
        <div className='col-lg-4'>
          {
            isDisable ? ('') : (
              <input onChange={selectFile} type="file" className="form-control select_file"/>
            )
          }
        {
          postImage && (
            <img width="250px" height="150px" alt='Fail post image 1' src={ postImage.preview ? postImage.preview : postImage } />
          )
        }
        </div>
      </div>
      <div className='row flex-center mgTpbt'>
        {
          loading ? (
            <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <>
              <button className='btn btn-success' disabled={ !post.title || !post.content ? true : false } onClick={!isEdit ? save : isEdit === 'false' ? redirectEdit : edit}>{ !isEdit ? 'Create' : isEdit === 'true' ? 'Save' : 'Edit' }</button>
              <button className='btn btn-primary mgLeftCreate' onClick={() => navigate('/')}>Cancel</button>
            </>
          )
        }
      </div>
    </div>
  );
}
